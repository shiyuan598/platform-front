import * as THREE from "three";

const getNormals = require('polyline-normals');

const VERTS_PER_POINT = 2;

export function ThreeLine2DBasicShader(opt: { transparent?: boolean, side?: any, thickness?: any; opacity?: any; diffuse?: any; precision?: any; }) {
  opt = opt || {};
  const thickness = typeof opt.thickness === 'number' ? opt.thickness : 0.1;
  const opacity = typeof opt.opacity === 'number' ? opt.opacity : 0.8;
  const diffuse = opt.diffuse !== null ? opt.diffuse : 0xffffff;

  // remove to satisfy r73
  delete opt.thickness;
  delete opt.opacity;
  delete opt.diffuse;
  delete opt.precision;

  const ret = Object.assign({
    uniforms: {
      thickness: { type: 'f', value: thickness },
      opacity: { type: 'f', value: opacity },
      diffuse: { type: 'c', value: new THREE.Color(diffuse) }
    },
    // blending: THREE.AdditiveBlending,
    vertexShader: [
      'uniform float thickness;',
      'attribute float lineMiter;',
      'attribute vec2 lineNormal;',
      'void main() {',
      'vec3 pointPos = position.xyz + vec3(lineNormal * thickness / 2.0 * lineMiter, 0.0);',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPos, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 diffuse;',
      'uniform float opacity;',
      'void main() {',
      'gl_FragColor = vec4(diffuse, opacity);',
      '}'
    ].join('\n')
  }, opt);

  const threeVers = (parseInt(THREE.REVISION, 10) || 0) | 0;
  if (threeVers < 72) {
    // Old versions need to specify shader attributes
    //@ts-ignore
    ret.attributes = {
      lineMiter: { type: 'f', value: 0 },
      lineNormal: { type: 'v2', value: new THREE.Vector2() }
    };
  }
  return ret;
}


export class ThreeLine2D extends THREE.BufferGeometry {
  constructor(path: number[][], opt?: { distances?: any; closed?: any; }) {
    super();

    if (Array.isArray(path)) {
      opt = opt || {};
    } else if (typeof path === 'object') {
      opt = path;
      path = [];
    }

    opt = opt || {};

    //@ts-ignore
    this.setAttribute('position', new THREE.BufferAttribute(undefined, 3));
    //@ts-ignore
    this.setAttribute('lineNormal', new THREE.BufferAttribute(undefined, 2));
    //@ts-ignore
    this.setAttribute('lineMiter', new THREE.BufferAttribute(undefined, 1));
    if (opt.distances) {
      //@ts-ignore
      this.setAttribute('lineDistance', new THREE.BufferAttribute(undefined, 1));
    }
    if (typeof this.setIndex === 'function') {
      //@ts-ignore
      this.setIndex(new THREE.BufferAttribute(undefined, 1));
    } else {
      //@ts-ignore
      this.setAttribute('index', new THREE.BufferAttribute(undefined, 1));
    }
    //@ts-ignore
    this.update(path, opt.closed);
  }

}
//@ts-ignore
ThreeLine2D.prototype.update = function (path: any[], closed: any) {
  path = path || [];
  const normals = getNormals(path, closed);

  if (closed) {
    path = path.slice();
    path.push(path[0]);
    normals.push(normals[0]);
  }

  const attrPosition = this.getAttribute('position');
  const attrNormal = this.getAttribute('lineNormal');
  const attrMiter = this.getAttribute('lineMiter');
  const attrDistance = this.getAttribute('lineDistance');
  const attrIndex = typeof this.getIndex === 'function' ? this.getIndex() : this.getAttribute('index');

  const indexCount = Math.max(0, (path.length - 1) * 6);
  if (!attrPosition.array ||
    (path.length !== attrPosition.array.length / 3 / VERTS_PER_POINT)) {
    var count = path.length * VERTS_PER_POINT;
    //@ts-ignore
    attrPosition.array = new Float32Array(count * 3);
    //@ts-ignore
    attrNormal.array = new Float32Array(count * 2);
    //@ts-ignore
    attrMiter.array = new Float32Array(count);
    //@ts-ignore
    attrIndex.array = new Uint16Array(indexCount);

    if (attrDistance) {
      //@ts-ignore
      attrDistance.array = new Float32Array(count);
    }
  }

  if (undefined !== attrPosition.count) {
    //@ts-ignore
    attrPosition.count = count;
  }
  attrPosition.needsUpdate = true;

  if (undefined !== attrNormal.count) {
    //@ts-ignore
    attrNormal.count = count;
  }
  attrNormal.needsUpdate = true;

  if (undefined !== attrMiter.count) {
    //@ts-ignore
    attrMiter.count = count;
  }
  attrMiter.needsUpdate = true;
  //@ts-ignore
  if (undefined !== attrIndex.count) {
    //@ts-ignore
    attrIndex.count = indexCount;
  }
  //@ts-ignore
  attrIndex.needsUpdate = true;

  if (attrDistance) {
    if (undefined !== attrDistance.count) {
      //@ts-ignore
      attrDistance.count = count;
    }
    attrDistance.needsUpdate = true;
  }

  let index = 0;
  let c = 0;
  let dIndex = 0;
  //@ts-ignore
  const indexArray = attrIndex.array;

  path.forEach((point: any[], pointIndex: number, list: string | any[]) => {
    const i = index;
    //@ts-ignore
    indexArray[c++] = i + 0;
    //@ts-ignore
    indexArray[c++] = i + 1;
    //@ts-ignore
    indexArray[c++] = i + 2;
    //@ts-ignore
    indexArray[c++] = i + 2;
    //@ts-ignore
    indexArray[c++] = i + 1;
    //@ts-ignore
    indexArray[c++] = i + 3;

    attrPosition.setXYZ(index++, point[0], point[1], 0);
    attrPosition.setXYZ(index++, point[0], point[1], 0);

    if (attrDistance) {
      const d = pointIndex / (list.length - 1);
      attrDistance.setX(dIndex++, d);
      attrDistance.setX(dIndex++, d);
    }
  });

  let nIndex = 0;
  let mIndex = 0;
  normals.forEach((n: any[]) => {
    const norm = n[0];
    const miter = n[1];
    attrNormal.setXY(nIndex++, norm[0], norm[1]);
    attrNormal.setXY(nIndex++, norm[0], norm[1]);

    attrMiter.setX(mIndex++, -miter);
    attrMiter.setX(mIndex++, miter);
  });
};
