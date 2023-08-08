import { useCallback, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { RecordObject, useRecordStore } from "@foxglove/studio-base/components/EventRecorderSidebar/store";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function RecoderLisener({ addIcon }: { addIcon?: boolean }) {
  const { recordingKey, connected, selected, recordMap, syncServer, fetchRecord, setBagList, updateEvent, setStatus } = useRecordStore(state => state);
  const { enqueueSnackbar } = useSnackbar();
  const addEvent = useCallback(async () => {
    if (!connected) {
      enqueueSnackbar(`服务连接失败, 请使用v3na-ros2-tools v2.3.3.3-0730以上版本`, { variant: "error" });
      return;
    }
    if (recordingKey === "") {
      enqueueSnackbar(`请使用 ros2 bag sub --cyber --bag 启动录制`, { variant: "error" });
      return;
    }
    let record: RecordObject | undefined;
    if (!recordMap[recordingKey]) {
      record = await fetchRecord(recordingKey);
    } else {
      record = recordMap[recordingKey];
    }
    if (record) {
      const now = new Date();
      updateEvent({ timestamp: now.getTime(), description: "", duration:30 }, true);
      if (!record.info.car || record.info.car === "未选择") {
        enqueueSnackbar(`事件已记录, 请选择车型！`, { variant: "warning" });
      } else {
        enqueueSnackbar(`事件已记录, 保存至 ${record.info.name}`, { variant: "success" });
      }

    }
  },[recordingKey, connected, recordMap, updateEvent])
  const handleKeyDown = useCallback(async (event: KeyboardEvent) => {
    if (event.key === "Enter" && event.ctrlKey) {
      addEvent();
    }
    // console.log(event.key,event.ctrlKey)
  }, [addEvent]);


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fetchBagList = async () => {

      await fetch(`http://${window.location.hostname}:8091/bag/status`).then(res => res.json()).then(json => {
        const {bagList,autoRecording,voiceRecording} = json;
        setBagList(bagList);
        setStatus(true,voiceRecording,autoRecording);
      }).catch(_e => {
        setStatus(false,false,false);
      })
      await syncServer(enqueueSnackbar);


      timeout = setTimeout(fetchBagList, 3000);
    }
    fetchBagList();
    return () => {
      clearTimeout(timeout);
    }
  }, [setBagList, setStatus, syncServer, enqueueSnackbar])

  useEffect(() => {

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    }
  }, [recordingKey, connected, recordMap])
  useEffect(() => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.id = "zhito_record_download"
    // a.style = "display: none";
  }, [])

  if (addIcon&&(recordingKey==selected)) {
    // const top = `${window.screen.availHeight-60}px`;
    return (<Fab color="primary" aria-label="add"
      onClick={addEvent}
      sx={{position:"fixed", bottom:"20px", right:"20px", zIndex: 11111}}>
      <AddIcon />
    </Fab>)
  } else {
    return <a />
  }

}
