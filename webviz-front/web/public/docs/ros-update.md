# 更新日志

版本更新方法：

```bash
wget http://172.16.12.65/tool/v3na-ros2-tools-v2.4.2.2-1103_tar_gz
tar -xf v3na-ros2-tools-v2.4.2.2-1103_tar_gz
```

<a href="#/ros-data" title="使用说明">使用说明</a>

## v2.4.2.2-1103
**适配版本**: zhito-ap 2.4.2.2
* **更新** 更新planning消息转换


## v2.4.2.2-1026
**适配版本**: zhito-ap 2.4.2.2
* **更新** 适配ap2.4.2.2消息

## v2.4.2.1-1026
**适配版本**: zhito-ap 2.4.2.1
* **更新** 输出top、verion信息至rosbag目录

## v2.4.2.1-1020
**适配版本**: zhito-ap 2.4.2.1
* **更新** 增加V3NA端资源监控、版本查询


## v2.4.2.1-0928
**适配版本**: zhito-ap 2.4.2.1
* **更新** 适配ap2.4.2.1消息

## v2.3.3.4-0920
**适配版本**: zhito-ap 2.3.3.4
* **更新** 事件记录增加类别、分类输出

## v2.3.3.4-0913
**适配版本**: zhito-ap 2.3.3.4
* **更新** 更新conti430、408转换


## v2.3.3.4-0907
**适配版本**: zhito-ap 2.3.3.4
* **更新** 更新rosbag2版本至foxy-future,优化录包表现

## v2.3.3.4-0831
**适配版本**: zhito-ap 2.3.3.4
* **更新** 更新idl、msg及对应消息转换


## v2.3.3.2-0827
**适配版本**: zhito-ap 2.3.3.2, mcu14以上
* **更新** 优化csv&json导出格式

## v2.3.3.2-0819
**适配版本**: zhito-ap 2.3.3.2, mcu14以上
* **更新** bag2record支持不含events.json文件rosbag2目录转换
* **更新** 适配14版本MCU档位显示

## v2.3.3.2-0815
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** bag2record根据事件自动创建关联数据包
* **更新** bag2record命令用法改为 `bag2record path_to_bag_dir`

## v2.3.3.2-0803
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 修复csv导出时间不同步问题

## v2.3.3.2-0730
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 增加数据记录功能，匹配webviz v1.14.8以上

## v2.3.3.2-0725
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 默认打开/DriverPointCloud和所有/Video通道订阅
* **更新** 增加one_key.sh一键启动命令(需提前安装tmux)

## v2.3.3.2-0718
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 修复v3na订阅报错, 默认以best_effort订阅

## v2.3.3.2-0714
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 修复chassis时间戳转换
* **更新** 修复zlocvis转换

## v2.3.3.2-0707
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 更新message_group, commit info(0705提交): update bsd info

## v2.3.3.2-0705
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** ros2 bag sub 移除-a 参数, topic列表读取./config/sub_config.py

## v2.3.3.2-0704
**适配版本**: zhito-ap 2.3.3.2, mcu08以上
* **更新** 适配mcu08版本,

## v2.3.3.2-0701
**适配版本**: zhito-ap 2.3.3.2, mcu07以下
* **更新** 合并v3na_bridge，增加ros2 bag sub命令
