// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


// import { useGLTF } from "@react-three/drei";
import { zhito } from "@zhito/proto"
import { useMemo } from 'react'
import { Matrix4, Object3D, Quaternion, Vector3 } from 'three';

import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { DashedLine, LineSegments, Text3D, ZModel } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/BaseElements";
// import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { COLOR_PALETTE } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/types";
import { Topic } from '@foxglove/studio-base/players/types';

type ViewProps = {
  topic: Topic;
  message: zhito.perception.PerceptionObstacles;
  rootTransform?: Object3D
}
// new zhito.perception.PerceptionObstacles().perception_obstacle
type ObstacleProps = {
  debugMode:boolean
  dashLine: boolean
  displayText: Record<string,boolean>
  obstacle: zhito.perception.IPerceptionObstacle
  sensor2world_pose?:zhito.perception.ITransform
  invertRotationMatrix: Matrix4
}

const ModelMapping: Record<string, string> = {
  "ST_UNKNOWN": "",
  "ST_UNKNOWN_MOVABLE": "",
  "ST_UNKNOWN_UNMOVABLE": "",
  "ST_CAR": "./models/vehicle.glb",
  "ST_VAN": "./models/mpv.gltf",
  "ST_TRUCK": "./models/truck.gltf",
  "ST_BUS": "./models/bus.gltf",
  "ST_CYCLIST": "./models/bike.gltf",
  "ST_MOTORCYCLIST": "./models/motorcycle.gltf",
  "ST_TRICYCLIST": "./models/sanlun.gltf",
  "ST_PEDESTRIAN": "./models/pedestrian.gltf",
  "ST_TRAFFICCONE": "./models/vehicle.gltf"

}


const PerceptionObstacle = (props: ObstacleProps): JSX.Element => {
  const { obstacle, debugMode, dashLine, displayText,sensor2world_pose,invertRotationMatrix } = props;
  const offset = useMemo(()=>{
    const offset = sensor2world_pose?.translation ? sensor2world_pose.translation : {x:0,y:0}
    return offset as {x:number,y:number}
  },[sensor2world_pose])
  const localPoints = useMemo(() => {
    return obstacle.polygon_point?.map(p => {
      return new Vector3((p.x || 0) - offset.x, (p.y || 0) - offset.y, 0)
      // return new Vector3((p.x || 0), (p.y || 0), 0)
    }) || []
  }, [obstacle, offset])


  const localPosition = useMemo(() => {
    return new Vector3((obstacle.position?.x || 0) - offset.x, (obstacle.position?.y || 0) - offset.y, (obstacle.height || 2) * 1.5);
    // return new Vector3((obstacle.position?.x || 0), (obstacle.position?.y || 0), (obstacle.height || 2) * 2);
  }, [obstacle, offset])

  const subType = (obstacle.sub_type as unknown as string)
  const isUnknown = subType.startsWith("ST_UNKNOWN")

  const model = useMemo(() => {
    const url = ModelMapping[subType] as string;
    return <ZModel url={url} position={new Vector3((obstacle.position?.x || 0), (obstacle.position?.y || 0), 0)} heading={obstacle.theta || 0} scale={0.04} />
  }, [obstacle])



  const text = useMemo(() => {
    //@ts-ignore
    if(obstacle.sub_type==="ST_TRAFFICCONE"){
      return "";
    }
    const displayType = displayText["subType"]? obstacle.sub_type : obstacle.type;
    let velocityText="";
    const velocity = new Vector3(obstacle.velocity?.x || 0, obstacle.velocity?.y || 0)
    if(displayText["velocityXY"]){
      // velocityText += `(${(velocity.x).toFixed(1)},${velocity.y.toFixed(1)})m/s`
      const newVelocity = velocity.applyMatrix4(invertRotationMatrix);
      velocityText += `(${newVelocity.x.toFixed(2)},${newVelocity.y.toFixed(2)})m/s`
    }else{
      velocityText = `${velocity.length().toFixed(1)}m/s`
    }
    return `${obstacle.id} ${displayType}\n${velocityText}  ${localPosition.length().toFixed(1)}m`
  }, [obstacle, localPosition,displayText,invertRotationMatrix])
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
        const p2 = new Vector3(p?.x || 0, p?.y || 0, obstacle.height || 2);
        const p3 = new Vector3(nextp?.x || 0, nextp.y || 0, obstacle.height || 2);
        points.push(p0, p1, p0, p2, p1, p3, p2, p3);
      })
    }
    return points;
  }, [localPoints])



  const color = COLOR_PALETTE.GREEN
  if (!debugMode && !isUnknown) {
    return model
  } else {
    return <>
      {!dashLine && <LineSegments points={wireFrame} color={color} linewidth={2} /> }
      {dashLine && <DashedLine points={wireFrame} color={color} linewidth={1.5} dashSize={0.3} gapSize={0.3}/> }
      <Text3D text={text} color={COLOR_PALETTE.YELLOW} position={localPosition} heading={Math.PI / 2 - (obstacle.theta || 0)} fontSize={0.8} />
    </>
  }



}
const PerceptionObstacleMemo = React.memo(PerceptionObstacle)
export default React.memo(function ObstacleViewView({ message, rootTransform }: ViewProps) {
  const {offline,debugMode,ObstacleSetting} = useWorldStore(state=>(state));


  const obstacles = useMemo(() => {
    const sensor2world_pose = offline&&message.sensor2world_pose ? message.sensor2world_pose:undefined;
    const rotation = message.sensor2world_pose?.rotation;
    const quaternion = new Quaternion(rotation?.qx??0,rotation?.qy??0,rotation?.qz??0,rotation?.qw??0);
    const invertRotationMatrix = new Matrix4().makeRotationFromQuaternion(quaternion).invert();
    return message.perception_obstacle?.map(obs => {
      return <PerceptionObstacleMemo
        obstacle={obs}
        debugMode={debugMode}
        dashLine={ObstacleSetting.dashLine}
        displayText={ObstacleSetting as unknown as Record<string,boolean>}
        sensor2world_pose={sensor2world_pose}
        invertRotationMatrix={invertRotationMatrix}
        ></PerceptionObstacleMemo>

    }) || []

  }, [message,offline])
  return <TransformObject transform={rootTransform}>
    {...obstacles}
  </TransformObject>
  // return <>{...models}</>

})
