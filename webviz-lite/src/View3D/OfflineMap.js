
import React, { useCallback, useEffect, useRef, useState, useMemo  } from "react";
import {Lane,Road} from "./MapElements";
import { useDreamViewMapServer, useDreamviewServer } from "../store/Dreamview";

export const LOCAL_MAP_RADIUS = 100;


/**
 *
 * @param preItems
 * @param newItems
 * @param enableCache
 */
 function mergeItems(preItems,newItems, enableCache){
  if(!enableCache){
    return newItems;
  }
  const preMap = new Map();
  preItems.forEach(v=>preMap.set(v.id.id||"",v))
  const newMap = new Map();
  newItems.forEach(v=>newMap.set(v.id.id||"",v))
  const result = [];

  preMap.forEach(item=>{
    if(newMap.get(item.id.id)||enableCache){

      result.push(item)
    }

  })
  newItems.forEach(item=>{
    if(!preMap.get(item.id.id)){
      result.push(item)
    }
  })
  return result;
}

const MemoLane = React.memo(Lane)
const MemoRoad = React.memo(Road)
const MAX_INSTANCE_LENGTH=1500

const ZMap = ({ map }) => {
  // console.log(map)
  const enableCache  =true;
  const dynamicOrigin = {x:0,y:0};
  const [lanes, setLanes] = useState([])
  const [roads, setRoads] = useState([])
  const MapSetting ={LANE:true,ROAD:true}
  useEffect(() => {
    if (map.lane&&MapSetting.LANE) {

      const newLanes = mergeItems(lanes,map.lane,enableCache)
      setLanes(newLanes.length>MAX_INSTANCE_LENGTH ? newLanes.slice(newLanes.length-MAX_INSTANCE_LENGTH,newLanes.length) : newLanes);
    }
  }, [map.lane, MapSetting.LANE])

  const laneMeshs = useMemo(()=>{
    return lanes.map((lane, i) => {
      return <MemoLane key={`lane-${i}`} lane={lane} show_center={MapSetting.LANE_CENTER} show_id={MapSetting.LANE_ID} showUnknown={MapSetting.LANE_NO_MARK} dynamicOrigin={dynamicOrigin}/>
    })
  },[lanes])


  useEffect(() => {
    if (map.road&&MapSetting.ROAD) {
      const newRoads = mergeItems(roads,map.road,enableCache)
      // setRoads(roads.length>MAX_INSTANCE_LENGTH ? map.road : roads);
      setRoads(newRoads.length>MAX_INSTANCE_LENGTH ? newRoads.slice(newRoads.length-MAX_INSTANCE_LENGTH,newRoads.length) : newRoads);
    }
  }, [map.road, MapSetting])

  const roadMeshs = useMemo(()=>{
    // console.log("re computed")
    return roads.map((road, i) => {
      return <MemoRoad key={`road-${i}`} road={road} dynamicOrigin={dynamicOrigin} showUnknown={MapSetting.LANE_NO_MARK}/>
    })
  },[roads])

  return <>{laneMeshs}</>
}

const MemoZMap = React.memo(ZMap);


export function TransformObject(props) {
  const transRef = useRef();
  const rotationRef = useRef();
  const { transform, children, offset } = props;
  useEffect(() => {
    if (rotationRef.current && transRef.current && transform) {
      if(transform.quaternion){
        const { x: qx, y: qy, z: qz, w: qw } = transform.quaternion;
        rotationRef.current.quaternion.set(qx, qy, qz, qw);
      }

      if(transform.rotation){
        const { x, y, z } = transform.rotation;
        rotationRef.current.rotation.set(x, y, z);
      }
      // console.log(qx, qy, qz, "rotation")
      const { x, y, z } = transform.position;
      if(offset){
        transRef.current.position.set(x-offset.x, y-offset.y, z-offset.z);
      }else{
        transRef.current.position.set(x, y, z);
      }
    }
  }, [transform])
  return <group ref={rotationRef}><group ref={transRef}>{children}</group></group>
}


export default function OfflineMap({localization}) {
  // console.log("re render")
  const [updateTime, setUpdateTime] = useState(Date.now());
  const [updatePose, setUpdatePose] = useState({ x: 0, y: 0 });
  const [map,setMap] = useState({})

  const mapServer = useDreamViewMapServer();
  const server = useDreamviewServer();

  const requestMapElements = useCallback((msg) => {
    // const mapServer = useDreamViewMapServer();
    mapServer.requestMapData(msg.mapElementIds)
  }, []);
  const parseMap = useCallback(({ data: mapdata }) => {
    setMap(mapdata?.toJSON());
    console.log("setmap",mapdata)
  }, [])
  useEffect(() => {
      //@ts-ignore
      server.on("MapElementIds", requestMapElements)
      //@ts-ignore
      mapServer.on("map", parseMap)
    return () => {
      //@ts-ignore
      server.off("MapElementIds", requestMapElements)
      //@ts-ignore
      mapServer.off("map", parseMap)
    }
  }, [])
  useEffect(() => {
    const now = Date.now();
    const deltaTime = now - updateTime;
    if (deltaTime > 1000) {
      setUpdateTime(now);
      if (localization?.pose?.position) {
        //@ts-ignore
        const currentPose = localization.pose.position;
        const [dx, dy] = [(currentPose.x ?? 0) - updatePose.x, (currentPose.y ?? 0) - updatePose.y];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > LOCAL_MAP_RADIUS / 2 && mapServer.ready && server.ready) {
          server.requestMapElementIdsByRadius(LOCAL_MAP_RADIUS * 1.5);
          // console.log("request map")
          setUpdatePose({ x: currentPose.x ?? 0, y: currentPose.y ?? 0 })
        }
      }
    }

  }, [localization, updateTime, updatePose]);

  const transform = {
    position:{
      x:-(localization?.pose.position.x??0),
      y:-(localization?.pose.position.y??0)
    },
    rotation:{
      x:0,
      y:0,
      z:-(localization?.pose.heading??0),//0//
    }
  }//
  const mapToRender = useMemo(()=>{
    // console.log(transform)
    return <TransformObject transform={transform}><MemoZMap map={map} /></TransformObject>
  },[map,transform])
  return mapToRender

}
