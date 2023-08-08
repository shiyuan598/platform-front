import { zhito } from "@zhito/proto"

import { Time } from "@foxglove/rostime";
import { StoreSlice } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { TransformObjects } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject";
import {
  CoordinateFrame,
  TransformTree,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/transforms";
import { Topic } from "@foxglove/studio-base/players/types";
import { Vector3 } from "three";

function IsArray(obj: any) {
  return obj && typeof obj == "object" && obj instanceof Array;
}

function DeepClone<T>(tSource: T, tTarget?: Record<string, any> | T): T {
  if (IsArray(tSource)) {
      tTarget = tTarget || [];
  } else {
      tTarget = tTarget || {};
  }
  for (const key in tSource) {
      if (Object.prototype.hasOwnProperty.call(tSource, key)) {
          if (typeof tSource[key] === "object" && typeof tSource[key] !== null) {
              tTarget[key] = tTarget[key] ? tTarget[key] : IsArray(tSource[key]) ? [] : {};
              DeepClone(tSource[key], tTarget[key]);
          } else {
              tTarget[key] = tSource[key];
          }
      }
  }
  return tTarget as T;
}

export type TopicInfoItem = {
  key: string,
  display: string,
  colorMapping?: Record<string, string>
  mapping?: Record<string, string>,
  displayOnMatch?:boolean
}

export type TopicInfo = {
  topic: string;
  title: string;
  items: TopicInfoItem[]
}
export type RoutePoint = {x:number,y:number,lon:number,lat:number,pathEnd?:boolean}


export const PickedType = {
  "NONE":0,
  "MAP":1,
  "OBSTACLE":2,
  "SENSORFRAME":3,
  "POINTCLOUD":4,
}
export type PickedObject = {
  type?: number,
  id?:string,
  object?:any
}
export type WorldStore = {
  mode: "Sweep"|"L3"|"L4"|"None";
  gcj02: boolean;
  offline:boolean;
  setOffline: (offline: boolean) => void,
  enableSimControl:boolean;
  showHistoryPath:boolean;
  setShowHistoryPath: (val:boolean)=>void;
  infoList:TopicInfo[];
  historyPath:Vector3[];
  routePath: RoutePoint[];
  transforms: TransformTree;
  renderFrame: CoordinateFrame;
  fixedFrame: CoordinateFrame;
  currentTime: Time;
  // markerProviders: MarkerProvider[];
  protoTopics: Topic[];
  protoFrame: Record<string, any>;
  localization: zhito.localization.LocalizationEstimate;
  offsetPosition: { x: number, y: number };
  dynamicOrigin: { x: number, y: number };
  transformObjects: TransformObjects;
  pickedObject: PickedObject,
  setPickedObject:(picked:PickedObject)=>void,
  setOptionStatus: (key:string,value:boolean)=>void;
  updateWorldStore:(store:Partial<WorldStore>)=>void;
  initConfig:()=>void;
  setTransforms: (transforms: TransformTree) => void,
  setRenderFrame: (renderFrame: CoordinateFrame) => void
  setFixedFrame: (fixedFrame: CoordinateFrame) => void,
  setCurrentTime: (currentTime: Time) => void,
  setProtoFrame: (protoFrame: Record<string, any>) => void
  setProtoTopics: (protoTopics: Topic[]) => void;
  setLocalization: (localization: zhito.localization.LocalizationEstimate) => void
  setOffsetPosition: (x: number, y: number) => void;
  setDynamicOrigin: (x: number, y: number) => void;
  setTransformObjects: (transformObjects: TransformObjects)=>void
}

const emptyFrame = new CoordinateFrame("empty", undefined)
const emptyLocal = new zhito.localization.LocalizationEstimate();
export const createWorldSlice:StoreSlice<WorldStore> = (set,get) => ({
  mode: "None",
  gcj02: false,
  offline:true,
  enableSimControl: false,
  infoList:[],
  setOffline:offline=>{set(()=>({offline:offline}))},
  initConfig: ()=>{
    const state = get();
    if(state.mode==="None"){
      fetch("./config/Info-L3.json").then(res=>res.json()).then(json=>{
        set(DeepClone(json,state));
      })
    }
  },
  showHistoryPath:false,
  routePath:[],
  //@ts-ignore
  setOptionStatus: (key:string,value:boolean)=>{set(()=>({[key]:value}))},
  //@ts-ignore
  updateWorldStore:(store:Partial<WorldStore>)=>{set(()=>store)},
  setShowHistoryPath: show=>{set(()=>({showHistoryPath:show}))},
  historyPath: [],
  transforms: new TransformTree,
  renderFrame: emptyFrame,
  protoFrame: {},
  protoTopics: [],
  fixedFrame: emptyFrame,
  currentTime: { sec: 0, nsec: 0 },
  localization: emptyLocal,
  offsetPosition: { x: 0, y: 0 },
  dynamicOrigin: { x: 0, y: 0 },
  transformObjects: {},
  pickedObject:{type:PickedType.NONE},
  setPickedObject: (pickedObject:PickedObject)=>{ set(() => ({ pickedObject })) },
  setTransforms: (transforms) => { set(() => ({ transforms })) },
  setRenderFrame: (renderFrame) => { set(() => ({ renderFrame })) },
  setFixedFrame: (fixedFrame) => { set(() => ({ fixedFrame })) },
  setCurrentTime: (currentTime) => { set(() => ({ currentTime })) },
  setProtoTopics: (protoTopics) => { set(() => ({ protoTopics })) },
  setProtoFrame: (protoFrame) => { set(() => ({ protoFrame })) },
  setLocalization: (localization) => { set(() => ({ localization })) },
  setOffsetPosition: (x, y) => { set((state) => {
    const historyPath = state.historyPath;
    historyPath.push(new Vector3(x, y));
    return {
      offsetPosition: { x, y },
      historyPath: historyPath.length>100?historyPath.slice(historyPath.length-100,historyPath.length):historyPath
    }
  }
  ) },
  setDynamicOrigin: (x, y) => { set(() => ({ dynamicOrigin: { x, y } })) },
  setTransformObjects: (transformObjects: TransformObjects)=>{ set((state) => {
    const needToUpdate:TransformObjects = {};
    Object.keys(transformObjects).forEach(key=>{
      const object = transformObjects[key] as THREE.Object3D;
      const oldObject = state.transformObjects[key]
      const targetEmpty = object&&!oldObject;
      const sameValue = object&&oldObject&&(object.position.equals(oldObject.position))&&object.quaternion.equals(oldObject.quaternion);
      if(targetEmpty||!sameValue){
        needToUpdate[key] = object;
      }
    })
    return {
      transformObjects:{
        ...state.transformObjects,
        ...needToUpdate
      }
    }
   }) }
})
