
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';
import create from 'zustand'

export type ZhitoEvent = {
  title?: string //compute prop
  subTitle?: string //compute prop
  timestamp: number
  start?:number
  end?:number
  formatDate?: string //compute prop
  description?: string
  priority?: string
  manualPriority?:boolean
  duration?: number
  manualDuration?:boolean
  tags?:string
  parsedTag?:string
  subEventStamp?:number
}



export type RecordObject = {
  update?:boolean
  info:BagInfo,
  description: string,
  events:ZhitoEvent[]
}


interface RecordState {
  recordingKey: string
  selected: string
  connected: boolean
  voiceRecording: boolean
  autoRecording: boolean
  bagList:BagInfo[]
  displayTab:"manual"|"auto"
  events: ZhitoEvent[]
  autoEvents: ZhitoEvent[]
  recordMap:Record<string,RecordObject>
  autoRecordMap: Record<string,RecordObject>
  setSelected: (val:string,force?:boolean) => void
  setDisplayTab: (tab:"manual"|"auto")=>void
  setStatus: (connected:boolean,voiceRecording:boolean, autoRecording:boolean) => void
  setBagList: (evets:BagInfo[]) => void
  setEvents: (evets:ZhitoEvent[]) => void
  fetchRecord: (val:string, auto?:boolean) => Promise<RecordObject>
  setDescription:(val:string,des:string)=>void
  setCar:(val:string,des:string)=>void
  setRecord:(val:string,record:RecordObject,auto?:boolean)=>void
  removeEvent: (timestamp:number) => void
  syncServer:(enqueueSnackbar:(message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey)=>void
  updateEvent: (event:ZhitoEvent,append?:boolean)=>void,
  dumpFile?:()=>void
}

export interface BagInfo {
    name:string
    car?:string
    fullPath: string
    startTimestamp: number
    endTimestamp: number
    recording:false,
    updateTime?:number,
    version: number
    autoVersion?:number
}

export function updateLocalStorage(events:ZhitoEvent[]){
  localStorage.setItem("zhito_record",JSON.stringify(events))
}


export function getLocalEvents(){

}

export function parseTagIndex(description:string = ""):(string | undefined)[]{
  // debugger
  const tags = description?.split("，").join(",").split(",")
    .map(str=>str.match(/[0-9]{1,2}(-[0-9]{1,2})?(-[0-9]{1,2})?/)?.[0])
    //.filter(tag=>tag&&tag.length>0);
  return tags
  // if(!indexStr){
  //   return [-1,-1]
  // } else{
  //   const [mainIndex,subIndex] = indexStr.split("-").map(v=>parseInt(v));
  //   //@ts-ignore
  //   return [isNaN(mainIndex)?-1:mainIndex,isNaN(subIndex)?-1:subIndex];
  // }
}

type TagMapType = Record<string,string[]|string>
export const ZhitoTagMap:TagMapType = {
  default:[]
}
export const EventPriorityMap:Record<string,string> = {

}

export const EventDurationMap: Record<string,number> = {

}

function pushTag(parent:string, tag:string):number{
  if(parent==="-1") {
    debugger
  }
  if(tag==="")return -1;

    const tags = ZhitoTagMap[parent+"-chidren"] = ZhitoTagMap[parent+"-chidren"]||[];
    let index = tags.indexOf(tag)
    if(index===-1){
      (tags as string[]).push(tag)
      index = tags.length-1;
    }
    const key = parent==="" ? `${index}`:`${parent}-${index}`
    ZhitoTagMap[key] = tag

    return index;
}

function parseTags(){
  fetch("./config/zhito-tag.csv").then(res=>res.text()).then(text=>{
    const lines = text.split("\n").slice(1,10000);
    lines.forEach(line=>{
      const [indexs,tag0,tag1,tag2,_tag3,_tag4,priority,duration,_description] = line.split(",");
      if(!tag0||!tag1){
        console.log(tag0,tag1,tag2)
        return
      }
      const index0 = pushTag("",tag0||"");
      const index1 = pushTag(""+index0,`${tag0}-${tag1}`);
      if(tag2!=="") {
        const index2 = pushTag(""+index0+"-"+index1,`${tag0}-${tag1}-${tag2}`);
        const parsedIndexs = `${index0}-${index1}-${index2}`
        if(priority!==undefined && duration!==undefined){
          EventPriorityMap[parsedIndexs] = priority;
          EventDurationMap[parsedIndexs] = parseInt(duration)
        }

        if(indexs?.trim()!==parsedIndexs){
          console.log("index match failed:",indexs?.trim(),parsedIndexs)

        }
      }
    })
  })
}
parseTags();
export const useRecordStore = create<RecordState>((set,get) => ({
  recordingKey: "",
  selected: "",
  displayTab:"manual",
  connected: false,
  voiceRecording:false,
  autoRecording:false,
  bagList:[],
  events: [],
  autoEvents:[],
  recordMap: {},
  autoRecordMap:{},
  recordingBag:"",
  setStatus:(connected:boolean,voiceRecording:boolean,autoRecording:boolean) => set((state) => { return { connected,voiceRecording,autoRecording,recordingKey: connected?state.recordingKey:"" }}),
  setDisplayTab:(tab:"manual"|"auto")=>set(() => { return { displayTab:tab }}),
  fetchRecord: async (fullPath:string,auto=false) => {
    const record = await fetch(`http://${window.location.hostname}:8091/bag/events?full_path=${fullPath}${auto?"&auto=true":""}`).then(res=>res.json());
    return record;
  },
  setDescription:(fullpath:string,des:string)=> {
    const state = get();
    const record = state.recordMap[fullpath];
    if(record){
      set((state) => {

        if(record){
          record.description = des;
          record.update = false;
        }
        return { recordMap: {...state.recordMap,[fullpath]:record }
      }})
    }
},
setCar:(fullpath:string,car:string|undefined)=> {
  const state = get();
  const record = state.recordMap[fullpath];
  if(record&&car){
    set((state) => {

      if(record){
        record.info.car = car;
        record.update = false;
      }
      return { recordMap: {...state.recordMap,[fullpath]:record }
    }})
  }
  },
  setSelected:async (val:string, forceUpdate?:boolean) => {
    const state = get();
    if(!state.recordMap[val]||forceUpdate){
      const displayTab = state.displayTab;
      const auto = displayTab ==="auto";
      const record = await state.fetchRecord(val,auto);
      state.setRecord(val,record,auto);
    }
    set(() => {return { selected: val }
  })},
  setBagList:(list:BagInfo[]) => set((state) => {
    const recordingKey = list[0]?.recording ? list[0]?.fullPath:"";
    let selected = state.selected;
    if(selected===""&&list.length>0){
      selected = list[0]?.fullPath??"";
      state.setSelected(selected);

    }else if(selected!==""&&list.length>0){
      const currentVersion = state.recordMap[selected]?.info?.version??0;
      const remoteVersion = list.find(item=>item.fullPath===selected)?.version??0;
      const currentAutoVersion = state.autoRecordMap[selected]?.info?.version??-1;
      const remoteAutoVersion = list.find(item=>item.fullPath===selected)?.autoVersion??0;
      // console.log(currentRecordInfo?.version,fectedRecordInfo?.version)
      const manualNeedUpdate = currentVersion<remoteVersion && state.displayTab==="manual";
      const autoNeedUpdate = currentAutoVersion<remoteAutoVersion && state.displayTab==="auto"
      //@ts-ignore
      if(manualNeedUpdate||autoNeedUpdate){
        state.setSelected(selected,true);
      }
    }

    return { bagList: list,recordingKey:recordingKey}

  }),
  setEvents: (events:ZhitoEvent[]) => set(() => { return { events: events }}),
  //@ts-ignore
  setRecord: (fullpath:string,record:RecordObject,auto:boolean = false) => set((state) => {
    if(auto){
      const newMap = {...state.autoRecordMap,[fullpath]:record };
      return { autoRecordMap: newMap }
    }else{
      const newMap = {...state.recordMap,[fullpath]:record };
      return { recordMap: newMap }
    }

  }),
  updateEvent: (event:ZhitoEvent,append:boolean=false)=>{
    const state = get();
    const recordName = append ? state.recordingKey : state.selected;
    const record = state.recordMap[recordName];
    if(record?.events){
      if(append){
        record.events = [event].concat(record.events);
      }
      const {priority,duration} = event;

      const targetIndex = record.events.findIndex(e=>e.timestamp===event.timestamp);
      const targetEvent = record.events[targetIndex];
      if(targetEvent){
        record.update = false;
        const description = event.description ?? targetEvent?.description;
        targetEvent.description = description
        // 更新标签
        const tags = parseTagIndex(description).filter(tag=>tag&&tag.slice) as string[]
        targetEvent.tags = tags.join(",");
        targetEvent.parsedTag = tags.map(tag=>ZhitoTagMap[tag]).join(",");
        // 更新优先级
        const parsedPriority = EventPriorityMap[tags[0]??""];
        if(priority){
          targetEvent.priority = priority;
          targetEvent.manualPriority = true;
        } else if(parsedPriority&&!targetEvent.manualPriority){
          targetEvent.priority = parsedPriority;
        }
        // 更新切割时长
        const parsedDuration = EventDurationMap[tags[0]??""];
        if(duration && duration>0){
          targetEvent.duration = duration;
          targetEvent.manualDuration = true;
        }else if(parsedDuration&&parsedDuration>0&&!targetEvent.manualDuration){
          targetEvent.duration = parsedDuration;
        } else if(targetEvent.duration===undefined){
          targetEvent.duration = 30;
        }

        targetEvent.start = Math.floor(targetEvent.timestamp-targetEvent.duration*1000/2)
        if(event.subEventStamp!=undefined){
          targetEvent.subEventStamp = event.subEventStamp;
        }
        //@ts-ignore
        targetEvent.end = Math.floor((targetEvent.subEventStamp>0?targetEvent.subEventStamp:targetEvent.timestamp)+targetEvent.duration*1000/2)
      }
      state.setRecord(recordName,record);
    }

  },
  removeEvent: (timestamp:number) => set((state) => {
    const events = state.events.filter(event=>event.timestamp!==timestamp);
    updateLocalStorage(events);
    return {events}
  }),
  syncServer:async (enqueueSnackbar:(message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey)=>{
    const state = get();
    const keys=  Object.keys(state.recordMap);
    const newRecords = {}
    keys.forEach(key=>{
      const record = state.recordMap[key];
      if(record&&!record.update){
        record.update = true;
        record.info.version = isNaN(record.info.version) ? 0 : (record.info.version+1);
        fetch(`http://${window.location.hostname}:8091/bag/events`,{
          method:"post",
          headers:{
            "Content-Type": "application/json"
          },body:JSON.stringify({
            fullPath: key,
            data: record
          })
        }).then(res=>res.json()).then((json)=>{
          if(!json.error){
            //@ts-ignore
            newRecords[key] = record
          }else{
            enqueueSnackbar(`事件失败,${json.error}`, { variant: "error" });
          }
        }).catch(_e=>{
          enqueueSnackbar(`事件失败, 服务器未响应`, { variant: "error" });
        })
      }
    })
    set((state) => { return { recordMap: {...state.recordMap,...newRecords } }})
  },
  dumpFile:()=>set((state) => {
    try{
      const a = document.getElementById("zhito_record_download")
      var json = JSON.stringify(state.events),
          blob = new Blob([json], {type: "octet/stream"}),
          url = window.URL.createObjectURL(blob);
          //@ts-ignore
      a.href = url;
      //@ts-ignore
      a.download = "Record_2022-07-10_10:20:10.json";
      //@ts-ignore
      a.click();
      window.URL.revokeObjectURL(url);
    }catch(e){
    }


    return {}
  })




}))
