// import * as React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { zhito } from "@zhito/proto";
import { useMemo } from 'react';



const cellStyle = {
  border:"0px",
  padding: "5px 0px 10px 0px"
}
const textStyle = { userSelect: "none",float: "left", top: 0, left: 0, fontWeight:600 }

interface ISimpleTable {
  name:string
  data:  Record<string,string|Element|JSX.Element>
  keys: string[]
}
const SimpleTable = ({name, data, keys}:ISimpleTable)=>{
  // const items = useMemo()
return (
  <>
    <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >{name}:</Typography>
    <TableContainer component={"div"}>
          <Table sx={{ width: "100%" }} aria-label="simple table" size={"small"}>
            <TableBody>
                {keys.map(key=>{
                  const [objKey, displayName] = key.split(":")
                  return (<TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{...cellStyle,width:"120px"}}>
                    {displayName? displayName:objKey}:
                  </TableCell>
                  {/* <TableCell >{row.name}</TableCell> */}
                  <TableCell sx={{...cellStyle,textAlign:"right"}}>{data[objKey??""]??""}</TableCell>
                </TableRow>)
                })}
            </TableBody>
          </Table>
    </TableContainer>
    <Divider sx={{marginBottom:"4px"}}/>
  </>
)
}

function decodeFrontRadarVersion(numbers:number[]){
  const hexString = numbers.map(n => n.toString(16).toUpperCase().padStart(2,"0"))
  return <>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"60px"}}>MAS:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(0,3).join(" ")}</TableCell>
  </TableRow>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"60px"}}>PP:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(3,6).join(" ")}</TableCell>
  </TableRow>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"60px"}}>MBRES:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(6,9).join(" ")}</TableCell>
  </TableRow>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"60px"}}>UFBL:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(9,12).join(" ")}</TableCell>
  </TableRow>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"60px"}}>SAS:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(12,15).join(" ")}</TableCell>
  </TableRow>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"60px"}}>SBRES:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(15,18).join(" ")}</TableCell>
  </TableRow>
  <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
    <TableCell component="th" scope="row" sx={{...cellStyle,width:"40px"}}>SUFBL:</TableCell>
    <TableCell sx={{...cellStyle,textAlign:"right"}}>{hexString.slice(18,21).join(" ")}</TableCell>
  </TableRow></>
}
function decodeNumbers(name:string, string:string){
  try{
    const numbers = JSON.parse(string) as number[];
    switch(name){
      case "fr_radar_sw_version":
      case "fl_radar_sw_version":
        return String.fromCharCode(...numbers);
      case "lidar_fw_version_pl":
      case "lidar_fw_version_ps":
        return numbers.map(n => n.toString(16).toUpperCase().padStart(2,"0")).join(" ")
      case "rl_radar_sw_version":
      case "rr_radar_sw_version":
        return "v"+numbers.join(".")
      case "front_radar_sw_version":
        return decodeFrontRadarVersion(numbers);
      default:
        return string
    }
  }catch(e){
    return ""
  }
}
const commonKeys = ["soc_version:SOC版本", "adu_mcu_sw_version:MCU版本",
                    "zt_pdk_version:PDK版本","map_version:地图版本",
                    "camera_models:视觉模型","lidar_models:激光模型"]

const driverKeys = ["rs_m1_producer:激光驱动","CameraProducer:相机驱动"]
const hardwareKeys = ["switch:Switch固件","lidar_fw_version_pl:激光PL","lidar_fw_version_ps:激光PS",
                      "fl_radar_sw_version:毫米波FL","fr_radar_sw_version:毫米波FR","front_radar_sw_version:毫米波FRONT","rl_radar_sw_version:毫米波RL","rr_radar_sw_version:毫米波RR",]

const zicKeys = [
  "zic_data_protocol_version_fs",
  "zic_data_protocol_version_ri",
  "zic_data_protocol_version_tsr",
  "zic_data_protolcol_version_obj",
  "zic_data_protolcol_version_sync",
  "zic_data_protolcol_version_tfl",
]
export default function VersionPanel({data}:{data?:zhito.monitor.Monitor}) {
  if(!data?.version){
    return <></>
  }
  const decoded = useMemo(()=>{
    const object = {} as Record<string,string | Element | JSX.Element>
    data.version.forEach(item=>{
      if(object[item.name]) return;
      if(item.version.startsWith("[")&&item.version.endsWith("]")){
        object[item.name] = decodeNumbers(item.name, item.version)
      }else if(item.name==="switch"){
        object[item.name] = <>{("switch1_ver:"+item.version).split(" ").map(str=>(<><span>{str}</span><br/></>))}</>
      }else {
        object[item.name] = item.version
      }

    })
    return object
  },[data])
  return (
    <Stack style={{padding:"8px 16px",overflow:"auto"}}>

      <SimpleTable name={"通用"} data={decoded} keys={commonKeys}/>
      <SimpleTable name={"驱动"} data={decoded} keys={driverKeys}/>
      <SimpleTable name={"固件"} data={decoded} keys={hardwareKeys}/>
      <SimpleTable name={"ZIC"} data={decoded} keys={zicKeys}/>
      {/* <TableContainer component={"div"}>
        <Table sx={{ width: "100%" }} aria-label="simple table" size={"small"}>
          <TableBody>
              {data.version.map(item=>(<TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={cellStyle}>
                  {item.name}
                </TableCell>
                <TableCell sx={cellStyle}>{item.version}</TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Stack>
  );
}
