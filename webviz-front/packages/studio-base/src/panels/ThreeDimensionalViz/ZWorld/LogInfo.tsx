import { useMessagesByTopic } from "@foxglove/studio-base/PanelAPI";
import { useEffect } from "react";
import { useSnackbar, VariantType } from 'notistack';

// byte DEBUG=1
// byte INFO=2
// byte WARN=4
// byte ERROR=8
// byte FATAL=16

type ROSLog = {
  header:{stamp:{
    sec:number,
    nsec:number
  }},
  level:number,
  name:string,
  msg:string,
  file:string,
  function:string,
  line:number
}
const LevelMap: Record<number,string> = {
  1: "info",
  2: "info",
  4: "warning",
  8: "error",
  16: 'error'
}
// 'default' | 'error' | 'success' | 'warning' | 'info';
export const LogInfoFrame = () =>{
  const posTopic = "/zhito/log";
  const { [posTopic]: logMessages } = useMessagesByTopic({
    topics: [posTopic],
    historySize: 1
  }) as unknown as { [key: string]: { message: ROSLog  }[] }
  const { enqueueSnackbar } = useSnackbar();
  useEffect(()=>{

    const message = logMessages?.[0]?.message;
    if(message){
      const level = (LevelMap[message.level] ?? "info") as VariantType
      enqueueSnackbar(`【${message.name}】${message.msg}`, { variant: level });
    }
  },[logMessages])
  return <></>
}
