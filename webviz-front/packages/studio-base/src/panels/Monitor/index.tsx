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

import { Stack } from "@fluentui/react";
// import protobuf from "protobufjs/light";
import { zhito } from "@zhito/proto";
import { useMemo } from "react";

import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import { MessageEvent } from "@foxglove/studio-base/players/types";

import helpContent from "./index.help.md";
import ResourcePanel from "./ResourcePanel"


const MonitorPanel = React.memo(({ }) => {
  const topicToRender = useMemo(
    () => "/zhito/v3na/monitor",
    [],
  );
  const {
    [topicToRender]: messages = []
   } = PanelAPI.useMessagesByTopic({
    topics: [topicToRender],
    historySize: 1,
  }) as { [key: string]: MessageEvent<zhito.monitor.Monitor>[] };

  // avoid making new sets for node names
  // the filter bar uess the node names during on-demand filtering
  // const seenNodeNames = useRef(new Set<string>());
  // /
  const monitorMsg = messages[0]?.message;
  return (
    <Stack style={{ justifyContent: "center",overflow:"auto",display:"block" }}>
      <PanelToolbar helpContent={helpContent} floating>
      </PanelToolbar>
      <ResourcePanel monitorMsg={monitorMsg}/>
    </Stack>
  );
});

MonitorPanel.displayName = "Monitor";

export default Panel(
  Object.assign(MonitorPanel, {
    defaultConfig: {},
    panelType: "Monitor", // The legacy RosOut name is used for backwards compatibility
  }),
);
