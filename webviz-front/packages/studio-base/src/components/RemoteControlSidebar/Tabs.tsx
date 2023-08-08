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
import { PropsWithChildren, useState } from "react";

import {AdmCmd} from "@foxglove/studio-base/panels/AdmCmd/AdmCmd";
import {LogCmd} from "@foxglove/studio-base/panels/AdmCmd/LogCmd";

// import ResourcePanel from "./ResourcePanel"
// import VersionPanel from  "./VersionPanel"



const StyledTab = muiStyled(Tab)(({ theme }) => ({
  minHeight: "auto",
  minWidth: theme.spacing(8),
  padding: theme.spacing(1.5, 2),
}));

const StyledTabs = muiStyled(Tabs)({
  minHeight: "auto",

  ".MuiTabs-indicator": {
    transform: "scaleX(0.5)",
    height: 2,
  },
});



const TabPanel = (
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

export default function MonitorTabs(): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
          <>
            <Divider />
            <Stack flex={1}>
              <StyledTabs
                value={activeTab}
                onChange={(_ev, newValue: number) => setActiveTab(newValue)}
                textColor="inherit"
              >
                <StyledTab disableRipple label="ADM调试" value={0} />
                <StyledTab
                  disableRipple
                  label={"日志等级"}
                  value={1}
                />
              </StyledTabs>
              <Divider />
              <TabPanel value={activeTab} index={0}>
                <AdmCmd />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <LogCmd />
              </TabPanel>
            </Stack>
          </>
  );
}
