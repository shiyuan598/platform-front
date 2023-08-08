// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { getColorFromString } from "@fluentui/react";
import { zhito } from "@zhito/proto"
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import {
  Worldview,
  CameraState,
  MouseHandler,
  DEFAULT_CAMERA_STATE,
} from "@foxglove/regl-worldview";
import { Time } from "@foxglove/rostime";
import { useMessagesByTopic } from "@foxglove/studio-base/PanelAPI";
import { Interactive } from "@foxglove/studio-base/panels/ThreeDimensionalViz/Interactions/types";
import {
  WorldSearchTextProps,
  useGLText,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/SearchText";
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { LAYER_INDEX_DEFAULT_BASE } from "@foxglove/studio-base/panels/ThreeDimensionalViz/constants";
import {
  CoordinateFrame,
  TransformTree,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/transforms";
import withHighlights from "@foxglove/studio-base/panels/ThreeDimensionalViz/withHighlights";
import { Topic } from "@foxglove/studio-base/players/types";
import inScreenshotTests from "@foxglove/studio-base/stories/inScreenshotTests";
import ThemeProvider from "@foxglove/studio-base/theme/ThemeProvider";
import {
  BaseMarker,
  ColorMarker,
  CubeListMarker,
  CubeMarker,
  CylinderMarker,
  LineListMarker,
  LineStripMarker,
  MeshMarker,
  PointsMarker,
  SphereListMarker,
  SphereMarker,
  TextMarker,
} from "@foxglove/studio-base/types/Messages";

import { MarkerCollector, MarkerProvider } from "../types";
import { TransformObjects } from "./TransformObject";
import WorldMarkers, {
  InteractiveMarkersByType,
  MarkerWithInteractionData,
} from "./ZWorldMarkers";
import ZWorldView from "./ZWorldView";
import { LogInfoFrame } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/LogInfo";

type Props = WorldSearchTextProps & {
  autoTextBackgroundColor: boolean;
  canvasBackgroundColor: string;
  cameraState: CameraState;
  children?: React.ReactNode;
  isPlaying: boolean;
  transforms: TransformTree;
  renderFrame: CoordinateFrame;
  fixedFrame: CoordinateFrame;
  currentTime: Time;
  markerProviders: MarkerProvider[];
  protoTopics: Topic[];
  protoFrame: Record<string, any>;
  onCameraStateChange: (arg0: CameraState) => void;
  onClick: MouseHandler;
  onDoubleClick: MouseHandler;
  onMouseDown?: MouseHandler;
  onMouseMove?: MouseHandler;
  onMouseUp?: MouseHandler;
};

function getMarkers({
  markers,
  markerProviders,
  transforms,
  renderFrame,
  fixedFrame,
  time,
}: {
  markers: InteractiveMarkersByType;
  markerProviders: MarkerProvider[];
  transforms: TransformTree;
  renderFrame: CoordinateFrame;
  fixedFrame: CoordinateFrame;
  time: Time;
}): void {
  // These casts seem wrong - some type definitions around MarkerProvider or MarkerCollector are not
  // compatible with interactive markers. Ideally interactive markers would not require mutating
  // marker objects which would help avoid unsafe casting.
  const collector: MarkerCollector = {
    arrow: (o) => markers.arrow.push(o as unknown as MarkerWithInteractionData),
    color: (o) => markers.color.push(o as Interactive<ColorMarker>),
    cube: (o) => markers.cube.push(o as Interactive<CubeMarker>),
    cubeList: (o) => markers.cubeList.push(o as Interactive<CubeListMarker>),
    cylinder: (o) => markers.cylinder.push(o as Interactive<CylinderMarker>),
    grid: (o) => markers.grid.push(o as unknown as Interactive<BaseMarker>),
    instancedLineList: (o) =>
      markers.instancedLineList.push(o as unknown as Interactive<BaseMarker>),
    laserScan: (o) => markers.laserScan.push(o as unknown as Interactive<BaseMarker>),
    lineList: (o) => markers.lineList.push(o as Interactive<LineListMarker>),
    lineStrip: (o) => markers.lineStrip.push(o as Interactive<LineStripMarker>),
    mesh: (o) => markers.mesh.push(o as Interactive<MeshMarker>),
    pointcloud: (o) => markers.pointcloud.push(o as unknown as Interactive<SphereMarker>),
    points: (o) => markers.points.push(o as Interactive<PointsMarker>),
    poseMarker: (o) => markers.poseMarker.push(o as unknown as Interactive<BaseMarker>),
    sphere: (o) => markers.sphere.push(o as Interactive<SphereMarker>),
    sphereList: (o) => markers.sphereList.push(o as Interactive<SphereListMarker>),
    text: (o) => markers.text.push(o as Interactive<TextMarker>),
    triangleList: (o) => markers.triangleList.push(o as unknown as MarkerWithInteractionData),
  };

  const args = { add: collector, transforms, renderFrame, fixedFrame, time };
  for (const provider of markerProviders) {
    provider.renderMarkers(args);
  }
}

// Wrap the WorldMarkers in HoC(s)
//@ts-ignore
const WrappedWorldMarkers = withHighlights(WorldMarkers);

// const Plane = () => (
//   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
//     <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
//     <meshBasicMaterial attach="material" color="#bed1e0" />
//   </mesh>
// );


function World(
  {
    onClick,
    autoTextBackgroundColor,
    canvasBackgroundColor,
    children,
    onCameraStateChange,
    cameraState,
    isPlaying,
    renderFrame,
    fixedFrame,
    currentTime,
    markerProviders,
    onDoubleClick,
    onMouseDown,
    onMouseMove,
    transforms,
    protoTopics,
    protoFrame,
    onMouseUp,
    setSearchTextMatches,
    searchText,
    searchTextOpen,
    selectedMatchIndex,
    searchTextMatches,
  }: Props,
  ref: typeof Worldview,
) {
  // Building these arrays every frame is expensive, so we instantiate once and
  // clear them each time to reduce allocations
  const markersRef = useRef<InteractiveMarkersByType | undefined>(undefined);

  markersRef.current ??= {
    arrow: [],
    color: [],
    cube: [],
    cubeList: [],
    cylinder: [],
    glText: [],
    grid: [],
    instancedLineList: [],
    laserScan: [],
    lineList: [],
    lineStrip: [],
    mesh: [],
    pointcloud: [],
    points: [],
    poseMarker: [],
    sphere: [],
    sphereList: [],
    text: [],
    triangleList: [],
  };
  for (const key in markersRef.current) {
    (markersRef.current as Record<string, unknown[]>)[key]!.length = 0;
  }

  getMarkers({
    markers: markersRef.current,
    markerProviders,
    transforms,
    renderFrame,
    fixedFrame,
    time: currentTime,
  });
  const markersByType = markersRef.current;
  const { text = [] } = markersByType;
  const processedMarkersByType = {
    ...markersByType,
    text: [],
    glText: useGLText({
      text,
      setSearchTextMatches,
      searchText,
      searchTextOpen,
      selectedMatchIndex,
      searchTextMatches,
    }),
  };
  const backgroundColor = useMemo(() => {
    const { r, g, b, a } = getColorFromString(canvasBackgroundColor) ?? { r: 0, g: 0, b: 0, a: 1 };
    return [r / 255, g / 255, b / 255, (a ?? 100) / 100];
  }, [canvasBackgroundColor]);
  const {transformObjects} = useWorldStore(state=>({transformObjects:state.transformObjects}))



  return (
    <>
      <ZWorldView
        backgroundColor={backgroundColor}
        cameraState={cameraState}
        enableStackedObjectEvents={!isPlaying}
        hideDebug={inScreenshotTests()}
        onCameraStateChange={onCameraStateChange} // Rendering the hitmap is an expensive operation and we want to avoid
        // doing it when the user is dragging the view with the mouse. By ignoring
        // these events, the only way to select an object is when receiving an "onClick" event.
        disableHitmapForEvents={["onMouseDown", "onMouseMove", "onMouseUp"]}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        resolutionScale={1}
        protoTopics={protoTopics}
        protoFrame={protoFrame}
        transformObjects={transformObjects}
        ref={ref}
        contextAttributes={{ preserveDrawingBuffer: true }}
      >
        {/* <Plane /> */}


        <WrappedWorldMarkers
          {...{
            autoTextBackgroundColor,
            markersByType: processedMarkersByType,
            layerIndex: LAYER_INDEX_DEFAULT_BASE,
            clearCachedMarkers: false,
            transformObjects,
            cameraDistance: cameraState.distance ?? DEFAULT_CAMERA_STATE.distance,
          }}
        />
      </ZWorldView>
      {children}

    </>
  );
}



function WorldProxy(props: Props) {
  const worldStore = useWorldStore(state => ({
    transforms: state.transforms,
    renderFrame: state.renderFrame,
    protoFrame: state.protoFrame,
    protoTopics: state.protoTopics,
    fixedFrame: state.fixedFrame,
    currentTime: state.currentTime
  }));
  const mergedStore = { ...props, ...worldStore };
  return <World {...mergedStore}></World>
}

function WorldProxyRoot(props: Props, _ref:typeof Worldview) {
  const rootRef = useRef<HTMLDivElement>(null);
  const worldStore = useWorldStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    worldStore.setRenderFrame(props.renderFrame);
    worldStore.setTransforms(props.transforms);
    worldStore.setFixedFrame(props.fixedFrame);
    worldStore.setCurrentTime(props.currentTime);
  }, [props.transforms, props.renderFrame, props.fixedFrame])
  useEffect(() => {
    worldStore.setProtoFrame(props.protoFrame);
    worldStore.setProtoTopics(props.protoTopics);

  }, [props.protoFrame, props.protoTopics])
   useEffect(() => {
    const objects: TransformObjects = {};

    props.transforms.frames().forEach(frame => {
      const pose = {
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0, w: 1 }
      }
      const dstFrame = props.transforms.frame(frame.id);
      const srcFrame = props.transforms.frame(props.renderFrame.id);

      if (dstFrame && srcFrame) {
        srcFrame.applyLocal(pose, pose, dstFrame, props.currentTime)
      }
      const object = new THREE.Object3D();
      object.position.set(pose.position.x, pose.position.y, pose.position.z);
      object.quaternion.set(pose.orientation.x, pose.orientation.y, pose.orientation.z, pose.orientation.w);

      objects[frame.id] = object;
    })
    worldStore.setTransformObjects(objects);
  }, [props.transforms, props.renderFrame.id])

  // process dynamic origin
  useEffect(() => {
    const pose = {
      position: { x: 0, y: 0, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 1 }
    }
    const dstFrame = props.transforms.frame("dynamic_origin");
    const srcFrame = props.transforms.frame("world");
    if (dstFrame && srcFrame) {
      srcFrame.applyLocal(pose, pose, dstFrame, props.currentTime);
      if(Math.abs(pose.position.x - worldStore.dynamicOrigin.x)>0.1 || Math.abs(pose.position.y - worldStore.dynamicOrigin.y)>0.1 ){
        console.log("set dynamic origin")
        worldStore.setDynamicOrigin(pose.position.x,pose.position.y);
      }
    }

  }, [props.transforms, worldStore.dynamicOrigin])



  useEffect(() => {
    if (!mounted && Object.keys(props.protoFrame).length > 0) {
      ReactDOM.render(
        //@ts-ignore
        <ThemeProvider isDark> <WorldProxy {...props} ></WorldProxy> </ThemeProvider>,
        rootRef.current,
      );
      setMounted(true);
    }
  }, [props])


  const posTopic = "/zhito/localization/pose";
  const { [posTopic]: poseMsg } = useMessagesByTopic({
    topics: [posTopic],
    historySize: 1
  }) as unknown as { [key: string]: { message: zhito.localization.LocalizationEstimate }[] }
  useEffect(() => {
    if (poseMsg && poseMsg[0]?.message) {
      worldStore.setLocalization(poseMsg[0]?.message);
      const offsetX = poseMsg[0]?.message.pose?.position?.x ?? 0;
      const offsetY = poseMsg[0]?.message.pose?.position?.y ?? 0;
      worldStore.setOffsetPosition(offsetX, offsetY);
    }
  }, [poseMsg])
  return <div ref={rootRef} className={"world-proxy"} style={{
    width: "100%",
    height: "100%"
  }}><LogInfoFrame /></div>
}
export default forwardRef<typeof Worldview, Props>(WorldProxyRoot);
