// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useRecordStore } from "./store";
import { SidebarContent } from "./SidebarContent";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import RecordList from "./RecordList";

type Props = {
  // onSelectDataSourceAction: () => void;
};

export default function EventRecorderSidebar(_props: Props): JSX.Element {
  // const { onSelectDataSourceAction } = props;
  // const [enableOpenDialog] = useAppConfigurationValue(AppSetting.OPEN_DIALOG);
  const {connected,recording} = useRecordStore(state => state);
  const color = connected? "success":"error";
  return (
    <div
      // title="事件记录"
      // trailingItems={[
      //   <Stack direction="row" spacing={1}>
      //     <Button variant="contained" color={color} size="small" style={{color:connected?"#eeeeee":"#eeeeee"}}>{connected?"服务已连接":"服务未连接"}</Button>
      //     <Button variant="contained" color={"success"} size="small" disabled={recording===""} style={{color:recording!==""?"#eeeeee":"#cccccc"}}>{recording!==""?"录制中":"未录制"}</Button>
      //   </Stack>
      //     ,


      // ].filter(Boolean)}
    >
      <RecordList />
    </div>
  );
}
