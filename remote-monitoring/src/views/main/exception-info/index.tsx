import React, { useRef, useState, useContext, useEffect } from "react";
import * as echarts from "echarts";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Context } from "../../../context";
import { exceptionApi } from "../../../api";

const { RangePicker } = DatePicker;

export default function App() {
    const { vehicleList } = useContext(Context) as {
        vehicleList: any[];
    };
    const [curVehicle, setCurVehicle] = useState<number>();
    const [searchHistory, setSearchHistory] = useState<any[]>([]);
    const [vehicleInfo, setVehicleInfo] = useState({
        createTime: "",
        id: "",
        model: "",
        number: "",
        parts: "",
        softwareVersion: "",
        status: "",
        updateTime: "",
        vin: ""
    });
    const [summary, setSummary] = useState({
        abortCount: "",
        degradeCount: "",
        takeoverCount: ""
    });

    const [currentError, setCurrentError] = useState({ code: "", time: "", desc: "" });
    const [historyError, setHistoryError] = useState([{ code: "", time: "", desc: "" }]);

    const [tab, setTab] = useState("errorcode");

    const tabs = [
        {
            id: "errorcode",
            label: "故障码统计"
        },
        {
            id: "abort",
            label: "异常退出统计"
        },
        {
            id: "takeover",
            label: "主动接管次数统计"
        }
    ];

    const [timeSpan, setTimeSpan] = useState([dayjs().add(-1, "month"), dayjs()]);

    const [chartObj, setChartObj] = useState<echarts.ECharts>();
    const chartContainer = useRef<HTMLDivElement>(null);

    const onTimeSpanChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setTimeSpan(dates as [Dayjs, Dayjs]);
        } else {
            setTimeSpan([]);
        }
    };

    // 初始化选择的车牌号
    useEffect(() => {
        setCurVehicle(vehicleList[0]?.id);
    }, [vehicleList]);

    // 查询total数据
    useEffect(() => {
        if (curVehicle) {
            const vehicle = vehicleList.find(item => item.id === curVehicle);
            exceptionApi.getSummary(vehicle).then(res => {
                if (res.data) {
                    setVehicleInfo(res.data.vehicleInfoDTO);
                    setSummary(res.data.faultInfoDTO);
                }
            });
            // 搜索历史
            setSearchHistory([vehicle, ...searchHistory]);
        }
    }, [curVehicle]);

    // 初始化图表
    useEffect(() => {
        if (!chartContainer.current) {
            return;
        }
        const option = {
            color: ["#3370ff", "#ffbf33", "#33b4ff"],
            grid: {
                top: 40,
                right: 30,
                bottom: 40,
                left: 60
            },
            tooltip: {
                trigger: "axis"
            },
            xAxis: {
                type: "category",
                data: [],
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                },
                axisLabel: {
                    hideOverlap: true
                }
            },
            yAxis: {
                type: "value",
                minInterval: 1
            },
            series: [
                {
                    name: "异常退出统计",
                    type: "line",
                    smooth: true,
                    data: [],
                    showSymbol: false
                }
            ]
        };
        const chart = echarts.init(chartContainer.current);
        setChartObj(chart);
        chart.setOption(option);
        function handleResize() {
            chart.resize();
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [tab]);

    useEffect(() => {
        if (!curVehicle) {
            return;
        }
        let dateFrom = timeSpan[0].format("YYYY-MM-DD");
        let dateTo = timeSpan[1].format("YYYY-MM-DD");
        switch (tab) {
            case "errorcode":
                exceptionApi.getErrorcodeStatis({ id: curVehicle + "" }).then(res => {
                    if (res.data) {
                        setCurrentError(res.data.currentErrorList[0]);
                        setHistoryError(res.data.historyErrorList);
                    }
                });
                break;
            case "abort":
                exceptionApi
                    .getAbortStatis({
                        dateFrom,
                        dateTo,
                        id: curVehicle + ""
                    })
                    .then(res => {
                        const arr = res.data.faultCountDTOList.filter((v: any) => v.count) as {
                            count: string;
                            date: string;
                        }[];
                        chartObj?.setOption({
                            xAxis: {
                                data: arr.map(v => v.date)
                            },
                            series: [{ data: arr.map(v => parseFloat(v.count)) }]
                        });
                    });
                break;
            case "takeover":
                exceptionApi
                    .getTakeoverStatis({
                        dateFrom,
                        dateTo,
                        id: curVehicle + ""
                    })
                    .then(res => {
                        const arr = res.data.faultCountDTOList.filter((v: any) => v.count) as {
                            count: string;
                            date: string;
                        }[];
                        chartObj?.setOption({
                            xAxis: {
                                data: arr.map(v => v.date)
                            },
                            series: [{ data: arr.map(v => parseFloat(v.count)) }]
                        });
                    });
                break;

            default:
                break;
        }
    }, [curVehicle, tab, chartObj, timeSpan]);
    return (
        <>
            <ul className="tabs clearfix">
                {searchHistory.slice(0, 4).map((item, index) => (
                    <li
                        key={Math.random()}
                        className={`tab top ${index === 0 ? "active" : ""}`}
                        onClick={() => {
                            setCurVehicle(item.id);
                        }}>
                        {item.number}
                    </li>
                ))}
                <li className="tab select">
                    <Select
                        placeholder="请选择"
                        className="vehicle-number-select"
                        value={curVehicle}
                        style={{ width: 120 }}
                        onChange={v => {
                            setCurVehicle(v);
                        }}
                        options={vehicleList.map((item: { id: number; number: string }) => ({
                            value: item.id,
                            label: item.number
                        }))}
                    />
                </li>
            </ul>
            <div
                className={
                    "info " + (vehicleInfo.status === "离线" ? " disable" : " active")
                }>{`${vehicleInfo.model}_${vehicleInfo.number}_${vehicleInfo.vin}_${vehicleInfo.parts}_${vehicleInfo.softwareVersion}_${vehicleInfo.status}`}</div>
            <div className="card-container">
                <div className="card">
                    <div className="text">主动接管次数（总）</div>
                    <span className="main-text">
                        {summary.takeoverCount}
                        <span className="sub-text">（次）</span>
                    </span>
                </div>
                <div className="card">
                    <div className="text">功能降级次数（总）</div>
                    <span className="main-text">
                        {summary.degradeCount}
                        <span className="sub-text">（次）</span>
                    </span>
                </div>
                <div className="card">
                    <div className="text">异常退出统计（总）</div>
                    <span className="main-text">
                        {summary.abortCount}
                        <span className="sub-text">（次）</span>
                    </span>
                </div>
                <div className="card"></div>
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
            <div className="statis-container">
                {tab === "errorcode" ? (
                    <>
                        <span className="category">当前故障码</span>
                        <p className="text">{`时间：${currentError?.time}，故障码：${currentError?.code}`}</p>
                        <span className="category">历史故障码</span>
                        {historyError.map(item => (
                            <p key={item?.time} className="text">{`时间：${item?.time}，故障码：${item?.code}`}</p>
                        ))}
                    </>
                ) : (
                    <>
                        <div>
                            <RangePicker
                                value={[timeSpan[0], timeSpan[1]]}
                                presets={[
                                    { label: "近一月", value: [dayjs().add(-1, "month"), dayjs()] },
                                    { label: "近半年", value: [dayjs().add(-6, "month"), dayjs()] },
                                    { label: "近一年", value: [dayjs().add(-1, "year"), dayjs()] }
                                ]}
                                onChange={onTimeSpanChange}
                            />
                        </div>
                        <div className="chart" ref={chartContainer}></div>
                    </>
                )}
            </div>
        </>
    );
}
