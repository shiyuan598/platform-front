// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import type { Object3D } from "three";
import { GLTFExporter, GLTFExporterOptions } from "three/examples/jsm/exporters/GLTFExporter";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";

import { parseGLB } from "@foxglove/regl-worldview";
import { GlbModel } from "@foxglove/studio-base/panels/ThreeDimensionalViz/utils/GlbModel";
import { MeshPrimitive } from "@foxglove/studio-base/panels/ThreeDimensionalViz/utils/gltf";

const UNSIGNED_INT = 5125;
const DEFAULT_COLOR = [36 / 255, 142 / 255, 1.0, 1];

// The type declaration for GLTFExporter.parse is not correct in THREE.js 0.135.0
type FixedExporter = {
  parse: (
    input: Object3D,
    onCompleted: (gltf: object) => void,
    onError: (err: Error) => void,
    options: GLTFExporterOptions,
  ) => void;
};

export async function parseDaeToGlb(buffer: ArrayBuffer): Promise<GlbModel> {
  const loader = new ColladaLoader();
  const text = new TextDecoder().decode(buffer);
  const collada = loader.parse(text, "./model.dae");

  collada.scene.traverse((child) => {
    if (child.type === "Mesh") {
      const material = (child as THREE.Mesh).material;
      const materials = Array.isArray(material) ? material : [material];
      for (const mat of materials) {
        const lambert = mat as THREE.MeshLambertMaterial;
        // eslint-disable-next-line no-restricted-syntax
        lambert.map = null;
        // eslint-disable-next-line no-restricted-syntax
        lambert.emissiveMap = null;
        // eslint-disable-next-line no-restricted-syntax
        lambert.lightMap = null;
        // eslint-disable-next-line no-restricted-syntax
        lambert.specularMap = null;
        // eslint-disable-next-line no-restricted-syntax
        (lambert as unknown as { normalMap: THREE.Texture | null }).normalMap = null;
      }
    }
  });

  const exporter = new GLTFExporter();
  return await new Promise((resolve, reject) => {
    (exporter as FixedExporter).parse(
      collada.scene,
      async (glbBuffer) => {
        const glb = (await parseGLB(glbBuffer)) as GlbModel;
        patchGlb(glb);
        resolve(glb);
      },
      reject,
      {
        embedImages: false,
        binary: true,
        includeCustomExtensions: false,
        onlyVisible: true,
      },
    );
  });
}

/**
 * Apply various fixes to a THREE.js exported GLB file to make it compatible
 * with regl-worldview's <GLTFScene>.
 */
function patchGlb(glb: GlbModel): void {
  // Change all the materials to a consistent shade of blue
  for (const material of glb.json.materials ?? []) {
    material.pbrMetallicRoughness = {
      baseColorFactor: DEFAULT_COLOR,
      metallicFactor: 0,
      roughnessFactor: 1,
    };
  }

  for (const mesh of glb.json.meshes ?? []) {
    for (const primitive of mesh.primitives) {
      if (primitive.indices == undefined) {
        // <GLTFScene> currently only supports indexed geometry, so we synthesize indices if needed
        createIndices(primitive, glb);
      }
    }
  }

  // THREE.js uses Y-up, while we follow the ROS [REP-0103](https://www.ros.org/reps/rep-0103.html)
  // convention of Z-up
  for (const node of glb.json.nodes ?? []) {
    node.rotation = [-0.5, -0.5, -0.5, 0.5];
  }
}

function createIndices(primitive: MeshPrimitive, glb: GlbModel): void {
  const positionId = primitive.attributes["POSITION"]!;
  const positions = glb.json.accessors![positionId]!;
  const indices = new Uint32Array(positions.count);
  for (let i = 0; i < indices.length; i++) {
    indices[i] = i;
  }
  const indicesBufferId = glb.json.buffers!.length;
  glb.json.buffers!.push({ byteLength: indices.byteLength });
  const indicesBufferViewId = glb.json.bufferViews!.length;
  glb.json.bufferViews!.push({
    buffer: indicesBufferId,
    byteLength: indices.byteLength,
  });
  const indicesAccessorId = glb.json.accessors!.length;
  glb.json.accessors!.push({
    type: "SCALAR",
    componentType: UNSIGNED_INT,
    count: indices.length,
    bufferView: indicesBufferViewId,
    min: [0],
    max: [indices.length - 1],
  });

  primitive.indices = indicesAccessorId;
  glb.accessors.push(indices);
}
