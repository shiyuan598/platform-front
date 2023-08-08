// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// import { Billboard, Text, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
// import { Group, Object3D, Vector3 } from "three";
import * as THREE from "three"

import { ThreeLine2D, ThreeLine2DBasicShader, ThreeLine2DFadedSHader } from "./LineUtil"



// type ThickLineProps = {
//     points: Vector3[];
//     thickness?: number
//     color: number;
//     zOffset?: number;
//     opacity?: number;
//     transparent?: boolean
// }
const threeLineMap = new Map()
export function ThickLine({
    points, thickness = 0.5, color = 0xffffff, opacity = 1, dashSize=1,gapSize=1, faded=false }) {
    const ref = useRef()
    const geometry = useMemo(() => {
        const length = points.length;
        let line ;//= threeLineMap.get(length);
        if(line){
            //@ts-ignore
            line.update(points.map(p => [p.x, p.y]))
        }else{
            line =  new ThreeLine2D(points.map(p => [p.x, p.y]),{distances:true,faded})
            threeLineMap.set(length,line);
        }
        return line;
    }, [points, faded])
    const material = useMemo(() => {
        if(faded){
            return new THREE.ShaderMaterial(ThreeLine2DFadedSHader({
                side: THREE.DoubleSide,
                diffuse: color,
                thickness,
                opacity,
                transparent: true,
                dashSize,
                gapSize
            }));
        }else{
            return new THREE.ShaderMaterial(ThreeLine2DBasicShader({
                side: THREE.DoubleSide,
                diffuse: color,
                thickness,
                opacity,
                transparent: true,
                dashSize,
                gapSize
            }));
        }
        
    }, [color, thickness, opacity,dashSize,gapSize,faded])
    useEffect(() => {
        if (ref.current) {
            ref.current.material = material;
        }
    }, [material])
    return (
        //@ts-ignore
        <mesh ref={ref} geometry={geometry}>
        </mesh>
    )
}


