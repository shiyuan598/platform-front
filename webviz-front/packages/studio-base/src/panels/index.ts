// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
// import { PanelInfo } from "@foxglove/studio-base/context/PanelCatalogContext";
// import { TAB_PANEL_TYPE } from "@foxglove/studio-base/util/globalConstants";

// import GlobalVariableSliderHelp from "./GlobalVariableSlider/index.help.md";
// import ImageViewHelp from "./ImageView/index.help.md";
// import InternalLogsHelp from "./InternalLogs/index.help.md";
// import InternalsHelp from "./Internals/index.help.md";
// import LogHelp from "./Log/index.help.md";
// import MapHelp from "./Map/index.help.md";
// import NodePlaygroundHelp from "./NodePlayground/index.help.md";
// import ParametersHelp from "./Parameters/index.help.md";
// import PlaybackPerformanceHelp from "./PlaybackPerformance/index.help.md";
// import PlotHelp from "./Plot/index.help.md";
// import PublishHelp from "./Publish/index.help.md";
// import RawMessagesHelp from "./RawMessages/index.help.md";
// import SourceInfoHelp from "./SourceInfo/index.help.md";
// import StateTransitionsHelp from "./StateTransitions/index.help.md";
// import TabHelp from "./Tab/index.help.md";
// import TableHelp from "./Table/index.help.md";
// import TeleopHelp from "./Teleop/index.help.md";
// import ThreeDimensionalVizHelp from "./ThreeDimensionalViz/index.help.md";
// import TopicGraphHelp from "./TopicGraph/index.help.md";
// import URDFViewerHelp from "./URDFViewer/index.help.md";
// import DiagnosticStatusPanelHelp from "./diagnostics/DiagnosticStatusPanel.help.md";
// import DiagnosticSummaryHelp from "./diagnostics/DiagnosticSummary.help.md";

// function backup(){


// const builtin: PanelInfo[] = [
//   {
//     title: "3D",
//     type: "3D Panel",
//     description: "Display visualization markers and models in a 3D scene.",
//     help: ThreeDimensionalVizHelp,
//     module: async () => await import("./ThreeDimensionalViz"),
//   },
//   {
//     title: `Diagnostics – Detail`,
//     type: "DiagnosticStatusPanel",
//     description: "Display ROS DiagnosticArray messages for a specific hardware_id.",
//     help: DiagnosticStatusPanelHelp,
//     module: async () => await import("./diagnostics/DiagnosticStatusPanel"),
//   },
//   {
//     title: `Diagnostics – Summary`,
//     type: "DiagnosticSummary",
//     description: "Display a summary of all ROS DiagnosticArray messages.",
//     help: DiagnosticSummaryHelp,
//     module: async () => await import("./diagnostics/DiagnosticSummary"),
//   },
//   {
//     title: "Image",
//     type: "ImageViewPanel",
//     description: "Display annotated imagehttps://jira.zhito.com:8080/browse/GSL3P-2663s.",
//     help: ImageViewHelp,
//     module: async () => await import("./ImageView"),
//   },
//   {
//     title: "Teleop",
//     type: "Teleop",
//     description: "Teleoperate a robot over a live connection.",
//     help: TeleopHelp,
//     module: async () => await import("./Teleop"),
//   },
//   {
//     title: "Map",
//     type: "map",
//     description: "Display points on a map.",
//     help: MapHelp,
//     module: async () => await import("./Map"),
//   },
//   {
//     title: "Parameters",
//     type: "Parameters",
//     description: "Read and set parameters for a data source.",
//     help: ParametersHelp,
//     module: async () => await import("./Parameters"),
//   },
//   {
//     title: "Plot",
//     type: "Plot",
//     description: "Plot numerical values over time or other values.",
//     help: PlotHelp,
//     module: async () => await import("./Plot"),
//   },
//   {
//     title: "Publish",
//     type: "Publish",
//     description: "Publish messages to the data source (live connections only).",
//     help: PublishHelp,
//     module: async () => await import("./Publish"),
//   },
//   {
//     title: "Raw Messages",
//     type: "RawMessages",
//     description: "Inspect topic messages.",
//     help: RawMessagesHelp,
//     module: async () => await import("./RawMessages"),
//   },
//   {
//     title: "Log",
//     type: "RosOut",
//     description: "Display logs by node and severity level.",
//     help: LogHelp,
//     module: async () => await import("./Log"),
//   },
//   {
//     title: "State Transitions",
//     type: "StateTransitions",
//     description: "Track when values change over time.",
//     help: StateTransitionsHelp,
//     module: async () => await import("./StateTransitions"),
//   },
//   {
//     title: "Table",
//     type: "Table",
//     description: "Display topic messages in a tabular format.",
//     help: TableHelp,
//     module: async () => await import("./Table"),
//   },
//   {
//     title: "URDF Viewer",
//     type: "URDFViewer",
//     description: "Visualize Unified Robot Description Format files.",
//     help: URDFViewerHelp,
//     module: async () => await import("./URDFViewer"),
//   },
//   {
//     title: "Topic Graph",
//     type: "TopicGraph",
//     description: "Display a graph of active nodes, topics, and services.",
//     help: TopicGraphHelp,
//     module: async () => await import("./TopicGraph"),
//   },
//   {
//     title: "Data Source Info",
//     type: "SourceInfo",
//     description: "View details like topics and timestamps for the current data source.",
//     help: SourceInfoHelp,
//     module: async () => await import("./SourceInfo"),
//   },
//   {
//     title: "Variable Slider",
//     type: "GlobalVariableSliderPanel",
//     description: "Update numerical variable values for a layout.",
//     help: GlobalVariableSliderHelp,
//     module: async () => await import("./GlobalVariableSlider"),
//   },
//   {
//     title: "Node Playground",
//     type: "NodePlayground",
//     description: "Write custom data transformations in TypeScript.",
//     help: NodePlaygroundHelp,
//     module: async () => await import("./NodePlayground"),
//   },
//   {
//     title: "Tab",
//     type: TAB_PANEL_TYPE,
//     description: "Group related panels into tabs.",
//     help: TabHelp,
//     module: async () => await import("./Tab"),
//   },
// ];

// const debug: PanelInfo[] = [
//   {
//     title: "Studio - Playback Performance",
//     type: "PlaybackPerformance",
//     description: "Display playback and data-streaming performance statistics.",
//     help: PlaybackPerformanceHelp,
//     module: async () => await import("./PlaybackPerformance"),
//   },
//   {
//     title: "Studio - Internals",
//     type: "Internals",
//     description: "View data publishers and subscribers, and record data for testing.",
//     help: InternalsHelp,
//     module: async () => await import("./Internals"),
//   },
//   {
//     title: "Studio - Logs",
//     type: "InternalLogs",
//     description: "Specify the channels of internal logs to display for debugging.",
//     help: InternalLogsHelp,
//     module: async () => await import("./InternalLogs"),
//   },
// ];

// const hidden: PanelInfo[] = [
//   {
//     title: "Welcome",
//     type: "onboarding.welcome",
//     module: async () => await import("./WelcomePanel"),
//   },
// ];

// const legacyPlot: PanelInfo[] = [
//   {
//     title: "Legacy Plot",
//     type: "LegacyPlot",
//     module: async () => await import("./LegacyPlot"),
//   },
// ];
// }
// export default { builtin, debug, hidden, legacyPlot };


// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import { PanelInfo } from "@foxglove/studio-base/context/PanelCatalogContext";
import { TAB_PANEL_TYPE } from "@foxglove/studio-base/util/globalConstants";

import CarStatusHelp from "./CarStatus/index.help.md";
// import GlobalVariableSliderHelp from "./GlobalVariableSlider/index.help.md";
import ImageViewHelp from "./ImageView/index.help.md";
// import InternalLogsHelp from "./InternalLogs/index.help.md";
// import InternalsHelp from "./Internals/index.help.md";
import LogHelp from "./Log/index.help.md";
import MapHelp from "./Map/index.help.md";
// import NodePlaygroundHelp from "./NodePlayground/index.help.md";
// import ParametersHelp from "./Parameters/index.help.md";
// import PlaybackPerformanceHelp from "./PlaybackPerformance/index.help.md";
import PlotHelp from "./Plot/index.help.md";
// import PublishHelp from "./Publish/index.help.md";
import RawMessagesHelp from "./RawMessages/index.help.md";
import SourceInfoHelp from "./SourceInfo/index.help.md";
// import StateTransitionsHelp from "./StateTransitions/index.help.md";
import TabHelp from "./Tab/index.help.md";
import TableHelp from "./Table/index.help.md";
// import TeleopHelp from "./Teleop/index.help.md";
import ThreeDimensionalVizHelp from "./ThreeDimensionalViz/index.help.md";
// import TopicGraphHelp from "./TopicGraph/index.help.md";
// import URDFViewerHelp from "./URDFViewer/index.help.md";
// import DiagnosticStatusPanelHelp from "./diagnostics/DiagnosticStatusPanel.help.md";
// import DiagnosticSummaryHelp from "./diagnostics/DiagnosticSummary.help.md";

const builtin: PanelInfo[] = [
  { title: "Planning", type: "Planning Charts", help: MapHelp, module: async () => await import("./Charts") },
  {
    title: "车辆状态",
    type: "CarStatus Panel",
    help: CarStatusHelp,
    module: async () => await import("./CarStatus"),
  }, {
    title: "设备状态",
    type: "AdmStatus Panel",
    help: CarStatusHelp,
    module: async () => await import("./AdmStatus"),
  }, {
    title: "ADM调试",
    type: "AdmCmd Panel",
    help: CarStatusHelp,
    module: async () => await import("./AdmCmd"),
  }, {
    title: "定位状态",
    type: "LocStatus Panel",
    help: CarStatusHelp,
    module: async () => await import("./LocStatus"),
  },{
    title: "资源占用",
    type: "Monitor Panel",
    help: CarStatusHelp,
    module: async () => await import("./Monitor"),
  }, {
    title: "导航路线",
    type: "Routing Panel",
    help: CarStatusHelp,
    module: async () => await import("./Routing"),
  }, {
    title: "3D面板",
    type: "3D Panel",
    // description: "Display visualization markers and models in a 3D scene.",
    help: ThreeDimensionalVizHelp,
    module: async () => await import("./ThreeDimensionalViz"),
  },
  // {
  //   title: `Diagnostics – Detail`,
  //   type: "DiagnosticStatusPanel",
  //   help: DiagnosticStatusPanelHelp,
  //   module: async () => await import("./diagnostics/DiagnosticStatusPanel"),
  // },
  // {
  //   title: `Diagnostics – Summary`,
  //   type: "DiagnosticSummary",
  //   help: DiagnosticSummaryHelp,
  //   module: async () => await import("./diagnostics/DiagnosticSummary"),
  // },
  {
    title: "图像",
    type: "ImageViewPanel",
    // description: "Display annotated images.",
    help: ImageViewHelp,
    module: async () => await import("./ImageView"),
  },
  // {
  //   title: "Teleop",
  //   type: "Teleop",
  //   help: TeleopHelp,
  //   module: async () => await import("./Teleop"),
  // },
  { title: "地图", type: "map", help: MapHelp, module: async () => await import("./Map") },
  // {
  //   title: "Parameters",
  //   type: "Parameters",
  //   help: ParametersHelp,
  //   module: async () => await import("./Parameters"),
  // },
  { title: "图表", type: "Plot", help: PlotHelp, module: async () => await import("./Plot") },
  // {
  //   title: "Publish",
  //   type: "Publish",
  //   help: PublishHelp,
  //   module: async () => await import("./Publish"),
  // },
  {
    title: "原始消息",
    type: "RawMessages",
    // description: "Inspect topic messages.",
    help: RawMessagesHelp,
    module: async () => await import("./RawMessages"),
  },
  { title: "日志", type: "RosOut", help: LogHelp, module: async () => await import("./Log") },
  // {
  //   title: "State Transitions",
  //   type: "StateTransitions",
  //   help: StateTransitionsHelp,
  //   module: async () => await import("./StateTransitions"),
  // },
  { title: "表格", type: "Table", help: TableHelp, module: async () => await import("./Table") },
  // {
  //   title: "URDF Viewer",
  //   type: "URDFViewer",
  //   help: URDFViewerHelp,
  //   module: async () => await import("./URDFViewer"),
  // },
  // {
  //   title: "Topic Graph",
  //   type: "TopicGraph",
  //   help: TopicGraphHelp,
  //   module: async () => await import("./TopicGraph"),
  // },
  {
    title: "Topic面板",
    type: "SourceInfo",
    // description: "View details like topics and timestamps for the current data source.",
    help: SourceInfoHelp,
    module: async () => await import("./SourceInfo"),
  },
  // {
  //   title: "Variable Slider",
  //   type: "GlobalVariableSliderPanel",
  //   help: GlobalVariableSliderHelp,
  //   module: async () => await import("./GlobalVariableSlider"),
  // },
  // {
  //   title: "Node Playground",
  //   type: "NodePlayground",
  //   help: NodePlaygroundHelp,
  //   module: async () => await import("./NodePlayground"),
  // },
  { title: "Tab", type: TAB_PANEL_TYPE, help: TabHelp, module: async () => await import("./Tab") },
  { title: "Legacy Plot", type: "LegacyPlot", module: async () => await import("./LegacyPlot") },
];

const debug: PanelInfo[] = [
  // {
  //   title: "Studio - Playback Performance",
  //   type: "PlaybackPerformance",
  //   help: PlaybackPerformanceHelp,
  //   module: async () => await import("./PlaybackPerformance"),
  // },
  // {
  //   title: "Studio - Internals",
  //   type: "Internals",
  //   help: InternalsHelp,
  //   module: async () => await import("./Internals"),
  // },
  // {
  //   title: "Studio - Logs",
  //   type: "InternalLogs",
  //   help: InternalLogsHelp,
  //   module: async () => await import("./InternalLogs"),
  // },
];

const hidden: PanelInfo[] = [
  // {
  //   title: "Welcome",
  //   type: "onboarding.welcome",
  //   module: async () => await import("./WelcomePanel"),
  // },
];

const legacyPlot: PanelInfo[] = [
];

export default { builtin, debug, hidden, legacyPlot };
