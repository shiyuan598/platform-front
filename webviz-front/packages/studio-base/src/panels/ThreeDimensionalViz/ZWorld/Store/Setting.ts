import { zhito } from '@foxglove/studio-base/../../zhito-proto'
import { StoreSlice } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store'


export type SettingStore = {
  adcGltf: boolean,
  debugMode: boolean,

  currentLane: zhito.hdmap.ILane|undefined,
  MapSetting: {
    ROAD: boolean,
    LANE: boolean,
    LANE_CENTER: boolean,
    LANE_NO_MARK: boolean,
    LANE_ID: boolean,
    LANE_POINT:boolean,
    SIGNAL: boolean,

  },
  PPSetting:{
    lifetime: boolean,
    localFrame: boolean,
    predictionObstacle: boolean,
    pathPoint:{
      line:boolean,
      lineWidth:number,
      lineColor:number,
      pointColor:number,
      point:boolean,
    },
    setPathPoint:(key:string,val:boolean)=>void
    setLifeTime: (val:boolean)=>void,
    setLocalFrame: (val:boolean)=>void,
    setPredictionObstacle: (val:boolean)=>void,
  },
  ObstacleSetting:{
    dashLine: boolean,
    subType:boolean,
    obstacleID: boolean,

    velocityXY: boolean,
    setDashLine: (val:boolean)=>void,
    setSubType: (val:boolean)=>void,
    setDisplayText:(key:string,val:boolean)=>void
  },
  SensorFrameSetting:{
    localFrame: boolean
    boundingBox: boolean
    speedArrow: boolean
    sensorList:string[],
    displayText: {
      obj_id:boolean,
      obj_track_id: boolean,
      obj_sensor_id: boolean,
      obj_local_center:boolean,
      obj_velocity:boolean,
      obj_rel_velocity: boolean,
      obj_type: boolean,
      obj_sub_type: boolean,
      obj_confidence: boolean,
    },
    colorMap: Record<string, number>,
    visibleMap: Record<string, boolean>,
  },
  LOC:{
    ZicOffset:number,
    LocOffset:number,
  },
  setAdcGltf: (val:boolean)=>void,
  setSpeedArrow: (val:boolean)=>void,
  toggleDebugMode: ()=>void
  setZicOffset: (val:number)=>void
  setLocalFrame: (val:boolean)=>void,
  setBoundingBox: (val:boolean)=>void,
  setMapTypeVisible: (type:string,visible:boolean)=>void,
  setSensorFrameDisplayText: (type:string,visible:boolean)=>void,

  setCurrentLane: (lane:zhito.hdmap.ILane|undefined)=>void,
  ensureSensorId:(id:string,colorList:number[])=>void
  setSensorProp:(id:string,type:string,value:number|boolean)=>void,

}

export const LINE_TYPES = {
  SOLID_LINE: "SOLID_LINE",
  DASH_LINE: "DASH_LINE"
}

export const createSettingSlice:StoreSlice<SettingStore> = (set,get)=>({
    adcGltf: true,
    debugMode:true,
    currentLane: undefined,
    PPSetting:{
      lifetime: true,
      localFrame: true,
      predictionObstacle: false,
      pathPoint:{
        line:false,
        lineWidth:1,
        lineColor:0xff0000,
        pointColor:0xffffff,
        point:false,
      },
      setPathPoint:(key:string,val:boolean)=>{set((state:SettingStore)=>({PPSetting:{
        ...state.PPSetting,
        pathPoint:{...state.PPSetting.pathPoint,[key]:val}}}))},
      setLifeTime:(val:boolean)=>{set((state:SettingStore)=>({PPSetting:{...state.PPSetting,lifetime:val}}))},
      setLocalFrame:(val:boolean)=>{set((state:SettingStore)=>({PPSetting:{...state.PPSetting,localFrame:val}}))},
      setPredictionObstacle:(val:boolean)=>{set((state:SettingStore)=>({PPSetting:{...state.PPSetting,predictionObstacle:val}}))},
    },
    ObstacleSetting:{
      dashLine: false,
      subType: false,
      obstacleID: true,
      velocityXY: false,
      setDashLine: (val:boolean)=>{set((state:SettingStore)=>({ObstacleSetting:{...state.ObstacleSetting,dashLine:val}}))},
      setSubType: (val:boolean)=>{set((state:SettingStore)=>({ObstacleSetting:{...state.ObstacleSetting,subType:val}}))},
      setDisplayText: (key:string,val:boolean)=>{set((state:SettingStore)=>({ObstacleSetting:{...state.ObstacleSetting,[key]:val}}))},
    },
    MapSetting: {
      ROAD: false,
      LANE: true,
      LANE_POINT:false,
      LANE_CENTER: false,
      LANE_NO_MARK: false,
      LANE_ID:false,
      SIGNAL: true,
    },
    LOC:{
      ZicOffset:0,
      LocOffset:0,
    },
    SensorFrameSetting:{
      localFrame: true,
      boundingBox: false,
      speedArrow: false,
      sensorList:[]as string[],
      displayText: {
        obj_id:false,
        obj_track_id: false,
        obj_sensor_id:true,
        obj_local_center:false,
        obj_velocity:false,
        obj_rel_velocity: false,
        obj_type: false,
        obj_sub_type: false,
        obj_confidence:false,
      },
      visibleMap: {} as Record<string, boolean>,
      colorMap: {} as Record<string, number>
    },
    setZicOffset: (val:number)=>{set((state:SettingStore)=>({LOC:{...state.LOC,ZicOffset:val}}))},
    setAdcGltf: (val:boolean)=>set( ()=>({adcGltf:val}) ),
    toggleDebugMode:()=>set((state=>({debugMode:!state.debugMode}))),
    setSpeedArrow: (val:boolean)=>{set((state:SettingStore)=>({SensorFrameSetting:{...state.SensorFrameSetting,speedArrow:val}}))},
    setBoundingBox: (val:boolean)=>{set((state:SettingStore)=>({SensorFrameSetting:{...state.SensorFrameSetting,boundingBox:val}}))},
    setLocalFrame: (val:boolean)=>{set((state:SettingStore)=>({SensorFrameSetting:{...state.SensorFrameSetting,localFrame:val}}))},
    setMapTypeVisible: (type:string,visible:boolean)=>{set((state:SettingStore)=>({MapSetting:{...state.MapSetting,[type]:visible}}))},
    setSensorFrameDisplayText: (type:string,visible:boolean)=>{set((state:SettingStore)=>({
      SensorFrameSetting:{
        ...state.SensorFrameSetting,
        displayText:{
          ...state.SensorFrameSetting.displayText,
          [type]:visible
        }
      }
    }))},
    setCurrentLane: (lane:zhito.hdmap.ILane|undefined)=>{
      set(()=>(
        {currentLane: lane}
      ))
    },
    ensureSensorId:(id:string,colorList:number[])=>{
      if(get().SensorFrameSetting.colorMap[id]==undefined){
        set((state:SettingStore)=>{
          const color = colorList[state.SensorFrameSetting.sensorList.length%colorList.length] as number;
          return {
            SensorFrameSetting:{
              ...state.SensorFrameSetting,
              sensorList:state.SensorFrameSetting.sensorList.concat([id]),
              colorMap:{
                ...state.SensorFrameSetting.colorMap,
                [id]:color
              },
              visibleMap:{
                ...state.SensorFrameSetting.visibleMap,
                [id]:true
              }
            }
          }
      })
      }
    },
    setSensorProp:(id:string,type:string,value:number|boolean)=>{
      set(state=>{
        const SensorFrameSetting = state.SensorFrameSetting;
        if(type==="color"){
          SensorFrameSetting.colorMap[id] = value as number
        }else if(type==="visible"){
          SensorFrameSetting.visibleMap[id] = value as boolean
        }
        return {SensorFrameSetting}
      })
    }
  })
