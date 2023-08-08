import { Time } from "@foxglove/studio";
import { secToTime } from "@foxglove/studio-base/randomAccessDataProviders/record/util";
import { CompressedImage, ImageMarkerArray } from "@foxglove/studio-base/types/Messages";
import { useState, useEffect, useCallback, useMemo } from "react";



type ImageCallback = (msg:MessageEvent)=>void

class H264Decoder{
  public ready:boolean;
  private messageIndex:number
  private decoderIndex:number;
  private decoderMap:Map<string,number>
  private callBackMap:Map<number,any>
  worker: Worker;
  constructor(){
    this.ready = false;
    this.decoderIndex = 0;
    this.messageIndex = 0;
    this.decoderMap = new Map();
    this.callBackMap = new Map();
    this.worker = new Worker(new URL("decoder/H264Decoder.worker", import.meta.url))
    this.worker.addEventListener('message', (e) => {
      const message = e.data
      switch (message.type) {
        case 'pictureReady':
          this.onPictureReady(message)
          break
        case 'error':
          this.callBackMap.delete(message?.messageId??0);
          console.log("decode error:",message)
          break;
        case 'decoderReady':
          this.ready = true;
          break
      }
    })
  }

  _getDecoderID(topic:string){
    let id = this.decoderMap.get(topic);
    if(id===undefined){
      id = this.decoderIndex++;
      this.decoderMap.set(topic,id);
    }
    return id;
  }
  _getMessageID(){
    return this.messageIndex++;
  }
  onPictureReady ({ width, height, data, messageId }:{ width:number, height:number, data:Uint8Array,messageId:number }) {
    const {imageMessage,callback}:{imageMessage:MessageEvent,callback:ImageCallback} = this.callBackMap.get(messageId) ?? {};
    if(imageMessage){
      //@ts-ignore
      let header = imageMessage.message?.header;
      if(header?.timestamp_sec!==undefined){
        const sec = header.timestamp_sec as number;
        const stamp = secToTime(sec);
        header = {
          stamp,
          seq:1
        }
      }
      callback({
        ...imageMessage,
        message:{
          ...(imageMessage.message as CompressedImage) ,
          encoding:"rgba",
          format: "rgb",
          width,
          height,
          data:new Uint8Array(data),
          header
        }
      });
    }
    this.callBackMap.delete(messageId);
    // onPicture(new Uint8Array(data), width, height)
  }
  decode (imageMessage:MessageEvent,callback:ImageCallback) {
    const messageID = this._getMessageID();
    const message = imageMessage.message as CompressedImage;
    this.worker.postMessage({
      type: 'decode',
      data: new Uint8Array( message.data),
      offset: 0,
      length: message.data.byteLength,
      renderStateId: this._getDecoderID(imageMessage.topic),
      messageId: messageID
    }, [])
    this.callBackMap.set(messageID,{imageMessage:imageMessage,callback})
    // console.log("callback size ",this.callBackMap.size)
  }

}


type MessageEvent = {
  topic: string;
  receiveTime: Time;
  message: unknown;
  sizeInBytes: number;
}

const decoderMap = new Map<string,H264Decoder>()
const getDecoder = (topic:string)=>{
  let decoder = decoderMap.get(topic);
  if(!decoder){
    decoder = new H264Decoder()
    decoderMap.set(topic,decoder);
  }
  return decoder;
}
export const useCacheImage = (imageMessage:MessageEvent|undefined,depth:number) =>{
  const [images,setImages] = useState<MessageEvent[]>([]);
   const addImageMessage = useCallback((imageMessage:MessageEvent) => {
    setImages((pre)=>{
      pre.push(imageMessage);
      const start = Math.max(0, pre.length-depth);
      return pre.slice(start,pre.length);
    })
   }, []);
  useEffect(()=>{
    if(imageMessage){
      const image = imageMessage.message as CompressedImage;
      if(image.format.includes("h264")){
        const decoder = getDecoder(imageMessage.topic);
        decoder.decode(imageMessage,addImageMessage)
      } else if(!image.header.stamp){ // protobuf image
        //@ts-ignore
        if(image.header?.timestamp_sec){
          //@ts-ignore
          const sec = image.header.timestamp_sec as number;
          const stamp = secToTime(sec);
          setImages((pre)=>{
            pre.push({
              ...imageMessage,
              message:{
                //@ts-ignore
                ...imageMessage.message,
                header:{
                  stamp: stamp,
                  seq:1
                }
              }
            });
            const start = Math.max(0, pre.length-depth);
            return pre.slice(start,pre.length);
          })
        }
      }else{
        setImages((pre)=>{
          pre.push(imageMessage);
          const start = Math.max(0, pre.length-depth);
          return pre.slice(start,pre.length);
        })
      }
    }
  },[imageMessage])

  return images
}


export const useCacheMarkers = (markerMessage:MessageEvent[]|undefined,depth:number) =>{
  const [markers,setMarkers] = useState<MessageEvent[]>([]);
  useEffect(()=>{
    if(markerMessage){

      setMarkers((pre)=>{
        const filtered = markerMessage.filter(msg => pre.findIndex(item=>item.receiveTime==msg.receiveTime)==-1)
        const reusult = pre.concat(filtered);
        const start = Math.max(0, reusult.length-depth);
        return reusult.slice(start,reusult.length);
      })

    }
  },[markerMessage])

  return markers
}

type messageWithHeader= {
  header:{
    stamp:Time
  }
}


function isSync(msg1:messageWithHeader,msg2:messageWithHeader):boolean{
  const ms1 = msg1.header.stamp.sec*1000 +  msg1.header.stamp.nsec/1e6;
  const ms2 = msg2.header.stamp.sec*1000 +  msg2.header.stamp.nsec/1e6;
  // console.log(ms1-ms2)
  return Math.abs(ms1-ms2)<40
}
export const useSyncImageAndMarkers = (imageMessages:MessageEvent[],markersMessage:MessageEvent[]):[MessageEvent|undefined,MessageEvent[]] => {
  const [matchedImage, matchedMarkers] = useMemo(()=>{
    let matchedImage:MessageEvent|undefined;
    let matchedMarkers:MessageEvent[] = [];
    for(let i=imageMessages.length-1;i>-1;i--){
      const imageMessage = imageMessages[i]
      const image = imageMessage?.message as CompressedImage;

      markersMessage.forEach(markerMessage=>{
        const marker = (markerMessage.message as ImageMarkerArray)?.markers?.[0]

        if(marker && image && isSync(image,marker)){
          matchedImage = imageMessages[i];
          matchedMarkers.push(markerMessage)
        }
      })
      if(matchedImage){
        return [matchedImage,matchedMarkers]
      }
    }
    if(!matchedImage&&imageMessages.length>0){
      matchedImage = imageMessages[imageMessages.length-1];
    }
    return [matchedImage,matchedMarkers]
  },[imageMessages,markersMessage])
  return [matchedImage,matchedMarkers]
}
