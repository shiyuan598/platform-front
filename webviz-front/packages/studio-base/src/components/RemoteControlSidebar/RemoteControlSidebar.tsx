// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { SidebarContent } from "@foxglove/studio-base/components/SidebarContent";

import Tabs from "./Tabs"
type Props = {
  // onSelectDataSourceAction: () => void;
};

export default function RemoteControlSidebar(_props: Props): JSX.Element {

  return (
    <SidebarContent
      title="远程控制"
      helpContent={"提供ADM远程调试、RemoteCMD命令发送等功能"}
      noPadding={true}
      trailingItems={[

      ].filter(Boolean)}
    >
      {/* <ConnectionList /> */}
      <Tabs></Tabs>
      {/* <ConnectionList /> */}
    </SidebarContent>
  );
}
