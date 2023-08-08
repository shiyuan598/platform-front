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
import { useEffect, useMemo, useState } from "react";

import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
// import { WorldviewReactContext, WorldviewContextType } from "@foxglove/regl-worldview";
import { JSONObject } from "@foxglove/studio-base/types/Messages";
import { fonts } from "@foxglove/studio-base/util/sharedStyleConstants";
import { Stack, TableHead, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import Flex from "@foxglove/studio-base/components/Flex";

import { ZStyledTab, ZStyledTabs, ZTabPanel } from "@foxglove/studio-base/panels/Monitor/Monitor";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#6262623b",
    width: "100%",
    // height:"100%",
    // overflowY:"auto",
    borderRadius: theme.effects.roundedCorner2,
    fontFamily: fonts.MONOSPACE,
    fontSize: theme.fonts.tiny.fontSize,
    padding: theme.spacing.s2,
    // pointerEvents: "none",

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




export interface IBitItem {
  index: number,
  value: number,
  keyString: string,
  description: string,
  statu: boolean
  enabled: boolean
  statuText: string
  color: string
}

export interface IBitDescription {
  "key": string,
  "description": string,
  "0": string,
  "1": string,
}

export interface IBitInfoItem {
  key: string,
  display: string,
  length: number,
  statuMapping: Record<string, boolean>
  mapping: Record<string, IBitDescription>
}

export interface IBitInfoRoot {
  topic: string;
  title: string;
  items: IBitInfoItem[]
}


const BitStatuColor = {
  DISABLED: "#616161",
  SUCCESS: "#388e3c",//"#5ca559",
  FAIL: "#c62828"
}

const BitStatuStyle = { width: "40px", height: "40px", lineHeight: "40px",  margin: "2px 4px",  cursor: "pointer" }
function BitStatu({ index, description, keyString, statuText, color }: IBitItem) {
  return <Tooltip title={<><div>{keyString}</div><div>{description}-{statuText}</div></>}>
    <div style={{...BitStatuStyle,textAlign: "center", userSelect: "none",background:color,borderStyle:"solid",borderWidth:0,borderColor:color}}>
      <div>{index}</div>
      {/* <div>{description}</div> */}
    </div>
  </Tooltip>
}

const cellStyle = {
  border: "0px",
  textAlign: "left!important",
  padding: "2px 6px !important"
}
// const textStyle = { userSelect: "none",float: "left", top: 0, left: 0, fontWeight:600,  }
function BitTable({ items }: { items: IBitItem[] }) {
  return (
    <TableContainer component={"div"} sx={{}}>
      <Table sx={{ width: "100%" }} aria-label="simple table" size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" sx={cellStyle}>序号</TableCell>
            <TableCell component="th" scope="row" sx={cellStyle}>描述</TableCell>
            <TableCell component="th" scope="row" sx={cellStyle}>状态</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => (
            <TableRow
              key={row.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={cellStyle}>
                {row.index}
              </TableCell>
              {/* <TableCell >{row.name}</TableCell> */}
              <TableCell sx={cellStyle}>{row.description}</TableCell>
              <TableCell sx={{ ...cellStyle, coolor: row.color }}>{row.value}-{row.statuText}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function BitView({ info, value }: { info: IBitInfoItem, value: number }) {
  const items = useMemo(() => {
    const result = [] as IBitItem[];
    let count = 0;
    let currentValue = value.toString(2);
    const statuMapping = info.statuMapping;

    while (count < info.length) {
      //@ts-ignore
      const val = currentValue.at(-1 - count);
      const descriptionItem = info.mapping[count];
      const descriptionText = descriptionItem ? descriptionItem.description : "";
      const key = descriptionItem ? descriptionItem.key : "";
      const statu = statuMapping[val] ?? false;
      const statuText = (val === "1" ? descriptionItem?.[1] : descriptionItem?.[0]) ?? "";
      const enabled = descriptionItem !== undefined;
      const color = enabled ? statu ? BitStatuColor.SUCCESS : BitStatuColor.FAIL : BitStatuColor.DISABLED;
      result.push({ index: count, keyString: key, value: val, description: descriptionText, statu, statuText, color, enabled });
      // currentValue = currentValue>>1;
      count++;
    }
    return result;
  }, [info, value]);
  const failedItems = useMemo(() => {
    return items.filter(item => (item.color === BitStatuColor.FAIL) && item.enabled)
  }, [items])
  return <div>
    {/* <div style={{ padding: "6px" }}>{info.key}:</div> */}
    <div style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}>
      {items.map(item => <BitStatu key={item.index} {...item}></BitStatu>)}
    </div>
    <BitTable items={failedItems} />

  </div>
}


function LocStatus(): JSX.Element | ReactNull {
  const [infoList, setInfoList] = useState<IBitInfoRoot[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    fetch("./config/BitStatus.json").then(res => res.json()).then(json => setInfoList(json));
  }, []);
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
  })

  const renderItems = useMemo(() => {
    const result: { topicName: string, displayItems: IBitInfoItem[], title: string, message: any }[] = []
    infoList.forEach(item => {
      const { topic: topicName, items: displayItems, title } = item;
      const message = recieveTopics[topicName]?.[0]?.message as JSONObject | undefined
      if (message) {
        result.push({
          topicName,
          message,
          title,
          displayItems
        })
      }
    })
    return result;
  }, [recieveTopics, infoList])
  const classes = useStyles();


  return (
    <Flex col clip style={{ position: "relative" }} className={classes.root}>
      <PanelToolbar floating>
      </PanelToolbar>
      <ZStyledTabs value={activeTab} onChange={(_ev, newValue: number) => setActiveTab(newValue)}textColor="inherit">
                   {renderItems.map((item,index)=><ZStyledTab disableRipple label={item.title} value={index} />)}
      </ZStyledTabs>
      {renderItems.map((renderItem,index) => {
        return <ZTabPanel value={activeTab} index={index} ><Stack style={{ padding: "8px 16px", overflow: "auto" }}>

          {renderItem.displayItems.map(item => <BitView info={item} value={renderItem.message[item.key]} />)}
        </Stack></ZTabPanel>
      })}
    </Flex>
  );

}

LocStatus.displayName = "LocStatus";
type Config = {
  topicToRender?: string;
};
export default Panel(
  Object.assign(LocStatus, {
    defaultConfig: {} as Config,
    panelType: "LocStatus", // The legacy RosOut name is used for backwards compatibility
  }),
);
