export default {
    "layout": {
        "direction": "row",
        "first": "3D Panel!3h8uxex",
        "second": {
            "first": "Tab!30fsoou",
            "second": {
                "first": {
                    "first": "RawMessages!30o2lcc",
                    "second": "RawMessages!224wwm7",
                    "direction": "column",
                    "splitPercentage": 50.10570824524313
                },
                "second": "Tab!d1u2xl",
                "direction": "column",
                "splitPercentage": 71.3717462953772
            },
            "direction": "column",
            "splitPercentage": 21.35922428539861
        },
        "splitPercentage": 64.09880272572147
    },
    "globalVariables": {},
    "userNodes": {},
    "linkedGlobalVariables": [],
    "playbackConfig": {
        "speed": 1,
        "messageOrder": "receiveTime",
        "timeDisplayMethod": "ROS"
    },
    "version": 19,
    "configById": {
        "CarStatus Panel!f031se": {},
        "AdmStatus Panel!uk5khr": {},
        "map!1kb3vez": {
            "disabledTopics": [],
            "zoomLevel": 13
        },
        "Routing Panel!4gzhlyq": {},
        "3D Panel!3h8uxex": {
            "checkedKeys": [
                "name:Topics",
                "t:/zhito2ros/map_path_markers",
                "t:/zhito2ros/localization",
                "t:/zhito2ros/obstacles",
                "t:/zhito2ros/pointcloud2",
                "t:/zhito2ros/prediction",
                "t:/zhito2ros/zhitopath",
                "ns:/offline/zhito/map:ROAD",
                "ns:/offline/zhito/map:RightBoundary",
                "ns:/offline/zhito/map:LeftBoundary",
                "ns:/offline/zhito/map:CenterLine",
                "t:/zhito/adc",
                "t:/zhito/zloc/view/zlocmap",
                "ns:/tf:novatel",
                "ns:/tf:local",
                "ns:/tf:lidar_rear",
                "ns:/tf:vehicle",
                "ns:/tf:radar",
                "ns:/zhito/prediction:prediction",
                "t:/zhito/perception/obstacles",
                "t:/zhito/localization/pose/marker",
                "t:/zhito/prediction",
                "t:/zhito/zmap_msg"
            ],
            "followTf": "local",
            "followOrientation": false,
            "cameraState": {
                "targetOffset": [
                    0,
                    0,
                    0
                ],
                "distance": 31.174266088352137,
                "perspective": true,
                "phi": 1.0983069767478113,
                "thetaOffset": 0.5793800514647038,
                "fovy": 0.7853981633974483,
                "near": 0.01,
                "far": 5000
            },
            "autoTextBackgroundColor": false,
            "useThemeBackgroundColor": false,
            "customBackgroundColor": "#0a365e",
            "settingsByKey": {},
            "expandedKeys": [
                "name:Topics",
                "t:/zhito/perception/obstacles",
                "t:/zhito/zmap_msg",
                "t:/zhito/prediction",
                "t:/zhito/perception/recognition"
            ],
            "pinTopics": false,
            "flattenMarkers": true,
            "modifiedNamespaceTopics": [
                "/offline/zhito/map",
                "/zhito/zmap_msg",
                "/tf",
                "/zhito/prediction"
            ],
            "followMode": "follow-orientation"
        },
        "Tab!30fsoou": {
            "activeTabIdx": 0,
            "tabs": [
                {
                    "title": "车辆状态",
                    "layout": "CarStatus Panel!f031se"
                },
                {
                    "title": "设备状态",
                    "layout": "AdmStatus Panel!uk5khr"
                }
            ]
        },
        "RawMessages!30o2lcc": {
            "topicPath": "/zhito/zmap_msg",
            "diffTopicPath": "",
            "diffMethod": "custom",
            "diffEnabled": false,
            "showFullMessageForDiff": false
        },
        "RawMessages!224wwm7": {
            "topicPath": "/zhito/driver/adm_mcu_to_soc",
            "diffTopicPath": "",
            "diffMethod": "custom",
            "diffEnabled": false,
            "showFullMessageForDiff": false
        },
        "Tab!d1u2xl": {
            "activeTabIdx": 0,
            "tabs": [
                {
                    "title": "地图",
                    "layout": "map!1kb3vez"
                },
                {
                    "title": "路线",
                    "layout": "Routing Panel!4gzhlyq"
                },
                {
                    "title": "3"
                }
            ]
        }
    }
}
