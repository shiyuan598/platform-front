import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
// import { useBox } from '@react-three/cannon'
import { Color } from 'three'

// useGLTF.preload('/Beetle.glb')
// useGLTF.preload('/sweep/sweep.glb')
// Auto-generated by: https://github.com/pmndrs/gltfjsx
// Model via KrStolorz on Sketchfab, CC-BY-4.0
// https://sketchfab.com/3d-models/low-poly-volkswagen-beetle-f680ad7e98e445eaafed1a70f2c53911
const Sweep = forwardRef(({ args = [1.7, 1, 4], mass = 500, ...props }, ref) => {
  const { materials } = useGLTF('/Beetle.glb')//nodes:_nodes, 
  const { nodes:snodes, materials:smaterials ,scene} = useGLTF('/sweep/sweep.glb')
  // console.log("orange car",nodes,materials)
  // console.log("sweep",snodes,smaterials)
  materials.Glass.color = new Color(0.7,0.7,0.7)
  // const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide: (e) => console.log('bonk', e.body.userData), ...props }), ref)
  return  <primitive object={scene} position={[0, 0, 0]} rotation={[Math.PI/2,0,0]}/> 
  return (
    <mesh ref={ref} >
      <group position={[2, 0, 4]} rotation={[Math.PI/2,0,Math.PI/2]}>
        {/* <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck.geometry} /> */}
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_1.geometry} visible={false}/>
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_2.geometry} visible={false}/>
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_3.geometry} visible={true}/>
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_4.geometry} visible={true}/>
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_5.geometry} visible={true}/>{/** 挡泥板等 */}
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_6.geometry} visible={true}/>
       
        <mesh castShadow material={materials['Rubber']} geometry={snodes.base_link_truck_8.geometry} visible={true}/>{/** 后轮 */}
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_9.geometry} visible={true}/>{/** 前向底盘 */} 
        <mesh castShadow material={materials['Rubber']} geometry={snodes.base_link_truck_10.geometry} visible={true}/>{/** 前轮 */} 
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_11.geometry} visible={false}/>{/** LOGO */}
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_12.geometry} visible={true}/>
       
        <mesh castShadow material={materials['Glass']} geometry={snodes.base_link_truck_13.geometry} visible={true}/>  {/** glass */}
        <mesh castShadow material={materials['Rubber']} geometry={snodes.base_link_truck_14.geometry} visible={true}/>{/** 尾灯底板 */} 
        <mesh castShadow material={materials['Orange plastic']} geometry={snodes.base_link_truck_15.geometry} visible={true}/>{/** 轮廓反光条 */} 
        <mesh castShadow material={materials['Tail lights']} geometry={snodes.base_link_truck_16.geometry} visible={true }/> {/** 尾灯 */} 
        <mesh castShadow material={materials['Reflector']} geometry={snodes.base_link_truck_17.geometry} visible={true}/> {/** 邮箱 轮毂 */} 
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_18.geometry} visible={true}/>

        <mesh castShadow material={materials['Interior (dark)']} geometry={snodes.base_link_truck_19.geometry} visible={true}/> {/** 座椅 */} 
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_20.geometry} visible={true}/>{/** 后视镜 */} 
        <mesh castShadow material={materials['Headlight']} geometry={snodes.base_link_truck_21.geometry} visible={true}/> {/** 车灯 */} 
        <mesh castShadow material={materials['Interior (light)']} geometry={snodes.base_link_truck_7.geometry} visible={true}/>{/** 车灯2 */} 
        {/* <mesh castShadow material={materials.Rubber} geometry={nodes.chassis_2.geometry} />车体黑色
        <mesh castShadow material={materials.Paint} geometry={nodes.chassis_3.geometry} /> 车体黄色
        <mesh castShadow material={materials.Underbody} geometry={nodes.chassis_4.geometry} />车体黑色
        <mesh castShadow material={materials.Chrom} geometry={nodes.chassis_5.geometry} /> 金属光泽
        <mesh castShadow material={materials['Interior (dark)']} geometry={nodes.chassis_6.geometry} /> 内饰黑
        <mesh castShadow material={materials['Interior (light)']} geometry={nodes.chassis_7.geometry} />内饰亮
        <mesh castShadow material={materials.Reflector} geometry={nodes.chassis_8.geometry} />
        <mesh material={materials.Glass} geometry={nodes.chassis_9.geometry} material-transparent={false} material-color="black" />
        <mesh castShadow material={materials.Steel} geometry={nodes.chassis_10.geometry} />
        <mesh castShadow material={materials['Black plastic']} geometry={nodes.chassis_11.geometry} />
        <mesh material={materials.Headlight} geometry={nodes.chassis_12.geometry} />
        <mesh castShadow material={materials['Reverse lights']} geometry={nodes.chassis_13.geometry} />
        <mesh castShadow material={materials['Orange plastic']} geometry={nodes.chassis_14.geometry} />
        <mesh castShadow material={materials['Tail lights']} geometry={nodes.chassis_15.geometry} />
        <mesh castShadow material={materials['License Plate']} geometry={nodes.chassis_16.geometry} /> */}
      </group>
    </mesh>
  )
})

export default Sweep
