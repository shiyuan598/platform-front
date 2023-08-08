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

import { makeStyles, Stack } from "@fluentui/react";
// import protobuf from "protobufjs/light";
import { zhito } from "@zhito/proto";
import { useEffect, useMemo } from "react";

import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
// import TopicToRenderMenu from "@foxglove/studio-base/components/TopicToRenderMenu";
import { mathFunctions } from "@foxglove/studio-base/panels/Plot/transformPlotRange";
import { MessageEvent } from "@foxglove/studio-base/players/types";

import helpContent from "./index.help.md";
import { useDreamviewPlayer } from "@foxglove/studio-base/context/Dreamview/Dreamview";
import { WEBVIZ_ZIC_OFFSET_TOPIC } from "@foxglove/studio-base/util/globalConstants";
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
// import proto from "./proto.json";
// import styles from "./style.scss"
// const admRoot = protobuf.Root.fromJSON(proto);
// const AdmMessage = admRoot.lookupType("zhito.adm.Mcu2Soc");
// adm

const useStyles = makeStyles(() => ({


  percetage: {
    width: "120px",
    margin: "15px",
    "> *": {
      margin: "6px 0px"
    }
  },
  root: {
    transform: "translate(0,12%)",
    justifyContent: "center",
    userSelect: "none"
  },
  gear: {
    fontSize: "20px",
    color: "#7a7a7a",
    "> .active": {
      color: "white"
    }
  },

}))

type Config = {
  topicToRender?: string;
};

type Props = {
  config: Config;
  saveConfig: (arg0: Config) => void;
};

// const SUPPORTED_DATATYPES = [
//   "zhito2ros_msg/ZhitoChassis",
// ];

// interface Foo {
//   [key: string]: number;
// }

// const ZhitoChassis: Foo = {
//   DRIVINGMODE_COMPLETE_MANUAL: 0,
//   DRIVINGMODE_COMPLETE_AUTO_DRIVE: 1,
//   DRIVINGMODE_AUTO_STEER_ONLY: 2,
//   DRIVINGMODE_AUTO_SPEED_ONLY: 3,
//   DRIVINGMODE_EMERGENCY_MODE: 4,
//   ERRORCODE_NO_ERROR: 0,
//   ERRORCODE_CMD_NOT_IN_PERIOD: 1,
//   ERRORCODE_CHASSIS_ERROR: 2,
//   ERRORCODE_CHASSIS_ERROR_ON_STEER: 6,
//   ERRORCODE_CHASSIS_ERROR_ON_BRAKE: 7,
//   ERRORCODE_CHASSIS_ERROR_ON_THROTTLE: 8,
//   ERRORCODE_CHASSIS_ERROR_ON_GEAR: 9,
//   ERRORCODE_MANUAL_INTERVENTION: 3,
//   ERRORCODE_CHASSIS_CAN_NOT_IN_PERIOD: 4,
//   ERRORCODE_UNKNOWN_ERROR: 5,
//   GEARPOSITION_GEAR_NEUTRAL: 0,
//   GEARPOSITION_GEAR_DRIVE: 1,
//   GEARPOSITION_GEAR_REVERSE: 2,
//   GEARPOSITION_GEAR_PARKING: 3,
//   GEARPOSITION_GEAR_LOW: 4,
//   GEARPOSITION_GEAR_INVALID: 5,
//   GEARPOSITION_GEAR_NONE: 6,
// }

// const SP_STATUS = [
//   "Initial",//0
//   "Off",//1
//   "Error",//2
//   "Passive",//3
//   "Standby",//4
//   "Active_NoLCReq",//5

//   "Active_LeLC",//6
//   "Active_RiLC",//7
//   "Active_LCCancel",//8
//   "Active_Level1Degrade",//9

//   "Active_Level2Degrade",//10
//   "Active_Level3Degrade",//11
//   "Active_Level4Degrade",//12
// ]

// const IACC_STATUS = [
//   "INITIALIZE",//0
//   "OFF",//1
//   "FAILURE",//2
//   "PASSIVE",//3
//   "STANDBY",//4
//   "CRUISE",//5
//   "HEADWAY",//6
//   "CREEP",//7
//   "STOP",//8
//   "WAIT",//9
//   "TAKEOVER",//10
// ]



const ADM_TOPIC = "/zhito/adm/AdmInfoMCU2SOC";
const ZIC_TOPIC = "/zhito/drivers/horizon_camera"
const Chassis = zhito.canbus.Chassis;
// const IChassis = Chassis.decode()

// type MessageType = {
//   brake_percentage: number,
//   throttle_percentage: number,
//   driving_mode: number,
//   speed_mps: number,
//   steering_percentage: number,
// }
type RenderProps = {
  message: zhito.canbus.Chassis,
  admMessage?: zhito.adm.ADMInfoMCU2SOC
}

const MainADMissionMapping:Record<number,[string,boolean]> ={
  0: ["MANUAL",false],
  1: ["SP",true],
  2: ["SP-1",true],
  3: ["SP-2",true],
  4: ["SP-3",true],
  5: ["SP-4",true],
  6: ["SP-5",true],
  7: ["iACC",true],
  254: ["MANUAL",false]
}

function SpeedBox(props: RenderProps) {
  const { message, admMessage } = props;
  // const drivingModes = Object.keys(ZhitoChassis).filter(key => key.startsWith("DRIVINGMODE_"))

  const driving_mode = message.toJSON().driving_mode as unknown as string;
  // const modeText = drivingModes.map(text =>)
  let modeText = "";
  let autoDriveMode = false;

  // ----------默认状态，从chassis取--------------
  autoDriveMode = driving_mode.search("AUTO") > -1;
  modeText = autoDriveMode ? "AUTO" : "MANUAL";

  if (admMessage) {
    //-----------adm消息----------------------
    const  MainADMission = admMessage.MainADMission;
    [modeText, autoDriveMode] = MainADMissionMapping[MainADMission] || ["MANUAL",false]
  }
  // const drivingMode = message
  return (<div style={{ color: "white", textAlign: "center", width: "160px", padding: "10px" }}>
    <div style={{ fontSize: "36px" }}>{mathFunctions.mps2kph ? mathFunctions.mps2kph(message.speed_mps)?.toFixed(1) : 0}</div>
    <div style={{ margin: "5px" }}>km/h</div>
    <div style={{
      padding: "10px",
      margin: "0px 15px",
      background: autoDriveMode ? "green" : "#9e9e9e"
    }}>{modeText}
    </div>
    {admMessage && <div style={{ color: "#b6b6b6", fontSize: "12px" }}>
      <span>sp: {admMessage.SPMode}</span>
      <span>  iacc: {admMessage.iACCMode}</span>
    </div>}
  </div>)
}
//style={{rotate: mathFunctions.rad2deg(radians) message.steering_percentage}}
function StreeringBox(props: RenderProps) {
  const message = props.message;
  const steering_percentage = (message.steering_percentage ?? 0) * 44.444;
  return (<div style={{ width: "100px" }}>
    <img src="./images/steering.png" style={{
      margin: "5px 10px",
      height: "80px",
      transform: `rotate(${Math.floor(-steering_percentage * 3.6)}deg)`
    }} />
    <div style={{
      textAlign: "center",
      color: "white",
      fontSize: "18px"
    }}> {steering_percentage?.toFixed(1)}%</div>
  </div>)
}

const Slider_Width = 120;
function Slider({ val, color, bgColor }: { val: number, color: string, bgColor: string }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "10px", height: "10px", background: color }} />
      <div style={{ width: `${Math.floor(Slider_Width * val)}px`, height: "4px", marginTop: "3px", background: color }} />
      <div style={{ width: `${Math.floor((1 - val) * Slider_Width)}px`, height: "4px", marginTop: "3px", background: bgColor }} />
    </div>)
}

function PercetageBox(props: RenderProps) {
  const message = props.message;
  const classes = useStyles()
  return (
    <div className={classes.percetage}>
      <div>Brake:</div>
      <Slider val={message.brake_percentage / 100} color={"rgb(180, 49, 49)"} bgColor={"rgb(56, 38, 38)"} />
      <div>Throttle:</div>
      <Slider val={message.throttle_percentage / 100} color={"green"} bgColor={"rgb(45, 59, 80)"} />
    </div>)
}

const gear_map = [
  ["P", Chassis.GearPosition.GEAR_PARKING],
  ["R", Chassis.GearPosition.GEAR_REVERSE],
  ["N", Chassis.GearPosition.GEAR_NEUTRAL],
  ["D", Chassis.GearPosition.GEAR_DRIVE],
  ["L", Chassis.GearPosition.GEAR_LOW]
  // ["N",Chassis.GearPosition.GEAR_NONE],//??todo
  // ["I",Chassis.GearPosition.GEAR_INVALID],//??todo
]

function GearBox(props: RenderProps) {
  const message = props.message;
  const classes = useStyles()
  return (
    <div className={classes.gear}>
      {gear_map.map(([key, val]) => {
        return <div className={val == message.gear_location ? "active" : ""} key={key}>{key}</div>
      })}
    </div>)
}

const CarStatusPanel = React.memo(({ config }: Props) => {
  const setZicOffset = useWorldStore((state)=>state.setZicOffset)
  const { topics } = PanelAPI.useDataSourceInfo();
  const classes = useStyles();
  const defaultTopicToRender = useMemo(
    () => topics.find((topic) => topic.name.endsWith("/zhito/canbus/chassis"))?.name || "",
    [topics],
  );

  // const protoTopicToRender = useMemo(
  //   () => topics.find((topic) => topic.datatype === "zhito2ros_msg/ZhitoProto")?.name ?? "/rosout",
  //   [topics],
  // );

  // const { [protoTopicToRender]: protoMessages = [] } = PanelAPI.useMessagesByTopic({
  //   topics: [protoTopicToRender],
  //   historySize: 1,
  // }) as { [key: string]: MessageEvent<MessageType>[] };
  // if (protoMessages.length > 0) {

  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   const admMsg = zhito.adm.Mcu2Soc.decode(protoMessages[0]?.message.data);//AdmMessage.decode() as zhito.adm.Mcu2Soc;
  //   // eslint-disable-next-line no-restricted-syntax
  //   console.log(admMsg);
  // }

  const topicToRender = config.topicToRender ?? defaultTopicToRender;
  // const admTopicToRender = ADM_TOPIC;
  const {
    [topicToRender]: messages = [],
    [ADM_TOPIC]: admMessages,
    [ZIC_TOPIC]: zicMessages
   } = PanelAPI.useMessagesByTopic({
    topics: [topicToRender, ADM_TOPIC, ZIC_TOPIC],
    historySize: 1,
  }) as { [key: string]: MessageEvent<zhito.canbus.Chassis>[] };

  // avoid making new sets for node names
  // the filter bar uess the node names during on-demand filtering
  // const seenNodeNames = useRef(new Set<string>());
  // /
  const message = messages[0]?.message;
  const admMessage = admMessages?.[0]?.message as zhito.adm.ADMInfoMCU2SOC | undefined;
  const zicMessage =  zicMessages?.[0]?.message as zhito.drivers.ThirdPartyCamera | undefined;
  useEffect(()=>{
    const player = useDreamviewPlayer();
    //@ts-ignore
    if(zicMessage&&player?._handleInternalMessage&&zicMessage.horizon_data?.lane?.lka_left_lane&&zicMessage.horizon_data?.lane?.lka_right_lane){
      const data = (zicMessage.horizon_data.lane.lka_left_lane.lanemodelc0 ?? 0)+ (zicMessage.horizon_data.lane.lka_right_lane.lanemodelc0??0)

      const now = Date.now();
      const sec = Math.floor(now / 1000)
      const nsec = Math.floor((now - sec * 1000) * 1e6)
      const offset = data/2;
      const msg = {
        receiveTime: { sec, nsec },
        topic: WEBVIZ_ZIC_OFFSET_TOPIC,
        message: {data:offset},
        sizeInBytes: undefined
      }
      //@ts-ignore
      player?._handleInternalMessage?.(msg);
      //@ts-ignore
      player?._parsedMessages.push(msg);
      setZicOffset(offset);
    }
  },[zicMessage])
  return (
    <Stack verticalFill style={{ justifyContent: "center", }}>
      <PanelToolbar helpContent={helpContent} floating>
      </PanelToolbar>
      <Stack grow horizontal className={classes.root}>
        {message && <SpeedBox message={message} admMessage={admMessage}></SpeedBox>}
        {message && <StreeringBox message={message}></StreeringBox>}
        {message && <PercetageBox message={message}></PercetageBox>}
        {/* v3na无档位信号 */}
        { (message && message.gear_location_status) && <GearBox message={message}></GearBox>}
      </Stack>
    </Stack>
  );
});

CarStatusPanel.displayName = "CarStatus";

export default Panel(
  Object.assign(CarStatusPanel, {
    defaultConfig: {} as Config,
    panelType: "CarStatus", // The legacy RosOut name is used for backwards compatibility
  }),
);
