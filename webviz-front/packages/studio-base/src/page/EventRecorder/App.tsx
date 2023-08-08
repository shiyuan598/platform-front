import * as React from 'react';

import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import RecorderListener from '@foxglove/studio-base/components/EventRecorderSidebar/RecorderListener';
import EventRecorder from "./EventRecorder";
import { TopAppBar } from "./AppBar";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';

import {darkTheme} from "./utils"




interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  theme?: object
  // children: React.ReactElement;
}






export default function RecorderApp(props: Props) {

  return (
    <React.Fragment>
      <ThemeProvider theme={props.theme ?? darkTheme}>
        {/* <GlobalCss /> */}

        <SnackbarProvider maxSnack={3} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
          <CssBaseline />
          <TopAppBar {...props} />
          <Toolbar />
          <Container>
            <RecorderListener addIcon={true} />
            <EventRecorder />
            <div style={{ height: "80px" }} />
          </Container>
          {/* <BottomAppBar /> */}
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
