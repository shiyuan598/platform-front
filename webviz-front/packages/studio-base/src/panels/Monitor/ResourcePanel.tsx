// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { Stack } from "@fluentui/react";

import {zhito} from "@zhito/proto"

import TopTable, { AverageTable } from "./Table";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Chart from "@foxglove/studio-base/panels/Monitor/Chart";


const textStyle = { userSelect: "none",float: "left", top: 0, left: 0,fontWeight:600 }

const CpuStats = ({user,kernel}:{user:number,kernel:number})=>{
    return (<div style={{display:"flex"}}>
        <div style={{marginRight: "10px", color:"#42a5f5"}}>
        <Typography variant="body1" display="block"  >user </Typography>
        <Typography variant="h6" display="block" gutterBottom  >{user.toFixed(2)}% </Typography>
        </div>
        <div style={{color:"#ed6c02"}}>
        <Typography variant="body1" display="block">kernel</Typography>
        <Typography variant="h6" display="block" gutterBottom  >{kernel.toFixed(2)}% </Typography>

        </div>
    </div>)

}


//   DISABLED: "grey",
//   SUCCESS: "#009a40",
//   FAIL: "#fe145d"
const BitStatuStyle = { width: "120px", height: "40px", lineHeight: "40px",  margin: "2px 4px",  cursor: "pointer" }
function ThreadStat({ name,running}: zhito.monitor.IThreadStat) {
  return  <div style={{...BitStatuStyle,textAlign: "center", userSelect: "none",background: running?"#009a40":"grey"}}>
      <div>{name}</div>
      {/* <div>{description}</div> */}
    </div>
}

function ThreadStatList({stats}:{stats:zhito.monitor.IThreadStat[]}){
    return <div style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}>{stats.map(thread=><ThreadStat {...thread}/>)}</div>
}

const SimpleMonitor = React.memo(({monitorMsg}:{monitorMsg?:zhito.monitor.Monitor}) => {

    const topMsg = monitorMsg?.top
    if(!topMsg){
        return <></>
    }
    return (
        <Stack style={{ justifyContent: "start", padding:"8px 16px" }}>
            {/* <Typography variant="h6" display="block" gutterBottom sx={textStyle} >
            CPU:
            </Typography> */}
            <CpuStats user={topMsg.current_usage.user} kernel={topMsg.current_usage.kernel}/>
            <Chart data={topMsg.history_usage??[]}></Chart>
            <Divider sx={{marginBottom:"8px"}}/>

            <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >
            内存:
            </Typography>
            <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >
            {topMsg.memory_info.total}M total, {topMsg.memory_info.avail}M avail, page size {topMsg.memory_info.page_size}K
            </Typography>
            <Divider sx={{marginBottom:"8px"}}/>
            <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >
            线程:
            </Typography>
            <TopTable data={monitorMsg}></TopTable>
            <Divider sx={{marginBottom:"8px"}}/>
            <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >
            总计:
            </Typography>
            <AverageTable data={monitorMsg}></AverageTable>
            <Divider sx={{marginBottom:"8px"}}/>
            <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >
            进程状态:
            </Typography>
            <ThreadStatList stats={(monitorMsg.ai_threads??[]).concat(monitorMsg.fp_threads??[])}/>
            <Typography variant="subtitle2" display="block" gutterBottom sx={textStyle} >
            更新时间: {new Date(monitorMsg.header.timestamp_sec*1000).toLocaleTimeString()}
            </Typography>
        </Stack>
    );
});

export default SimpleMonitor
