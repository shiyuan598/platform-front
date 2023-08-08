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

  interface IEventsTabs{
    displayTab:"manual"|"auto"
    setDisplayTab: (tab:"manual"|"auto")=>void
  }

  export default function EventsTabs({displayTab:_displayTab,setDisplayTab}:IEventsTabs): JSX.Element {
    const [activeTab, setActiveTab] = useState<number>(0);
    // const activeTab = displayTab==="manual" ? 0 : 1;
    return (
            <>
              <Divider />
              <Stack flex={1} sx={{marginTop:"0px !important"}}>
                <StyledTabs
                  value={activeTab}
                  onChange={(_ev, newValue: number) => {setActiveTab(newValue);setDisplayTab(newValue===0?"manual":"auto")}}
                  textColor="inherit"
                >
                  <StyledTab disableRipple label="手动标签" value={0} />
                  <StyledTab
                    disableRipple
                    label={"自动标签"}
                    value={1}
                  />
                </StyledTabs>
                <Divider />
                <TabPanel value={activeTab} index={0}>
                  {/* <ResourcePanel monitorMsg={monitorMsg}/> */}
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                  {/* <VersionPanel data={monitorMsg}/> */}
                </TabPanel>
              </Stack>
            </>
    );
  }
