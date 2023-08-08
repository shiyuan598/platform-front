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
import { useTheme } from "@fluentui/react";
import type { Base16Theme } from "base16";

export const DEFAULT_STUDIO_NODE_PREFIX = "/studio_node/";

export const DIAGNOSTIC_TOPIC = "/diagnostics";

export const WEBVIZ_ZIC_OFFSET_TOPIC = "/webviz/zic/offset"
export const WEBVIZ_LOC_OFFSET_TOPIC = "/webviz/loc/offset"
export const WEBVIZ_LANE_TOPIC = "/webviz/lane"

export const ZHITO_MAP_TOPIC = "/offline/zhito/map"
export const ZHITO_MAP_DATATYPE = "zhito2ros_msg/ZhitoProto";
export const ZHITO_MAP_PROTO = "zhito.hdmap.Map";

export const ZHITO_TRAJECTORY_PROTO = "zhito.planning.ADCTrajectory";
export const ZHITO_OBSTACLES_PROTO = "zhito.perception.PerceptionObstacles";
export const ZHITO_SENSOR_FRAME_PROTO = "zhito.perception.SensorFrame";
export const ZHITO_HMI_OBSTACLE_PROTO = "zhito.planning.HmiObstacleInfos";
export const ZHITO_PREDICTION_PROTO = "zhito.prediction.PredictionObstacles"
export const ZHITO_HORIZON_PROTO = "zhito.drivers.ThirdPartyCamera"
export const FOXGLOVE_GRID_TOPIC = "/foxglove/grid";
export const FOXGLOVE_GRID_DATATYPE = "foxglove/Grid";

export const URDF_TOPIC = "/robot_description";
export const URDF_DATATYPE = "foxglove/RobotDescription";

export const ROBOT_DESCRIPTION_PARAM = "/robot_description";

export const COLORS = {
  RED: { r: 1.0, g: 0.2, b: 0.2, a: 1.0 },
  BLUE: { r: 0.4, g: 0.4, b: 1.0, a: 1.0 },
  YELLOW: { r: 0.9, g: 1.0, b: 0.1, a: 1.0 },
  ORANGE: { r: 1.0, g: 0.6, b: 0.2, a: 1.0 },
  GREEN: { r: 0.1, g: 0.9, b: 0.3, a: 1.0 },
  GRAY: { r: 0.4, g: 0.4, b: 0.4, a: 1.0 },
  PURPLE: { r: 1.0, g: 0.2, b: 1.0, a: 1.0 },
  WHITE: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
  PINK: { r: 1.0, g: 0.4, b: 0.6, a: 1.0 },
  LIGHT_RED: { r: 0.9, g: 0.1, b: 0.1, a: 1.0 },
  LIGHT_GREEN: { r: 0.4, g: 0.9, b: 0.4, a: 1.0 },
  LIGHT_BLUE: { r: 0.4, g: 0.4, b: 1, a: 1.0 },
  CLEAR: { r: 0, g: 0, b: 0, a: 0 },
};
// Unit conversions
export const METERS_PER_SECOND_TO_MILES_PER_HOUR = 2.23694;
export const METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR = 3.6;
export const MILES_PER_HOUR_TO_METERS_PER_SECOND = 1 / METERS_PER_SECOND_TO_MILES_PER_HOUR;
export const MILES_PER_HOUR_TO_KILOMETERS_PER_HOUR =
  MILES_PER_HOUR_TO_METERS_PER_SECOND * METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR;
// http://docs.ros.org/melodic/api/visualization_msgs/html/msg/Marker.html
export const MARKER_MSG_TYPES = {
  ARROW: 0,
  CUBE: 1,
  SPHERE: 2,
  CYLINDER: 3,
  LINE_STRIP: 4,
  LINE_LIST: 5,
  CUBE_LIST: 6,
  SPHERE_LIST: 7,
  POINTS: 8,
  TEXT_VIEW_FACING: 9,
  MESH_RESOURCE: 10,
  TRIANGLE_LIST: 11,
  INSTANCED_LINE_LIST: 108,
} as const;

export function useJsonTreeTheme(): Pick<
  Base16Theme,
  "base00" | "base07" | "base0B" | "base09" | "base08" | "base0D" | "base03"
> {
  const theme = useTheme();
  return {
    base00: "transparent", // bg
    base07: theme.isInverted ? theme.palette.blueLight : theme.palette.blue, // text
    base0B: theme.palette.orangeLighter, // string & date, item string
    base09: theme.palette.tealLight, // # & boolean
    base08: theme.palette.red, // null, undefined, function, & symbol
    base0D: theme.isInverted ? theme.palette.blueLight : theme.palette.blue, // label & arrow
    base03: theme.palette.neutralTertiary, // item string expanded
  };
}

export const TAB_PANEL_TYPE = "Tab";
