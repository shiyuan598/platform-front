import { useCallback, useEffect, useState } from "react";

import Stack from "@mui/material/Stack"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Button from '@mui/material/Button';

import { useWebsocket } from "./util";
import Divider from "@mui/material/Divider";


type ModuleItem = {
  name:string
  module_name:string,
  level: string
}


interface IModuleList{
  list:ModuleItem[]
  setLevel: (item:ModuleItem,level:string)=>void
}



const LevelButton = ({setLevel,level,item}:{level:string,item:ModuleItem,setLevel:(item:ModuleItem,level:string)=>void})=>{
  const [loading,setLoading] = useState(false);
  const handleClick = useCallback(()=>{
    setLevel(item,level);
    setLoading(true);
    setTimeout(()=>setLoading(false),10000)
  },[level])
  useEffect(()=>{
    if(item.level===level){
      setLoading(false)
    }
  },[item.level])
  return <div>
    <Button
      variant={undefined}
      disabled={loading}
      size="small"
      color={item.level===level?"primary":"inherit"}
      sx={{borderColor:"dimgrey", padding:"2px"}}
      onClick={handleClick}
    >{level.toUpperCase()}</Button>
     {/* {loading && (
          <CircularProgress
            size={24}
            sx={{
              // color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
            />
     )} */}
    </div>
}
export function ModuleList({list,setLevel}:IModuleList) {

  return (
    <List
      sx={{ width: '100%',  bgcolor: 'background.paper',padding:"0px 16px 0px 16px" }}
    >
      {list.map((item)=>{
        // const state = getModuleState(item);
        // const locked = item.locked;
        return <Stack >
        <ListItem key={item.name} sx={{padding:"8px 0px"}}>
          <ListItemIcon sx={{minWidth:"36px"}}>
            <ViewModuleIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary={item.name} />
          <Stack direction="row" spacing={0} sx={{height:"26px"}}>
            <LevelButton level="info" setLevel={setLevel} item={item} />
            <Divider orientation="vertical"  sx={{padding:"2px"}}/>
            <LevelButton level="debug" setLevel={setLevel} item={item} />
            <Divider orientation="vertical"  sx={{padding:"2px"}}/>
            <LevelButton level="warning" setLevel={setLevel} item={item} />
          </Stack>
        </ListItem>
        <Divider component="li" /></Stack>
        })}

    </List>
  );
}




export const LogCmd = ()=>{
  const [moduleList,setModuleList] = useState<ModuleItem[]>([]);
  // const classes = useStyles();
  const ws = useWebsocket(`ws://${location.hostname}:8091/cmd`);

  const handleMsg = useCallback((e:MessageEvent)=>{
    const msgObj = JSON.parse(e.data);
    if(!msgObj||!msgObj.type) return;
    switch(msgObj.type){
      case "list":
        setModuleList(msgObj.msg)
        break;
    }
  },[])

  useEffect(()=>{
    if(ws){
      ws.send( JSON.stringify({type:"list"}))
      ws.onmessage = handleMsg;
    }
  },[ws])

  const setLevel = useCallback((item:ModuleItem,level:string)=>{
    ws?.send( JSON.stringify({type:"set",...item,level}))
  },[ws])

  useEffect(()=>{
    let timeout:undefined|number = undefined;
    const requestValue = ()=>{
      ws?.send(JSON.stringify({type:"list"}))
      timeout = setTimeout(requestValue,2000) as unknown as number
    }
    requestValue()
    return ()=> clearTimeout(timeout)
  },[ws])


  return (
      <Stack>
           <ModuleList list={moduleList} setLevel={setLevel}/>
      </Stack>
  );
}
