// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { zhito } from "@zhito/proto"
import { useEffect, useMemo, useState } from 'react'

import { Object3D } from 'three';

import { DashedLine, Text3D } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/BaseElements";
import { Topic } from '@foxglove/studio-base/players/types';
import { Vector3 } from "three";
import { COLOR_PALETTE } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/types";

type ViewProps = {
  topic: Topic;
  message: zhito.drivers.ThirdPartyCamera;
  rootTransform?: Object3D
}

function getLinePoints(lane:zhito.drivers.horizon_camera.ILka_left_lane|
  zhito.drivers.horizon_camera.Lka_right_lane|
  zhito.drivers.horizon_camera.Next_left_lane|
  zhito.drivers.horizon_camera.Next_right_lane,name:string):[Vector3[],string,number]{
    const start = lane.laneviewrangestart ??0
    const end = lane.laneviewrangeend ?? 0;
    const delta = (end - start)/40;
    const c0 = lane.lanemodelc0??0;
    const c1 = lane.lanemodelc1??0;
    const c2 = lane.lanemodelc2??0;
    const c3 = lane.lanemodelc3??0;
    let x = start;
    let y = 0;
    const points = [];

    while(x<end){
      y = c0+c1*x+c2*x*x+c3*x*x*x
      points.push(new Vector3(x,y))
      x+=delta
    }
    //@ts-ignore
    const distance:number = points.length>1 ? points[0]?.distanceTo(points[points.length-1]) : 0;
    return [points,name,distance];
  }
export default React.memo(function HorizonView({ message }: ViewProps) {
  const [visible,setVisible] = useState<boolean>();
  useEffect(()=>{
    setVisible(true);
    const timeout = setTimeout(()=>{
      setVisible(false);
    },500);
    return ()=>{
      clearTimeout(timeout)
    }

  },[message])
  const lines = useMemo(() => {
    const lines = [];
    message.horizon_data?.lane?.lka_left_lane && lines.push(getLinePoints(message.horizon_data?.lane?.lka_left_lane,"L"));
    message.horizon_data?.lane?.lka_right_lane && lines.push(getLinePoints(message.horizon_data?.lane?.lka_right_lane,"R"));
    message.horizon_data?.lane?.next_left_lane && lines.push(getLinePoints(message.horizon_data?.lane?.next_left_lane,"NL"));
    message.horizon_data?.lane?.next_right_lane && lines.push(getLinePoints(message.horizon_data?.lane?.next_right_lane,"NR"));
    return lines
  }, [message])
  return <group rotation={[0,0,Math.PI/2]} position={[0,8.24,0]}>
    {visible && (message !==undefined) &&  lines.map(([line,name,distance])=><>
      {line[0] &&<Text3D text={name+"\n"+distance.toFixed(0)} color={COLOR_PALETTE.YELLOW} position={line[0]} heading={Math.PI/2} fontSize={0.6} />}
      {/* <Text3D text={distance.toFixed(1)} color={COLOR_PALETTE.BLUE} position={line[line.length-1]} heading={Math.PI/2} fontSize={0.8} /> */}
      <DashedLine dashSize={2} gapSize={2} points={line} linewidth={2.5} color={COLOR_PALETTE.YELLOW} opacity={0.7} ></DashedLine>
      </>)}
  </group>
  // return <>{...models}</>

})
