// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.
import { Stack } from "@fluentui/react";
import { zhito } from "@zhito/proto";
import * as echarts from 'echarts';
import { useRef, useMemo, useEffect } from "react";

import * as PanelAPI from "@foxglove/studio-base/PanelAPI";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import TopicToRenderMenu from "@foxglove/studio-base/components/TopicToRenderMenu";
import { MessageEvent } from "@foxglove/studio-base/players/types";

import helpContent from "./index.help.md";
import "./style.css";

type MessageType = {
  data: Uint8Array
};

type Config = {
  topicToRender?: string;
};

type Props = {
  config: Config;
  saveConfig: (arg0: Config) => void;
};

const SUPPORTED_DATATYPES = [
  "zhito2ros_msg/ZhitoChassis",
];

type chartOptions = {
  container: HTMLElement,
  title: string,
  legend: string[],
  xAxisName?: string,
  yAxisName?: string,
  yAxis?: { max?: number, min: number },
  seriesType?: string,
  step?: boolean,
  series?: object[]
}

function createChart(options: chartOptions) {
  const { container, title, legend, yAxisName = "", yAxis = { min: 0 }, series = [
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
    color: ['#F00', "#0064ff", "#F7EF43", "#00FF34", "#9480FD", "#ccc"],
    grid: {
      top: 40,
      right: 30,
      bottom: 40,
      left: 60,
    },
    legend: {
      orient: "vertical",
      top: 60,
      data: legend,
      textStyle: {
        color: "#ccc",
        fontWeight: 600
      },
      lineStyle: {
        width: 14
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
      splitLine: {
        show: true,
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
        fontWeight: 600,
        formatter: (value: number) => {
          const str = value.toString();
          if (str.includes(".")) {
            return `${str.split(".")[0]}.${str.split(".")[1]?.substring(0, 3)}`;
          }
          return str;
        },
        hideOverlap: true,
        rotate: -30
      }
    },
    yAxis: {
      name: yAxisName,
      nameRotate: 90,
      nameLocation: "center",
      nameTextStyle: {
        fontWeight: 600,
        padding: [0, 0, 15, 0]
      },
      type: "value",
      boundaryGap: [0, '100%'],
      splitLine: {
        show: true,
        lineStyle: {
          color: "#333"
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc"
        }
      },
      axisLabel: {
        fontWeight: 600
      },
      max: yAxis.max,
      min: yAxis.min,
      minInterval: 1
    },
    series
  };
  chart.setOption(option);
  return chart;
}
type xyChartOption = {
  container: HTMLElement,
  title: string,
  legendData: string[],
  legendShow?: boolean,
  grid?: {
    top: number,
    right: number,
    bottom: number,
    left: number
  },
  xAxis?: {
    min?: number,
    max?: number,
  }
  yAxis?: {
    name?: string,
    min?: number,
    max?: number,
  }
}
function createXYCharts(options: xyChartOption) {
  const { container, title, legendData = [], legendShow = true, xAxis = { min: 0 }, yAxis, grid } = options;
  const myChart = echarts.init(container);
  const option = {
    legend: {
      show: legendShow,
      orient: "horizontal",
      align: "left",
      top: 30,
      left: 20,
      data: legendData,
      textStyle: {
        color: "#ccc",
        fontWeight: 600
      },
      lineStyle: {
        width: 14
      },
      itemStyle: {
        opacity: 0
      },
      inactiveBorderWidth: 14
    },
    animation: false,
    color: ['#F00', "#0064ff", "#F7EF43", "#00FF34", "#9400D3", "#FF8C00", "#00FFFF", "#FF1493", "#228B22"],
    dataset: legendData.map(() => ({
      source: []
    })),
    grid,
    tooltip: {
      show: false,
    },
    title: {
      text: title,
      top: 10,
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#ccc",
      },
    },
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        fontWeight: 600,
        rotate: -30
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#333"
        }
      },
      min: xAxis.min,
      max: xAxis.max
    },
    yAxis: {
      name: yAxis?.name,
      nameRotate: 90,
      nameLocation: "center",
      nameTextStyle: {
        fontWeight: 600,
        padding: [0, 0, 15, 0]
      },
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        fontWeight: 600,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#333"
        }
      },
      min: yAxis?.min,
      max: yAxis?.max
    },
    series: legendData.map((item, index) => ({
      name: item,
      type: "line",
      smooth: true,
      datasetIndex: index,
      symbol: "none"
    }))
  };

  myChart.setOption(option);
  return myChart;
}

function createHeatMap(container: HTMLElement, title: string) {
  const xAxis = [0, 1, 2, 3, 4, 5, 6, 7];
  const yAxis = [0, 1, 2, 3];

  const chart = echarts.init(container);
  const option = {
    animation: false,
    grid: {
      top: 60,
      right: 30,
      bottom: 50,
      left: 60,
    },
    tooltip: {
      show: false,
    },
    title: {
      text: title,
      top: 10,
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#ccc",
      },
    },

    xAxis: {
      type: "category",
      data: xAxis,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        fontWeight: 600,
      },
    },
    yAxis: {
      type: "category",
      data: yAxis,
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        fontWeight: 600,
      },
    },
    visualMap: {
      type: "piecewise",
      splitNumber: 2,
      itemSymbol: "rect",
      itemWidth: 24,
      textGap: 3,
      pieces: [
        { min: 0, max: 0.5, label: "Normal", color: "#00b020" },
        { min: 0.5, max: 1, label: "Abnormal", color: "#ff001f" },
      ],
      min: 0,
      max: 1,
      orient: "horizontal",
      right: 30,
      top: 30,
      textStyle: {
        fontWeight: 600,
        color: "#ccc",
      },
    },
    series: [
      {
        name: "Punch Card",
        type: "heatmap",
        data: getHeatMapSeriesData({}),
        label: {
          show: true,
        },
      },
    ],
  };
  chart.setOption(option);
  return chart;
}

function getHeatMapSeriesData(option: { lenX?: number, lenY?: number, values?: string | number[] }) {
  const { lenX = 8, lenY = 4, values = [...new Array(32)].map(() => "-") } = option;
  const seriesData = [];
  for (let i = 0; i < lenY; i++) {
    for (let j = 0; j < lenX; j++) {
      const v = values[seriesData.length] as (string | number);
      seriesData.push({
        value: [j, i, v],
        label: { color: "#fff", fontWeight: 600, formatter: (seriesData.length).toString() },
        itemStyle: {
          color: v !== 0 ? "#00b020" : "#ff001f",
          borderColor: "#ccc",
        },
      });
    }
  }
  return seriesData;
}

const ChartsPanel = React.memo(({ config, saveConfig }: Props) => {
  const mainADMissionDataSeries = useRef<number[]>([]);
  const adm2ppCurADMissionDataSeries = useRef<number[]>([]);
  const planningCurADMissionDataSeries = useRef<number[]>([]);
  const laneChangeDataSeries = useRef<number[]>([]);
  // 速度
  const speedChartRef = useRef<echarts.ECharts>(ReactNull)
  const speedChartContainer = useRef<HTMLDivElement>(ReactNull);
  // 加速度
  const accelerationChartRef = useRef<echarts.ECharts>(ReactNull);
  const accelerationChartContainer = useRef<HTMLDivElement>(ReactNull);
  // 坡度
  const slopeChartRef = useRef<echarts.ECharts>(ReactNull);
  const slopeChartContainer = useRef<HTMLDivElement>(ReactNull);
  // theta
  const thetaChartRef = useRef<echarts.ECharts>(ReactNull);
  const thetaChartContainer = useRef<HTMLDivElement>(ReactNull);
  // kappa
  const kappaChartRef = useRef<echarts.ECharts>(ReactNull);
  const kappaChartContainer = useRef<HTMLDivElement>(ReactNull);
  // // path-xy
  // const pathXYChartRef = useRef<echarts.ECharts>(ReactNull);
  // const pathXYChartContainer = useRef<HTMLDivElement>(ReactNull);
  // 变道
  const conditionChartRef = useRef<echarts.ECharts>(ReactNull);
  const conditionChartContainer = useRef<HTMLDivElement>(ReactNull);
  // Caution
  const cautionChartRef = useRef<echarts.ECharts>(ReactNull);
  const cautionChartContainer = useRef<HTMLDivElement>(ReactNull);
  // Caution
  const ODDChartRef = useRef<echarts.ECharts>(ReactNull);
  const ODDChartContainer = useRef<HTMLDivElement>(ReactNull);

  const { topics } = PanelAPI.useDataSourceInfo();

  const protoTopicToRender = useMemo(
    () => topics.find((topic) => topic.name === "/zhito/planning")?.name ?? "/rosout",
    [topics],
  );

  const { [protoTopicToRender]: protoMessages = [] } = PanelAPI.useMessagesByTopic({
    topics: [protoTopicToRender],
    historySize: 1,
  }) as unknown as { [key: string]: MessageEvent<MessageType>[] };
  const planningMsg = protoMessages[0]?.message as unknown as zhito.planning.ADCTrajectory;

  const adm2ppTopicToRender = useMemo(
    () => topics.find((topic) => topic.name === "/zhito/adm/Adm2PP")?.name ?? "/rosout",
    [topics],
  );
  const { [adm2ppTopicToRender]: adm2ppMessages = [] } = PanelAPI.useMessagesByTopic({
    topics: [adm2ppTopicToRender],
    historySize: 1,
  }) as unknown as { [key: string]: MessageEvent<MessageType>[] };
  const adm2ppMsg = adm2ppMessages[0]?.message as unknown as zhito.adm.ADM2PP;

  const admTopicToRender = useMemo(
    () => topics.find((topic) => topic.name === "/zhito/adm/PlanningStatus")?.name ?? "/rosout",
    [topics],
  );
  const { [admTopicToRender]: admMessages = [] } = PanelAPI.useMessagesByTopic({
    topics: [admTopicToRender],
    historySize: 1,
  }) as unknown as { [key: string]: MessageEvent<MessageType>[] };
  const planningStatusMsg = admMessages[0]?.message as unknown as zhito.adm.PlanningStatus;

  // 轨迹速度数据
  const speedData = useMemo(() => {
    const xyData = planningMsg?.trajectory_point.map(item => [item.relative_time, item.v]);
    return {
      xyData
    };
  }, [planningMsg]);
  // 轨迹加速度数据
  const accelerationData = useMemo(() => {
    const xyData = planningMsg?.trajectory_point.map(item => [item.relative_time, item.a]);
    return {
      xyData
    };
  }, [planningMsg]);
  // 轨迹坡度数据
  const slopeData = useMemo(() => {
    const xyData = planningMsg?.trajectory_point.map(item => [item?.path_point?.s, item?.path_point?.slope]);
    return {
      xyData
    };
  }, [planningMsg]);
  // 轨迹theta数据
  const thetaData = useMemo(() => {
    const xyData = planningMsg?.trajectory_point.map(item => [item?.path_point?.s, item?.path_point?.theta]);
    return {
      xyData
    };
  }, [planningMsg]);
  // 轨迹kappa数据
  const kappaData = useMemo(() => {
    const xyData = planningMsg?.trajectory_point.map(item => [item?.path_point?.s, item?.path_point?.kappa]);
    return {
      xyData
    };
  }, [planningMsg]);
  // pathXYData
  // const pathXYData = useMemo(() => {
  //   const raw = planningMsg?.debug?.planning_data?.path;
  //   const data: { source: [number, number][] }[] = [];
  //   raw?.forEach(v => {
  //     const { name, path_point } = v;
  //     if (name && path_point) {
  //       data.push({
  //         source: path_point.map(item => [item.x as number, item.y as number])
  //       })
  //     }
  //   });
  //   return data;
  // }, [planningMsg]);
  // 主任务状态数据
  const mainADMission = useMemo(() => {
    const data = adm2ppMsg?.MainADMission;
    mainADMissionDataSeries.current.push(data + 0.09);
    if (mainADMissionDataSeries.current.length > 500) {
      mainADMissionDataSeries.current.shift();
    }
    return [...mainADMissionDataSeries.current];
  }, [adm2ppMsg]);
  // adm2pp通道中当前任务状态数据
  const adm2ppCurADMission = useMemo(() => {
    const data = adm2ppMsg?.CurrentADMission;
    adm2ppCurADMissionDataSeries.current.push(data + 0.06);
    if (adm2ppCurADMissionDataSeries.current.length > 500) {
      adm2ppCurADMissionDataSeries.current.shift();
    }
    return [...adm2ppCurADMissionDataSeries.current];
  }, [adm2ppMsg]);
  // planningStatus通道中当前任务状态数据
  const planningCurADMission = useMemo(() => {
    const data = planningStatusMsg?.CurrentADMission;
    planningCurADMissionDataSeries.current.push(data + 0.03);
    if (planningCurADMissionDataSeries.current.length > 500) {
      planningCurADMissionDataSeries.current.shift();
    }
    return [...planningCurADMissionDataSeries.current];
  }, [planningStatusMsg]);
  // 变道数据
  const laneChangeCondition = useMemo(() => {
    const data = planningStatusMsg?.LaneChangeCondition;
    laneChangeDataSeries.current.push(data);
    if (laneChangeDataSeries.current.length > 500) {
      laneChangeDataSeries.current.shift();
    }
    return [...laneChangeDataSeries.current];
  }, [planningStatusMsg]);

  // caution数据
  const cautionInfo = useMemo(() => {
    const data = planningStatusMsg?.PDPHMICautionInfo;
    if (data != undefined) {
      return data.toString(2).split("").map(item => Number(item)).reverse();
    }
    return [...(new Array(32))].map(() => "-");
  }, [planningStatusMsg]);

  // ODD数据
  const ODDInfo = useMemo(() => {
    const data = planningStatusMsg?.OutODDReason;
    if (data != undefined) {
      return data.toString(2).padStart(32, "0").split("").map(item => Number(item) === 1 ? 0 : 1).reverse();
    }
    return [...(new Array(32))].map(() => "-");
  }, [planningStatusMsg]);

  const topicToRenderMenu = (
    <TopicToRenderMenu
      topicToRender={protoTopicToRender}
      onChange={(newTopicToRender) => saveConfig({ ...config, topicToRender: newTopicToRender })}
      topics={topics}
      allowedDatatypes={SUPPORTED_DATATYPES}
      defaultTopicToRender={protoTopicToRender}
    />
  );
  useEffect(() => {
    speedChartRef.current = createXYCharts({
      container: speedChartContainer.current as HTMLElement,
      title: "Planning Speed",
      legendData: ["speed"],
      legendShow: false,
      xAxis: {
        min: 0,
        max: 7
      },
      yAxis: {
        name: "speed(m/s)",
        min: 0,
        max: 30
      },
      grid: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 60,
      }
    });
    accelerationChartRef.current = createXYCharts({
      container: accelerationChartContainer.current as HTMLElement,
      title: "Planning Acceleration",
      legendData: ["acceleration"],
      legendShow: false,
      xAxis: {
        min: 0,
        max: 7
      },
      yAxis: {
        name: "speed(m/s)",
        min: -4,
        max: 2
      },
      grid: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 60,
      }
    });
    slopeChartRef.current = createXYCharts({
      container: slopeChartContainer.current as HTMLElement,
      title: "Trajectory Slope",
      legendData: ["slope"],
      legendShow: false,
      xAxis: {
        min: 0,
        max: 200
      },
      yAxis: {
        name: "",
        min: -10,
        max: 10
      },
      grid: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 60,
      }
    });
    thetaChartRef.current = createXYCharts({
      container: thetaChartContainer.current as HTMLElement,
      title: "Trajectory Heading",
      legendData: ["theta"],
      legendShow: false,
      xAxis: {
        min: 0,
        max: 200
      },
      yAxis: {
        name: "",
        min: -Math.PI,
        max: Math.PI
      },
      grid: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 60,
      }
    });
    kappaChartRef.current = createXYCharts({
      container: kappaChartContainer.current as HTMLElement,
      title: "Trajectory Kappa",
      legendData: ["kappa"],
      legendShow: false,
      xAxis: {
        min: 0,
        max: 200
      },
      yAxis: {
        name: "",
        // min: 0,
        // max: 4
      },
      grid: {
        top: 40,
        right: 30,
        bottom: 40,
        left: 60,
      }
    });
    // const pathXYLegend = [
    //   "corridor_1", "corridor_2",
    //   "left_hard", "right_hard",
    //   "left_soft", "right_soft",
    //   "vehicle", "reference_line"
    // ];
    // pathXYChartRef.current = createXYCharts({
    //   container: pathXYChartContainer.current as HTMLElement,
    //   title: "Planning Path",
    //   legendData: pathXYLegend,
    //   grid: {
    //     top: 120,
    //     right: 30,
    //     bottom: 50,
    //     left: 60,
    //   }
    // });
    conditionChartRef.current = createChart({
      container: conditionChartContainer.current as HTMLElement,
      legend: ["MainADMission", "Adm2pp/CurrentADMission", "PlanningStatus/CurrentADMission", "LaneChangeCondition"],
      title: "Status",
      yAxisName: "",
      series: [{
        name: "MainADMission",
        type: "line",
        step: "center",
        data: [],
        symbol: "none"
      }, {
        name: "Adm2pp/CurrentADMission",
        type: "line",
        step: "center",
        data: [],
        symbol: "none"
      }, {
        name: "PlanningStatus/CurrentADMission",
        type: "line",
        step: "center",
        data: [],
        symbol: "none"
      }, {
        name: "LaneChangeCondition",
        type: "line",
        step: "center",
        data: [],
        symbol: "none"
      }]
    });
    cautionChartRef.current = createHeatMap(cautionChartContainer.current as HTMLElement, "PDP Caution");
    ODDChartRef.current = createHeatMap(ODDChartContainer.current as HTMLElement, "PDP ODD");

    function handleResize() {
      speedChartRef.current?.resize();
      accelerationChartRef.current?.resize();
      slopeChartRef.current?.resize();
      thetaChartRef.current?.resize();
      kappaChartRef.current?.resize();
      // pathXYChartRef.current?.resize();
      conditionChartRef.current?.resize();
      cautionChartRef.current?.resize();
      ODDChartRef.current?.resize();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (speedChartRef.current && speedData?.xyData?.length > 0) {
      speedChartRef.current.setOption({
        dataset: [{
          source: speedData?.xyData
        }]
      });
      speedChartRef.current.resize();
    }
  }, [speedData]);

  useEffect(() => {
    if (accelerationChartRef.current && accelerationData?.xyData?.length > 0) {
      accelerationChartRef.current.setOption({
        dataset: [{
          source: accelerationData?.xyData
        }]
      });
      accelerationChartRef.current.resize();
    }
  }, [accelerationData]);

  useEffect(() => {
    if (slopeChartRef.current && slopeData?.xyData?.length > 0) {
      slopeChartRef.current.setOption({
        dataset: [{
          source: slopeData?.xyData
        }]
      });
      slopeChartRef.current.resize();
    }
  }, [slopeData]);

  useEffect(() => {
    if (thetaChartRef.current && thetaData?.xyData?.length > 0) {
      thetaChartRef.current.setOption({
        dataset: [{
          source: thetaData?.xyData
        }]
      });
      thetaChartRef.current.resize();
    }
  }, [thetaData]);

  useEffect(() => {
    if (kappaChartRef.current && kappaData?.xyData?.length > 0) {
      kappaChartRef.current.setOption({
        dataset: [{
          source: kappaData?.xyData
        }]
      });
      kappaChartRef.current.resize();
    }
  }, [kappaData]);

  // useEffect(() => {
  //   if (pathXYChartRef.current) {
  //     // 计算x，y的最大最小值
  //     const xArr: number[] = [];
  //     const yArr: number[] = [];

  //     pathXYData.forEach(item => {
  //       const source = item.source;
  //       source.forEach(v => {
  //         xArr.push(v[0]);
  //         yArr.push(v[1]);
  //       });
  //     });

  //     const xMin = Math.min(...xArr);
  //     const xMax = Math.max(...xArr);
  //     const yMin = Math.min(...yArr);
  //     const yMax = Math.max(...yArr);

  //     pathXYChartRef.current.setOption({
  //       dataset: pathXYData,
  //       xAxis: {
  //         min: Math.ceil(xMin - (xMax - xMin) * 0.05),
  //         max: Math.ceil(xMax + (xMax - xMin) * 0.05)
  //       },
  //       yAxis: {
  //         min: Math.ceil(yMin - (yMax - yMin) * 0.05),
  //         max: Math.ceil(yMax + (yMax - yMin) * 0.05)
  //       }
  //     });
  //     pathXYChartRef.current.resize();
  //   }
  // }, [pathXYData]);

  useEffect(() => {
    if (conditionChartRef.current) {
      const series = conditionChartRef.current.getOption().series as { data: object }[];
      if (series.length > 0 && series[0]) {
        series[0].data = mainADMission;
      }
      conditionChartRef.current.setOption({
        xAxis: {
          data: mainADMission.map((_v, i) => i + 1)
        },
        series
      });
      conditionChartRef.current.resize();
    }
  }, [mainADMission]);

  useEffect(() => {
    if (conditionChartRef.current) {
      const series = conditionChartRef.current.getOption().series as { data: object }[];
      if (series.length > 0 && series[1]) {
        series[1].data = adm2ppCurADMission;
      }
      conditionChartRef.current.setOption({
        xAxis: {
          data: adm2ppCurADMission.map((_v, i) => i + 1)
        },
        series
      });
    }
  }, [adm2ppCurADMission]);

  useEffect(() => {
    if (conditionChartRef.current) {
      const series = conditionChartRef.current.getOption().series as { data: object }[];
      if (series.length > 0 && series[2]) {
        series[2].data = planningCurADMission;
      }
      conditionChartRef.current.setOption({
        xAxis: {
          data: planningCurADMission.map((_v, i) => i + 1)
        },
        series
      });
    }
  }, [planningCurADMission]);

  useEffect(() => {
    if (conditionChartRef.current) {
      const series = conditionChartRef.current.getOption().series as { data: object }[];
      if (series.length > 0 && series[3]) {
        series[3].data = laneChangeCondition;
      }
      conditionChartRef.current.setOption({
        xAxis: {
          data: laneChangeCondition.map((_v, i) => i + 1)
        },
        series
      });
    }
  }, [laneChangeCondition]);

  useEffect(() => {
    if (cautionChartRef.current) {
      const series = cautionChartRef.current.getOption().series as { data: object }[];
      if (series.length > 0 && series[0]) {
        series[0].data = getHeatMapSeriesData({ values: cautionInfo as number[] });
      }
      cautionChartRef.current.setOption({
        series
      });
      cautionChartRef.current.resize();
    }
  }, [cautionInfo]);

  useEffect(() => {
    if (ODDChartRef.current) {
      const series = ODDChartRef.current.getOption().series as { data: object }[];
      if (series.length > 0 && series[0]) {
        series[0].data = getHeatMapSeriesData({ values: ODDInfo as number[] });
      }
      ODDChartRef.current.setOption({
        series
      });
      ODDChartRef.current.resize();
    }
  }, [ODDInfo]);

  return (
    <Stack verticalFill style={{ justifyContent: "center" }}>
      <PanelToolbar helpContent={helpContent} additionalIcons={topicToRenderMenu} floating>
      </PanelToolbar>
      <div className="charts-container">
        <div className="chart" ref={speedChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        <div className="chart" ref={accelerationChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        <div className="chart" ref={slopeChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        <div className="chart" ref={thetaChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        <div className="chart" ref={kappaChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        {/* <div className="chart path-chart" ref={pathXYChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>*/}
        <div className="chart" ref={conditionChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        <div className="chart" ref={cautionChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
        <div className="chart" ref={ODDChartContainer}
          style={{ width: "100%", height: "100%" }}
        >
        </div>
      </div>
    </Stack>
  );
});

ChartsPanel.displayName = "Charts";

export default Panel(
  Object.assign(ChartsPanel, {
    defaultConfig: {} as Config,
    panelType: "Charts",
  }),
);
