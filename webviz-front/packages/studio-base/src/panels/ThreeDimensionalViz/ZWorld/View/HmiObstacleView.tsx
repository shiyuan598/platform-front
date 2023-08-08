// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


// import { useGLTF } from "@react-three/drei";
import { zhito } from "@zhito/proto"
import { useMemo } from 'react'
import { Object3D, Vector3 } from 'three';

import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { Box, Text3D } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/BaseElements";
// import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { COLOR_PALETTE } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/types";
import { Topic } from '@foxglove/studio-base/players/types';

type ViewProps = {
  topic: Topic;
  message: zhito.planning.HmiObstacleInfos;
  rootTransform?: Object3D
}
// new zhito.perception.PerceptionObstacles().perception_obstacle
type ObstacleProps = {
  debugMode:boolean
  obstacle: zhito.planning.IHmiObstacleInfo
}




const HmiObstacle = (props: ObstacleProps): JSX.Element => {
  const { obstacle } = props;
  // const { offsetPosition: offset } = useWorldStore(state => ({ offsetPosition: state.offsetPosition }))
  const defaultHeight=2;
  const localPosition = useMemo(() => {
    // return new Vector3((obstacle.position?.x || 0) - offset.x, (obstacle.position?.y || 0) - offset.y, (obstacle.height || 2) * 2);
    return new Vector3(-(obstacle.lat_distance || 0), (obstacle.long_distance || 0)+2.1, defaultHeight * 1.4);
  }, [obstacle])


  const text = useMemo(() => {
    return (obstacle.acc_target_detec ? "AccTargetDetec\n":"") +
                  (obstacle.threat ? "Threat" : "");
  }, [obstacle, localPosition])

  const color = COLOR_PALETTE.GREEN
    if(obstacle.id===0){
      return <></>
    }
    return <>
      <Box position={new Vector3(localPosition.x,localPosition.y, defaultHeight/2)} size={[4.2,1.8,1.8]} color={color} heading={0} />
      <Text3D text={text} color={COLOR_PALETTE.YELLOW} position={localPosition} heading={0} fontSize={1.2} />
    </>




}
const HmiObstacleMemo = React.memo(HmiObstacle)
export default React.memo(function HmiObstacleView({ message, rootTransform }: ViewProps) {
  const {debugMode} = useWorldStore(state=>(state));
  const obstacles = useMemo(() => {
    return message.hmi_obs_infos?.map(obs => {
      return <HmiObstacleMemo obstacle={obs} debugMode={debugMode} ></HmiObstacleMemo>
    }) || []

  }, [message])
  return <TransformObject transform={rootTransform}>
    {...obstacles}
  </TransformObject>
  // return <>{...models}</>

})
