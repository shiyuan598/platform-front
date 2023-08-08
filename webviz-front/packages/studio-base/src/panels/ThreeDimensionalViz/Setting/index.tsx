// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.


import { makeStyles } from "@fluentui/react";

// import { CameraState } from "@foxglove/regl-worldview";
import { folder, Leva, LevaPanel, useControls, useCreateStore } from '@zhito/leva'
import { useCallback, useEffect, useRef } from "react";

import ExpandingToolbar, { ToolGroup } from "@foxglove/studio-base/components/ExpandingToolbar";
import Flex from "@foxglove/studio-base/components/Flex";
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { useWebsocket } from "@foxglove/studio-base/panels/AdmCmd/util";
// import { LINE_TYPES } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store/Setting";

export const TAB_TYPE = "Setting";

const DEFAULT_CAMERA_INFO_WIDTH = 260;

const useStyles = makeStyles(() => ({
  ":global(.react-colorful)": {
    minWidth: "120px",
    transform: "translateX(-50%)"
  },
  root:{
    ":global(.leva-c-bduird)":{
      display:"flex !important;",
      justifyContent: "space-between"
      // padding:"220px"
    },
    ":global(.leva-c-dkRbIj)":{
      width:"90px"
    }
  }

}))



export default function ZhitoSetting(): JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string | undefined>();

  // remote cmd
  const ws = useWebsocket(`ws://${location.hostname}:8091/cmd`);
  // const handleMsg = useCallback((e:MessageEvent)=>{
  //   const msgObj = JSON.parse(e.data);
  //   if(!msgObj||!msgObj.type) return;
  //   switch(msgObj.type){
  //     case "list":
  //       // setModuleList(msgObj.msg)
  //       break;
  //   }
  // },[])

  const sendCmd = useCallback((module_name: number,cmd:string)=>{
    if(cmd==="未设置") return;//["未设置","轨迹模式","车道线模式"]
    const level = cmd === "轨迹模式" ? "ctrl_mode_traj" : "ctrl_mode_lane_line"
    ws?.send( JSON.stringify({type:"set",module_name,level}))
  },[ws])

  const ref = useRef<HTMLDivElement>(null)
  const controlStore = useCreateStore()
  const worldStore = useWorldStore(state => (state));
  const classes = useStyles();
  useEffect(() => {
    if (selectedTab === TAB_TYPE) {
      const levalRoot = document.getElementById("leva__root")
      if (levalRoot) {
        levalRoot.parentElement?.removeChild(levalRoot);
        ref.current?.appendChild(levalRoot)
      }
    }

    return () => {
      // second
    }
  }, [selectedTab, ref])

  useControls(
    () => {
      const MapSetting = {} as Record<string, any>
      Object.keys(worldStore.MapSetting).forEach(key => {
        MapSetting[key] = {
          //@ts-ignore
          value: worldStore.MapSetting[key],
          onChange: (val: boolean) => worldStore.setMapTypeVisible(key, val)
        }
      })
      const SensorFrameSetting = {
        text:{}as Record<string, any>,
        display: {} as Record<string, any>,
        colors: {} as Record<string, any>
      }
      Object.keys(worldStore.SensorFrameSetting.displayText).forEach(key => {
        SensorFrameSetting.text[key] = {
          //@ts-ignore
          value: worldStore.SensorFrameSetting.displayText[key],
          onChange: (val: boolean) => worldStore.setSensorFrameDisplayText(key, val)
        }
      })
      worldStore.SensorFrameSetting.sensorList.forEach(key => {
        SensorFrameSetting.display[key] = {
          //@ts-ignore
          value: worldStore.SensorFrameSetting.visibleMap[key],
          onChange: (val: boolean) => worldStore.setSensorProp(key, "visible", val)
        }
        SensorFrameSetting.colors[key + "-color"] = {
          //@ts-ignore
          value: "#" + worldStore.SensorFrameSetting.colorMap[key]?.toString(16),
          onChange: (val: string) => worldStore.setSensorProp(key, "color", Number(val.replace("#", "0x")))
        }
      }
      )
      Object.keys(worldStore.MapSetting).forEach(key => {
        MapSetting[key] = {
          //@ts-ignore
          value: worldStore.MapSetting[key],
          onChange: (val: boolean) => worldStore.setMapTypeVisible(key, val)
        }
      }
      )
      return {
        "ADC Setting": folder({
          "bounding box": {
            //@ts-ignore
            value: !worldStore.adcGltf,
            onChange: (val) => worldStore.setAdcGltf(!val)
          },
          "history path": {
            //@ts-ignore
            value: worldStore.showHistoryPath,
            onChange: (val) => worldStore.setShowHistoryPath(val)
          },
        }),
        "PP Setting": folder({
          "mode": {
            // type:"options",
            options:["未设置","轨迹模式","车道线模式"],
            value: "未设置",
            onChange: (val) => sendCmd(4,val)
          },
          "enable lifetime": {
            value: worldStore.PPSetting.lifetime,
            onChange: (val) => worldStore.PPSetting.setLifeTime(val)
          },
          "local frame": {
            value: worldStore.PPSetting.localFrame,
            onChange: (val) => worldStore.PPSetting.setLocalFrame(val)
          },
          "prediction obstacle": {
            value: worldStore.PPSetting.predictionObstacle,
            onChange: (val) => worldStore.PPSetting.setPredictionObstacle(val)
          },
          "path_point point": {
            value: worldStore.PPSetting.pathPoint.point,
            onChange: (val) => worldStore.PPSetting.setPathPoint("point",val)
          },
          "path_point line": {
            value: worldStore.PPSetting.pathPoint.line,
            onChange: (val) => worldStore.PPSetting.setPathPoint("line",val)
          }
        }),
        "Obstacle Setting": folder({
          // "debug mode":{
          //   //@ts-ignore
          //   value: worldStore.debugMode,
          //   onChange: () => worldStore.toggleDebugMode()
          // },
          "dash line": {
            //@ts-ignore
            value: worldStore.ObstacleSetting.dashLine,
            onChange: (val) => worldStore.ObstacleSetting.setDashLine(val)
          },
          "subType": {
            //@ts-ignore
            value: worldStore.ObstacleSetting.subType,
            onChange: (val) => worldStore.ObstacleSetting.setSubType(val)
          },
          "velocityXY":{
            value: worldStore.ObstacleSetting.velocityXY,
            onChange: (val) => worldStore.ObstacleSetting.setDisplayText("velocityXY",val)
          },
          // "velocityY":{
          //   value: worldStore.ObstacleSetting.velocityY,
          //   onChange: (val) => worldStore.ObstacleSetting.setDisplayText("velocityY",val)
          // }
        }),
        "Map Setting": folder(MapSetting, { collapsed: true }),
        "Sensor Frame Setting": folder({
          "localFrame": {
            value: worldStore.SensorFrameSetting.localFrame,
            onChange: (val: boolean) => worldStore.setLocalFrame(val)
          },
          "obstacle box": {
            value: worldStore.SensorFrameSetting.boundingBox,
            onChange: (val: boolean) => worldStore.setBoundingBox(val)
          },
          "speed arrow": {
            value: worldStore.SensorFrameSetting.speedArrow,
            onChange: (val: boolean) => worldStore.setSpeedArrow(val)
          },
          "display text:":folder(SensorFrameSetting.text),
          "display sensor": folder(SensorFrameSetting.display),
          "colors": folder(SensorFrameSetting.colors)
        })
      }
    },
    { store: controlStore }, [worldStore.SensorFrameSetting]
  )

  return (
    <ExpandingToolbar
      tooltip="Setting"
      iconName="CameraControl"
      checked={false}
      selectedTab={selectedTab}
      onSelectTab={(newSelectedTab) => setSelectedTab(newSelectedTab)}
    >
      <ToolGroup name={TAB_TYPE}>
        <>
          <Flex row reverse style={{ padding: "4px 4px 0" }}>

          </Flex>
          <Flex className={classes.root} col style={{ minWidth: DEFAULT_CAMERA_INFO_WIDTH, padding: 8, overflow:"auto",maxHeight:"500px" }}>
            < Leva fill flat titleBar={false} />
            <LevaPanel   store={controlStore} fill flat titleBar={false} theme={{
              sizes: {}
            }} />
          </Flex>
        </>
      </ToolGroup>
    </ExpandingToolbar>
  );
}
