import { useEffect,useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {  MeshPhysicalMaterial } from 'three'
import { zhito } from '@zhito/proto';

const bodyMaterial = new MeshPhysicalMaterial( {
  color: 0x888888, metalness: 0.5, roughness: 1.5, clearcoat: 1.0, clearcoatRoughness: 0.43, sheen: 0.5
} );
const Car = ({url,position,scale,rotation}) => {
    const ref = useRef(null);

  const gltf = useGLTF(url)
  const scene  = gltf.scene.clone(true)
  useEffect(()=>{
    if(ref.current){
        ref.current.traverse(o=>{
            o.material = bodyMaterial//materials["Reverse lights"]
        })
    }
  },[])
  return  <primitive ref={ref} object={scene} position={position} rotation={rotation} scale={[scale,scale,scale]}/> 
}

const ModelMapping = {
  "ST_UNKNOWN": ["/models/pedestrian.gltf",0.01], //todo
  "ST_UNKNOWN_MOVABLE": ["/models/pedestrian.gltf",0.01],//todo
  "ST_UNKNOWN_UNMOVABLE": ["/models/pedestrian.gltf",0.01],//todo
  "ST_CAR": ["./models/vehicle.glb",0.03],
  "ST_VAN": ["./models/mpv.gltf",0.01],
  "ST_TRUCK": ["./models/truck.gltf",0.03],
  "ST_BUS": ["./models/bus.gltf",0.01],
  "ST_CYCLIST": ["./models/bike.gltf",0.01],
  "ST_MOTORCYCLIST": ["./models/motorcycle.gltf",0.01],
  "ST_TRICYCLIST": ["./models/sanlun.gltf",0.01],
  "ST_PEDESTRIAN": ["./models/pedestrian.gltf",0.01],
  "ST_TRAFFICCONE": ["./models/vehicle.gltf",0.01]
}

const SizeMapping = {
  "./models/pedestrian.gltf": 0.01
}

const Obstacles = ({localization,obstacles:obstaclesMsg})=>{
    const ref = useRef(null)
    /** @type  {zhito.perception.PerceptionObstacles|undefined}*/
    const perception_obstacle = obstaclesMsg?.toJSON();
    const obstacles = perception_obstacle?.perception_obstacle ?? []
    const offset = localization?.pose.position ?? {x:0,y:0}
    useEffect(()=>{
      if(ref.current&&localization){
        ref.current.rotation.set(0,0,Math.PI-localization.pose.heading)
      }
    },[localization])
    // console.log(obstacles.map(o=>o.sub_type).join(","))
    return <group ref={ref}>
        {obstacles.map(
        /**
         * 
         * @param {zhito.perception.PerceptionObstacle} obstacle 
         * @returns 
         */
        (obstacle)=>{
          const [url,size=0.01] = ModelMapping[obstacle.sub_type];
          // console.log(SizeMapping,url)
          return  <Car 
            url={url} 
            position={[-obstacle.position.x, -obstacle.position.y, 0]} 
            scale={size} //-localization.pose.heading
            rotation={[Math.PI/2,obstacle.theta,0]}/>
        })}
        {/* <Car url={'./models/truck.gltf'} position={[12, 3, 0]} scale={0.024} rotation={[Math.PI/2,Math.PI,0]}/> */}
       
        </group>
}
export default Obstacles
