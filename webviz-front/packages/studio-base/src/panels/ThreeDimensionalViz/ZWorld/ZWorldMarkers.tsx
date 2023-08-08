// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2020-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

// import { useEffect } from "react";

// import {
//   Arrows,
//   Cubes,
//   Cylinders,
//   GLText,
//   Points,
//   Spheres,
//   Triangles,
//   Lines,
//   createInstancedGetChildrenForHitmap,
// } from "@foxglove/regl-worldview";
import { Interactive } from "@foxglove/studio-base/panels/ThreeDimensionalViz/Interactions/types";
import { GLTextMarker } from "@foxglove/studio-base/panels/ThreeDimensionalViz/SearchText";
import { TransformObjects } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject";
// import MeshMarkers from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/MeshMarkers";
import {
  BaseMarker,
  CubeListMarker,
  CubeMarker,
  CylinderMarker,
  LineListMarker,
  LineStripMarker,
  PointsMarker,
  SphereListMarker,
  SphereMarker,
  TextMarker,
  ColorMarker,
  MeshMarker,
} from "@foxglove/studio-base/types/Messages";

// import { TextAtlas } from "../utils/glTextAtlasLoader";
import { groupLinesIntoInstancedLineLists } from "../utils/groupingUtils";
import Grids from "./Marker/Grids";
import Lines from "./Marker/Lines";
import MeshMarkers from "./Marker/MeshMarkers";
import PointClouds from "./Marker/PointClouds";

export type MarkerWithInteractionData = Interactive<BaseMarker>;

export type InteractiveMarkersByType = {
  arrow: MarkerWithInteractionData[];
  color: Interactive<ColorMarker>[];
  cube: Interactive<CubeMarker>[];
  cubeList: Interactive<CubeListMarker>[];
  cylinder: Interactive<CylinderMarker>[];
  glText: Interactive<GLTextMarker>[];
  grid: Interactive<BaseMarker>[];
  instancedLineList: Interactive<BaseMarker>[];
  laserScan: Interactive<BaseMarker>[];
  lineList: Interactive<LineListMarker>[];
  lineStrip: Interactive<LineStripMarker>[];
  mesh: Interactive<MeshMarker>[];
  pointcloud: Interactive<SphereMarker>[];
  points: Interactive<PointsMarker>[];
  poseMarker: Interactive<BaseMarker>[];
  sphere: Interactive<SphereMarker>[];
  sphereList: Interactive<SphereListMarker>[];
  text: Interactive<TextMarker>[];
  triangleList: MarkerWithInteractionData[];
};

// Generate an alphabet for text makers with the most
// used ASCII characters to prevent recreating the texture
// atlas too many times for dynamic texts.

// const glTextAtlasPromise = glTextAtlasLoader();

// type GLTextAtlasStatus = {
//   status: "LOADING" | "LOADED";
//   glTextAtlas?: TextAtlas;
// };

export type WorldMarkerProps = {
  autoTextBackgroundColor: boolean;
  layerIndex?: number;
  markersByType: InteractiveMarkersByType;
  clearCachedMarkers: boolean;
  cameraDistance: number;
  transformObjects: TransformObjects
};

// Average a list of color markers into a single output color value. The returned value is the
// mean RGB and max(alpha)

export default function ZWorldMarkers({
  markersByType,
  transformObjects,
}: WorldMarkerProps): JSX.Element {
  // const getChildrenForHitmap = useMemo(() => createInstancedGetChildrenForHitmap(1), []);
  const {
    instancedLineList,
    lineList,
    lineStrip,
    grid,
    pointcloud,
    mesh,
  } = markersByType;

  // GLTextAtlas download is shared among all instances of World, but we should only load the GLText command once we
  // have the pregenerated atlas available.
  // const [glTextAtlasInfo, setGlTextAtlasInfo] = useState<GLTextAtlasStatus>({
  //   status: "LOADING",
  //   glTextAtlas: undefined,
  // });
  // useEffect(() => {
  //   let mounted = true;
  //   // void glTextAtlasPromise.then((atlas) => {
  //   //   if (mounted) {
  //   //     setGlTextAtlasInfo({ status: "LOADED", glTextAtlas: atlas });
  //   //   }
  //   // });
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  // Group all line strips and line lists into as few markers as possible
  const groupedLines = groupLinesIntoInstancedLineLists([...lineList, ...lineStrip]);

  // const backdropColor = useMemo((): ReglColor => averageMarkerColor(color), [color]);
  // console.log(lineStrip, "lineStrip")
  return (
    <>

      <Grids grid={grid}></Grids>
      <PointClouds transformObjects={transformObjects} pointclouds={pointcloud}></PointClouds>
      <Lines lines={[...instancedLineList, ...groupedLines]} transformObjects={transformObjects}></Lines>
      <MeshMarkers markers={mesh} transformObjects={transformObjects}></MeshMarkers>
      {/* layerIndex={layerIndex}  */}
    </>
  );
}
