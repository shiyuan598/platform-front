// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { zhito } from "@zhito/proto";
// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }


const cellStyle = {
  padding: "5px 0px 10px 0px",
  border: "0px"
}

export function VersionTable({data}:{data:zhito.monitor.Monitor}) {
  return (
    <TableContainer component={"div"}>
      <Table sx={{ width: "100%" }} aria-label="simple table" size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle}>Name</TableCell>
            <TableCell sx={cellStyle}>Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {data.version.map(item=>(<TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={cellStyle}>
                {item.name}
              </TableCell>
              {/* <TableCell >{row.name}</TableCell> */}
              <TableCell sx={cellStyle}>{item.version}</TableCell>
            </TableRow>))}




        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function AverageTable({data}:{data:zhito.monitor.Monitor}) {
  return (
    <TableContainer component={"div"}>
      <Table sx={{ width: "100%" }} aria-label="simple table" size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle}>Name</TableCell>
            <TableCell sx={cellStyle}>Min</TableCell>
            <TableCell sx={cellStyle}>Max </TableCell>
            <TableCell sx={cellStyle}>Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={cellStyle}>
                Memory
              </TableCell>
              {/* <TableCell >{row.name}</TableCell> */}
              <TableCell sx={cellStyle}>{data.top.memory_info.min_avail}MB</TableCell>
              <TableCell sx={cellStyle}>{data.top.memory_info.max_avail}MB</TableCell>
              <TableCell sx={cellStyle}>{data.top.memory_info.average_avail}MB</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={cellStyle}>
              Processes
              </TableCell>
              {/* <TableCell >{row.name}</TableCell> */}
              <TableCell sx={cellStyle}>{data.top.process_total.min}</TableCell>
              <TableCell sx={cellStyle}>{data.top.process_total.max}</TableCell>
              <TableCell sx={cellStyle}>{data.top.process_total.average}</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={cellStyle}>
              Threads
              </TableCell>
              {/* <TableCell >{row.name}</TableCell> */}
              <TableCell sx={cellStyle}>{data.top.threads_total.min}</TableCell>
              <TableCell sx={cellStyle}>{data.top.threads_total.max}</TableCell>
              <TableCell sx={cellStyle}>{data.top.threads_total.average}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function TopTable({data}:{data:zhito.monitor.Monitor}) {
  return (
    <TableContainer component={"div"} sx={{}}>
      <Table sx={{ width: "100%" }} aria-label="simple table" size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle}>Command</TableCell>
            <TableCell sx={cellStyle}>Cpu</TableCell>
            <TableCell sx={cellStyle}>Pid </TableCell>
            <TableCell sx={cellStyle}>Tid</TableCell>
            <TableCell sx={cellStyle}>Pri</TableCell>
            {/* <TableCell >STATE</TableCell> */}
            <TableCell sx={cellStyle}>HMS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.top.thread_info?.map((row,i) => (
            <TableRow
              key={row.name+i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{...cellStyle,maxWidth:"60px",textOverflow:"ellipsis",overflow:"hidden"}}>
                {row.name}
              </TableCell>
              {/* <TableCell >{row.name}</TableCell> */}
              <TableCell sx={cellStyle}>{row.cpu.toFixed(2)}%</TableCell>
              <TableCell sx={cellStyle}>{row.pid}</TableCell>
              <TableCell sx={cellStyle}>{row.tid}</TableCell>
              <TableCell sx={cellStyle}>{row.pri}</TableCell>
              {/* <TableCell >{row.state}</TableCell> */}
              <TableCell sx={cellStyle}>{row.hms}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
