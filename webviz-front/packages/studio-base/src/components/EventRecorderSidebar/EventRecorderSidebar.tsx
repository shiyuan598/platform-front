// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useRecordStore } from "@foxglove/studio-base/components/EventRecorderSidebar/store";
import { SidebarContent } from "@foxglove/studio-base/components/SidebarContent";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import RecordPanel from "./RecordPanel";

type Props = {
  // onSelectDataSourceAction: () => void;
};

export default function EventRecorderSidebar(_props: Props): JSX.Element {
  // const { onSelectDataSourceAction } = props;
  // const [enableOpenDialog] = useAppConfigurationValue(AppSetting.OPEN_DIALOG);
  const {voiceRecording, autoRecording, recordingKey} = useRecordStore(state => state);
  // const color = connected? "success":"error";
  return (
    <SidebarContent
      title="事件记录"
      trailingItems={[
        <Stack direction="row" spacing={1}>
          {/* <Button variant="contained" color={color} size="small" style={{color:connected?"#eeeeee":"#eeeeee"}}>{connected?"服务已连接":"服务未连接"}</Button> */}
          <Button variant="contained" color={"success"} size="small" disabled={recordingKey===""} style={{color:recordingKey!==""?"#eeeeee":"#cccccc"}}>{recordingKey!==""?"录制中":"未录制"}</Button>
          <Button variant="contained" color={voiceRecording? "success":"error"} size="small" style={{color:voiceRecording?"#eeeeee":"#cccccc"}}>{"语音标签"}</Button>
          <Button variant="contained" color={autoRecording? "success":"error"} size="small" style={{color:autoRecording?"#eeeeee":"#cccccc"}}>{"自动标签"}</Button>

        </Stack>
          ,


      ].filter(Boolean)}
    >
      <RecordPanel />
    </SidebarContent>
  );
}
