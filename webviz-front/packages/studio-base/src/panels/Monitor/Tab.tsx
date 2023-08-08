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
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import ResourceTab from "./ResourceTab"



type Props = {
  onSelectDataSourceAction: () => void;
};

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

const ProblemCount = muiStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.error.contrastText,
  padding: theme.spacing(0.125, 0.75),
  borderRadius: 8,
}));

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


export default function MonitorTabs(props: Props): JSX.Element {
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
                <StyledTab disableRipple label="资源监控" value={0} />
                <StyledTab
                  disableRipple
                  label={"版本信息"}
                  value={1}
                />
              </StyledTabs>
              <Divider />
              <TabPanel value={activeTab} index={0}>
                <ResourceTab />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                {/* <ProblemsList problems={playerProblems} /> */}
              </TabPanel>
            </Stack>
          </>
  );
}
