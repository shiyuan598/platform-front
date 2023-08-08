// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// import { useLayoutEffect, useRef } from 'react'
// import * as THREE from 'three'
// import { Float32BufferAttribute } from 'three';

// import { Pose } from '@foxglove/regl-worldview';
import { useEffect, useMemo, useRef } from 'react';
import { BufferAttribute, BufferGeometry, InterleavedBuffer, InterleavedBufferAttribute, Mesh, ShaderMaterial } from "three";
import { Vector3 } from "three";

import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject, { TransformObjects } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { BaseMarker } from "@foxglove/studio-base/types/Messages";

import { decodeMarker } from "../../commands/PointClouds/decodeMarker";

type PointCloudsProps = {
  transformObjects: TransformObjects;
  pointclouds: BaseMarker[];
};

// function Points({ pointCount }) {
//   const attrib = useRef();
//   const hover = useCallback(e => {
//     e.stopPropagation();
//     attrib.current.array[e.index * 4 + 3] = 1;
//     attrib.current.needsUpdate = true;
//   }, []);

//   const unhover = useCallback(e => {
//     attrib.current.array[e.index * 4 + 3] = 0.1;
//     attrib.current.needsUpdate = true;
//   }, []);

//   const uniforms = useMemo(
//     () => ({
//       size: { value: 15 },
//       texture: { value: new THREE.TextureLoader().load('/textures/disc.png') },
//     }),
//     []
//   );
//   const [positions, colors] = useMemo(() => {
//     const pos = [];
//     const cols = [];
//     for (let i = 0; i < pointCount; i++) {
//       pos.push(5 - Math.random() * 10);
//       pos.push(5 - Math.random() * 10);
//       pos.push(5 - Math.random() * 10);

//       cols.push(1); // r
//       cols.push(0.5); // g
//       cols.push(0.5); // b
//       cols.push(0.1); // alpha
//     }
//     return [new Float32Array(pos), new Float32Array(cols)];
//   }, [pointCount]);


// }

const ColorMode = {
  FLAT: 0,
  RAINBOW: 1
}

const vs = `
uniform float size;
uniform int colorMode;
uniform vec4 flatColor;
uniform float minColorValue;
uniform float maxColorValue;
attribute vec3 rgb;

varying vec4 vColor;


float getFieldValue() {
  return rgb[0];
}

float getFieldValue_UNORM() {
  float value = getFieldValue();
  float colorFieldRange = maxColorValue - minColorValue;
  if (abs(colorFieldRange) < 0.00001) {
    return 0.0;
  }
  return max(0.0, min((value - minColorValue) / colorFieldRange, 1.0));
}

vec3 rainbowColor() {

  float pct = getFieldValue_UNORM();
  float h = (1.0 - pct) * 5.0 + 1.0;
  float i = floor(h);
  float f = fract(h);
  // if i is even
  if (mod(i, 2.0) < 1.0) {
    f = 1.0 - f;
  }
  float n = 1.0 - f;
  vec3 ret = vec3(0);
  if (i <= 1.0) {
    ret = vec3(n, 0.0, 1.0);
  } else if (i == 2.0) {
    ret = vec3(0.0, n, 1.0);
  } else if (i == 3.0) {
    ret = vec3(0.0, 1.0, n);
  } else if (i == 4.0) {
    ret = vec3(n, 1.0, 0.0);
  } else {
    ret = vec3(1.0, n, 0.0);
  }
  return 255.0 * ret;
}

vec3 turboColor() {
  const vec4 kRedVec4 = vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234);
  const vec4 kGreenVec4 = vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333);
  const vec4 kBlueVec4 = vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771);
  const vec2 kRedVec2 = vec2(-152.94239396, 59.28637943);
  const vec2 kGreenVec2 = vec2(4.27729857, 2.82956604);
  const vec2 kBlueVec2 = vec2(-89.90310912, 27.34824973);

  // Clamp the input between [0.0, 1.0], then scale to the range [0.01, 1.0]
  float x = clamp(getFieldValue_UNORM(), 0.0, 1.0) * 0.99 + 0.01;
  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;
  return vec3(
    255.0 * (dot(v4, kRedVec4)   + dot(v2, kRedVec2)),
    255.0 * (dot(v4, kGreenVec4) + dot(v2, kGreenVec2)),
    255.0 * (dot(v4, kBlueVec4)  + dot(v2, kBlueVec2))
  );
}

void main() {
  if(colorMode==${ColorMode.FLAT}){
    vColor = flatColor;
  }else{
    vColor = vec4(turboColor()/255.0,1.0);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size;

}
`
const fs = `
uniform float minColorValue;
uniform float maxColorValue;
varying vec4 vColor;

void main() {
  gl_FragColor = vColor;
	// gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
}
`
const PointCloudMemo = React.memo(function PointCloud({pointcloud}:{pointcloud:BaseMarker}):JSX.Element{
  const ref =  useRef<BufferGeometry>(null)
  const meshRef = useRef<Mesh>(null)
  const [positionBuffer, colorBuffer, uniforms] = useMemo(()=>{
    //@ts-ignore
    const decoded = decodeMarker(pointcloud)
    const positionBuffer = decoded.positionBuffer.buffer;
    const colorBuffer = decoded.colorBuffer?.buffer ||new Float32Array
    const pointSize = decoded.settings.pointSize || 1;
    const colorMode = decoded.settings.colorMode;
    const flatColor = colorMode.flatColor?[colorMode.flatColor.r,colorMode.flatColor.g,colorMode.flatColor.b,colorMode.flatColor.a]:[255,255,255,1]
    const uniforms = {
      "size": {value:pointSize},
      "colorMode":{value: colorMode.mode==="flat"?ColorMode.FLAT:ColorMode.RAINBOW},
      "flatColor":{value:flatColor},
      "minColorValue":{value: decoded.minColorValue},
      "maxColorValue":{value: decoded.maxColorValue}
    }

    return [positionBuffer,colorBuffer,uniforms]
  },[pointcloud])
   useEffect(()=>{
    const material = new ShaderMaterial({
      vertexShader:vs,
      fragmentShader:fs,
      uniforms:uniforms,
      alphaTest:0.5,
      depthWrite:false,
      vertexColors:true
    })
    if(meshRef.current){
      meshRef.current.material = material
    }
  },[meshRef,uniforms])
  useEffect(()=>{
    if(ref.current){
      const interleavedBuffer32 = new InterleavedBuffer( positionBuffer, 5 );
      ref.current.setAttribute( 'position', new InterleavedBufferAttribute( interleavedBuffer32, 3, 0, false ) );
      ref.current.setAttribute( 'rgb', new BufferAttribute( colorBuffer, 3 ) );
    }
  },[positionBuffer, colorBuffer])
  // console.log("re render point cloud")
  // onPointerOver={hover} onPointerOut={unhover}
  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry" ref={ref}>
      </bufferGeometry>
    </points>
  );
})
const offset = new Vector3(0,0,0)
export default React.memo(function PointClouds({ pointclouds, transformObjects: _transforms }: PointCloudsProps): JSX.Element {
  // const models = lines.map((line, i) => {
  //   return (<TransformObject key={i} transform={transformObjects[line.header.frame_id]}><PointCloud line={line} /></TransformObject>)

  // })
  const {transformObjects} = useWorldStore((state)=>({transformObjects:state.transformObjects}))




  return <>{pointclouds.map((pointcloud,i)=><TransformObject key={i} transform={transformObjects[pointcloud.header.frame_id]} offset={offset}><PointCloudMemo pointcloud={pointcloud} /></TransformObject>)}</>
})
