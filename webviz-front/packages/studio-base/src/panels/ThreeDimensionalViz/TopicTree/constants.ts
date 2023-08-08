// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2019-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { ZHITO_MAP_PROTO,
  ZHITO_OBSTACLES_PROTO,
  ZHITO_SENSOR_FRAME_PROTO,
  ZHITO_PREDICTION_PROTO,
  ZHITO_TRAJECTORY_PROTO,
  ZHITO_HORIZON_PROTO,
  ZHITO_HMI_OBSTACLE_PROTO } from "@foxglove/studio-base/util/globalConstants";

export const TREE_SPACING = 8;

export const ROW_HEIGHT = 24;

export const TOPIC_DISPLAY_MODES = {
  SHOW_ALL: {
    value: "SHOW_ALL",
    label: "All",
  },
  SHOW_AVAILABLE: {
    value: "SHOW_AVAILABLE",
    label: "Available",
  },
  SHOW_SELECTED: {
    value: "SHOW_SELECTED",
    label: "Visible",
  },
} as const;


export const SUPPORTED_ZMARKER_DATATYPES_SET = new Set([
  "zhito2ros_msg/ZhitoLineMarker"
]);

export const SUPPORTED_PROTO_DATATYPES_SET = new Set([
  "zhito.zmap.ZLocMapMessage",
  "zhito.zmap.ZmapMessage",
  ZHITO_MAP_PROTO,
  ZHITO_OBSTACLES_PROTO,
  ZHITO_TRAJECTORY_PROTO,
  ZHITO_HORIZON_PROTO,
  ZHITO_SENSOR_FRAME_PROTO,
  ZHITO_HMI_OBSTACLE_PROTO,
  ZHITO_PREDICTION_PROTO
]);

export const SUPPORTED_MAP_PROTO = new Set([
  "zhito.zmap.ZLocMapMessage",
  "zhito.zmap.ZmapMessage",
  ZHITO_OBSTACLES_PROTO,
  ZHITO_MAP_PROTO
])
