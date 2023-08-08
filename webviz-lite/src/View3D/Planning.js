import { Vector3 } from "three"
import { ThickLine } from "../utils/ThickLine"
// import { Line2D } from "../utils/Line2D";

const line0 = [
  new Vector3(0, 0, 1.2),
  new Vector3(25, 0, 1.2),
  // new Vector3(-2, 14, 1.2),
];


// function MapLineSegment(){
//   return 
// }
export default function Planning() {


  return <>
  <group rotation={[0,0,0]} position={[0,0,0.01]}>
    <ThickLine points={line0} color={0x17aaaa} thickness={2.2} dashSize={0} faded={true}/>
    {/* <Line2D></Line2D> */}
    </group>
  </>
}