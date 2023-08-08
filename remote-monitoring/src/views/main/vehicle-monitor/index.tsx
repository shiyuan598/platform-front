import React, { useState, useContext, useEffect } from "react";
import { Select, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Map from "./map";
import { Context } from "../../../context";
import { monitorApi } from "../../../api";

const { RangePicker } = DatePicker;

const tabs = [
    {
        id: "realtime-position",
        label: "实时位置"
    },
    {
        id: "history-trajectory",
        label: "历史轨迹"
    },
    {
        id: "realtime-trajectory",
        label: "实时轨迹"
    }
];
export default function App() {
    const { updateTime, setUpdateTime, vehicleList } = useContext(Context) as {
        updateTime: string;
        setUpdateTime: Function;
        vehicleList: any[];
    };
    const history = useHistory();
    const [vehicleOnline, setVehicleOnline] = useState<any>([]);
    const [vehicleOffline, setVehicleOffline] = useState<any>([]);
    const [tab, setTab] = useState("realtime-position");
    const [timeSpan, setTimeSpan] = useState([dayjs(), dayjs()]);
    const handleClickVehicle = (data: any) => {
        // 跳转到车辆行驶数据
        history.push("/main/driving-data", { ...data });
    };
    const onTimeSpanChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setTimeSpan(dates as [Dayjs, Dayjs]);
            setUpdateTime(dateStrings[0]);
        } else {
            setTimeSpan([]);
        }
    };

    useEffect(() => {
        monitorApi.getVehicleState().then((res) => {
            setVehicleOnline(res?.data?.onlineVehicleInfoList);
            setVehicleOffline(res?.data?.offlineVehicleInfoList);
        });
    }, []);

    return (
        <>
            <div className="card-container vehicle-status">
                <div className="card status online">
                    <div className="main-text">在线：{vehicleOnline.length}</div>
                    <div className="items">
                        {vehicleOnline.map((item: { id: number; number: string }) => (
                            <span
                                className="item text"
                                key={item.id}
                                onClick={() => {
                                    handleClickVehicle(item);
                                }}>
                                {item.number}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="card status offline">
                    <div className="main-text">离线：{vehicleOffline.length}</div>
                    <div className="items">
                        {vehicleOffline.map((item: { id: number; number: string }) => (
                            <span
                                className="item text"
                                key={item.id}
                                onClick={() => {
                                    handleClickVehicle(item);
                                }}>
                                {item.number}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <ul className="tabs clearfix">
                {tabs.map(item => (
                    <li
                        className={`tab ${tab === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => {
                            setTab(item.id);
                        }}>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="statis-container map-container">
                <div className="top-bar">
                    {["history-trajectory", "realtime-trajectory"].includes(tab) && (
                        <Select
                            className="vehicle-number-select"
                            defaultValue={(tab === "history-trajectory" ? vehicleList : vehicleOnline)[0].id}
                            style={{ width: 120 }}
                            onChange={v => {}}
                            options={(tab === "history-trajectory" ? vehicleList : vehicleOnline).map(
                                (item: { id: number; number: string }) => ({ value: item.id, label: item.number })
                            )}
                        />
                    )}
                    {["history-trajectory"].includes(tab) && (
                        <RangePicker
                            value={[timeSpan[0], timeSpan[1]]}
                            presets={[
                                { label: "今天", value: [dayjs(), dayjs()] },
                                { label: "7天", value: [dayjs().add(-6, "day"), dayjs()] },
                                { label: "14天", value: [dayjs().add(-13, "day"), dayjs()] },
                                { label: "30天", value: [dayjs().add(-29, "day"), dayjs()] }
                            ]}
                            onChange={onTimeSpanChange}
                        />
                    )}
                    {["realtime-position", "realtime-trajectory"].includes(tab) && (
                        <div className="time">数据更新 {updateTime}</div>
                    )}
                </div>
                <Map tab={tab}></Map>
            </div>
        </>
    );
}
