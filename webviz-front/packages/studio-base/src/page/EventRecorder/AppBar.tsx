import * as React from 'react';
import { useEffect, useState } from "react";

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Stack, useScrollTrigger } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RecordObject, useRecordStore } from "@foxglove/studio-base/components/EventRecorderSidebar/store";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}
function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export function CarSelect({ record, setCar }: { record: RecordObject, setCar: (fullpath: string, val: string) => void }) {
  const [cars, setCars] = useState<string[]>([]);
  useEffect(() => {
    fetch("./config/CarList.json").then(res => res.json()).then(setCars);
  }, [])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (car?:string) => {
    setAnchorEl(null);
    if(typeof car ==="string"){
      setCar(record.info?.fullPath,car)
    }
  };
  return (
    <Stack direction="row">
      <div>
      <Typography variant="h6" display="block" sx={{ userSelect: "none" }} >

      </Typography>
      <Typography variant="h6" display="block" sx={{ userSelect: "none" }} onClick={handleClick}>
      {record.info?.car ?? "车型未选择"}
      </Typography>
      </div>
      <ArrowDropDownIcon sx={{ height: "30px" }} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {cars.map(car=><MenuItem key={car} onClick={()=>handleClose(car)}>{car}</MenuItem>)}
      </Menu>
    </Stack>
  )
}

export function BagSelect() {
  const { bagList, setSelected } = useRecordStore(state => state);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (bag?:string) => {
    setAnchorEl(null);
    if(typeof bag ==="string"){
      setSelected(bag)
    }
  };
  //{recordMap[info.fullPath]?.update ? "" : " *"}
  return (
    <div style={{ position: "absolute", left: "10px" }}>
      <IconButton color="inherit" aria-label="open drawer"
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {bagList.map(info=><MenuItem key={info.fullPath} onClick={()=>handleClose(info.fullPath)}>{info.name}{info.recording ? "(录制中)" : ""}</MenuItem>)}
      </Menu>

    </div>
  )
}
//@ts-ignore
export function TopAppBar(props) {
  const { connected, recordingKey, recordMap, selected, setCar } = useRecordStore(state => state);
  const record = recordMap[selected];

  let statu, color = "warning";
  if (connected && recordingKey!=="") {
    statu = "录制中";
    color = "success";
  } else if (connected) {
    statu = "未录制";
    color = "warning";
  } else {
    statu = "未连接";
    color = "error";
  }
  return <ElevationScroll {...props}>
    <AppBar>
      <Toolbar style={{ justifyContent: "center" }}>
        <BagSelect />
        {/* <Typography variant="h6" component="div"  style={{ position: "absolute", left:"10px"}}>
          Recorder
        </Typography> */}
        {record && <CarSelect record={record} setCar={setCar} />}
        {/* <img src="./images/zicon.png" style={{height:"0px"}}></img> */}
        {/* <img src="./images/ztitle.png" style={{height:"25px"}}></img> */}
        <Button
          //@ts-ignore
          variant="contained" color={color} size="small" style={{ position: "absolute", right: "10px", color: connected ? "#eeeeee" : "#eeeeee" }}>{statu}</Button>
      </Toolbar>

    </AppBar>
  </ElevationScroll>

}
// const fabStyle = {
//   position: 'absolute',
//   zIndex: 1,
//   top: -30,
//   left: 0,
//   right: 0,
//   margin: '0 auto',
// }
export default function BottomAppBar() {
  return (
    <Fab color="primary" aria-label="add" sx={{
      position: 'fixed',
      zIndex: 111,
      top: "90%",
      // left: 0,
      right: "20px",
      // margin: '0 auto',
    }}>
    <AddIcon />
  </Fab>
  )
  // return (
  //     <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
  //       <Toolbar>
  //         <IconButton color="inherit" aria-label="open drawer">
  //           <MenuIcon />
  //         </IconButton>
  //         <Fab color="secondary" aria-label="add" sx={fabStyle}>
  //           <AddIcon />
  //         </Fab>
  //         {/* <Box sx={{ flexGrow: 1 }} /> */}
  //         <IconButton color="inherit">
  //           <SearchIcon />
  //         </IconButton>
  //         <IconButton color="inherit">
  //           <MoreIcon />
  //         </IconButton>
  //       </Toolbar>
  //     </AppBar>
  // );
}
