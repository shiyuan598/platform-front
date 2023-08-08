import { Vector3 } from "three"
import { ThickLine } from "../utils/ThickLine"

const line0 = [
  new Vector3(-200, -4.5, 1.2),
  new Vector3(200, -4.5, 1.2),
  // new Vector3(-2, 14, 1.2),
];
const line1 = [
  new Vector3(-200, -1.5, 1.2),
  new Vector3(200, -1.5, 1.2),
  // new Vector3(-2, 14, 1.2),
];
const line2 = [
  new Vector3(-200, 1.5, 1.2),
  new Vector3(200, 1.5, 1.2),
]
const line3 = [
  new Vector3(-200, 4.5, 1.2),
  new Vector3(200, 4.5, 1.2),
]


// function MapLineSegment(){
//   return 
// }
export default function Map() {


  return <>
  <group rotation={[0,0,0]} position={[0,0,0.01]}>
    <ThickLine points={line0} color={0xFFBA01} thickness={0.20} dashSize={0}/>
    <ThickLine points={line1} color={0xcccccc} thickness={0.15} dashSize={0}/>
    <ThickLine points={line2} color={0xcccccc} thickness={0.15} dashSize={2} gapSize={2}/>
    <ThickLine points={line3} color={0xcccccc} thickness={0.15} dashSize={0}/>
    {/* <ThickLine points={[new Vector3(-200, 7.5, 1.2),new Vector3(200, 7.5, 1.2),]} 
    color={0xcccccc} thickness={0.10} dashSize={0}/>
    <ThickLine points={[new Vector3(-200, 10.5, 1.2),new Vector3(200, 10.5, 1.2),]} 
    color={0xcccccc} thickness={0.10} dashSize={1}/>
    <ThickLine points={[new Vector3(-200, 13.5, 1.2),new Vector3(200, 13.5, 1.2),]} 
    color={0xcccccc} thickness={0.10} dashSize={0}/>
    <ThickLine points={[new Vector3(-200, 16.5, 1.2),new Vector3(200, 16.5, 1.2),]} 
    color={0xFFBA01} thickness={0.10} dashSize={0}/> */}
    {/* <Line2D></Line2D> */}
    </group>
    {/* <mesh scale={4} position={[3, 0.1, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
      <ringGeometry args={[0.9, 1, 4, 1]} />
      <meshStandardMaterial color="white" roughness={0.75} />
    </mesh> */}
  </>
}