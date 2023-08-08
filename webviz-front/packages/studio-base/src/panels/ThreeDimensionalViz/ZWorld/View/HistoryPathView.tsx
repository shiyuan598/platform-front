// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import { useEffect, useMemo, useRef } from 'react'
import * as THREE from "three"
import {  BufferGeometry, Object3D, Vector3 } from 'three';

// import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";

type ViewProps = {
  rootTransform?: Object3D
}

const BufferPoints = React.memo(function ({ points }:{points:Vector3[]}) {
  const geometry = useRef<BufferGeometry>();
  useEffect(() => {
    // const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5);
    geometry?.current?.setFromPoints(points);
  }, [points]);
  return (
    <points>
      <bufferGeometry ref={geometry}>
      </bufferGeometry>
      <pointsMaterial
        size={4}
        // threshold={0.1}
        color={0xff00ff}
        sizeAttenuation={false}
      />
    </points>
  );
})

// const LIFE_TIME=1000// 1s
export default React.memo(function HistoryPathView({ rootTransform }: ViewProps) {
  // const [receiveTime, setReceiveTime] = useState<number>(Date.now());
  // useEffect(()=>{
  //   setReceiveTime(Date.now());
  // },[message])
  const {showHistoryPath, historyPath, offsetPosition} = useWorldStore(state=>({
    showHistoryPath:state.showHistoryPath,
    historyPath:state.historyPath,
    offsetPosition:state.offsetPosition
  }));
  // const offsetPosition = {x:0, y:0};
  const points = useMemo(() => {
    return historyPath.map(p => {
      return new THREE.Vector3(p.x - offsetPosition.x, p.y- offsetPosition.y)
    }) || []
  }, [historyPath, offsetPosition])
  return <TransformObject transform={rootTransform}>
    {showHistoryPath &&  <BufferPoints points={points}/>}
  </TransformObject>
  // return <>{...models}</>

})
