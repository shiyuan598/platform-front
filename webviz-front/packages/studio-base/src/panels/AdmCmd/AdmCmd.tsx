// import { makeStyles } from "@fluentui/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import Stack from "@mui/material/Stack"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { useWebsocket } from "@foxglove/studio-base/panels/AdmCmd/util";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import * as PanelAPI from "@foxglove/studio-base/PanelAPI";






interface IAdmList {
  list: AdmItem[]
  messageMapping: MessageMapping
  lockValue: (adm: AdmItem, value: number) => void
  resetValue: (adm: AdmItem) => void
}

type ADM_STATE_TYPE = -1|0|1;
const ADM_STATE = {
  ADM_INVALID: -1,
  ADM_NOT_WORKING: 0,
  ADM_WORKING: 1
}

type AdmItem = {
  name: string
  struct: string,
  topic: string,
  key: string,
  bits?: number[]
  description: string
  workingValue: number
  values: number[]
  locked: boolean,
  delay?: number
  parent?: string,
  children?: AdmItem[],
  state?: -1|1|0
}



const ChildItem = ({item,lockValue}:{item:AdmItem,lockValue: (adm: AdmItem, value: number) => void})=>{
  const state = item.state;
  const locked = item.locked;
  return <ListItem sx={{ padding: `0px 0px 0px 32px` }}>
  <ListItemIcon sx={{ minWidth: "36px" }}>
    {state === ADM_STATE.ADM_WORKING && <CheckCircleIcon color="success" />}
    {state === ADM_STATE.ADM_NOT_WORKING && <CancelIcon color="error" />}
    {state === ADM_STATE.ADM_INVALID && <HelpIcon color="disabled" />}
  </ListItemIcon>
  <ListItemText id="switch-list-label-wifi" primary={item.name}
  />
    <Stack direction="row" spacing={0} sx={{ height: "26px" }}>
      <Button
        variant={locked && state === ADM_STATE.ADM_WORKING ? "contained" : undefined}
        size="small"
        color={locked && state === ADM_STATE.ADM_WORKING ? "success" : "inherit"}
        sx={{ borderColor: "dimgrey", padding: "2px", color: "white" }}
        onClick={() => lockValue(item, item.workingValue)}
      >正常</Button>
      <Divider orientation="vertical" sx={{ padding: "2px" }} />
      <Button
        variant={locked && state === ADM_STATE.ADM_NOT_WORKING ? "contained" : undefined}
        size="small" color={locked && state === ADM_STATE.ADM_NOT_WORKING ? "error" : "inherit"}
        sx={{ borderColor: "dimgrey", padding: "2px" }}
        onClick={() => lockValue(item, (item.workingValue + 1) % 2)}
      >异常</Button>
      <Divider orientation="vertical" sx={{ padding: "2px" }} />
      <span style={{width:"26px"}}/>
    </Stack>
  </ListItem>
}
export function AdmList({ list, lockValue, resetValue }: IAdmList) {
  const [openList,setOpen] = useState<string[]>([])

  const handleToggle = useCallback((value: string)=>{
    const currentIndex = openList.indexOf(value);
    const newChecked = [...openList];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setOpen(newChecked);
  },[openList])
  return (
    <List
      subheader="点击按钮锁定ADM状态"
      sx={{ width: '100%', bgcolor: 'background.paper', padding: "4px 16px 0px 4px" }}
    >
      {list.map((item) => {
        const state = item.state;
        const locked = item.locked;
        const open = openList.indexOf(item.name) > -1;
        const multiBit = (item.children?.length??-1)>1;
        return < >
          <ListItem sx={{ padding: `0px 0px 0px ${multiBit?"0":"16"}px` }}>

            {/* <ListItemIcon sx={{ minWidth: "36px" }} > */}
            {multiBit ? <IconButton aria-label="delete" size="small" onClick={() => {handleToggle(item.name)}}>
              <KeyboardArrowDown
                    sx={{
                      transform:  open ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: '0.2s',
                    }}
                  />
            </IconButton> : <div style={{width:"10px"}}></div>}
            <ListItemIcon sx={{ minWidth: "36px" }}>
              {state === ADM_STATE.ADM_WORKING && <CheckCircleIcon color="success" />}
              {state === ADM_STATE.ADM_NOT_WORKING && <CancelIcon color="error" />}
              {state === ADM_STATE.ADM_INVALID && <HelpIcon color="disabled" />}
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary={item.name} secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.description}
                </Typography>
              </React.Fragment>
            }
            />
            <Stack direction="row" spacing={0} sx={{ height: "26px" }}>
              <Button
                variant={locked && state ===ADM_STATE. ADM_WORKING ? "contained" : undefined}
                size="small"
                color={locked && state === ADM_STATE.ADM_WORKING ? "success" : "inherit"}
                sx={{ borderColor: "dimgrey", padding: "2px", color: "white" }}
                onClick={() => lockValue(item, item.workingValue)}
              >正常</Button>
              <Divider orientation="vertical" sx={{ padding: "2px" }} />
              <Button
                variant={locked && state === ADM_STATE.ADM_NOT_WORKING ? "contained" : undefined}
                size="small" color={locked && state === ADM_STATE.ADM_NOT_WORKING ? "error" : "inherit"}
                sx={{ borderColor: "dimgrey", padding: "2px" }}
                onClick={() => lockValue(item, (item.workingValue + 1) % 2)}
              >异常</Button>
              <Divider orientation="vertical" sx={{ padding: "2px" }} />
              <IconButton aria-label="delete" size="small" color="inherit" onClick={() => resetValue(item)}>
                <ReplayIcon />
              </IconButton>
            </Stack>
          </ListItem>
            {(multiBit&&open)&&item.children?.map(child=><ChildItem item={child} lockValue={lockValue}/>)}
          <Divider component="li" />
          </>
      })}

    </List>
  );
}

type MessageMapping = Record<string, Record<string, number | string>>

function getAdmState(obj: AdmItem, messageMapping: MessageMapping): ADM_STATE_TYPE{
  const fullValue = messageMapping[obj.topic]?.[obj.key];
  const bitsValue = (typeof fullValue === "number") ? obj.bits?.map(bit => (fullValue >> bit) & 1) : [];
  const stateValue = bitsValue?.length ? bitsValue?.reduce((pre, current) => pre * current) : -1;
  if (stateValue === obj.workingValue) {
    return ADM_STATE.ADM_WORKING as ADM_STATE_TYPE;
  } else if (stateValue === -1) {
    return ADM_STATE.ADM_INVALID as ADM_STATE_TYPE;
  } {
    return ADM_STATE.ADM_NOT_WORKING as ADM_STATE_TYPE;
  }
}

export const AdmCmd = () => {
  const [admList, setAdmList] = useState<AdmItem[]>([]);
  const ws = useWebsocket(`ws://${location.hostname}:8091/adm`);

  const topics = useMemo(() => {
    const result: Record<string, boolean> = {};
    admList.map(adm => result[adm.topic] = true);
    return Object.keys(result);
  }, [admList])

  const messageReceived = PanelAPI.useMessagesByTopic({
    topics: topics,
    historySize: 1,
  });// as Record<string,readonly MessageEvent<unknown>[]>;//{ [key: string]:  };

  const messageMapping = useMemo(() => {
    const mapping: MessageMapping = {};
    topics.forEach(topic => {
      mapping[topic] = messageReceived[topic]?.[0]?.message as Record<string, number | string>
    })
    // console.log("mapping",mapping)
    return mapping;
  }, [topics, messageReceived])

  const handleListMsg = useCallback((msg:AdmItem[])=>{
    const result:AdmItem[] = [];
    msg.forEach(item=>{
      // item.state = getAdmState(item,messageMapping)
      if(!item.parent){
        result.push(item);
      }else{
        const parentIndex = result.findIndex(obj=>obj.name===item.parent);
        let parent;
        if(parentIndex>-1){
          parent = result[parentIndex]
        }else{
          parent = {...item,name:item.parent,parent:undefined,children:[]};
          result.push(parent)
        }
        delete parent?.parent;
        delete parent?.state;
        delete parent?.bits;
        parent?.children?.push(item)
      }
    })
    // console.log(result);
    setAdmList(result)
  },[])
  const computedList = useMemo(()=>{

    admList.map(item=>{
      if(!item.children){
        item.state = getAdmState(item,messageMapping)
      }else{
        let state:ADM_STATE_TYPE = 1;
        let locked = true;
        item.children?.map(childItem=>{
          childItem.state = getAdmState(childItem,messageMapping);
          state = Math.min(state,childItem.state) as ADM_STATE_TYPE;
          locked = childItem.locked && locked;
        })
        item.state = (item.children?.[0]?.state===item.children?.[1]?.state ? (item.children?.[0]?.state ??  ADM_STATE.ADM_INVALID) : ADM_STATE.ADM_INVALID) as ADM_STATE_TYPE;
        item.locked = locked
      }
    })
    return admList
  },[admList,messageMapping])
  const handleMsg = useCallback((e: MessageEvent) => {
    const msgObj = JSON.parse(e.data);
    if (!msgObj || !msgObj.type) return;
    switch (msgObj.type) {
      case "list":
        handleListMsg(msgObj.msg)
        break;
      // case "get":
      //   setAdmValueMap((pre)=>({...pre,[msgObj.msg.name]:msgObj.msg.value}))
      //   break;
    }
  }, [])

  useEffect(() => {
    if (ws) {
      ws.send(JSON.stringify({ type: "list" }))
      ws.onmessage = handleMsg;
    }
  }, [ws])

  const lockValue = useCallback((item: AdmItem, value: number) => {
    if(!item.parent){
      //主节点 清除state
      admList.forEach((obj)=>{
        if(obj.name!==item.name && obj.locked){
          if(obj.children){
            obj.children?.map(child=>{
              ws?.send(JSON.stringify({ type: "reset", ...child }))
            })
          }else{
            ws?.send(JSON.stringify({ type: "reset", ...obj }))
          }

        }
      })
    }
    if(item.children){
      item.children?.map(child=>{
        const delay = child.delay ?? 0
        setTimeout(()=>{
          ws?.send(JSON.stringify({ type: "set", ...child, value }))
        },50+delay)
      })
    }else{
      setTimeout(()=>{
        ws?.send(JSON.stringify({ type: "set", ...item, value }))
      },50)
    }


  }, [ws,computedList])

  const resetValue = useCallback((item: AdmItem) => {
    if(item.children){
      item.children?.map(child=>{
        ws?.send(JSON.stringify({ type: "reset", ...child }))
      })
    }else{
      ws?.send(JSON.stringify({ type: "reset", ...item }))
    }

  }, [ws])

  useEffect(() => {
    let timeout: undefined | number = undefined;
    const requestValue = () => {
      ws?.send(JSON.stringify({ type: "get" }))
      timeout = setTimeout(requestValue, 2000) as unknown as number
    }
    requestValue()
    return () => clearTimeout(timeout)
  }, [ws])

  return (
    <Stack>
      <AdmList list={computedList} messageMapping={messageMapping} lockValue={lockValue} resetValue={resetValue} />
    </Stack>
  );
}
