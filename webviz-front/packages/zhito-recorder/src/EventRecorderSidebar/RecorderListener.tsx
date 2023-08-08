import { useCallback, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { RecordObject, useRecordStore, ZhitoEvent } from "./store";


export default function RecoderLisener(){
  const {recording,connected, recordMap, syncServer, fetchRecord,setBagList,setRecord,setConnected} = useRecordStore(state=>state);
  const { enqueueSnackbar } = useSnackbar();
  const handleKeyDown = useCallback(async (event:KeyboardEvent) => {
    if(event.key==="Enter" && event.ctrlKey){
      if(!connected){
        enqueueSnackbar(`服务连接失败, 请使用v3na-ros2-tools v2.3.3.3-0730以上版本`, {variant: "error" });
        return;
      }
      if(recording===""){
        enqueueSnackbar(`请使用 ros2 bag sub --cyber --bag 启动录制`, {variant: "error" });
        return;
      }
      let record:RecordObject|undefined;
      console.log(recordMap,recording)
      if(!recordMap[recording]){
        record = await fetchRecord(recording);
      } else{
        record = recordMap[recording];
      }
      if(record){
        const now = new Date();
        const newEvent:ZhitoEvent = {timestamp:now.getTime(), description: ""}
        const events = [newEvent].concat(record.events);
        const newRecord = {
          ...record,
          update:false,
          events:events
        }
        setRecord(recording,newRecord);
        if(!newRecord.info.car||newRecord.info.car==="未选择"){
          enqueueSnackbar(`事件已记录, 请选择车型！`, { variant: "warning" });
        }else{
          enqueueSnackbar(`事件已记录, 保存至 ${record.info.name}`, { variant: "success" });
        }

      }


    }
    // console.log(event.key,event.ctrlKey)
  }, [recording,connected,recordMap,setRecord]);


  useEffect(()=>{
    let timeout:NodeJS.Timeout;
    const fetchBagList = async ()=>{

      await fetch(`http://${window.location.hostname}:8091/bag/list`).then(res=>res.json()).then(json=>{
          setBagList(json);
          setConnected(true);
        }).catch(_e=>{
          setConnected(false);
        })
      await syncServer(enqueueSnackbar);


      timeout = setTimeout(fetchBagList,3000);
    }
    fetchBagList();
    return ()=>{
      clearTimeout(timeout);
    }
  },[setBagList,setConnected,syncServer, enqueueSnackbar])

  useEffect(()=>{

    document.body.addEventListener("keydown",handleKeyDown);

    return ()=>{
      document.body.removeEventListener("keydown",handleKeyDown);
    }
  },[recording,connected, recordMap])
  useEffect(()=>{
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.id="zhito_record_download"
    // a.style = "display: none";
  },[])



  return <a></a>
}
