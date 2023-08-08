// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { CycleRaycast, Environment, MapControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Suspense } from 'react'
import { Mesh, Vector3 } from 'three'
import { zhito } from "@zhito/proto"

import {
    CameraState,
    MouseHandler,
} from "@foxglove/regl-worldview";
import { SUPPORTED_MAP_PROTO } from '@foxglove/studio-base/panels/ThreeDimensionalViz/TopicTree/constants';
import { useWorldStore } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store'
import { TransformObjects } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { Topic } from '@foxglove/studio-base/players/types';
import { ZHITO_OBSTACLES_PROTO, ZHITO_SENSOR_FRAME_PROTO, ZHITO_PREDICTION_PROTO, ZHITO_TRAJECTORY_PROTO, ZHITO_HMI_OBSTACLE_PROTO, ZHITO_HORIZON_PROTO } from '@foxglove/studio-base/util/globalConstants'

import MapView from "./View/MapView";
import ObstaclesView from "./View/ObstaclesView";
import PredictionView from "./View/PredictionView";
import SensorFrameView from "./View/SensorFrameView";
import TrajectoryView from "./View/TrajectoryView";
import HmiObstacleView from "./View/HmiObstacleView";
import HistoryPathView from "./View/HistoryPathView";
import { PickedType } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store/WorldBase'
import HorizonView from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/HorizonView'
// import Effects from "./Effects"
// function Box(props: MeshProps) {
//     // This reference gives us direct access to the THREE.Mesh object
//     const ref = useRef<Mesh>()
//     // Hold state for hovered and clicked events
//     const [hovered, hover] = useState(false)
//     const [clicked, click] = useState(false)
//     // Subscribe this component to the render-loop, rotate the mesh every fram
//     // Return the view, these are regular Threejs elements expressed in JSX
//     return (
//         <mesh
//             {...props}
//             ref={ref}
//             scale={clicked ? 1.5 : 1}
//         // onClick={(event) => click(!clicked)}
//         // onPointerOver={(event) => hover(true)}
//         // onPointerOut={(event) => hover(false)}
//         >
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={props.color} />
//         </mesh>
//     )
// }


type Props = { // &
    backgroundColor: number[];
    cameraState: CameraState;
    children?: React.ReactNode;
    onCameraStateChange: (arg0: CameraState) => void;
    onClick: MouseHandler;
    onDoubleClick: MouseHandler;
    onMouseDown?: MouseHandler;
    onMouseMove?: MouseHandler;
    onMouseUp?: MouseHandler;
    enableStackedObjectEvents?: boolean;
    hideDebug?: boolean;
    disableHitmapForEvents?: string[];
    resolutionScale?: number;
    ref?: React.Ref<any>;
    contextAttributes?: any;
    protoTopics: Topic[];
    protoFrame: Record<string, any>;
    transformObjects?: TransformObjects
    // disableHitmapForEvents={["onMouseDown", "onMouseMove", "onMouseUp"]}
}


// const BasePlane = React.memo(function Plane({color}:{color:string}) {
//     const depthBuffer = useDepthBuffer({ size: 256 })
//     return (
//         <>
//             <Stats showPanel={0} className="stats"  />

//             <mesh position={[0, 0, -0.4]} rotation={[0, 0, -Math.PI / 2]} receiveShadow={true}>
//                 <planeGeometry args={[800, 800]} />
//                 <meshPhongMaterial color={color} />
//                 {/* <MeshReflectorMaterial
//             mirror={1}
//             blur={[300, 100]}
//             resolution={2048}
//             mixBlur={1}
//             mixStrength={40}
//             roughness={1}
//             depthScale={1.2}
//             minDepthThreshold={0.4}
//             maxDepthThreshold={1.4}
//             color="#101010"
//             metalness={0.5}
//         /> */}
//             </mesh>
//             <SpotLight
//                 penumbra={0.5}
//                 distance={120}
//                 depthBuffer={depthBuffer}
//                 position={[0, 0, 60]} intensity={1.5} angle={0.5}
//                 color="#EEEEEE"
//                 castShadow
//             />
//         </>)
// })

interface ViewsProps {
    protoTopics: Topic[]
    protoFrame: Record<string, any>,
    transformObjects?: TransformObjects
}

const Mapviews = (props: ViewsProps): JSX.Element => {
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => SUPPORTED_MAP_PROTO.has(topic.proto || ""));
    const views = mapTopics.map(topic => {
        const message = protoFrame[topic.name]?.[0]?.message
        if (message) {
            return <MapView key={topic.name} rootTransform={transformObjects?.["dynamic_origin"]} topic={topic} message={message} />
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}


const ObstaclesViews = (props: ViewsProps): JSX.Element => {
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => topic.proto === ZHITO_OBSTACLES_PROTO);
    const views = mapTopics.map(topic => {
        const message = protoFrame[topic.name]?.[0]?.message
        if (message) {
            return <ObstaclesView rootTransform={transformObjects?.["local"]} topic={topic} message={message} />
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}

const SensorFrameViews = (props: ViewsProps): JSX.Element => {
    const { localFrame } = useWorldStore(state => ({ localFrame: state.SensorFrameSetting.localFrame }))
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => topic.proto === ZHITO_SENSOR_FRAME_PROTO);
    const views = mapTopics.map(topic => {
        const messages = protoFrame[topic.name]?.map(({message}:{message:zhito.perception.SensorFrame})=>{
            return message;
        })
        if (messages&&messages.length>0) {

            return <SensorFrameView rootTransform={transformObjects?.[localFrame ? "local" : "world"]} topic={topic} messages={messages}/>
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}


const HmiObstacleViews = (props: ViewsProps): JSX.Element => {
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => topic.proto === ZHITO_HMI_OBSTACLE_PROTO);
    const views = mapTopics.map(topic => {
        const message = protoFrame[topic.name]?.[0]?.message
        if (message) {
            return <HmiObstacleView rootTransform={transformObjects?.["novatel"]} topic={topic} message={message} />
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}

const PlanningViews = (props: ViewsProps): JSX.Element => {
    const { localFrame,lifetime } = useWorldStore(state => (state.PPSetting ))
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => topic.proto === ZHITO_TRAJECTORY_PROTO);
    const views = mapTopics.map(topic => {
        const message = protoFrame[topic.name]?.[0]?.message
        if (message) {
            return <TrajectoryView
                rootTransform={transformObjects?.[localFrame?"local":"dynamic_origin"]}
                topic={topic}
                message={message}
                useLocalFrame={localFrame}
                useLifetime={lifetime}
            />
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}

const HorizonViews = (props: ViewsProps): JSX.Element => {
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => topic.proto === ZHITO_HORIZON_PROTO);
    const views = mapTopics.map(topic => {
        const message = protoFrame[topic.name]?.[0]?.message
        if (message) {
            return <HorizonView
                rootTransform={transformObjects?.["novatel"]}
                topic={topic}
                message={message}
            />
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}

const PredictionViews = (props: ViewsProps): JSX.Element => {
    const { localFrame, lifetime } = useWorldStore(state => ({ localFrame: state.PPSetting.localFrame, lifetime:state.PPSetting.lifetime }))
    const { protoTopics, protoFrame, transformObjects } = props;
    const mapTopics = protoTopics.filter(topic => topic.proto === ZHITO_PREDICTION_PROTO);
    const views = mapTopics.map(topic => {
        const message = protoFrame[topic.name]?.[0]?.message
        if (message) {
            return <PredictionView
                    rootTransform={transformObjects?.[localFrame?"local":"dynamic_origin"]}
                    useLocalFrame={localFrame}
                    useLifetime={lifetime}
                    topic={topic}
                    message={message}
                />
        } else {
            return <></>
        }
    })
    return <>{...views}</>
}

const ZWorldView = (props: Props): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const skyRef = useRef<Mesh>(null);
    const [hits,setHits] = useState<THREE.Intersection[]>([]);
    const setPickedObject = useWorldStore(state=>state.setPickedObject);
    const { protoTopics, protoFrame, transformObjects } = props;



    const onCanvasClick = useCallback(() => {
        const hitObject = hits[0];
        if(hitObject&&hitObject.object.name!==""){
            const name = hitObject.object.name;
            const [type="NONE",_sub_type,id]  = name.split("_");
            setPickedObject({
                //@ts-ignore
                type: PickedType[type] ?? PickedType.NONE,
                object:undefined,
                id:id??""
            })
        }else{
            setPickedObject({
                type: PickedType.NONE,
                object:undefined,
                id:""
            })
        }
    }, [hits]);
    useEffect(() => {
        if (skyRef.current) {
            //@ts-ignore
            skyRef.current?.material.uniforms.up.value.set(0, 0, 1);
        }
        if(canvasRef.current){
            canvasRef.current.addEventListener("click",onCanvasClick,)
        }
        return ()=>{
            if(canvasRef.current){
                canvasRef.current.removeEventListener("click",onCanvasClick)
            }
        }
    },[onCanvasClick])
    return (
        <Canvas ref={canvasRef}  gl={{ antialias: true }} camera={{ near: 0.1, position: [0, -20, 20], far: 1e5, up: new Vector3(0, 0, 1) }}>
            <color attach="background" args={["#16141f"]} />
            <fog attach="fog" args={['#16141f', 220, 400]} />
            {/* <BasePlane color={'#16141f'}/> */}
            {/* <Environment files="images/venice_sunset_1k.hdr" /> */}
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 150]} color="white" />
            {/*  */}
            <Suspense fallback={null}>
                {/* <Environment preset="city" /> */}
                <Environment path="images/cube" />

                {/* <Sky
                    ref={skyRef}
                    distance={450000}

                    inclination={10}
                    azimuth={0.25}
                /> */}
                {/* <Sky
                    ref={skyRef}
                    distance={300000}
                    // sunPosition={new Vector3(-5e7, 5e7, 8e7)}
                    turbidity={8}
                    rayleigh={6}
                    mieCoefficient={0.005}
                    mieDirectionalG={0.8}
                    inclination={0.49}
                    azimuth={0.25}
                /> */}

                {props.children}
                {transformObjects && <Mapviews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}
                {transformObjects && <PlanningViews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}
                {transformObjects && <ObstaclesViews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}
                {transformObjects && <SensorFrameViews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}
                {transformObjects && <PredictionViews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}
                {transformObjects && <HmiObstacleViews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}
                {transformObjects && <HistoryPathView rootTransform={transformObjects?.["local"]} />}
                {transformObjects && <HorizonViews protoFrame={protoFrame} transformObjects={transformObjects} protoTopics={protoTopics} />}

                <MapControls screenSpacePanning={false}>
                    <pointLight position={[10, 10, 10]} />

                </MapControls>
                {/* <axesHelper args={[10]} /> */}
                {/* <Box color={'red'} position={[10, 0, 0]} onPointerOver={e => console.log(e.point)} />
            <Box color={'blue'} position={[0, 10, 0]} onPointerOver={e => console.log(e.point)} />
            <Box color={'orange'} position={[0, 0, 10]} onPointerOver={e => console.log(e.point)} /> */}
                {/* <fog attach="fog" args={["#041830", 50, 500]} /> */}
                {/* <Plane /> */}

                {/* <Sphere />
             */}
            </Suspense>
            <CycleRaycast
                    preventDefault={false} // Call event.preventDefault() (default: true)
                    scroll={true} // Wheel events (default: true)
                    keyCode={9} // Keyboard events (default: 9 [Tab])
                    onChanged={(hits: THREE.Intersection[], _cycle: number) => {setHits(hits);return null;}} // Optional onChanged event
                    />
            {/* <Effects /> */}
        </Canvas>
    )
}


export default React.memo(ZWorldView);
// export default ZWorldView;
