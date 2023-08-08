// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { Float32BufferAttribute } from 'three';

import { Pose } from '@foxglove/regl-worldview';
import TransformObject, { TransformObjects } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { BaseMarker, Color } from "@foxglove/studio-base/types/Messages";

type LinesProps = {
  transformObjects: TransformObjects;
  lines: BaseMarker[];
};

const Line = React.memo(function InLine({ line }: { line: BaseMarker }): JSX.Element {
  const ref = useRef<THREE.Line>()
  useLayoutEffect(() => {
    if (line.primitive === "lines") {
      const points: THREE.Vector3[] = []
      // line.poses
      const colors: number[] = [];
      const markerColors = line.colors as Color[];
      line.points?.map((point, i) => {
        //@ts-ignore
        const poses = line.poses as Pose[];
        // const poseIndex = Math.floor(i / 2)
        //@ts-ignore
        points.push(new THREE.Vector3(point.x, point.y, point.z))

        colors.push(markerColors[i]?.r as number);
        colors.push(markerColors[i]?.g as number);
        colors.push(markerColors[i]?.b as number);
        // if (poses[i]?.orientation) {
        //   const { x, y, z } = poses[i]?.orientation as Orientation;
        //   rotationMap[`${x.toFixed(6)},${y.toFixed(6)},${z.toFixed(6)}`] = true;
        // }

      })
      ref.current?.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3))
      ref.current?.geometry.setFromPoints(points);
    } else {
      const points: THREE.Vector3[] = []
      // line.poses
      const colors: number[] = [];
      const markerColors = line.colors as Color[];
      // const rotationMap: Record<string, any> = {};
      line.points?.map((point, i) => {
        //@ts-ignore
        const poses = line.poses as Pose[];

        //@ts-ignore
        points.push(new THREE.Vector3(point.x, point.y, point.z))

        colors.push(markerColors[i]?.r as number);
        colors.push(markerColors[i]?.g as number);
        colors.push(markerColors[i]?.b as number);

      })
      //@ts-ignore
      // console.log(rotationMap, "rotationMap")
      // console.log("compute points", points)
      ref.current?.geometry.setFromPoints(points);
      const indexs = [];
      for (let i = 1; i < (points.length); i++) {
        // if (!isNaN(line.points[i-1].x) && !isNaN(line.points[i].x) && !isNaN(line.points[i + 1].x)) {
        //   indexs.push(i, i + 1);
        // }
        //@ts-ignore
        if (isNaN(line.points[i + 1]?.x)) {
          i += 3
        } else {
          // if ((points[i]?.x) > 5000) {
          //   debugger
          // }
          indexs.push(i - 1, i);
        }
      }
      ref.current?.geometry.setIndex(indexs);
      ref.current?.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3))
    }

    // ref.current?.position.
  }, [line.points, line.primitive])
  // useEffect(() => {
  //   const { x, y, z } = line.pose.position;
  //   const { x: qx, y: qy, z: qz, w: qw } = line.pose.orientation;
  //   ref.current?.position.set(x, z, y);
  //   ref.current?.quaternion.set(qx, qz, qy, qw);
  // }, [line.pose])
  //@ts-ignore
  return <lineSegments ref={ref} onPointerOver={e => console.log(e)}>
    <bufferGeometry />
    <lineBasicMaterial vertexColors={true} attach="material" linewidth={2} linecap={'round'} linejoin={'round'} blending={THREE.AdditiveBlending} />
  </lineSegments>
})

export default React.memo(function MemoLine({ lines, transformObjects }: LinesProps): JSX.Element {
  const models = lines.map((line, i) => {
    return (<TransformObject key={i} transform={transformObjects[line.header.frame_id]}><Line line={line} /></TransformObject>)

  })
  // console.log(lines, "lines")
  return <>{...models}</>
  // return <div />
})
