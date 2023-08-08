import {zhito} from "@zhito/proto"
import { Time } from "@foxglove/studio"
import { TF } from "@foxglove/studio-base/types/Messages"


type Message = {
    topic: string;
    receiveTime: Time;
    message: unknown;
    sizeInBytes: number;
}

const dynamic_origin = {
  x: 0,
  y: 0
}

const secToTime = (time:number):Time=>{
  const sec = Math.floor(time)
  const nsec = Math.floor((time - sec) * 1e9)
  return {
    sec,
    nsec
  }
}

const emptyTransform =()=> {
  return{
    header:{
      stamp:{ sec:0,nsec:0},
      frame_id:"_",
      seq:0
    },
    child_frame_id: "__",
    transform:{
      translation:{x:0,y:0,z:0},
      rotation:{x:0,y:0,z:0,w:0}
    }
  }
}


//@ts-ignore
const mesh = {
  header:{
    frame_id:"novatel",
    stamp:{sec:0,nsec:0},
    seq:0
  },
  type:10,
  frame_locked:true,
  mesh_resource:"file:///zhito2ros/assets/J7.dae",
  pose:{
    position:{x:0,y:0,z:0},
    orientation:{x:0,y:0,z:0,w:1}
  },
  points:[],
  colors:[],
  id:0,
  duration:1e12,
  ns:"zhito",
  action:0,
  scale:{x:1,y:1,z:1},

}
export const mockStaticMessages = (_messages:Message[])=>{

}


export const mockTransformToMessages = (messages:Message[] )=>{
  mockStaticMessages(messages);
  for(let i=messages.length-1;i>-1;i--){
    if(messages[i]?.topic==="/zhito/localization/pose"&&messages[i]?.message){
      const localization = messages[i]?.message as zhito.localization.LocalizationEstimate;
      const {x,y} = localization.pose?.position as {x:number,y:number,z:number}
      const {qx,qy,qz,qw} = localization.pose?.orientation as {qx:number,qy:number,qz:number,qw:number}
      if(Math.abs(x - dynamic_origin.x)>10000 || Math.abs(y - dynamic_origin.y)>10000 ){
        dynamic_origin.x = x;
        dynamic_origin.y = y;
      }
      const time = secToTime(localization.header?.timestamp_sec??0);
      const transforms:TF[] = [];
      let tf_msg = emptyTransform();
      tf_msg.header.stamp = time;
      tf_msg.header.frame_id = "dynamic_origin";
      tf_msg.child_frame_id = "world";
      tf_msg.transform.translation.x = -dynamic_origin.x;
      tf_msg.transform.translation.y = -dynamic_origin.y;
      tf_msg.transform.translation.z = 0;
      tf_msg.transform.rotation.x = 0;
      tf_msg.transform.rotation.y = 0;
      tf_msg.transform.rotation.z = 0;
      tf_msg.transform.rotation.w = 1;
      transforms.push(tf_msg);

      tf_msg = emptyTransform();
      tf_msg.header.stamp = time;
      tf_msg.header.frame_id = "dynamic_origin";
      tf_msg.child_frame_id = "local";
      tf_msg.transform.translation.x = x - dynamic_origin.x;
      tf_msg.transform.translation.y = y - dynamic_origin.y;
      transforms.push(tf_msg);

      tf_msg = emptyTransform();
      tf_msg.header.stamp = time;
      tf_msg.header.frame_id = "local";
      tf_msg.child_frame_id = "novatel";
      tf_msg.transform.translation.x = 0;
      tf_msg.transform.translation.y = 0;
      tf_msg.transform.translation.z = 0;
      tf_msg.transform.rotation.x = qx;
      tf_msg.transform.rotation.y = qy;
      tf_msg.transform.rotation.z = qz;
      tf_msg.transform.rotation.w = qw;
      transforms.push(tf_msg);
      messages.push({
        message:{
          transforms
        },
        sizeInBytes:100,
        receiveTime: messages[i]?.receiveTime as Time,
        topic:"/tf"
      })

      mesh.header.stamp = time;
      messages.push({
        message:mesh,
        sizeInBytes:100,
        receiveTime: messages[i]?.receiveTime as Time,
        topic:"/zhito/localization/pose/marker"
      })
      return
    }

  }
}
