// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { PanelsState } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";

const data: PanelsState = {
  "layout": {
    "direction": "row",
    "first": "ImageViewPanel!4e98r75",
    "second": {
      "first": {
        "first": {
          "first": "CarStatus Panel!3fvz3qh",
          "second": "3D Panel!3h8uxex",
          "direction": "column",
          "splitPercentage": 35.79630362165961
        },
        "second": "Plot!zzpj7d",
        "direction": "column",
        "splitPercentage": 69.39759036144581
      },
      "second": "map!6a3nc0",
      "direction": "column",
      "splitPercentage": 77.95193312434692
    },
    "splitPercentage": 61.24812872686521
  },
  "globalVariables": {},
  "userNodes": {},
  "linkedGlobalVariables": [],
  "playbackConfig": {
    "speed": 1,
    "messageOrder": "receiveTime"
  },
  "configById": {
    "ImageViewPanel!4e98r75": {
      "cameraTopic": "/zhito2ros/compressed_img/camera_c6_front_right_60",
      "transformMarkers": true,
      "enabledMarkerTopics": [
        "/zhito2ros/compressed_img/camera_c6_front_right_60/markers"
      ],
      "pan": {
        "x": -30.105296282298326,
        "y": 4.8994274573493115
      },
      "zoom": 1.7034707717965305
    },
    "CarStatus Panel!3fvz3qh": {},
    "3D Panel!3h8uxex": {
      "checkedKeys": [
        "name:Topics",
        "t:/zhito2ros/map_path_markers",
        "t:/zhito2ros/localization",
        "t:/zhito2ros/obstacles",
        "t:/zhito2ros/pointcloud2",
        "t:/zhito2ros/prediction",
        "t:/zhito2ros/zhitopath",
        "t:/tf"
      ],
      "followTf": "view_port",
      "followOrientation": false,
      "cameraState": {
        "targetOffset": [
          0.26684880596296023,
          -0.05612921726114173,
          0
        ],
        "distance": 1.8243531283412362,
        "perspective": true,
        "phi": 1.3553005644291503,
        "thetaOffset": 0.7272097610976298,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "autoTextBackgroundColor": false,
      "useThemeBackgroundColor": false,
      "customBackgroundColor": "#0a365e",
      "settingsByKey": {
        "t:/foxglove/grid": {
          "overrideColor": {
            "r": 0.5215686274509804,
            "g": 0.5098039215686274,
            "b": 0.5098039215686274,
            "a": 1
          },
          "subdivisions": 20000,
          "width": 100000,
          "lineWidth": 0.004
        }
      },
      "expandedKeys": []
    },
    "Plot!zzpj7d": {
      "title": "1231212312312321312312",
      "paths": [
        {
          "value": "/zhito2ros/localization/pose.linear_velocity.x",
          "enabled": true,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/zhito2ros/localization/pose.linear_velocity.y",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "minYValue": "",
      "maxYValue": "",
      "showLegend": true,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "followingViewWidth": 100
    },
    "map!6a3nc0": {
      "disabledTopics": [],
      "zoomLevel": 18
    }
  }
};

export default {
  name: "Welcome to Zhito Vis",
  data,
};
