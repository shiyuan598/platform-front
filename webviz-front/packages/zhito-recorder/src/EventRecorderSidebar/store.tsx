
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';
import create from 'zustand'

export type ZhitoEvent = {
  title?: string //compute prop
  subTitle?: string //compute prop
  timestamp: number
  formatDate?: string //compute prop
  description?: string
  tags?:string
  parsedTag?:string
}



export type RecordObject = {
  update?:boolean
  info:BagInfo,
  description: string,
  events:ZhitoEvent[]
}


interface RecordState {
  recording: string
  selected: string
  connected: boolean
  bagList:BagInfo[]
  events: ZhitoEvent[]
  recordMap:Record<string,RecordObject>
  setSelected: (val:string) => void
  setConnected: (val:boolean) => void
  setBagList: (evets:BagInfo[]) => void
  setEvents: (evets:ZhitoEvent[]) => void
  fetchRecord: (val:string) => Promise<RecordObject>
  setDescription:(val:string,des:string)=>void
  setCar:(val:string,des:string)=>void
  setRecord:(val:string,record:RecordObject)=>void
  removeEvent: (timestamp:number) => void
  syncServer:(enqueueSnackbar:(message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey)=>void
  updateEvent: (timestamp:number,des:string)=>void,
  dumpFile?:()=>void
}

export interface BagInfo {
    name:string
    car?:string
    fullPath: string
    startTimestamp: number
    endTimestamp: number
    recording:false
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
    const lines = text.split("\n").slice(1,100);
    lines.forEach(line=>{
      const [indexs,tag0,tag1,tag2,_description] = line.split(",");
      if(!tag0||!tag1){
        console.log(tag0,tag1,tag2)
        return
      }
      const index0 = pushTag("",tag0||"");
      const index1 = pushTag(""+index0,`${tag0}-${tag1}`);
      if(tag2!=="") {
        const index2 = pushTag(""+index0+"-"+index1,`${tag0}-${tag1}-${tag2}`);
        if(indexs!==`${index0}-${index1}-${index2}`){
          console.log("index match failed:",indexs,`${index0}-${index1}-${index2}`)
        }
      }
    })
  })
}
parseTags();
export const useRecordStore = create<RecordState>((set,get) => ({
  recording: "",
  selected: "",
  connected: false,
  bagList:[],
  events: [],
  recordMap: {},
  recordingBag:"",
  setConnected:(val:boolean) => set((state) => { return { connected: val,recording: val?state.recording:"" }}),
  fetchRecord: async (fullPath:string) => {
    const record = await fetch(`http://${window.location.hostname}:8091/bag/events?full_path=${fullPath}`).then(res=>res.json());
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
  setSelected:async (val:string) => {
    const state = get();
    if(!state.recordMap[val]){
      const record = await state.fetchRecord(val);
      state.setRecord(val,record);
    }
    set(() => {return { selected: val }
  })},
  setBagList:(list:BagInfo[]) => set((state) => {
    const recording = list[0]?.recording ? list[0]?.fullPath:"";
    const selected = state.selected;
    if(selected===""&&list.length>0){
      state.setSelected(list[0]?.fullPath??"")
      return { bagList: list,recording:recording}
    }else{
      return { bagList: list,recording:recording}
    }

  }),
  setEvents: (events:ZhitoEvent[]) => set(() => { return { events: events }}),
  setRecord: (fullpath:string,record:RecordObject) => set((state) => {
    const newMap = {...state.recordMap,[fullpath]:record };
    return { recordMap: newMap }
  }),
  updateEvent: (timestamp:number,description:string)=>{
    const state = get();
    const record = state.recordMap[state.selected]
    if(record?.events){
      record.events = record.events.map(e=>{
        if(e.timestamp==timestamp){
          record.update = false;
          e.description = description
          const tags = parseTagIndex(description).filter(tag=>tag&&tag.slice) as string[]
          e.tags = tags.join(",");
          e.parsedTag = tags.map(tag=>ZhitoTagMap[tag]).join(",")
        }
        return e
      })
      state.setRecord(state.selected,record);
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
