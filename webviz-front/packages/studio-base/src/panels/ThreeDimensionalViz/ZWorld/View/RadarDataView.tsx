// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { zhito } from "@zhito/proto"
import { useEffect, useMemo, useState } from 'react'
import { Object3D, Vector3 } from 'three';

import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { Box, LineSegments, Text3D } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/BaseElements";
import { COLOR_PALETTE } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/types";
import { Topic } from '@foxglove/studio-base/players/types';

type ViewProps = {
  topic: Topic;
  messages: zhito.drivers.RadarData;
  rootTransform?: Object3D
}
// new zhito.perception.SensorFrames().perception_obstacle
type ObstacleProps = {
  object: zhito.perception.IObject,
  boundingBox: boolean,
  sensorId: string,
  color:number
  sensor2world_pose?:zhito.perception.ITransform,
  displayText: Record<string,boolean>

}

const COLORS = [0xB80000,0xFCCB00,0x004DCF,0x5300EB]

const isNumber = (val:number|undefined)=>{
  return val!==undefined && !isNaN(val)
}



const PerceptioObject = (props: ObstacleProps): JSX.Element => {

  const { object,sensorId, color, boundingBox,sensor2world_pose, displayText } = props;
  // const worldStore = useWorldStore(state => ({ offsetPosition: state.offsetPosition,localFrame:state.SensorFrameSetting.localFrame }))
  // const offset = worldStore.localFrame ? worldStore.offsetPosition:{x:0,y:0};
  const offset = useMemo(()=>{
    const offset = sensor2world_pose?.translation ? sensor2world_pose.translation : {x:0,y:0}
    return offset as {x:number,y:number}
  },[sensor2world_pose])
  const localPoints = useMemo(() => {
    return object.polygon.point?.map(p => {
      return new Vector3((p.x || 0) - offset.x, (p.y || 0) - offset.y, 0)
      // return new Vector3((p.x || 0), (p.y || 0), 0)
    }) || []
  }, [object,offset])
  const localPosition = useMemo(() => {

    return new Vector3((object.center?.[0] || 0) - offset.x, (object.center?.[1] ||  0) - offset.y, (object.size?.[2]|| 2) * 2);
    // return new Vector3((object.center?.[0] || 0), (object.center?.[1] ||  0), (object.size?.[2]|| 2) * 2);
  }, [object,offset])
  const text = useMemo(() => {
    const {obj_id, obj_track_id, obj_sensor_id, obj_local_center, obj_rel_velocity, obj_type, obj_confidence} = displayText;

    let text = "";
    text += obj_id ? `id:${object.id} ` : "";
    text += obj_track_id ? `track_id:${object.track_id} ` : "";
    text += obj_sensor_id ? `${sensorId} ` : "";
    text += "\n";
    const x = object.local_center?.[0];
    const y = object.local_center?.[1];
    if(obj_local_center&&isNumber(x) && isNumber(y)){
      //@ts-ignore
      text += `pos: ${x.toFixed(1)},${y.toFixed(1)} `;
    }
    const [velX,vely] = object.rel_velocity ?? []
    if(obj_rel_velocity&&isNumber(velX) && isNumber(vely)){
      //@ts-ignore
      text += `vel: ${velX.toFixed(1)},${vely.toFixed(1)} `;
    }
    text += "\n";
    text += obj_type ? `type:${object.type} ` : "";
    text += obj_confidence ? `confi:${object.confidence.toFixed(2)} ` : "";
    return text;
  }, [object, localPosition])

  const wireFrame = useMemo(() => {
    const points: Vector3[] = [];
    if (localPoints.length > 1) {
      const last = localPoints.length - 1;
      localPoints.forEach((p, i) => {
        const nexti = i === last ? 0 : i + 1;
        const nextp = localPoints[nexti] as zhito.common.IPoint3D;
        /**
         * p2——p3
         * |    |
         * p0——p1
         */
        const p0 = new Vector3(p?.x || 0, p?.y || 0);
        const p1 = new Vector3(nextp?.x || 0, nextp.y || 0);
        const p2 = new Vector3(p?.x || 0, p?.y || 0, object.size?.[2] || 2);
        const p3 = new Vector3(nextp?.x || 0, nextp.y || 0, object.size?.[2] || 2);
        points.push(p0, p1, p0, p2, p1, p3, p2, p3);
      })
    }
    return points;
  }, [localPoints, boundingBox])

  const heading=Math.PI / 2 - (object.theta || 0)

  return <>
    {boundingBox && <Box position={new Vector3(localPosition.x,localPosition.y, (object.size?.[2]??0)/2)} size={object.size} color={color} heading={heading} />}
    <LineSegments points={wireFrame} color={color} linewidth={2} />
    <Text3D text={text} color={color} position={localPosition} heading={heading} fontSize={1.2} />
  </>
}

const PerceptioObjectMemo = React.memo(PerceptioObject)
export default React.memo(function RadarDataView({ messages, rootTransform }: ViewProps) {
  const [frameByNS,setFrameByNS] = useState<Record<string,zhito.perception.SensorFrame>>({})
  const {offline, ensureSensorId,boundingBox,SensorFrameSetting} = useWorldStore((state)=>({
    offline:state.offline,
    ensureSensorId:state.ensureSensorId,
    boundingBox:state.SensorFrameSetting.boundingBox,
    SensorFrameSetting:state.SensorFrameSetting
  }));
  useEffect(() => {
    const newFrames: Record<string,zhito.perception.SensorFrame>= {};
    messages.map(message=>{
      newFrames[message.sensor_id] = message;

      ensureSensorId(message.sensor_id,COLORS);
    })
    setFrameByNS(prevState => ({
      ...prevState,
      ...newFrames
    }));
  }, [messages,setFrameByNS])
  const keys = useMemo(()=>{
    const keys = Object.keys(frameByNS)
    return keys;
  },[frameByNS])
  // console.log(frameByNS,"frameByNS")
  return <TransformObject transform={rootTransform}>
    {/* {objects.map(object=><PerceptioObjectMemo object={object}/>)}
     */}
    {keys.map(key=>{
        const frame = frameByNS[key];
        if(SensorFrameSetting.visibleMap[key]){

          return frame?.frame?.objects?.map(obj=>
          <PerceptioObjectMemo
            key={key+obj.id}
            object={obj}
            sensor2world_pose={offline?frame.frame.sensor2world_pose:undefined}
            boundingBox={boundingBox}
            sensorId={frame.sensor_id}
            displayText={SensorFrameSetting.displayText}
            color={SensorFrameSetting.colorMap[frame.sensor_id] || COLOR_PALETTE.BLUE}/>)

        }else{
          return []
        }
        // results = results.concat(frame?.frame?.objects||[])
    })}
  </TransformObject>
  // return <>{...models}</>

})
