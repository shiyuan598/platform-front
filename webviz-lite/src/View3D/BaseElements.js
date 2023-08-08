// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Billboard, Text, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Group, Object3D, Vector3 } from "three";
import * as THREE from "three"

import { ThickLine } from "../utils/ThickLine"

export function DashedLine(
    { points, color = 0xff0000, linewidth = 1, dashSize = 4, gapSize = 2,
        zOffset: _zoffset = 0, opacity = 1 }) {
    const geometry = useMemo(() => {
        //@ts-ignore
        const geom = new THREE.BufferGeometry().setFromPoints(points.map(point => ({ x: point.x, y: point.y, z: point.z })))
        return geom;
    }, [points])
    // console.log.log("dash line")
    return <ThickLine points={points} color={0xaaaaaa} thickness={0.15} dashSize={2} gapSize={2}/>
    return (
        <line
            //@ts-ignore
            onUpdate={(line) => {
                line.computeLineDistances()
            }}
            geometry={geometry}>
            <lineDashedMaterial args={[{ color, linewidth, transparent: true, gapSize, dashSize, opacity }]} />
        </line>
    )
}


export const Segments = (
    { points, color = 0xff0000, linewidth = 1, zOffset: _zOffset = 0,
        transparent = true, opacity = 1 })=> {
    const ref = useRef()
    useEffect(() => {

        //@ts-ignore
        ref.current?.geometry.setFromPoints(points.map(point => ({ x: point.x, y: point.y, z: point.z })));
    }, [points])
    // onClick={(event) => setActive(!active)}
    // onPointerOver={(event) => setHover(true)}
    // onPointerOut={(event) => setHover(false)}
    return  <ThickLine points={points} color={0xaaaaaa} thickness={0.15} dashSize={0}/>
    return (
        <line ref={ref} matrixAutoUpdate frustumCulled={false}>
            <bufferGeometry />
            <lineBasicMaterial args={[{ color, linewidth, transparent, opacity }]} />
        </line>
    )
}


export const LineSegments = (
    { points, color = 0xff0000, linewidth = 1, zOffset: _zOffset = 0,
        transparent = true, opacity = 1 }) => {
    const ref = useRef()
    useEffect(() => {

        //@ts-ignore
        ref.current?.geometry.setFromPoints(points);
    }, [points])
    return (
        //@ts-ignore
        <lineSegments ref={ref} matrixAutoUpdate frustumCulled={false}>
            <bufferGeometry />
            <lineBasicMaterial args={[{ color, linewidth, transparent, opacity }]} />
        </lineSegments>
    )

}







