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
import { useEffect, useMemo, useRef, useState } from "react";


import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";
import { Stack, Typography, Divider, Select, MenuItem, Input } from "@mui/material";
import { BagInfo, parseTagIndex, RecordObject, useRecordStore, ZhitoEvent, ZhitoTagMap } from "@foxglove/studio-base/components/EventRecorderSidebar/store";
import EventsTabs from "@foxglove/studio-base/components/EventRecorderSidebar/EventsTab";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  container: {
    padding: 0,
    backgroundImage: `linear-gradient(to top, transparent, ${theme.palette.neutralLighterAlt} ${theme.spacing.s1})`,
  },
  item: {
    cursor: "grab",
  },
  sticky: {
    color: colors.LIGHT,
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  searchInputContainer: {
    paddingLeft: 8,
    backgroundColor: theme.semanticColors.inputBackground,
    borderRadius: 4,
    border: `1px solid ${theme.semanticColors.inputBorder}`,
  },
  searchInput: {
    backgroundColor: `${theme.semanticColors.inputBackground} !important`,
    padding: "8px !important",
    margin: "0 !important",
    width: "100%",
    minWidth: 0,

    ":hover, :focus": {
      backgroundColor: theme.semanticColors.inputBackground,
    },
  },
  infoTitle:{ width: "55px", lineHeight: "35px !important",userSelect:"none" },
  infoContext:{ width: "calc(100% - 55px)", maxWidth: "300px", marginLeft: "0px !important"},
  descriptionInput: {
    width: "100%",
    outline: 0,
    zIndex:1,
    borderWidth: "0px 0px 1px 0px",

    ":focus": {
      borderStyle: "solid",
    }
  },
  descriptionPlaceHoder:{
    position: "absolute",
    userSelect: "none",
    zIndex: 0,
    marginLeft:"0px !important"
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

function RecordSelect({ bagList, setSelected, selected,recordMap }: {recordMap:Record<string, RecordObject>, bagList: BagInfo[], setSelected: (val: string) => void, selected: string }) {
  const classes = useStyles();
  return <Stack direction="row" spacing={2}>
    <Typography variant="button" display="block" className={classes.infoTitle}>
      路径:
    </Typography>
    <Select
      value={selected}
      // disableClearabl={true}
      onChange={(e) => setSelected(e.target.value)}
      displayEmpty
      variant="standard"
      inputProps={{ 'aria-label': 'Without label' }}
      className={classes.infoContext}
    >
      {bagList.map(info => <MenuItem value={info.fullPath}>{info.recording ? "(录制中)" : ""}{recordMap[info.fullPath]?.update?"":" *"}{info.name}</MenuItem>)}
    </Select>

  </Stack>
}

const EventItem = React.memo(function ({ event, index }: { event: ZhitoEvent, index: number }): JSX.Element {

  const classes = useStyles();
  const inputref = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>(event.description || "");
  // const updateEvent = useRecordStore(state => state.updateEvent)
  const date = new Date(event.timestamp);
  const timeStr = date.toLocaleTimeString();
  // const dateStr = date.toLocaleDateString();
  const parsedDescription = event.description;
  const tags = useMemo(() => {
    return parseTagIndex(inputText)
  }, [inputText]);
  useEffect(() => {
    setInputText(event.description||"")
  }, [event.description])
  const titile = useMemo(() => {
    const result = tags.map(tag=>ZhitoTagMap[tag||""]).filter(title=>title&&title.slice).join(",")
    return result ===""?"未分类":result
  }, [tags]);
  return (
    <Stack direction="row" >
      <div className="text-index"  style={{
        lineHeight: "30px",
        userSelect: "none",
        textAlign: "center",
        margin: "11px 5px 0px 0px", background: "#535566", width: "30px", height: "30px", borderRadius: "15px"
      }}>
        {index}
      </div>
      <Stack style={{ paddingTop: "5px", width: "90%" }} >
        <Stack direction="row" spacing={1} justifyContent="space-between" style={{ userSelect: "none" }}>
          <Typography variant="button" display="block" gutterBottom>
            {titile}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            {timeStr}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-between">

          <Typography variant="caption" display="block" className={classes.descriptionInput}
            ref={inputref}
            gutterBottom
            contentEditable={false}
            suppressContentEditableWarning={true}
            // onFocus={() => setFocus(true)}
            // onBlur={() => { setFocus(false); updateEvent({timestamp:event.timestamp, description:inputText}) }}
            // onInput={(e) => {console.log(e);setInputText((e.target as HTMLSpanElement).innerText)}}
            // onKeyDown={(e => { if (e.key == "Enter" && !e.ctrlKey) { (e.target as HTMLSpanElement).blur(); e.preventDefault() } })}
          >
            {parsedDescription}
          </Typography>

        </Stack>
      </Stack>
    </Stack>
  )
})

const EditableEventItem =  React.memo(function ({ event, index }: { event: ZhitoEvent, index: number }): JSX.Element {

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
  }, [inputText, focus]);
  useEffect(() => {
    setInputText(event.description||"")
  }, [event.description])
  const tooltip = useMemo(() => {
    const lastTag = tags[tags.length-1]||""
    const children = ZhitoTagMap[lastTag+"-chidren"]
    if(children instanceof Array){
      return children?.map((child,i)=>{
        const index = lastTag===""?i:lastTag+"-"+i;
        return  <div >{`${index}: ${child}`}</div>
      })
    }else{
      return <></>
    }

  }, [tags])
  const titile = useMemo(() => {
    const result = tags.map(tag=>ZhitoTagMap[tag||""]).filter(title=>title&&title.slice).join(",")
    return result ===""?"未分类":result
  }, [tags]);
  return (
    <Stack direction="row" >
      <div className="text-index"  style={{
        lineHeight: "30px",
        userSelect: "none",
        textAlign: "center",
        margin: "11px 5px 0px 0px", background: "#535566", width: "30px", height: "30px", borderRadius: "15px"
      }}>
        {index}
      </div>
      <Stack style={{ paddingTop: "5px", width: "90%" }} >
        <Stack direction="row" spacing={1} justifyContent="space-between" style={{ userSelect: "none" }}>
          <Typography variant="button" display="block" gutterBottom>
            {titile}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            {timeStr}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-between">

          <Typography variant="caption" display="block" className={classes.descriptionInput}
            ref={inputref}
            gutterBottom contentEditable={true}
            suppressContentEditableWarning={true}
            onFocus={() => setFocus(true)}
            onBlur={() => { setFocus(false); updateEvent({timestamp:event.timestamp, description:inputText}) }}
            onInput={(e) => {console.log(e);setInputText((e.target as HTMLSpanElement).innerText)}}
            onKeyDown={(e => { if (e.key == "Enter" && !e.ctrlKey) { (e.target as HTMLSpanElement).blur(); e.preventDefault() } })}
          >
            {parsedDescription}
          </Typography>
          {inputText===""&&<Typography variant="caption" display="float" className={classes.descriptionPlaceHoder}>未添加描述</Typography>}
          {/* <Typography variant="caption" display="block" gutterBottom style={{ userSelect: "none" }}>
            {dateStr}
          </Typography> */}

        </Stack>
        {focus &&
          <Typography variant="caption" display="block" gutterBottom style={{ userSelect: "none",float: "left", top: 0, left: 0 }} >
            {tooltip}
          </Typography>}
      </Stack>
    </Stack>
  )
})

function EventList({events,editable}: {events:ZhitoEvent[],editable:boolean}): JSX.Element {
  // const { events } = useRecordStore(state => state)
  // const {selected} = useRecordStore(state=>state)
  const renderEvents = editable?events:events.slice(0,500)
  return <Stack divider={<Divider orientation="horizontal" flexItem />}>
    {renderEvents.map((event, i) => editable ? <EditableEventItem event={event} index={events.length - i -1} key={events.length - i -1} />:<EventItem event={event} index={events.length - i -1} key={events.length - i -1} />)}
  </Stack>
}

interface IBagDescription{
  record:RecordObject,
  setDescription:(fullpath:string,val:string)=>void
  setCar:(fullpath:string,val:string)=>void
}
function BagDescription({record,setDescription, setCar}:IBagDescription){
  const [cars,setCars] = useState<string[]>([]);
  useEffect(()=>{
    fetch("./config/CarList.json").then(res=>res.json()).then(setCars);
  },[])
  const classes = useStyles();
  return  <>
  <Stack direction="row" spacing={1}>
  <Typography variant="button" display="block" className={classes.infoTitle}>
    车型:
  </Typography>
  <Select
      value={record.info.car??"未选择"}
      onClose={() => {
        setTimeout(() => {
          //@ts-ignore
          document.activeElement?.blur?.();
        }, 0)}}
      onChange={(v)=>{setCar(record.info.fullPath,v.target.value);}}
      displayEmpty
      variant="standard"
      inputProps={{ 'aria-label': 'Without label' }}
      style={{width:"100px",lineHeight:"20px"}}
      className={classes.infoContext}
    >
      {cars.map(v => <MenuItem value={v}>{v}</MenuItem>)}
  </Select>
  </Stack>
  <Stack direction="row" spacing={1}>
  <Typography variant="button" display="block" className={classes.infoTitle}>
    描述:
  </Typography>
  <Input
    maxRows={20}
    multiline={true}
    className={classes.infoContext}
    value={record.description}
    onChange={(v)=>setDescription(record.info.fullPath,v.target.value)}
    placeholder="SOC版本20220719-0522"
  />
</Stack>
</>
}
function RecordPanel(_props: Props): JSX.Element {
  const classes = useStyles();
  const { bagList, selected, displayTab,setDisplayTab,setSelected, setDescription, setCar, recordMap,autoRecordMap } = useRecordStore(state => state);
  const record = recordMap[selected];
  const events = displayTab==="auto"? autoRecordMap[selected]?.events:recordMap[selected]?.events
  return (
    <div className={classes.root}>
      <div className={classes.sticky}>
        <Stack className={classes.container} spacing={2}>
          <RecordSelect bagList={bagList} selected={selected} setSelected={setSelected} recordMap={recordMap}/>
          {record && <BagDescription record={record} setDescription={setDescription} setCar={setCar}/>}
          <EventsTabs displayTab={displayTab} setDisplayTab={setDisplayTab}></EventsTabs>
          <EventList events={events??[]} editable={displayTab=="manual"}/>
        </Stack>
      </div>
    </div>
  );
}

export default RecordPanel;
