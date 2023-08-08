// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { zhito } from "@zhito/proto"
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from "three"
import { DoubleSide, Group, Object3D,Vector3 } from 'three';

import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { ThickLine } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/BaseElements";
import { Topic } from '@foxglove/studio-base/players/types';
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { Circle } from "@react-three/drei";

type ViewProps = {
  topic: Topic;
  message: zhito.planning.ADCTrajectory;
  rootTransform?: Object3D
  useLifetime: boolean
  useLocalFrame: boolean
}

interface IPlanningPaths {
  message:zhito.planning.ADCTrajectory
  offset: {x:number,y:number}
}

interface IImagePlane{
  size:number,
  color:number
  position:Vector3
}
const PointPlane = ({size,color,position}:IImagePlane)=>{

  const ref = useRef<Group>(null)
  useEffect(()=>{
    ref.current?.position.set(position.x,position.y,position.z+0.5)
  },[position])
  return <>
      <Circle args={[size/4,24]}  ref={ref} frustumCulled={true}>
        <meshBasicMaterial attach="material" color={color} transparent={true} side={DoubleSide} />
      </Circle>

  </>
}

const PathPointView = React.memo(({message,offset}:IPlanningPaths)=>{
  const pathPoint= useWorldStore(state=>(state.PPSetting.pathPoint))
  const pathPoints = useMemo(()=>{
    if(!pathPoint.line&&!pathPoint.point){
      return []
    }else{
      return message.path_point?.map(pathData=>{
        const point = new Vector3((pathData.x??0) - offset.x,(pathData.y??0) - offset.y)
        return point
      }) ?? []
    }

  },[pathPoint,message])
  return <group position={[0,0,-0.2]}>
    {pathPoint.point&&pathPoints.map(point=><PointPlane position={point} size={pathPoint.lineWidth} color={pathPoint.pointColor} />)}
    {pathPoint.line&&<ThickLine id="path-point"
      points={pathPoints}
      thickness={pathPoint.lineWidth}
      color={pathPoint.lineColor}
      opacity={0.7} cache={true}
      zOffset={0.2}/>
    }
  </group>
})
export default React.memo(function TrajectoryView({ message, rootTransform, useLocalFrame, useLifetime }: ViewProps) {
  const [visible,setVisible] = useState<boolean>();
  const {dynamicOrigin, offsetPosition} = useWorldStore(state=>({dynamicOrigin:state.dynamicOrigin,offsetPosition:state.offsetPosition}));
  useEffect(()=>{
    if(useLifetime){
      setVisible(true);
      const timeout = setTimeout(()=>{
        setVisible(false);
      },500);
      return ()=>{
        clearTimeout(timeout)
      }
    }else if(!visible){
      setVisible(true);
    }
    return ()=>{}

  },[message, useLifetime])
  const offset = useLocalFrame?offsetPosition:dynamicOrigin;
  const points = useMemo(() => {
    return message.trajectory_point?.map(p => {
      return new THREE.Vector3((p.path_point?.x ?? 0) - offset.x, (p.path_point?.y ?? 0) - offset.y)
    }) || []
  }, [message])
  return <TransformObject transform={rootTransform}>
    {visible && (message !==undefined) &&  <ThickLine points={points} thickness={2.5} color={0x0db8ce} opacity={0.7} id="adc-traj" frustumCulled={false} ></ThickLine>}
    {visible && (message !==undefined) && <PathPointView message={message} offset={offset}/> }
    </TransformObject>

})
