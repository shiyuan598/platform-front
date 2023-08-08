import * as echarts from 'echarts';
import { useRef, useEffect } from "react";
import {zhito} from "@zhito/proto"
type chartOptions = {
    container: HTMLElement,
    title: string,
    legend: string[],
    xAxisData: number[],
    xAxisName?: string,
    yAxisName?: string,
    yAxis?: { max?: number, min: number },
    seriesType?: string,
    step?: boolean,
    series?: object[]
  }

function createChart(options: chartOptions) {

    const { container, title, legend, xAxisData, yAxis = { min: 0 }, series = [
      {
        name: 'data',
        type: "line",
        showSymbol: false,
        data: []
      }
    ] } = options;
    const chart = echarts.init(container);
    const option = {
      animation: false,
      color: ["#00FF34", '#F00', "#0064ff", "#F7EF43", "#9480FD", "#ccc"],
      grid: {
        top: 10,
        right: 30,
        bottom: 35,
        left: 20,
      },
      legend: {
        orient: "horizontal",
        top: 20,
        data: legend,
        textStyle: {
          color: "#999",
          fontWeight: 600
        },
        lineStyle: {
          width: 1
        },
        itemStyle: {
          opacity: 0
        }
      },
      title: {
        text: title,
        top: 10,
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: "#ccc"
        }
      },
      tooltip: {
        show: false,
      },
      xAxis: {
        type: "category",
        data: xAxisData,

        splitLine: {
          show: false,
          lineStyle: {
            color: "#333"
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#ccc"
          }
        },
        axisLabel: {
          color: "#ccc",
          interval: 15,
          fontWeight: 600,
          formatter: (value: number) => {
            const padStart = (num:number) => {
                return (num.toString()).padStart(2, "0");
            }
            const date = new Date(value * 1000);
            return padStart(date.getHours()) + ":" + padStart(date.getMinutes())//+ ":" + padStart(date.getSeconds());
          },
          hideOverlap: true,
        }
      },
      yAxis: [{
        name: "",
        show:true,
        nameRotate: 0,
        nameLocation: "top",
        nameTextStyle: {
          fontWeight: 600,
          padding: [0, 0, 0, 0]
        },
        type: "value",
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
          lineStyle: {
            color: "#555"
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ccc"
          }
        },
        axisLabel: {
          fontWeight: 600
        },
        max: yAxis.max,
        min: yAxis.min,
      }, {
        name: "kernel(%)",
        nameRotate: 90,
        nameLocation: "center",
        nameTextStyle: {
          fontWeight: 600,
          padding: [15, 0, 0, 0]
        },
        type: "value",
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
          lineStyle: {
            color: "#444"
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ccc"
          }
        },
        axisLabel: {
          fontWeight: 600
        }
      }],
      series
    };
    chart.setOption(option);
    return chart;
  }

export default function Chart({data}: {
    data: zhito.monitor.IUsage[]
}) {

    const xAxisData:number[] = [];
    const userData:number[] = [];
    const kernelData:number[] = [];
    data.forEach(item => {
        xAxisData.push(Math.floor(item.timestamp_sec??1000));
        userData.push(item.user);
        kernelData.push(item.kernel);
    });

  const chartRef = useRef<echarts.ECharts>(ReactNull);
  const chartContainer = useRef<HTMLDivElement>(ReactNull);

  useEffect(() => {
    chartRef.current = createChart({
        container: chartContainer.current as HTMLElement,
        legend: ["user", "kernel"],
        title: "",
        xAxisData,
        yAxisName: "(%)",
        series: [{
          name: "user",
          type: "line",
          step: "center",
          data: userData,
          symbol: "none",
          lineStyle: {
            width: 1,
            color:"#42a5f5"
          }
        }, {
          yAxisIndex: 1,
          name: "kernel",
          type: "line",
          step: "center",
          data: kernelData,
          symbol: "none",
          lineStyle: {
            width: 1,
            color:"#ed6c02"
          }
        }]
      });
      chartRef.current.resize();
  });
    return (
        <div ref={chartContainer} className="chart-container"
          style={{ height: "260px"}}
        >
        </div>
    );
}
