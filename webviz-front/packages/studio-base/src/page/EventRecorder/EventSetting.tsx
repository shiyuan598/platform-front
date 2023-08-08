
import { useRecordStore } from "@foxglove/studio-base/components/EventRecorderSidebar/store";
import { timestampToString } from "@foxglove/studio-base/page/EventRecorder/utils";
import { Typography, Select,Stack,Slider, MenuItem } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    background: '#eeeeee',
    padding: "16px",
    // border: '2px solid #000',
    // boxShadow: "24px",
    p: 4,
};

function valuetext(value: number) {
    return `${value}s`;
}
export const EventSetting = ({ stamp }: { stamp: number }) => {
    const { selected, recordMap, updateEvent } = useRecordStore(state => state);
    const record = recordMap[selected];
    const event = record?.events.find(e => e.timestamp === stamp);
    if (record?.events && event) {
        const eventIndex = record?.events.findIndex(e => e.timestamp === stamp) as number;
        const displayIndex = record?.events.length - eventIndex - 1;
        // const nextEvents = record?.events.filter((e, _i) => e.timestamp > stamp);
        // const timestr = timestampToString(event.timestamp);
        return <div style={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                事件: {displayIndex}
            </Typography>
            <Typography id="modal-modal-description" variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                切片时长：
            </Typography>
            <Stack direction={"row"} spacing={2}>
                <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 2, width: 40 }}>
                    {event.duration}s
                </Typography>
                <Slider
                    aria-label="Temperature"
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    value={event.duration}
                    step={10}
                    marks
                    min={30}
                    max={300}
                    onChange={(_e, val) => updateEvent({ timestamp: event.timestamp, duration: val as number })}
                />
            </Stack>

            {/* <Stack direction="row" spacing={1} justifyContent="space-between"> */}
            <Typography id="modal-modal-description" variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                关联事件：
            </Typography>
            <Select
                value={event.subEventStamp??0}// ?? "未选择"
                sx={{ width: "100%" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Age"
                displayEmpty={true}
                onChange={(e) => updateEvent({ timestamp: event.timestamp, subEventStamp: e.target.value as number })}
            // onChange={(val)=>console.log(val)}
            >
                <MenuItem value={0}>未选择</MenuItem>
                {record.events.map((e, i) => i < eventIndex ?
                    <MenuItem value={e.timestamp} key={e.timestamp}>
                        {`序号: ${record.events.length - i - 1} 时间: ${new Date(e.timestamp).toLocaleTimeString()} 描述: ${e.description ?? ""}`}
                    </MenuItem> : null
                ).filter(item=>item!==null)}
            </Select>
            <Typography id="modal-modal-description" variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                输出时间段：
            </Typography>
            <Typography id="modal-modal-description" variant="subtitle1" sx={{ mt: 2 }}>
                {event.start ? timestampToString(event.start) : null} - {event.end ? timestampToString(event.end) : null}
            </Typography>
            {/* </Stack> */}
        </div>
    } else {
        return <div></div>
    }

}
