
import { useEffect, useRef } from "react";
import { GridHelper, Object3D, Quaternion } from "three";

import { Interactive } from "@foxglove/studio-base/panels/ThreeDimensionalViz/Interactions/types";
// import MeshMarkers from "@foxglove/studio-base/panels/ThreeDimensionalViz/commands/MeshMarkers";




import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import {
  BaseMarker,
} from "@foxglove/studio-base/types/Messages";


export default  function Grid({grid}:{grid: Interactive<BaseMarker>[]}){
  const rootRef = useRef<Object3D>();
  const gridRef = useRef<GridHelper>();
  const {localization} = useWorldStore(state=>({localization:state.localization}));
  useEffect(()=>{
    if(gridRef.current&&grid.length>0){
      const pose = localization.pose;
      const queaternion = new Quaternion(pose?.orientation?.qy||0, pose?.orientation?.qz||0,pose?.orientation?.qx||0,pose?.orientation?.qw||0);
      gridRef.current?.position.set((localization.pose?.position?.x||0) %100, -1,(localization.pose?.position?.y||0)%100);
      rootRef.current?.rotation.set(Math.PI/2,0,0)//localization.pose?.heading??0
      // gridRef.current?.rotation.set(0,+(localization.pose?.heading??0),0)
      gridRef.current?.rotation.setFromQuaternion(queaternion)
    }
  },[localization,grid])
  // const gridPose = useMemo(() => {
  //   const pose = {
  //     position: { x: 0, y: 0, z: 0 },
  //     orientation: { x: 0, y: 0, z: 0, w: 1 }
  //   }
  //   const novatelFrame = transforms.frame("novatel");
  //   const worldFrame = transforms.frame("world");
  //   if (worldFrame && novatelFrame) {
  //     novatelFrame.apply(pose, pose, worldFrame, worldFrame, currentTime, currentTime)
  //   }
  //   const queaternion = new Quaternion(pose.orientation.y - Math.PI/2, pose.orientation.x, pose.orientation.z, pose.orientation.w);

  //   return pose;
  // }, [transforms])
  return <group ref={rootRef}>{ grid.length>0 &&<gridHelper args={[1000, 1000 / 10, "#6d706f", "#6d706f"]} ref={gridRef}/> }</group>
}
