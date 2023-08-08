const tag = [
    { value: "0", label: "地图定位",
        subTag: [
            { value: "0-0", label: "地图",
                subTag: [
                    { value: "0-0-0", label: "图错"},
                    { value: "0-0-1", label: "图无"}
                ]
            },
            { value: "0-1", label: "定位",
                subTag: [
                    { value: "0-1-0", label: "图定位错"},
                    { value: "0-1-1", label: "图线夹角"},
                    { value: "0-1-2", label: "压左线"},
                    { value: "0-1-3", label: "压右线"},
                    { value: "0-1-4", label: "通道挂"}
                ]
            },
        ]
    },
    { value: "1", label: "感知",
        subTag: [
            { value: "1-0", label: "车辆检测",
                subTag: [
                    { value: "1-0-0", label: "车无"},
                    { value: "1-0-1", label: "车迟"},
                    { value: "1-0-2", label: "车错"}
                ]
            },
            { value: "1-1", label: "路面障碍检测",
                subTag: [
                    { value: "1-1-0", label: "路障无"},
                    { value: "1-1-1", label: "路障迟"},
                    { value: "1-1-2", label: "路障误"}
                ]
            },
            { value: "1-2", label: "识别不稳",
                subTag: [
                    { value: "1-2-0", label: "识别不稳"},
                    { value: "1-2-1", label: "目标分裂"}
                ]
            },
            { value: "1-3", label: "其他",
                subTag: [
                    { value: "1-3-0", label: "静误感"},
                    { value: "1-3-1", label: "无误感"},
                    { value: "1-3-2", label: "感错位"}
                ]
            },
            { value: "1-4", label: "通道",
                subTag: [
                    { value: "1-4-0", label: "通道挂"},
                ]
            }
        ]
    },
    { value: "2", label: "预测",
        subTag: [{value: "2-0", label: "轨迹线"}]
    },
    { value: "3", label: "规划",
        subTag: [
            { value: "3-0", label: "轨迹",
                subTag: [
                    { value: "3-0-0", label: "自车"},
                    { value: "3-0-1", label: "无规划"}
                ]
            },
            { value: "3-1", label: "行为",
                subTag: [
                    { value: "3-1-0", label: "跟无减"},
                    { value: "3-1-1", label: "切无减"},
                    { value: "3-1-2", label: "无车异刹"},
                    { value: "3-1-3", label: "有车异刹"},
                    { value: "3-1-4", label: "跟车距离过远"}
                ]
            }
        ]
    },
    { value: "4", label: "控制",
        subTag: [
            { value: "4-0", label: "车道纵向保持",
                subTag: [
                    { value: "4-0-0", label: "制动过重"},
                    { value: "4-0-1", label: "制动不连续"},
                    { value: "4-0-2", label: "未达设定速度"},
                    { value: "4-0-3", label: "急加速"},
                    { value: "4-0-4", label: "加速过慢"},
                    { value: "4-0-5", label: "加速不连续"},
                    { value: "4-0-6", label: "莫名松油门"},
                    { value: "4-0-7", label: "跟车不稳"},
                    { value: "4-0-8", label: "弯道控速失败"},
                    { value: "4-0-9", label: "压左线"},
                    { value: "4-0-10", label: "压右线"},
                    { value: "4-0-11", label: "两侧车辆碰撞恐慌"},
                    { value: "4-0-12", label: "道路边缘碰撞恐慌"},
                    { value: "4-0-13", label: "莫名换道"},
                    { value: "4-0-14", label: "车身晃动"},
                    { value: "4-0-15", label: "画龙"}
                ]
            },
            { value: "4-1", label: "感受-方向盘",
                subTag: [
                    { value: "4-1-0", label: "方向盘急打"},
                    { value: "4-1-1", label: "方向盘摆动"}
                ]
            },
            { value: "4-2", label: "变道",
                subTag: [
                    { value: "4-2-0", label: "危险变道"},
                    { value: "4-2-1", label: "不合理变道"},
                    { value: "4-2-2", label: "变道不执行"},
                    { value: "4-2-3", label: "转向幅度过大"},
                    { value: "4-2-4", label: "转向过急"},
                    { value: "4-2-5", label: "变道不打转向灯"},
                    { value: "4-2-6", label: "连续变道"},
                    { value: "4-2-7", label: "等待时间过长"},
                    { value: "4-2-8", label: "晃动"}
                ]
            },
            { value: "4-3", label: "功能交互",
                subTag: [
                    { value: "4-3-0", label: "交互设置未生效"},
                    { value: "4-3-1", label: "车辆无控制"},
                    { value: "4-3-2", label: "无法退出功能"},
                    { value: "4-3-3", label: "启动时间过长"},
                    { value: "4-3-4", label: "莫名降级"},
                    { value: "4-3-5", label: "HMI显示异常"}
                ]
            },
        ]
    },
    { value: "5", label: "正常接管",
        subTag: [
            { value: "5-0", label: "正常" },
            { value: "5-1", label: "防御性接管" }
        ]
    },
    { value: "6", label: "系统",
        subTag: [
            { value: "6-0", label: "硬件挂断" },
            { value: "6-1", label: "占用过高" }
        ]
    }
]
export default tag;
