// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2019-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { makeStyles } from "@fluentui/react";
import { useMemo, useRef } from "react";

import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
// import { WorldviewReactContext, WorldviewContextType } from "@foxglove/regl-worldview";
import { JSONObject } from "@foxglove/studio-base/types/Messages";
import { fonts } from "@foxglove/studio-base/util/sharedStyleConstants";
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { TopicInfoItem } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store/WorldBase";

// type Stats = {
//     bufferCount: number;
//     elementsCount: number;
//     textureCount: number;
//     shaderCount: number;

//     getTotalTextureSize(): number;
//     getTotalBufferSize(): number;
// };

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        bottom: theme.spacing.m,
        left: theme.spacing.m,
        backgroundColor: "#6262623b",
        borderRadius: theme.effects.roundedCorner2,
        fontFamily: fonts.MONOSPACE,
        fontSize: theme.fonts.tiny.fontSize,
        padding: theme.spacing.s2,
        pointerEvents: "none",

        td: {
            padding: 2,
            textAlign: "right",
        },
        th: {
            padding: "2px 6px",
            color: "rgb(91 189 207)",
            // textTransform: "uppercase",
        },
    },
}));

// Looks at the regl stats and throws errors if it seems we're going over acceptable (arbitrary) max ranges.
// The maxes are arbitrarily set to be an order of magnitude higher than the 'steady state' of a pretty loaded
// Zhito Webvis scene to allow for plenty of headroom.
// function validate(stats: Stats) {
//     if (stats.bufferCount > 500) {
//         throw new Error(`Possible gl buffer leak detected. Buffer count: ${stats.bufferCount}`);
//     }
//     if (stats.elementsCount > 500) {
//         throw new Error(`Possible gl elements leak detected. Buffer count: ${stats.elementsCount}`);
//     }
//     if (stats.textureCount > 500) {
//         throw new Error(`Possible gl texture leak detected. Texture count: ${stats.textureCount}`);
//     }
//     // We should likely have far fewer than 100 shaders...they only get created when regl "compiles" a command.
//     // Nevertheless, we should check in case there's some wild code somewhere constantly recompiling a command.
//     if (stats.shaderCount > 100) {
//         throw new Error(`Possible gl shader leak detected. Shader count: ${stats.shaderCount}`);
//     }
// }



function toString(val: string | number) {
    if (typeof val === "number") {
        return val.toFixed(2)
    } else if (typeof val === "string") {
        return val
    } else {
        return ""
    }
}
function processDisplayItem(item: TopicInfoItem, val: number | string): [string, string|undefined, string] {
    const color = item.colorMapping?.[val] ?? "white";
    if (item.mapping !== undefined) {
        const defaultText = item.mapping["default"] || undefined;

        const displayText = item.mapping[val] || defaultText;
        return [item.display, displayText, color];
    } else {
        return [item.display, toString(val), color];
    }
}
// Shows debug regl stats in the 3d panel.  Crashes the panel if regl stats drift outside of acceptable ranges.
// TODO(bmc): move to regl-worldview at some point
export default function InfoStats(): JSX.Element | ReactNull {
    const infoList = useWorldStore(state=>state.infoList)
    const {localization} = useWorldStore(state=>({localization:state.localization}))

    const { topics } = PanelAPI.useDataSourceInfo();
    const topicToRender = useMemo(
        () => {
            const todoList = infoList.map(item => item.topic);
            return todoList
        },
        [topics, infoList],
    );
    const recieveTopics = PanelAPI.useMessagesByTopic({
        topics: topicToRender,
        historySize: 1,
    })// as unknown as { [key: string]: MessageEvent<JSONObject>[] };

    const renderItems = useMemo(() => {
        const result: JSX.Element[] = []
        infoList.forEach(item => {
            const { topic: topicName, items: displayItems, title } = item;
            const message = recieveTopics[topicName]?.[0]?.message as JSONObject | undefined
            if (message) {
                result.push((
                    <tr key={title}>
                        <th >{title}</th>
                    </tr>
                ))
                displayItems.forEach(item => {
                    let val;
                    if(item.key.startsWith("eval")){
                        //@ts-ignore
                        let data = message;
                        try{
                            val =  eval(item.key.split("::")[1]??"");
                        } catch(e){
                            val = 9999
                        }


                    } else{
                        val = message[item.key] as number | string;
                    }

                    const [name, value, color] = processDisplayItem(item, val);
                    if(value!==undefined){
                        result.push((
                            <tr key={`${title}-${name}`}>
                                <th style={{color: "white"}}>{name}: </th>
                                <td style={{ color }}>{value}</td>
                            </tr>
                        ))
                    }
                })
            }
        })
        return result;
    }, [recieveTopics])
    const classes = useStyles();

    // const context = useContext<WorldviewContextType>(WorldviewReactContext);
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;
    const [day,time] = useMemo(()=>{
        const date = new Date(localization.measurement_time*1000);
        const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        const h = date.getHours().toString().padStart(2,"0");
        const m = date.getMinutes().toString().padStart(2,"0");
        const s = date.getSeconds().toString().padStart(2,"0");
        const time = `${h}:${m}:${s}`
        return [day,time]
    },[localization])
    return (
        <div className={classes.root}>
            <table>
                <tbody>
                <tr>
                        <th >当前时间</th>
                        <td style={{ color: "white" }}></td>
                    </tr>
                    {/* <tr><th style={{color: "white"}}> </th></tr> */}
                    <tr><th style={{color: "white"}}> {day}</th><td style={{ color: "white",fontWeight:"bold" }}>{time}</td></tr>
                    {renderItems}
                </tbody>
            </table>
        </div>
    );

}
