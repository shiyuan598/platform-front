// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useRef, useEffect } from "react";
import { Object3D, Group, Vector3 } from "three"

export type TransformObjects = Record<string, THREE.Object3D>

type Props = {
  transform?: Object3D
  children?: React.ReactNode;
  offset?: Vector3
}
export default function TransformObject(props: Props): JSX.Element {
  const transRef = useRef<Group>();
  const rotationRef = useRef<Group>();
  const { transform, children, offset } = props;
  useEffect(() => {
    if (rotationRef.current && transRef.current && transform) {
      if(transform.quaternion){
        const { x: qx, y: qy, z: qz, w: qw } = transform.quaternion;
        rotationRef.current.quaternion.set(qx, qy, qz, qw);
      } else if(transform.rotation){
        const { x: qx, y: qy, z: qz } = transform.rotation;
        rotationRef.current.rotation.set(qx, qy, qz);
      }

      // console.log(qx, qy, qz, "rotation")
      const { x, y, z } = transform.position;
      if(offset){
        transRef.current.position.set(x-offset.x, y-offset.y, z-offset.z);
      }else{
        transRef.current.position.set(x, y, z);
      }
    }
  }, [transform])
  return <group ref={transRef}><group ref={rotationRef}>{children}</group></group>
}
