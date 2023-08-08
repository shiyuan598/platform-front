// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { zhito } from "@zhito/proto"
import { useEffect, useMemo, useState } from 'react'
import { Object3D, Vector3 } from 'three';

import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { Text3D, Segments, Box, Plane } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/BaseElements";
import { COLOR_PALETTE } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/types";
import { Topic } from '@foxglove/studio-base/players/types';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

type ViewProps = {
  topic: Topic;
  message: zhito.prediction.PredictionObstacles;
  rootTransform?: Object3D
  useLocalFrame:boolean
  useLifetime:boolean
}
// new zhito.perception.PredictionObstacles().perception_obstacle
type ObstacleProps = {
  debugMode:boolean
  offset:{x:number,y:number}
  obstacle: zhito.prediction.IPredictionObstacle
  showObstacle: boolean
}

const PredictionObstacle = (props: ObstacleProps): JSX.Element => {
  const { obstacle, offset, debugMode, showObstacle } = props;
  // 障碍物
  const box = useMemo(() => {
    const { id, length, width, height, theta, position, rel_velocity, local_position, confidence } = obstacle.perception_obstacle  as zhito.perception.IPerceptionObstacle;
    const text = `
      l:${rel_velocity?.x?.toFixed(1)}\n
      l_v:${rel_velocity?.y?.toFixed(1)}\n
      t_edge:${rel_velocity?.z?.toFixed(1)}\n
      ttc:${local_position?.x?.toFixed(1)}\n
      v:${local_position?.y?.toFixed(1)}\n
      l_ttc:${local_position?.z?.toFixed(1)}\n
      r_ttc:${confidence?.toFixed(1)}\n
      `
    return {
      id,
      text,
      theta,
      size: [length, width, height],
      position: new Vector3((position?.x || 0) - offset.x, (position?.y || 0) - offset.y, (height || 2) * 0.5)
    }
  }, [obstacle, offset])

  // 障碍物轨迹线
  const lines = useMemo(() => {
    return obstacle.trajectory?.map(line => {
      return line.trajectory_point?.map(p=>new Vector3((p.path_point?.x || 0) - offset.x, (p.path_point?.y || 0) - offset.y, 0)) ||[]
    }) || []
  }, [obstacle])

  // 障碍物预测轨迹概率
  const probabilityTexts = useMemo(()=>{
    return obstacle.trajectory?.map(line => {
      let text = line.probability?.toFixed(1)
      const p = line.trajectory_point?.slice(-1)[0]
      let vector = new Vector3(0, 0, 0);
      if (p) {
        vector = new Vector3((p.path_point?.x || 0) - offset.x, (p.path_point?.y || 0) - offset.y, 0.6)
      }
      return {
        vector,
        text
      }
    }) || []
  }, [obstacle])

  const [left, right, normal, special_left, special_right, special_diamond] = useLoader(TextureLoader, [
    './models/material/intent_left.png',
    './models/material/intent_right.png',
    './models/material/intent_normal.png',
    './models/material/intent_special_left.png',
    './models/material/intent_special_right.png',
    './models/material/intent_special_diamond.png'
  ])

  const getIntentTexture = (type: string) => {
    switch (type) {
      case "KEEP":
        return normal;
      case "LEFT_LANE_CHANGE":
        return left;
      case "RIGHT_LANE_CHANGE":
        return right;
      default:
        return "";
    }
  }

  const getSpecialIntentTexture = (type: string) => {
      switch (type) {
        case "MERGE":
          return special_left;
        case "SPILT":
          return special_right;
        case "OTHER":
          return special_diamond;
        default:
          return "";
      }
  }

  // 障碍物横向意图
  const intentType = useMemo(()=>{
    return obstacle.intent?.lat_intent_type;

  }, [obstacle])
  // 障碍物特殊意图
  const specialIntentType = useMemo(()=>{
    return obstacle.intent?.special_intent_type;
  }, [obstacle])

  return <>
    {lines.map( (line,i)=> <Segments key={i} points={line} color={COLOR_PALETTE.GREEN} linewidth={2} />)}
    {
      debugMode && showObstacle &&
      <>
        { probabilityTexts.map((item, i)=> <Text3D  key={i} text={item.text + "" } color={COLOR_PALETTE.DEEP_RED} position={item.vector} heading={Math.PI / 4} fontSize={1.2} />)}
        {
          box &&
          <>
            <Box color={COLOR_PALETTE.GREEN} position={box.position} size={box.size} heading={Math.PI / 2 - (box.theta || 0)} />
            <Text3D text={ box.id + "" } color={COLOR_PALETTE.DEEP_RED} position={new Vector3(box.position.x, box.position.y, box.position.z * 2 + 1)} heading={Math.PI / 2 - (box.theta || 0)} fontSize={1.0} />
            <Text3D text={ box.text } color={COLOR_PALETTE.DEEP_BLUE} position={new Vector3(box.position.x, box.position.y, box.position.z * 2 + 1)} heading={Math.PI / 2 - (box.theta || 0)} textAlign="left" anchorX={-0.5} anchorY={-5} lineHeight={0.5} fontSize={1.0} />
            {intentType && getIntentTexture(intentType as unknown as string) && <Plane position={box.position}  heading={Math.PI / 2 - (box.theta || 0)} offsetX={-2} offsetY={0} map={getIntentTexture(intentType as unknown as string)}/>}
            {specialIntentType && getSpecialIntentTexture(specialIntentType as unknown as string) && <Plane position={box.position} heading={Math.PI / 2 - (box.theta || 0)} offsetX={-1.5} offsetY={1} map={getSpecialIntentTexture(specialIntentType as unknown as string)}/>}
          </>
        }
      </>
    }
  </>
}
const PredictionObstacleMemo = React.memo(PredictionObstacle)
export default React.memo(function ObstacleViewView({ message, rootTransform, useLocalFrame, useLifetime }: ViewProps) {
  const [visible,setVisible] = useState<boolean>();
  const {dynamicOrigin, offsetPosition, debugMode, PPSetting} = useWorldStore(state=>({dynamicOrigin:state.dynamicOrigin,offsetPosition:state.offsetPosition, debugMode:state.debugMode, PPSetting: state.PPSetting }));
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
  const obstacles = useMemo(() => {
    return message.prediction_obstacle?.map(obs => {
      return <PredictionObstacleMemo obstacle={obs} debugMode={debugMode} showObstacle={PPSetting.predictionObstacle} offset={useLocalFrame?offsetPosition:dynamicOrigin}></PredictionObstacleMemo>
    }) || []
  }, [message])
  return <TransformObject transform={rootTransform}>
    {visible ? obstacles : <></>}
  </TransformObject>
})
