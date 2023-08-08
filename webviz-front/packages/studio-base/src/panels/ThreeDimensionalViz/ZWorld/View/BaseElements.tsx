// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Billboard, Text, useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Group, Object3D, Vector3 } from "three";
import * as THREE from "three"

import { ThreeLine2D, ThreeLine2DBasicShader } from "./LineUtil"

type DashedLineProps = {
    points: Vector3[];
    color: number;
    linewidth: number;
    dashSize: number;
    gapSize: number;
    zOffset?: number;
    opacity?: number;
    showPoint?:boolean
    name?:string
}
export function DashedLine(
    props: DashedLineProps): JSX.Element {
    const { points, color = 0xff0000, linewidth = 1, dashSize = 4, gapSize = 2,showPoint=false,
        zOffset: _zoffset = 0, opacity = 1,name } = props;
    const geometry = useMemo(() => {
        //@ts-ignore
        const geom = new THREE.BufferGeometry().setFromPoints(points.map(point => ({ x: point.x, y: point.y, z: point.z })))
        return geom;
    }, [points])
    return (
        <>
        {showPoint&&<BufferPoints points={points} size={1} color={color} />}
        <line
            //@ts-ignore
            onUpdate={(line: any) => {
                line.computeLineDistances()
            }}
            onClick={(e) => (e.stopPropagation())}
            onPointerOver={(e) => (e.stopPropagation())}
            renderOrder={_zoffset}
            name={name}
            geometry={geometry}>
            <lineDashedMaterial args={[{ color, linewidth, transparent: true, gapSize, dashSize, opacity }]} />
        </line>
        </>

    )
    // const path = new THREE.Path();
    // const geometry = path.createGeometry(points);
    // geometry.computeLineDistances();
    // const material = new THREE.LineDashedMaterial({
    //     color: color,
    //     dashSize: dashSize,
    //     linewidth: linewidth,
    //     gapSize: gapSize,
    //     transparent: true,
    //     opacity: opacity,
    // });
    // const mesh = new THREE.Line(geometry, material);
    // addOffsetZ(mesh, zOffset);
    // mesh.matrixAutoUpdate = matrixAutoUpdate;
    // if (!matrixAutoUpdate) {
    //     mesh.updateMatrix();
    // }
    // return mesh;
}

type ThickLineProps = {
    cache?:boolean
    points: Vector3[];
    thickness?: number
    color: number;
    zOffset?: number;
    opacity?: number;
    transparent?: boolean,
    frustumCulled?: boolean
    id:string
}
const threeLineMap = new Map<string,ThreeLine2D>()
export const ThickLine =  React.memo(function({
    points, thickness = 0.5, color = 0xffffff, opacity = 0.9,cache=true, zOffset=0,id,frustumCulled }: ThickLineProps) {
    const prePoints = useRef<Vector3[]>([]);
    const ref = useRef<THREE.Mesh>()
    const geometry = useMemo(() => {
        const length = points.length;
        const key = `${id}-${length}`
        let line = threeLineMap.get(key);
        if(prePoints.current!==points){
            if(line&&cache){
                //@ts-ignore
                line.update(points.map(p => [p.x, p.y]))
            }else{
                line =  new ThreeLine2D(points.map(p => [p.x, p.y]))
                threeLineMap.set(key,line);
            }
              prePoints.current = points;
        }
        return line;
    }, [points])
    const material = useMemo(() => {
        return new THREE.ShaderMaterial(ThreeLine2DBasicShader({
            side: THREE.DoubleSide,
            diffuse: color,
            thickness,
            opacity,
            transparent: true,
        }));
    }, [color, thickness, opacity])
    useEffect(() => {
        if (ref.current) {
            ref.current.material = material;
        }
    }, [material])
    return (
        <group position={[0,0,zOffset*0.04]}>
        //@ts-ignore
        <mesh ref={ref} geometry={geometry} frustumCulled={frustumCulled?? false}>
        </mesh>
        </group>
    )
})


type BufferPointsProps = {
    points:Vector3[],
    size:number,
    color:number,
    circle?:boolean
}
export function BufferPoints(props:BufferPointsProps) {
    const ref = useRef<THREE.Points>(null);
    const {points,size,color} = props;
    useEffect(()=>{
        if(ref.current){
            ref.current.geometry.setFromPoints(points);
        }
    },[points])
    const texture = useTexture("./images/disc.png")
    return (
      <points ref={ref} frustumCulled={false} renderOrder={11111} >
        <bufferGeometry >
        </bufferGeometry>
        <pointsMaterial
          size={size}

          map={texture}
        //   threshold={0.1}
          transparent={true}
          color={color}
          sizeAttenuation={true}
        />
      </points>
    );
  }


type SegmentsProps = {
    points: Vector3[];
    color: number;
    linewidth: number;
    zOffset?: number;
    opacity?: number;
    transparent?: boolean
    showPoint?:boolean
    name?:string
}

export const Segments = (
    props: SegmentsProps): JSX.Element => {
    const ref = useRef<THREE.Line>(null)
    const { points, color = 0xff0000, linewidth = 1, zOffset: _zOffset = 0,showPoint = false,
        transparent = true, opacity = 1,name="" } = props;
    useEffect(() => {
        //@ts-ignore
        ref.current?.geometry.setFromPoints(points.map(point => ({ x: point.x, y: point.y, z: point.z })));
    }, [points])
    // onClick={(event) => setActive(!active)}
    // onPointerOver={(event) => setHover(true)}
    // onPointerOut={(event) => setHover(false)}
    return (
        <>
        {showPoint&&<BufferPoints points={points} size={1} color={color} /> }
        {/* @ts-ignore */}
        <line name={name} ref={ref} matrixAutoUpdate frustumCulled={false}
              onClick={(e) => (e.stopPropagation())}
              onPointerOver={(e) => (e.stopPropagation())}
        >
            <bufferGeometry />
            <lineBasicMaterial args={[{ color, linewidth, transparent, opacity }]} />
        </line>
        </>
    )
    // const path = new THREE.Path();
    // const geometry = path.createGeometry(points);
    // const material = new THREE.LineBasicMaterial({
    //     color: color,
    //     linewidth: linewidth,
    //     transparent: transparent,
    //     opacity: opacity
    // });
    // const pathLine = new THREE.Line(geometry, material);
    // addOffsetZ(pathLine, zOffset);
    // pathLine.matrixAutoUpdate = matrixAutoUpdate;
    // if (matrixAutoUpdate === false) {
    //     pathLine.updateMatrix();
    // }
    // return pathLine;
}

export const LineSegments = (
    props: SegmentsProps): JSX.Element => {
    const ref = useRef<THREE.Line>();
    const { points, color = 0xff0000, linewidth = 1, zOffset: _zOffset = 0,
        transparent = true, opacity = 1,name } = props;
    useEffect(() => {

        //@ts-ignore
        ref.current?.geometry.setFromPoints(points);
    }, [points])
    // onClick={(event) => setActive(!active)}
    // onPointerOver={(event) => setHover(true)}
    // onPointerOut={(event) => setHover(false)}
    return (
        //@ts-ignore
        <lineSegments ref={ref} matrixAutoUpdate frustumCulled={false} name={name} renderOrder={_zOffset}
        onClick={(e) => (e.stopPropagation())}
        onPointerOver={(e) => (e.stopPropagation())}>
            <bufferGeometry />
            <lineBasicMaterial args={[{ color, linewidth, transparent, opacity }]} />
        </lineSegments>
    )

}

interface TextProps {
    name?:string,
    text: string,
    color: number,
    position: Vector3
    heading?: number
    fontSize?: number
    renderOrder?:number
    anchorX?: number | "center" | "left" | "right" | undefined
    anchorY?: number | "top" | "bottom" | "middle" | "top-baseline" | "bottom-baseline" | undefined
    textAlign?: "center" | "left" | "right" | "justify" | undefined
    lineHeight?: number | undefined

}
export function Text3D(props: TextProps): JSX.Element {
    const ref = useRef<Object3D>();
    useEffect(() => {
        if (ref.current) {
            ref.current.rotation.set(Math.PI / 2, -(props.heading || 0), 0);
        }
    }, [props.heading])
    return <Billboard
        renderOrder={props.renderOrder}
        position={props.position}
        follow={true} // Follow the camera (default=true)
        lockX={true} // Lock the rotation on the x axis (default=false)
        lockY={true} // Lock the rotation on the y axis (default=false)
        lockZ={false} // Lock the rotation on the z axis (default=false)
    ><Text
        ref={ref}
        onClick={(e) => (e.stopPropagation())}
        onPointerOver={(e) => (e.stopPropagation())}
        name={props.name}
        scale={[1, 1, 1]}
        anchorX={props.anchorX || "center"} // default
        anchorY={props.anchorY || "middle"} // default
        color={props.color}
        fontSize={props.fontSize || 1}
        maxWidth={200}
        lineHeight={props.lineHeight || 1}
        direction={'auto'}
        letterSpacing={0.02}
        textAlign={ props.textAlign || 'center'}
    >
            {props.text}
        </Text>
    </Billboard>
}

interface IModel{
    url:string,
    position: Vector3,
    scale:number,
    heading: number // radians
}
function Model(props: IModel) {
    const ref = useRef<Object3D>();

    const {url, position, heading, scale} = props;
    //@ts-ignore
    const { scene, nodes, materials } = useGLTF(url);
    const copiedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
      if (ref.current) {
        ref.current.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        ref.current.scale.set(scale,scale,scale);
        const newMaterial = new THREE.MeshStandardMaterial( {
            color: 0xffffff, metalness: 1.0, roughness: 0.4
        } );
        ref.current.traverse(o=>{

            //@ts-ignore
            o.material = newMaterial
        })
      }
    })
    useEffect(()=>{
        if(ref.current){
            ref.current.position.set(position.x,position.y,position.z);
            console.log(`heading : ${heading}`)
            ref.current.rotation.set(Math.PI / 2,  Math.PI +heading, 0);
        }
    },[position])
    return <primitive ref={ref} object={copiedScene} receiveShadow/>
  }
export const ZModel = React.memo(Model);

interface ArrowProps {
    length: number;
    linewidth: number;
    conelength: number;
    conewidth: number;
    color: number;
}
export function Arrow({length, linewidth, conelength, conewidth, color}:ArrowProps) {
    const points = useMemo(()=>{
        const end = new THREE.Vector3(0, length, 0);
        const begin = new THREE.Vector3(0, 0, 0);
        const left = new THREE.Vector3(conewidth / 2, length - conelength, 0);
        const right = new THREE.Vector3(- conewidth / 2, length - conelength, 0);
        return [begin, end, end, left, end, right]
    },[length, conelength, conewidth])
    return <LineSegments points={points} color={color} linewidth={linewidth} zOffset={1}></LineSegments>
}

//@ts-ignore
export function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Group>()
    useEffect(() => {
        if (mesh.current) {
            mesh.current.rotation.set(Math.PI / 2,Math.PI / 2 -(props.heading || 0), 0);
        }
    }, [props.heading])
    return (
        <mesh
        position={props.position}
        ref={mesh}>
        <boxGeometry args={props.size} />
        <meshStandardMaterial color={props.color} opacity={0.7} transparent={true}/>
        </mesh>
    )
}

//@ts-ignore
export function OutlineBox(props){
    // This reference will give us direct access to the mesh
    const mesh = useRef<Group>()
    useEffect(() => {
        if (mesh.current) {
            mesh.current.rotation.set(Math.PI / 2,Math.PI / 2 -(props.heading || 0), 0);
            mesh.current.position.set(props.position.x,props.position.y,props.position.z);
        }
    }, [props.heading])
    const geometry = useMemo(()=>{
    return  new THREE.BoxGeometry( ...props.size );
    },[props.size])
    return (
            <lineSegments  matrixAutoUpdate frustumCulled={false} ref={mesh}>
                <edgesGeometry args={[geometry]} />
                <lineBasicMaterial args={[{ color:props.color, linewidth:props.linewidth, transparent:true, opacity:0.8 }]} />
            </lineSegments>
    )
}

//@ts-ignore
export function Plane(props) {
    const mesh = useRef<Group>()
    useEffect(() => {
        if (mesh.current) {
            mesh.current.rotation.set(0, 0, -props.heading);
        }
    }, [props.heading])
    let {x, y, z }= props.position;
    x = x + props.offsetX;
    y = y + props.offsetY;
    return (
        <mesh
        position={[x, y, z]}
        ref={mesh}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial transparent map={props.map} />
        </mesh>
    )
}
