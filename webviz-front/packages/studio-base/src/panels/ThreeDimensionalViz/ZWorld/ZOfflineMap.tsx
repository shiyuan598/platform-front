import { useCallback, useEffect, useState } from "react";

import { useDreamViewMapServer, useDreamviewPlayer, useDreamviewServer } from "@foxglove/studio-base/context/Dreamview/Dreamview";
import useGuaranteedContext from "@foxglove/studio-base/hooks/useGuaranteedContext";
import { TopicTreeContext } from "@foxglove/studio-base/panels/ThreeDimensionalViz/TopicTree/useTopicTree";
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { ZHITO_MAP_TOPIC } from "@foxglove/studio-base/util/globalConstants";

export const LOCAL_MAP_RADIUS = 500;

export default function () {
  const [updateTime, setUpdateTime] = useState(Date.now());
  const [updatePose, setUpdatePose] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const { localization } = useWorldStore(state => ({ localization: state.localization }))
  // const [mapElements, setMapElements] = useState<MarkerArray[]>([]);
  // const [mapElementIds, setMapElementIds] = useState<Record<string, string[]>>({});
  const { selectedTopicNames } = useGuaranteedContext(TopicTreeContext, "TopicTreeContext");


  const mapServer = useDreamViewMapServer();
  const server = useDreamviewServer();
  const requestMapElements = useCallback((msg: { mapElementIds: string[] }) => {
    const mapServer = useDreamViewMapServer();
    mapServer.requestMapData(msg.mapElementIds)
  }, []);
  const parseMap = useCallback(({ data: mapdata }) => {
    const player = useDreamviewPlayer();
    const now = Date.now();
    const sec = Math.floor(now / 1000)
    const nsec = Math.floor((now - sec * 1000) * 1e6)
    const msg = {
      receiveTime: { sec, nsec },
      topic: ZHITO_MAP_TOPIC,
      message: mapdata,
      sizeInBytes: (mapdata as ArrayBuffer).byteLength
    }
    //@ts-ignore
    player?._handleInternalMessage?.(msg);
    //@ts-ignore
    player?._parsedMessages.push(msg);
  }, [])
  useEffect(() => {

    if (selectedTopicNames.includes(ZHITO_MAP_TOPIC)) {

      //@ts-ignore
      server.on("MapElementIds", requestMapElements)
      //@ts-ignore
      mapServer.on("map", parseMap)
    }

    return () => {
      //@ts-ignore
      server.off("MapElementIds", requestMapElements)
      //@ts-ignore
      mapServer.off("map", parseMap)
    }
  }, [selectedTopicNames])
  useEffect(() => {
    if (!selectedTopicNames.includes(ZHITO_MAP_TOPIC)) {
      return;
    }
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

  }, [localization, updateTime, selectedTopicNames, updatePose]);



  return (<div />);
}
