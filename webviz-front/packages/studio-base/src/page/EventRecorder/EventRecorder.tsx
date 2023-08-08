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
import { makeStyles } from "@fluentui/react";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";


import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";
import { Stack, Typography, Divider, Select, MenuItem, Input, Menu, Link } from "@mui/material";
import Fab from '@mui/material/Fab';
import { BagInfo, parseTagIndex, RecordObject, useRecordStore, ZhitoEvent, ZhitoTagMap } from "@foxglove/studio-base/components/EventRecorderSidebar/store";
import { EventPrioritys, PriorityColors } from "@foxglove/studio-base/page/EventRecorder/utils";

import Modal from '@mui/material/Modal';
import { EventSetting } from "@foxglove/studio-base/page/EventRecorder/EventSetting";


const useStyles = makeStyles((_theme) => ({
  root: {
    height: "100%",
  },
  item: {
    cursor: "grab",
  },
  sticky: {
    color: colors.DARK1,
    position: "sticky",
    top: 0,
    zIndex: 2,
  },


  bagInfoTitle: { width: "55px", lineHeight: "35px !important", userSelect: "none" },
  bagInfoContext: { width: "calc(100% - 55px)", maxWidth: "300px", marginLeft: "0px !important" },
  eventIndex: {
    lineHeight: "30px !important",
    userSelect: "none !important",
    textAlign: "center !important",
    margin: "11px 5px 0px 0px !important",
    // background: "#535566 !important",
    width: "30px !important",
    height: "30px !important",
    minHeight: "30px !important",
    borderRadius: "15px !important",
    // backgroundColor:"red !important"
  },
  eventInput: {
    width: "100%",
    outline: 0,
    zIndex: 1,
    borderWidth: "0px 0px 1px 0px",

    ":focus": {
      borderStyle: "solid",
    }
  },
  eventPlaceHoder: {
    position: "absolute",
    userSelect: "none",
    zIndex: 0,
    marginLeft: "0px !important"
  },
  scrollContainer: {
    overflowY: "auto",
  },
  noResults: {
    padding: "8px 16px",
    opacity: 0.4,
  },
}));


type Props = {

}



function Event({ event, index, openEventSetting }: { event: ZhitoEvent, index: number,openEventSetting:(stamp:number)=>void }): JSX.Element {
  const { selected } = useRecordStore(state => state)
  const classes = useStyles();
  const inputref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(event.description || "");
  const updateEvent = useRecordStore(state => state.updateEvent)
  const date = new Date(event.timestamp);
  const timeStr = date.toLocaleTimeString();
  // const dateStr = date.toLocaleDateString();
  const parsedDescription = event.description;
  const tags = useMemo(() => {
    return parseTagIndex(inputText)
  }, [inputText, focus, selected]);
  useEffect(() => {
    setInputText(event.description || "")
  }, [event.description])
  const inputTooltip = useMemo(() => {
    const lastTag = tags[tags.length - 1] || ""
    const children = ZhitoTagMap[lastTag + "-chidren"]
    if (children instanceof Array) {
      return children?.map((child, i) => {
        const index = lastTag === "" ? i : lastTag + "-" + i;
        return <div >{`${index}: ${child}`}</div>
      })
    } else {
      return <></>
    }

  }, [tags])
  const titile = useMemo(() => {
    const result = tags.map(tag => ZhitoTagMap[tag || ""]).filter(title => title && title.slice).join(",")
    return result === "" ? "未分类" : result
  }, [tags]);

  const renderFirstColumn = () => {
    return (
      <Stack direction="row" spacing={1} justifyContent="space-between" style={{ userSelect: "none" }}>
        <Typography variant="body2" display="block" gutterBottom>
          {titile}
        </Typography>
        {/* <Button variant="text" sx={{width:60,textAlign:"right", padding:"0px 8px"}} >{timeStr}</Button> */}
        <Typography variant="body2" display="block" gutterBottom align="right">
        {timeStr}
        </Typography>
      </Stack>
    )
  }

  const renderSecondColumn = () => {
    return (
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="button" display="block" className={classes.eventInput}
          ref={inputref}
          gutterBottom contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); updateEvent({timestamp:event.timestamp, description:inputText}) }}
          onInput={(e) => { console.log(e); setInputText((e.target as HTMLSpanElement).innerText) }}
          onKeyDown={(e => { if (e.key == "Enter" && !e.ctrlKey) { (e.target as HTMLSpanElement).blur(); e.preventDefault() } })}
        >
          {parsedDescription}
        </Typography>
        <Link href="#"
          underline="hover"
          onClick={(()=>openEventSetting(event.timestamp))}
          sx={{textAlign:"right", width:"60px",padding:"0px 0px",fontSize:"0.875rem"}}
        >
          {(event.duration??0)+(event.subEventStamp?Math.floor((event.subEventStamp-event.timestamp)/1000):0)}s</Link>
        {inputText === "" && <Typography variant="button" display="float" className={classes.eventPlaceHoder}>未添加描述</Typography>}
      </Stack>
    )
  }


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = (priority?:string) => {
    setAnchorEl(null);
    if(typeof priority ==="string"){
      console.log("set priority",priority)
      updateEvent({timestamp:event.timestamp, description:inputText, priority})
    }
  };
  const priorityKeys  = Object.keys(EventPrioritys);//=["Lowest",]
  const renderMenu =()=>{
    return (      <Menu
      id="priority-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={()=>handleMenuClose()}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {priorityKeys.map(key=><MenuItem onClick={()=>handleMenuClose(key)}>{key}</MenuItem>)}
    </Menu>)
  }
  const priovity = event.priority ?? "Low";
  const priovityColor = PriorityColors[priovity] ?? "grey";
  // console.log("read priovity",)
  return (
    <Stack direction="row" >
      <Fab size="small" color={'primary'} aria-label="add" className={classes.eventIndex} onClick={handleIndexClick} sx={{background:priovityColor}}>
        {index}
      </Fab>
      {renderMenu()}
      {/* <IconButton >{index}</IconButton> */}
      <Stack style={{ paddingTop: "5px", width: "90%" }} >
        {renderFirstColumn()}
        {renderSecondColumn()}
        {focus &&
          <Typography variant="button" display="block" gutterBottom style={{ userSelect: "none", float: "left", top: 0, left: 0 }} >
            {inputTooltip}
          </Typography>}
      </Stack>
    </Stack>
  )
}




function BagEventList({ events, }: { events: ZhitoEvent[] }): JSX.Element {
  const [eventTimestamp, setEventTimestamp] = useState<number>(0);
  // const handleOpen = () => setEventTimestamp(0);
  const handleClose = () => setEventTimestamp(0);
  const openEventSetting = useCallback((stamp:number)=>{
    setEventTimestamp(stamp);
  },[])
  return <Stack divider={<Divider orientation="horizontal" flexItem />}>
    {events.map((event, i) => <Event
      event={event}
      openEventSetting={openEventSetting}
      index={events.length - i - 1}
      key={events.length - i - 1}
    />)}
    <Modal
    open={eventTimestamp!==0}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <EventSetting stamp={eventTimestamp}></EventSetting>
    </Modal>
  </Stack>
}




function BagSelect({ selected, recordMap }: { recordMap: Record<string, RecordObject>, bagList: BagInfo[], setSelected: (val: string) => void, selected: string }) {
  const classes = useStyles();
  const record = recordMap[selected]
  return <Stack direction="row" spacing={2}>
    <Typography variant="button" display="block" className={classes.bagInfoTitle}>
      路径:
    </Typography>
    <Typography variant="subtitle1" display="block" className={classes.bagInfoContext}>
      {record?.info?.name}
    </Typography>
  </Stack>
}

interface IBagDescription {
  record: RecordObject,
  setDescription: (fullpath: string, val: string) => void
  setCar: (fullpath: string, val: string) => void
}


export function CarSelect2({ record, setCar }:{record:RecordObject,setCar:(fullpath: string, val: string) => void}){
  const [cars, setCars] = useState<string[]>([]);
  useEffect(() => {
    fetch("./config/CarList.json").then(res => res.json()).then(setCars);
  }, [])
  return (
    <Select
        value={record.info.car ?? "未选择"}
        onClose={() => {
          setTimeout(() => {
            //@ts-ignore
            document.activeElement?.blur?.();
          }, 0)
        }}
        onChange={(v) => { setCar(record.info.fullPath, v.target.value); }}
        displayEmpty
        variant="filled"
        inputProps={{ 'aria-label': 'Without label' }}
        style={{ width: "100px", lineHeight: "20px" }}
        // className={classes.bagInfoContext}
      >
        {cars.map(v => <MenuItem value={v}>{v}</MenuItem>)}
    </Select>
  )
}
function BagDescription({ record, setDescription }: IBagDescription) {

  const classes = useStyles();
  return <>
    {/* <Stack direction="row" spacing={1}>
      <Typography variant="button" display="block" className={classes.bagInfoTitle}>
        车型:
      </Typography>
      <CarSelect record={record} setCar={setCar} />
    </Stack> */}
    <Stack direction="row" spacing={1}>
      <Typography variant="button" display="block" className={classes.bagInfoTitle}>
        描述:
      </Typography>
      <Input
        maxRows={20}
        multiline={true}
        className={classes.bagInfoContext}
        value={record.description}
        onChange={(v) => setDescription(record.info.fullPath, v.target.value)}
        placeholder="SOC版本20220719-0522"
      />
    </Stack>
  </>
}

function EventRecorder(_props: Props): JSX.Element {
  const classes = useStyles();
  const { bagList, selected, setSelected, setDescription, setCar, recordMap } = useRecordStore(state => state);
  const record = recordMap[selected];
  return (
    <div className={classes.root}>
      <div className={classes.sticky}>
        <Stack  spacing={2}>
          <BagSelect bagList={bagList} selected={selected} setSelected={setSelected} recordMap={recordMap} />
          {record && <BagDescription record={record} setDescription={setDescription} setCar={setCar} />}
          <BagEventList events={recordMap[selected]?.events || []} />
        </Stack>
      </div>
    </div>
  );
}

export default EventRecorder;
