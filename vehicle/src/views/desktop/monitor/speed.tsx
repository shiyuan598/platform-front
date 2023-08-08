import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function Speed(props: {speed: number}) {
    const [chart, setChart] = useState<echarts.ECharts>();
    const chartContainer = useRef<HTMLDivElement>(null);
    // 初始化图表
    useEffect(() => {
        console.info("初始化速度组件");
        if (!chartContainer.current) {
            return;
        }
        const chartOption = {
            series: [
                {
                    type: "gauge",
                    radius: "90%",
                    max: 120,
                    splitNumber: 12,
                    axisLine: {
                        lineStyle: {
                            width: 2,
                            color: [[1, "#C67C41"]]
                        }
                    },
                    pointer: {
                        itemStyle: {
                            color: "#FA0006"
                        }
                    },
                    axisTick: {
                        distance: 0,
                        length: 6,
                        lineStyle: {
                            color: "#fff",
                            width: 2
                        }
                    },
                    splitLine: {
                        distance: 0,
                        length: 14,
                        lineStyle: {
                            color: "#fff",
                            width: 2
                        }
                    },
                    axisLabel: {
                        color: "#f1f1f1",
                        distance: 6,
                        fontSize: 12
                    },
                    detail: {
                        valueAnimation: true,
                        fontSize: 16,
                        offsetCenter: [0, "30%"],
                        formatter: "{value} km/h",
                        color: "#fff"
                    },
                    data: [
                        {
                            value: 0
                        }
                    ]
                }
            ]
        };
        const chartObj = echarts.init(chartContainer.current);
        setChart(chartObj);
        chartObj.setOption(chartOption);

        function handleResize() {
            chartObj.resize();
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(()=>{
        chart && chart.setOption({
            series: {
                data: [{value: props.speed}]
            }
        });
    }, [chart, props.speed])

    return <div style={{height: "100%", width: "100%"}} ref={chartContainer}></div>;
}
