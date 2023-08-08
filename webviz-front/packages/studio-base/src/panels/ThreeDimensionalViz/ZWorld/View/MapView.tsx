// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/



import { zhito } from "@zhito/proto"
import { useEffect, useMemo, useState } from 'react'
import { Object3D } from 'three';

import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import TransformObject from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/TransformObject';
import { Lane, Road } from '@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/View/MapElements';
import { Topic } from '@foxglove/studio-base/players/types';
import { WEBVIZ_LANE_TOPIC, ZHITO_MAP_TOPIC } from "@foxglove/studio-base/util/globalConstants";
import { useDreamviewPlayer } from "@foxglove/studio-base/context/Dreamview/Dreamview";
import { PickedType } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store/WorldBase";
// import { BaseMarker } from "@foxglove/studio-base/types/Messages";





// type LinesProps = {
//   lines: BaseMarker[];
// };


type ViewProps = {
  topic: Topic;
  message: zhito.zmap.ZLocMapMessage | zhito.hdmap.Map;
  rootTransform?: Object3D
}


interface FakeItem {
  id?: any
}
/**
 *
 * @param preItems
 * @param newItems
 * @param enableCache
 */
function mergeItems<T extends FakeItem>(preItems:T[],newItems:T[], enableCache:boolean):T[]{
  if(!enableCache){
    return newItems;
  }
  const preMap = new Map();
  preItems.forEach(v=>preMap.set(v.id.id||"",v))
  const newMap = new Map();
  newItems.forEach(v=>newMap.set(v.id.id||"",v))
  const result:T[] = [];

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
interface IZmap {
  map: zhito.hdmap.IMap,
  enableCache:boolean,
  mapOffset:{x:number,y:number}
}


const ZMap = ({ map, enableCache, mapOffset }: IZmap) => {


  const dynamicOrigin  = useWorldStore(state=>state.dynamicOrigin);
  const pickedObject  = useWorldStore(state=>state.pickedObject);
  const MapSetting  = useWorldStore(state=>state.MapSetting);
  // const {dynamicOrigin}  = useWorldStore();
  const [lanes, setLanes] = useState<zhito.hdmap.ILane[]>([]);
  const [roads, setRoads] = useState<zhito.hdmap.IRoad[]>([]);

  // console.log("state.pickedObject",pickedObject)
  const mapSelected = pickedObject.type ===PickedType.MAP;
  const originWithOffset = useMemo(()=>{
    return {
      x: dynamicOrigin.x - mapOffset.x,
      y: dynamicOrigin.y - mapOffset.y
    }
  }, [dynamicOrigin, mapOffset])

  useEffect(() => {
    if (map.lane&&MapSetting.LANE) {
      const newLanes = mergeItems(lanes,map.lane,enableCache)
      setLanes(newLanes.length>MAX_INSTANCE_LENGTH ? newLanes.slice(newLanes.length-MAX_INSTANCE_LENGTH,newLanes.length) : newLanes);
    }
  }, [map.lane, MapSetting.LANE])

  const laneMeshs = lanes.map((lane, i) => {
    const selected = mapSelected && pickedObject.id===lane.id?.id;
    const picked = (mapSelected && selected) || !mapSelected
    return <MemoLane
      key={`lane-${i}`}
      index={`${i}`}
      picked={picked}
      showPoint={MapSetting.LANE_POINT}
      lane={lane}
      show_center={MapSetting.LANE_CENTER}
      show_id={MapSetting.LANE_ID}
      showUnknown={MapSetting.LANE_NO_MARK}
      dynamicOrigin={originWithOffset}/>
  })

  useEffect(() => {
    if (map.road&&MapSetting.ROAD) {
      const newRoads = mergeItems(roads,map.road,enableCache)
      // setRoads(roads.length>MAX_INSTANCE_LENGTH ? map.road : roads);
      setRoads(newRoads.length>MAX_INSTANCE_LENGTH ? newRoads.slice(newRoads.length-MAX_INSTANCE_LENGTH,newRoads.length) : newRoads);
    }
  }, [map.road, MapSetting])

  const roadMeshs = roads.map((road, i) => {
    const selected = mapSelected && pickedObject.id===road.id?.id;
    const picked = (mapSelected && selected) || !mapSelected
    return <MemoRoad picked={picked} showPoint={MapSetting.LANE_POINT} key={`road-${i}`} road={road} dynamicOrigin={originWithOffset} showUnknown={MapSetting.LANE_NO_MARK}/>
  })

  return <>{...MapSetting.LANE?laneMeshs:[]}{...MapSetting.ROAD?roadMeshs:[]}</>
}

const MemoZMap = React.memo(ZMap);
const ZeroOffset = {x:0,y:0};
export default React.memo(function MapView({ topic, message, rootTransform }: ViewProps) {
  const setCurrentLane = useWorldStore(state=>state.setCurrentLane)
  const [map,mapOffset] = useMemo(() => {

    if (topic.proto === "zhito.zmap.ZLocMapMessage") {
      const msg = (message as zhito.zmap.ZLocMapMessage)
      const map = msg.loc_map;
      const {x,y} = msg.localization?.pose?.global_offset??ZeroOffset;
      return [map, {x:x??0,y:y??0}];
    } else if (topic.proto === "zhito.zmap.ZmapMessage") {
      return [(message as zhito.zmap.ZmapMessage).map,ZeroOffset]
    } else {
      return [message as zhito.hdmap.Map,ZeroOffset]
    }

  }, [topic.proto, message])
  const enableCache = useMemo(()=>{
    return topic.name==ZHITO_MAP_TOPIC
  },[topic])
  useEffect(()=>{
    if(map&&topic.name==="/zhito/zmap_msg"){
      const currentLane = map.lane?.filter(lane=>lane.is_vehicle_on)[0]
      setCurrentLane(currentLane);
      const player = useDreamviewPlayer();
      player?.sendLocalMessage?.(WEBVIZ_LANE_TOPIC, currentLane);
    }
  },[map])

  return <TransformObject transform={rootTransform}>{map && <MemoZMap map={map} enableCache={enableCache} mapOffset={mapOffset} />}</TransformObject>
  // return <>{...models}</>

})
