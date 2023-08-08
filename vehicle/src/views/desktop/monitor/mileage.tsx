import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function Speed(props: { data: object }) {
    const [chart, setChart] = useState<echarts.ECharts>();
    const chartContainer = useRef<HTMLDivElement>(null);
    // 初始化图表
    useEffect(() => {
        console.info("初始化里程组件");
        if (!chartContainer.current) {
            return;
        }
        const chartOption = {
            color: [
                "#0f375f",
                new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#14c8d4" },
                    { offset: 1, color: "rgba(20,200,212,0.5)" }
                ])
            ],
            tooltip: {
                trigger: "item"
            },
            legend: {
                top: "2%",
                right: "right",
                // left: "center",
                textStyle: {
                    color: "#f3f3f3"
                }
            },
            series: [
                {
                    name: "Mileage",
                    type: "pie",
                    radius: ["55%", "65%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        formatter: "{c}" // 显示名称和数值
                        // position: "center"
                    },
                    labelLine: {
                        length: 6, // 控制标签线的长度
                        smooth: 0.5 // 设置标签线的曲度
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: "bold"
                        }
                    },
                    data: [
                        { value: 1048, name: "Total" },
                        { value: 735, name: "Auto" }
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

    useEffect(() => {
        chart &&
            chart.setOption({
                series: {
                    data: props.data
                }
            });
    }, [chart, props.data]);

    return <div style={{ height: "100%", width: "100%" }} ref={chartContainer}></div>;
}
