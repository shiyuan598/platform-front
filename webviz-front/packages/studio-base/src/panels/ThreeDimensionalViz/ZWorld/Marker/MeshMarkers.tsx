// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { extend } from '@react-three/fiber'
import { Billboard, useGLTF, Text } from '@react-three/drei'
import { OutlineBox } from "../View/BaseElements"
import { useEffect, useMemo, useRef } from 'react'
// import * as THREE from 'three'
import { ArrowHelper, Object3D, Vector3 } from 'three';

import TransformObject, { TransformObjects } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { MeshMarker } from "@foxglove/studio-base/types/Messages";
import { useWorldStore } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store';
// import { zhito } from '@foxglove/studio-base/../../zhito-proto';
// import { WEBVIZ_LOC_OFFSET_TOPIC } from '@foxglove/studio-base/util/globalConstants';
// import { useDreamviewPlayer } from '@foxglove/studio-base/context/Dreamview/Dreamview';

extend(ArrowHelper)
type MeshMarkerProps = {
  markers: MeshMarker[];
  transformObjects: TransformObjects
};

function Model(props: MeshMarker) {
  const ref = useRef<Object3D>();

  const url = useMemo(() => {
    const baseUrl = props.mesh_resource;
    const file = baseUrl.split("assets/")[1]?.replace("dae", "glb");
    return `./models/${file}`;
  }, [props.mesh_resource])

  //@ts-ignore
  const { scene, nodes, materials } = useGLTF(url);

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(Math.PI / 2, Math.PI / 2, 0);
    }
  })

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.type === 'Mesh') {
      }
    })
   }, [scene, nodes, materials])
  return <primitive ref={ref} object={scene} />
}

// const MAX_DISTANCE = 100;
// function segmentToLineList(segment: zhito.hdmap.ILineSegment | null | undefined):Line3[]|undefined{
//   const lines = segment?.point?.map(point=>new Vector3(point?.x||0,point?.y||0))
//   return lines?.map((point,i)=>{
//       return new Line3(point,lines[i+1]);
//     });
// }

// function lineDistanceToPoint(lines:Line3[]|undefined, point:Vector3):[number,Vector3|undefined, Vector3|undefined]{
//   let distance = MAX_DISTANCE;
//   let tempPoint = new Vector3();
//   let closestPoint;
//   let direction;
//   if(!lines){
//     return [0,undefined,undefined]
//   }else{
//     lines.forEach((line) => {
//       line.closestPointToPoint(point,true,tempPoint);
//       const d = tempPoint.distanceTo(point);
//       if(d<distance){
//         distance = d;
//         closestPoint = tempPoint.clone()
//         direction = new Vector3(line.end.x-line.start.x, line.end.y - line.start.y);
//       }
//     });
//     return [distance, closestPoint, direction];
//   }
// }

interface TextProps {
  text: string,
  color: number,
  position: Vector3
  heading?: number
  fontSize?: number
}
function Text3D(props: TextProps): JSX.Element {
  const ref = useRef<Object3D>();
  const textRef = useRef<Object3D>();
  useEffect(() => {
      if (ref.current) {
          ref.current.rotation.set(Math.PI / 2, -(props.heading || 0), 0);
      }
  }, [props.heading])
  // console.log(props.text)
  return <Billboard
      follow={true} // Follow the camera (default=true)
      lockX={false} // Lock the rotation on the x axis (default=false)
      lockY={false} // Lock the rotation on the y axis (default=false)
      lockZ={false} // Lock the rotation on the z axis (default=false)
  ><Text
      ref={textRef}
      position={props.position}
      scale={[1, 1, 1]}
      anchorX="center" // default
      anchorY="middle" // default
      color={props.color}
      fontSize={0.6}
      maxWidth={200}
      lineHeight={1}
      direction={'auto'}
      letterSpacing={0.02}
      textAlign={'center'}
  >
          {props.text}
      </Text>
  </Billboard>
}

function BoundingBox({show}:{show:boolean}){
  const {localization,ZicOffset} = useWorldStore(state=>({localization:state.localization,currentLane:state.currentLane,ZicOffset:state.LOC.ZicOffset}));

  const OffsetText = useMemo(()=>{
    const zicText = `Zic: ${(ZicOffset).toFixed(2)} m\n`
    const locText = !isNaN(localization.pose?.relative_pose?.relative_distance as number) ? `Loc: ${(localization.pose?.relative_pose?.relative_distance ?? 0).toFixed(2)} m` : "";
    return zicText+locText
  },[localization,ZicOffset])
  return <>
  {show && <OutlineBox position={new Vector3(0, 2.5, 2)} linewidth={4} size={J7Size} color={0xff5722} heading={0} />}
  {show && <Text3D position={new Vector3(0,5,0)} text={OffsetText} color={0xeeeeee}></Text3D>}
  </>
}
const MemoModel = React.memo(Model);
const J7Size = [6.515,3,2.55]
export default React.memo(function MeshMarkers({ markers, transformObjects }: MeshMarkerProps): JSX.Element {
  const adcGltf = useWorldStore(state=>state.adcGltf);
  const models = markers.map((marker, i) => {
    return <TransformObject key={i} transform={transformObjects[marker.header.frame_id]}>
      {adcGltf && <MemoModel key={i} {...marker}></MemoModel>}
      <BoundingBox show={!adcGltf}/>
    </TransformObject>
  })
  return <>{...models}</>
})
