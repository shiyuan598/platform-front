import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Spin, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { dict as dictApi, vehicle as vehicleApi } from "../../../api";
import * as echarts from "echarts";
import BookingModal from "../vehicle/booking";
import { ModalContext } from "../../../context";
import { transformPhoneNumber, throttle } from "../../../common/util";
import style from "./vehicle.module.scss";

const { Search } = Input;

// 获取一周的上午/下午时间分割点
let timeSpanArr: any = [];
for (let i = 0; i < 14; i++) {
    const start = moment(moment().format("YYYY-MM-DD") + " 00:00:00")
        .add(12 * i, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    const end = moment(moment().format("YYYY-MM-DD") + " 00:00:00")
        .add(12 + 12 * i, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    timeSpanArr.push([start, end]);
}

export default function App() {
    const [projectIds, setProjectIds] = useState<any>([]); // 车辆编号
    const [keyword, setKeyword] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [curData, setCurData] = useState<any>(null);
    const [vehicles, setVehicles] = useState([]);
    const [orderTime, setOrderTime] = useState([]);
    const [vehicleWithOrderInfo, setVehicleWithOrderInfo] = useState([]);
    const [loading, setLoading] = useState(false); // loading
    const chartRef = useRef<echarts.ECharts>();
    const chartContainer = useRef<HTMLDivElement>(null);
    const [chartHeight, setChartHeight] = useState("300px");
    const history = useHistory();

    const removeTag = (e: any, value: string) => {
        e.stopPropagation();
        setProjectIds(projectIds.slice(1, projectIds.length));
    };

    const tagRender = (props: any) => {
        let { value, label } = props;
        let index = projectIds.indexOf(value);
        if (index === 0) {
            return (
                <span className="ant-select-selection-item">
                    <span className="ant-select-selection-item-content">{label}</span>
                    <span
                        className="ant-select-selection-item-remove"
                        onClick={(e) => {
                            removeTag(e, value);
                        }}>
                        <CloseOutlined />
                    </span>
                </span>
            );
        } else if (index === 1) {
            return <span className="ant-select-selection-item">{`+ ${projectIds.length - 1}`}</span>;
        } else {
            return <></>;
        }
    };

    const projectChange = (value: string) => {
        setProjectIds(value);
    };

    const keywordChange = (e: any) => {
        setKeyword(e?.target?.value);
    };

    const createHeatMap = (container: HTMLElement, title: string) => {
        const chart = echarts.init(container);
        const option = {
            animation: true,
            grid: {
                top: 50,
                right: 30,
                bottom: 50,
                left: 120
            },
            tooltip: {
                show: true,
                borderWidth: 0,
                backgroundColor: "rgba(20,20,20,0.85)",
                textStyle: {
                    color: "#ccc"
                }
            },
            title: {
                text: title,
                top: 5,
                left: "center",
                textStyle: {
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#ccc"
                }
            },
            xAxis: [
                {
                    type: "category",
                    data: [],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#333"
                        }
                    },
                    axisLabel: {
                        color: "rgba(255, 255, 255, 0.55)",
                        fontWeight: 600,
                        rotate: 15
                    }
                },
                {
                    type: "category",
                    data: [],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#333"
                        }
                    },
                    axisLabel: {
                        color: "rgba(255, 255, 255, 0.55)",
                        fontWeight: 600,
                        rotate: 15
                    }
                }
            ],
            yAxis: {
                type: "category",
                data: [],
                axisTick: { show: false },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#333"
                    }
                },
                axisLabel: {
                    fontWeight: 600,
                    color: "rgba(255, 255, 255, 0.55)"
                }
            },
            visualMap: {
                show: false,
                type: "piecewise",
                splitNumber: 2,
                itemSymbol: "rect",
                itemWidth: 24,
                textGap: 3,
                pieces: [
                    { min: 0, max: 0.5, label: "空闲", color: "#00b020" },
                    { min: 0.5, max: 1, label: "占用", color: "#177ddc" }
                ],
                min: 0,
                max: 1,
                orient: "horizontal",
                right: 30,
                top: 10,
                textStyle: {
                    fontWeight: 600,
                    color: "#555"
                }
            },
            series: [
                {
                    name: "Punch Card",
                    type: "heatmap",
                    data: [],
                    label: {
                        show: true
                    }
                }
            ]
        };
        chart.setOption(option);
        return chart;
    };

    const getHeatMapSeriesData = (option: { lenX?: number; lenY?: number; values?: any }) => {
        const { lenX = 14, lenY = 28, values = [...new Array(lenX * lenY)].map(() => "-") } = option;
        const seriesData = [];
        for (let i = 0; i < lenY; i++) {
            for (let j = 0; j < lenX; j++) {
                const v = values?.[i]?.[j] as string | number;
                seriesData.push({
                    value: [j, i, v],
                    label: { color: "rgba(255, 255, 255, 0.85)", fontWeight: 400, fontSize: 13, formatter: v !== 1 ? "预订" : "占用" },
                    itemStyle: {
                        color: v !== 1 ? "#1f1f1f" : "#0050b3",
                        borderColor: "#333"
                    }
                });
            }
        }
        return seriesData;
    };

    const [projectList, setProjectList] = useState([] as { id: number; name: string }[]);
    useEffect(() => {
        dictApi.getProject().then((v) => {
            if (v.code === 0) {
                setProjectList(v.data.map((item: any) => ({ value: item.id, label: item.name })));
            } else {
                message.error(v.msg);
            }
        });

        // 初始化图表
        chartRef.current = createHeatMap(chartContainer.current as HTMLElement, "");
        function handleResize() {
            chartRef.current?.resize();
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 查询订单和车辆数据
    useEffect(() => {
        setLoading(true);
        // 查询所有的车辆
        vehicleApi.getAvailableVehicle(projectIds, keyword).then((v) => {
            setVehicles(v.data);
            const vehicleIds = v.data.map((item: any) => item.id);
            // 查询一周的订单
            let start = moment().format("YYYY-MM-DD");
            let end = moment().add(6, "day").format("YYYY-MM-DD");
            vehicleApi
                .getUseTime(start, end, vehicleIds)
                .then((v) => {
                    setOrderTime(v.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    }, [projectIds, keyword]);

    // 准备图表的数据
    useEffect(() => {
        if (vehicles.length) {
            const vehicleWithOrder = [...vehicles]
                .map((item: any) => {
                    return {
                        ...item,
                        orders: [...new Array(14)]
                    };
                })
                .reverse();
            orderTime.forEach((order: any) => {
                // 1.找到订单时间和切分好的上午/下午重合的index
                let { start, end } = order;
                let orderStart = moment(start);
                let orderEnd = moment(end);
                let matchTimeSpanIndex: number[] = [];
                timeSpanArr.forEach((timeSpan: any, index: number) => {
                    let spanStart = moment(timeSpan[0]);
                    let spanEnd = moment(timeSpan[1]);
                    if (!(orderStart.isSameOrAfter(spanEnd) || orderEnd.isSameOrBefore(spanStart))) {
                        matchTimeSpanIndex.push(index);
                    }
                });
                // 2.找到车辆列表中的该辆车的index
                let matchVehicleIndex = vehicleWithOrder.findIndex(
                    (vehicle: any, index) => vehicle.id === order.vehicleId
                );
                // 3.把订单信息写入车辆
                if (matchVehicleIndex > -1) {
                    let orders = (vehicleWithOrder[matchVehicleIndex] as unknown as any).orders;
                    orders.forEach((item: any, index: number) => {
                        if (matchTimeSpanIndex.includes(index)) {
                            if (orders[index]) {
                                orders[index].push(order);
                            } else {
                                orders[index] = [order];
                            }
                        }
                    });
                }
            });
            setVehicleWithOrderInfo(vehicleWithOrder as unknown as any);
            // 4.修改表的高度
            setChartHeight(vehicles.length * 30 + 130 + "px");
        } else {
            setVehicleWithOrderInfo([]);
            setChartHeight("0");
        }
    }, [vehicles, orderTime]);
    
    useEffect(() => {
        if (chartRef.current) {
            const series = chartRef.current.getOption().series as { data: object }[];
            if (series.length > 0 && series[0]) {
                let values = vehicleWithOrderInfo.map((item: any) => {
                    return item.orders.map((v: any) => (v ? 1 : 0));
                });
                series[0].data = getHeatMapSeriesData({ lenY: values.length, values: values });
            }
            const xAxisData = timeSpanArr.map(
                (item: any, index: number) => `${item[0].substr(5, 5)}周${moment(item[0]).format("dd")}${index % 2 ? "下午" : "上午"}`
            );
            chartRef.current.setOption({
                tooltip: {
                    formatter: (params: any) => {
                        let [x, y, value] = params.value;
                        let vehicle = vehicleWithOrderInfo[y] as unknown as any;
                        let vehicleNo = vehicle?.vehicleNo;
                        let orders = vehicle?.orders[x];

                        let listItem = "";
                        if (value === 1) {
                            let list: any[] = [];
                            orders.forEach((order: any) => {
                                list.push(
                                    `<i style="display: inline-block;width: 10px;height: 10px;background: #F35034;margin-right: 5px;border-radius: 50%;"></i>
                                    <span>${order.module}  ${order.name}  ${transformPhoneNumber(
                                        order.telephone
                                    )}</span>&nbsp&nbsp<span style="font-style:italic">${
                                        order.start.substr(5) + " - " + order.end.substr(5)
                                    }</span>`
                                );
                            });
                            listItem =
                                `<div style="font-weight: 700;">${params.name + " " + vehicleNo}使用情况</div>` +
                                list.join("<br>");
                        } else {
                            listItem = `<div style="font-weight: 700;">${params.name + " " + vehicleNo}空闲</div>
                            <i style="display: inline-block;width: 10px;height: 10px;background: #00b020;margin-right: 5px;border-radius: 50%;"></i>
                            <span>点击预订该时间用车</span>`;
                        }

                        return '<div class="showBox">' + listItem + "</div>";
                    }
                },
                xAxis: [
                    {
                        data: xAxisData
                    },
                    {
                        data: xAxisData
                    }
                ],
                yAxis: {
                    data: vehicleWithOrderInfo.map((item: any) => `${item.project} ${item.vehicleNo}`)
                },
                series
            });
            chartRef.current.resize();
            chartRef.current.on("click", handlerChartClick);
            chartRef.current.on("contextmenu", handlerContextMenu);
        }
        function handlerChartClick(params: any) {
            let [x, y, value] = params.value;
            if (value) {
                return;
            }
            let vehicle = vehicleWithOrderInfo[y] as unknown as any;
            let vehicleId = vehicle?.id;
            let vehicleNo = vehicle?.vehicleNo;
            let project = vehicle?.project;
            let [start, end] = timeSpanArr[x];
            // 调整一下开始结束的时间
            if (start.endsWith(" 00:00:00")) {
                start = start.substr(0, 11) + " 09:00:00";
            } else {
                start = start.substr(0, 11) + " 13:00:00";
                end = start.substr(0, 11) + " 18:00:00";
            }
            setCurData({
                id: vehicleId,
                vehicleNo: vehicleNo,
                project: project,
                timeSpan: [moment(start, "YYYY-MM-DD HH:mm:ss"), moment(end, "YYYY-MM-DD HH:mm:ss")]
            });
            setModalShow(true);
        }
        function handlerContextMenu(params: any) {
            history.push("/desktop/order");
        }
        return () => {
            chartRef.current?.off("click", handlerChartClick);
            chartRef.current?.off("contextmenu", handlerContextMenu);
        };
    }, [vehicleWithOrderInfo, history]);

    return (
        <div>
            <h4>车辆一周使用情况</h4>
            <div className={style.optionContainer}>
                <div className={style.option}>
                    <span className={style.label}>所属项目:</span>
                    <Select
                        tagRender={tagRender}
                        style={{ width: "200px" }}
                        mode="multiple"
                        allowClear
                        value={projectIds}
                        defaultValue={"0"}
                        placeholder="请选择所属项目"
                        onChange={projectChange}
                        options={projectList}></Select>
                </div>
                <div className={style.option}>
                    <span className={style.label}>车辆编号:</span>
                    <Search
                        className={style.search}
                        placeholder="请输入车辆编号"
                        onChange={throttle(keywordChange)}
                        allowClear
                        enterButton
                    />
                </div>
            </div>
            <Spin spinning={loading}>
                <div className="chart" ref={chartContainer} style={{ width: "100%", height: chartHeight as any }}></div>
            </Spin>
            <ModalContext.Provider value={{ modalShow, setModalShow, curRow: curData }}>
                {modalShow && <BookingModal></BookingModal>}
            </ModalContext.Provider>
        </div>
    );
}
