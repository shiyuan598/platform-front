// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
    Tab,
    Tabs,
    styled as muiStyled,
    Divider,
    Box,
    Stack,
  } from "@mui/material";
  import { PropsWithChildren, useMemo, useState } from "react";

import { zhito } from "@zhito/proto";
import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
import { MessageEvent } from "@foxglove/studio-base/players/types";

import ResourcePanel from "./ResourcePanel"
import VersionPanel from  "./VersionPanel"



export const ZStyledTab = muiStyled(Tab)(({ theme }) => ({
    minHeight: "auto",
    minWidth: theme.spacing(8),
    padding: theme.spacing(1.5, 2),
  }));

export const ZStyledTabs = muiStyled(Tabs)({
    minHeight: "auto",

    ".MuiTabs-indicator": {
      transform: "scaleX(0.5)",
      height: 2,
    },
  });



export  const ZTabPanel = (
    props: PropsWithChildren<{
      index: number;
      value: number;
    }>,
  ): JSX.Element => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        component={"div"}
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        flex="auto"
        {...other}
      >
        {value === index && <>{children}</>}
      </Box>
    );
  };

  type MessageType = {
    data: Uint8Array

}
  export default function MonitorTabs(): JSX.Element {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { topics } = PanelAPI.useDataSourceInfo();
    const protoTopicToRender = useMemo(
        () => topics.find((topic) => topic.name === "/zhito/v3na/monitor")?.name ?? "/rosout",
        [topics],
    );

    const { [protoTopicToRender]: protoMessages = [] } = PanelAPI.useMessagesByTopic({
        topics: [protoTopicToRender],
        historySize: 1,
    }) as { [key: string]: MessageEvent<MessageType>[] };
    const monitorMsg = protoMessages[0]?.message as unknown as zhito.monitor.Monitor;

    return (
            <>
              <Divider />
              <Stack flex={1}>
                <ZStyledTabs
                  value={activeTab}
                  onChange={(_ev, newValue: number) => setActiveTab(newValue)}
                  textColor="inherit"
                >
                  <ZStyledTab disableRipple label="资源监控" value={0} />
                  <ZStyledTab
                    disableRipple
                    label={"版本信息"}
                    value={1}
                  />
                </ZStyledTabs>
                <Divider />
                <ZTabPanel value={activeTab} index={0}>
                  <ResourcePanel monitorMsg={monitorMsg}/>
                </ZTabPanel>
                <ZTabPanel value={activeTab} index={1}>
                  <VersionPanel data={monitorMsg}/>
                </ZTabPanel>
              </Stack>
            </>
    );
  }
