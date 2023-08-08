import React, { Suspense, useMemo, useState } from 'react'
import { Vector3 } from "three"
import { Canvas, useFrame } from '@react-three/fiber'
// import { Physics, useCylinder, usePlane } from '@react-three/cannon'
import { OrbitControls, Environment } from '@react-three/drei'
// import Vehicle from './Vehicle'
import Sweep from './Sweep';
import Map from "./Map";
import Planning from "./Planning";
import DumpCars from "./DumpCars";
import OfflineMap from "./OfflineMap";
import Obstacles from "./Obstacles";
import RosBridgePlayer from '../store/player'

export function Elements(){
  const [lastTime,setLastTime] = useState(Date.now())
  const [observed,setObserved] = useState({});
  const player = useMemo(()=>{
    return new RosBridgePlayer()
  },[])
  useFrame(()=>{
    const now = Date.now();
    const delta = now-lastTime
    if(delta>90){
      // console.log("render trigger", delta);
      const syncedMsgs = player.getSyncMessages();
      if(syncedMsgs&&syncedMsgs.obstacle){
        // console.log(syncedMsgs.pose.header.timestamp_sec- syncedMsgs.obstacle.header.timestamp_sec)
        // console.log(syncedMsgs)
        setObserved(syncedMsgs)
      }
      setLastTime(now);
    }
  })

  return <>
    <fog attach="fog" args={['#16141f', 20, 100]} />
    <color attach="background" args={['#16141f']} />
    <Suspense fallback={null}>
    <ambientLight color={0xffffff} intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.5} intensity={0.5} castShadow penumbra={1} />
    {/* <Map /> */}
    <OfflineMap localization={observed.pose}/>
    <Obstacles localization={observed.pose} obstacles={observed.obstacle}/>
    <Planning localization={observed.pose} planning={observed.obstacle}/>
    {/* <DumpCars /> */}
    <Sweep rotation={[0, 0, 0]} position={[0, 2, 10]} />
    <Plane rotation={[0, 0, Math.PI / 2]} userData={{ id: 'floor' }} />
    {/* <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
      
      
    </Physics> */}
   
      <Environment preset="city" />
    </Suspense>
    <OrbitControls />
    </>
}

export function View3D() {

  return <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50, up: new Vector3(0, 0, 1) }}>
    <Elements />
  </Canvas>
}



function Plane(props) {
  // const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group position={[0,0,-0.2]}>
      <mesh receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  )
}

