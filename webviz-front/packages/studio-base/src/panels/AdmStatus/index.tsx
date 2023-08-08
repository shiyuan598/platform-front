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
import { zhito } from "@zhito/proto";
import { useMemo } from "react";


import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import TopicToRenderMenu from "@foxglove/studio-base/components/TopicToRenderMenu";
import { MessageEvent } from "@foxglove/studio-base/players/types";


import helpContent from "./index.help.md";
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
        flexWrap: "wrap",
        transform: "translate(0,12%)",
        justifyContent: "space-evenly"
    },
    item: {
        width: "110px",
        height: "30px",
        margin: "4px",
        fontSize: "14px",
        userSelect: "none",
        textAlign: "center",
        lineHeight: "30px"
    }

}))

type Config = {
    topicToRender?: string;
};

type Props = {
    config: Config;
    saveConfig: (arg0: Config) => void;
};

const SUPPORTED_DATATYPES = [
    "zhito2ros_msg/ZhitoChassis",
];


// 0-SP_Initial
// 1-SP_Off
// 2-SP_Error
// 3-SP_Passive
// 4-SP_Standby
// 5-SP_Active_NoLCReq
// 6-SP_Active_LeLC
// 7-SP_Active_RiLC
// 8-SP_Active_LCCancel
// 9-SP_Active_Level1Degrade
// 10-SP_Active_Level2Degrade
// 11-SP_Active_Level3Degrade
// 12-SP_Active_Level4Degrade

// 0-iACC_INITIALIZE;
// 1-iACC_OFF
// 2-iACC_FAILURE
// 3-iACC_PASSIVE
// 4-iACC_STANDBY
// 5-iACC_CRUISE
// 6-iACC_HEADWAY
// 7-iACC_CREEP
// 8-iACC_STOP
// 9-iACC_WAIT
// 10-iACC_TAKEOVER

type MessageType = {
    data: Uint8Array

}


type WorkStatuProps = {
    name: string
    statu: number
}
function WorkStatu(props: WorkStatuProps) {
    // const drivingMode = message
    const classes = useStyles();
    const statusText = props.statu  === 1 ? "OK" : "FAIL"
    //     : props.statu === zhito.adm.WorkStatus.WORK_FAIL ? "FAIL"
    //         : "ERROR";
    const statusColor = props.statu === 1 ? "green" : "red";
    const text = `${props.name.split("_Status")[0]}: ${statusText}`
    return (
        <div className={classes.item}
            style={{
                background: statusColor
            }}>{text}
        </div>)
}




const AdmPanel = React.memo(({ config, saveConfig }: Props) => {
    const { topics } = PanelAPI.useDataSourceInfo();
    const classes = useStyles();
    const protoTopicToRender = useMemo(
        () => topics.find((topic) => topic.name === "/zhito/adm/AdmInfoMCU2SOC")?.name ?? "/rosout",
        [topics],
    );

    const { [protoTopicToRender]: protoMessages = [] } = PanelAPI.useMessagesByTopic({
        topics: [protoTopicToRender],
        historySize: 1,
    }) as { [key: string]: MessageEvent<MessageType>[] };
    const admMsg = protoMessages[0]?.message as unknown as zhito.adm.ADMInfoMCU2SOC;
    const results: WorkStatuProps[] = [];
    if (admMsg) {
            Object.keys(admMsg).map(key => {
                if (key.endsWith("_Status")) {
                    results.push({
                        name: key,

                        //@ts-ignore
                        statu: admMsg[key]
                    })
                }
            })
    }

    const topicToRenderMenu = (
        <TopicToRenderMenu
            topicToRender={protoTopicToRender}
            onChange={(newTopicToRender) => saveConfig({ ...config, topicToRender: newTopicToRender })}
            topics={topics}
            allowedDatatypes={SUPPORTED_DATATYPES}
            defaultTopicToRender={protoTopicToRender}
        />
    );

    return (
        <Stack verticalFill style={{ justifyContent: "center" }}>
            <PanelToolbar helpContent={helpContent} additionalIcons={topicToRenderMenu} floating>
            </PanelToolbar>
            <Stack grow horizontal className={classes.root}>
                {admMsg && results.map((result) => <WorkStatu key={result.name} {...result}></WorkStatu>)}
            </Stack>
        </Stack>
    );
});

AdmPanel.displayName = "AdmStatus";

export default Panel(
    Object.assign(AdmPanel, {
        defaultConfig: {} as Config,
        panelType: "AdmStatus", // The legacy RosOut name is used for backwards compatibility
    }),
);
