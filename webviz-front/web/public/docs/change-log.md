# 更新日志

版本更新方法：

下载程序包
```bash
curl http://172.16.12.65/zhito2ros/release/zhito2ros-WEBVIZ_VERSION-linux-x86_tar_gz | tar -xz
cd zhito2ros-WEBVIZ_VERSION-linux-x86
# 启动容器
bash scripts/zhito_start.sh
# 启动服务
bash ./scripts/run-all.sh
```

## v 1.15.17 2022-11.16
**适配ap v2.4.2.2**
* 更新ControlDebug解析

## v 1.15.16 2022-11.16
**适配ap v2.4.2.2**
* 增加zmap状态显示

## v 1.15.15 2022-11.16
**适配ap v2.4.2.2**
* 降低消息更新频率

## v 1.15.14 2022-11.14
**适配ap v2.4.2.2**
* 适配x86下h264视频流
* 优化事件列表显示

## v 1.15.13 2022-11.07
**适配ap v2.4.2.2**
* 支持带偏移的zlocmap显示


## v 1.15.12 2022-11.04
**适配ap v2.4.2.2**
* 信息窗增加轨迹类型显示

## v 1.15.11 2022-11.03
**适配ap v2.4.2.2**
* 支持点云可视化配置

## v 1.15.10 2022-10-26
**适配ap v2.4.2.2**


## v 1.15.9-1 2022-10-26
**适配ap v2.4.2.1**
* 修复图像面板zlocvis显示
* 支持资源占用以面板显示


## v 1.15.9 2022-10-20
* 新增V3NA Top资源监控
* 新增V3NA版本信息查询
* 补充图表、原始消息帮助文档(点击面板帮助图标查看)

## v 1.15.8-2 2022-10-13
* 修复Record回播时ImagePanel 车道线解析显示报错

## v 1.15.8-1 2022-10-11
* SensorFrame增加速度方向设置

## v 1.15.8 2022-09-28
* ros2 bag解析适配2.4.2.1
* cyber record解析适配2.4.2.1

## v 1.15.7 2022-09-20
* 增加移动端事件记录页面
* 事件记录支持优先级设置、切片时长调整、事件合并(仅适配移动端)

## v 1.15.6 2022-09-13
* 增加"planning"面板，提供"planning speed"、"Planning Acceleration"、"Status"图表绘制
* 支持远程record加载播放
* 修复HMI障碍物横坐标翻转

## v 1.15.5 2022-08-31
* 修复inner/prefuse通道目标滞留问题
* 隐藏椎桶文字显示
* ADM2PP可视化转发

## v 1.15.4 2022-08-27
*  增加感知通道(innerr/prefuse)显示文字配置
*  增加车辆选择至事件记录模块
*  更新PlanningStatus文字显示映射
*  更新事件记录分类标签
*  修复多通道h264(i帧+p帧)解码失败
*  修复网页record回拨jpeg图像解析失败

## v 1.15.3 2022-08-23
* 修改zloc_vis与图像匹配逻辑（zloc时间戳+50ms）
* 修复渲染内存泄露导致页面崩溃
* 修复小地图显示错误

## v 1.15.2 2022-08-19
*  record回播支持zloc_vis&perception_loc
*  视频解码器由tiny-h264替换为ffmpeg(libav)
*  支持图像与感知结果同步，时间戳显示

## v 1.15.1 2022-08-17
*  修复record回播SensorFrame&Obstacle坐标计算错误

## v 1.15.0 2022-08-15
*  支持cyber record回播(拖拽至webviz即可)
*  修复事件记录编码问题

## v 1.14.10 2022-08-08
*  修复事件记录同时进行编辑+插入导致的事件乱序
*  增加地图配置LANE_NO_MARK, 控制车道线NO_MARK类型显示

## v 1.14.9 2022-08-03
*  修复事件记录时间戳不同步(以本地系统时间为准)

## v 1.14.8 2022-07-30
*  增加事件记录功能，支持事件快速记录、标签分类和历史记录编辑

## v 1.14.7 2022-07-27
*  支持设置显示融合障碍物SubType [#GSL3P-2557](https://jira.zhito.com:8080/browse/GSL3P-2557)
*  增加pp预测线、规划线生命周期(0.5s), 默认开启 [#GSL3P-2568](https://jira.zhito.com:8080/browse/GSL3P-2568)
*  增加pp局部坐标、全局坐标切换，默认使用局部坐标, 默认开启 [#GSL3P-2568](https://jira.zhito.com:8080/browse/GSL3P-2568)

## v 1.14.6 2022-07-22
*  支持Localization历史轨迹显示
*  左下角信息栏增加当前Lane类型、连接类型、限速显示
*  支持多路视频流解析，图像旋转
*  修正zic车道线偏移正负
*  修复查看rosbag时430数据解析错误
<!-- * **已知问题** 5HZ -->

## v 1.14.5 2022-07-20
*  修复驾驶状态栏转向角显示, 取消档位显示

## v 1.14.4 2022-07-19
*  增加/webviz/zic/offset通道, 输出Zic车道偏移(左右车道线c0求和)
*  增加/webviz/loc/offset通道, 输出Loc车道偏移(Localization与ZMap中心线横向距离)
*  显示zic、loc车道偏离（左下角信息窗, adc boundingBox模式）

## v 1.14.3 2022-07-12
*  小地图去除纠偏, 适配ap 2.3.3.2-20220711-173120 之后版本

## v 1.14.2 2022-07-07
*  支持Hmi障碍物显示
*  支持自车包围盒显示
* **修复** 校正J7三维模型Y轴位置

## v 1.14.2 2022-07-07
*  支持Hmi障碍物显示
*  支持自车包围盒显示
* **修复** 校正J7三维模型Y轴位置

## v 1.14.2 2022-07-07
*  支持Hmi障碍物显示
*  支持自车包围盒显示
* **修复** 校正J7三维模型Y轴位置

## v 1.14.1 2022-07-06
*  融合障碍物Obstacle支持虚线显示
*  后处理障碍物SensorFrame支持三维包围盒显示


## v 1.14.0 2022-07-05
*  移除V3naBridge, 由<a href="#/ros-data" title="v3na-ros2-tools">v3na-ros2-tools</a>订阅fastdds通道并转发cyber消息

## v 1.13.5-1 2022-06-29
* **修复** 可视化: 修复动态原点导致的地图元素丢失

## v 1.13.5 2022-06-28
*  可视化: 使用动态原点, 解决大范围地图抖动问题
*  可视化: 更新localization rosbag数据结构

## v 1.13.4-2 2022-06-25
*  V3naBridge: 更新Localization idl消息结构

## v 1.13.4-1 2022-06-24
* **修复** 修复CI构建
*  V3naBridge: 合并bag2record代码

## v 1.13.4 2022-06-23
* **新增** 支持订阅RadarData、ThirdPartyCamera、ControlDebug
* **新增** 订阅ControlDebug, 显示刹车状态
* **修复** 修复SensorFrame更新延迟问题
* **优化** 图像强制以1920x1080现实, 匹配车道线
* **优化** Planning以世界坐标显示
*
## v 1.13.3-1 2022-06-20
* **优化** 默认去除ADM订阅, 需要打开订阅请用 assets/conf 下mapping-all.pb.txt替换mapping.pb.txt

## v 1.13.3 2022-06-20
* **新增** 适配zhitoauto L4 Demo
* **新增** V3naBridge: 支持zmapego


## v 1.13.2 2022-06-17
* **新增** V3naBridge: 修复CanCameraSensorMeas, ControlDebug订阅

## v 1.13.1 2022-06-17
* **新增** V3naBridge: 添加规划debug_data转换

## v 1.13.0 2022-06-16
* **新增** 适配ap版本v2.3.3

## v 1.12.7-2 2022-06-15
* **修复** v3na_bridge: 修复horizon_camera lane0转换错误
* **修复** v3na_bridge: 修正CGI610时间戳计算
* **修复** SensorFramex，y方向距离显示错误

## v 1.12.7-1 2022-06-14
* **修复** 修复nginx启动失败

## v 1.12.7 2022-06-14
* **新增** 基于localization时间戳显示日期时间
* **新增** 图像面板添加EmptyImage通道, 支持仅渲染ImageMarker

## v 1.12.6 2022-05-31
* **新增** 图像标记: 支持PerceptionLoc交通标志牌显示 [#GSL3P-2168](https://jira.zhito.com:8080/browse/GSL3P-2169)
* **修复** tf_static: 修复高度信息
* **修复** v3na_bridge: 更新cgi610 topic mapping

## v 1.12.5-1 2022-05-31
* **修复** 修复解析部分locmap导致的崩溃问题 [#GSL3P-2168](https://jira.zhito.com:8080/browse/GSL3P-2168)

## v 1.12.5 2022-05-27
* **新增** zlocviz 2D标记支持(红色感知车道线，绿色投影车道线)
* **新增** h264视频流解码(注: 仅支持单路视频流解码)
* **新增** v3na/LogInfo通道日志订阅可视化
*  支持2.3.2 db3文件拖拽回播查看
*  v3na_bridge: 增加CGI610时间戳转换


## v 1.12.4 2022-05-24
*  缓存planning轨迹
*  v3na_bridge: 更新zlocvis转发策略(拆分zloc_map至单独通道), 更正感知PerceptionLoc cyber通道名

## v 1.12.3 2022-05-22
* **修复** 针对2.3.2更新, 禁用地图lane缓存

## v 1.12.2 2022-05-20
* **优化** 感知SensorFrame和PerceptionObstacles局部坐标计算优先使用sensor2world_pose, 其次使用Localization.pose

## v 1.12.1 2022-05-19
* **新增** v3na_bridge新增H2puImu H2puUblox ZlocVis消息转换
*  v3na_bridge更新对obstacle、zmap的消息转换(message_converison)

## v 1.12.0 2022-05-19
*  采用jenkins构建, 支持由[artifactory](https://artifactory.zhito.com/ui/repos/tree/General/zhito-dev-local/webviz)下载, 原使用方式不变
* **修复** 前端proto解析更新至2.3.2
* **修复** 修复1.11.17版本在部分机器上无法订阅

## v 1.11.17 2022-05-18
*  新增左下信息窗，支持自定义数据展示, 配置文件路径 assets/www/config/InfoFrame.json

## v 1.11.16 2022-05-17
*  /zhito/Perception/* 通道改为/zhito/perception/*
*  proto类型zhito.perception.camera.InnerCameraOutputMessage 改为 zhito.perception.onboard.InnerCameraOutputMessage
*  适配v3na_ap_2.3.2版本, 不再向下兼容

## v 1.11.15 2022-05-07
*  v3na Chassis struct转proto更新
*  /zhito/planning通道转发原始proto消息，不做删减
* **修复** Grid通道网格显示

## v 1.11.14 2022-04-26
* **新增** zmap格式地图支持lane id显示

## v 1.11.13 2022-04-26
* **新增** PrefusedObjects显示车体x/y轴距离
* **新增** DriverPointCloud更新, 添加lidar_status
* **新增** 自动驾驶状态(MANUANL、SP、iACC)适配新版ADM消息

## v 1.11.12 2022-04-25
*  支持DriverPointCloud（默认关闭，需修改 ./assets/conf/mapping.pb.txt）

## v 1.11.11 2022-04-25
*  ADMInfoMCU2SOC proto更新, 不再支持zhito.adm.Mcu2Soc
*  PerceptionObstacles proto更新

## v 1.11.10 2022-04-24
* **优化** 默认添加v3na mono7个通道消息

## v 1.11.9 2022-04-22
* **优化** 增加点云静态TF
* **优化** 默认取消v3na图像和点云订阅

## v 1.11.8 2022-04-19
* **新增** adm消息支持(仅cyber_monitor查看，不做webviz可视化)
* **优化** 优化地图缓存，解决障碍物抖动问题

## v 1.11.6 2022-03-21
* **新增** 支持解析v3na原始fastdds消息(rosbridge实时转发、rosbag录包回放)
* **新增** SensorFrame可视化支持选择局部坐标/世界坐标
* **优化** zmap取消地图缓存, 仅离线地图时开启
* **修复** 校正点云高度
* **修复** SensorFrame频率过高时的丢帧问题
* **修复** proto消息与ros消息header不兼容，导致tf为空

## v 1.11.5 2022-03-07
* **优化** 依赖项打包进docker image, 减少版本包大小(400MB=>26MB), 上车请提前下载docker镜像
* **优化** 更新DDS TopicMapping

## v 1.11.4 2022-03-07

* **新增** SDCConti408SensorMeas支持（仅Cyber）
* **新增** 点云可视化
* **优化** WebWorker处理proto消息

## v 1.11.3 2022-02-25

* **新增** ZMap支持Road、Lane中心线
* **新增** 配置面板，用于全局属性配置
* **新增** SensorFrame支持

## v 1.11.2 2022-02-18

* **修复** 针对v3na升级&修复

## v 1.9.1 2022-01-18

* **修复** 自动驾驶状态优先用adm消息显示[查看详情]([查看详情](https://jira.zhito.com:8080/browse/GSL4-267)

## v 1.9 2022-01-17

* **新增** 自建地图加载  [查看详情](https://jira.zhito.com:8080/browse/GSL4-267)
* **新增** 原始消息面板显示消息延迟( 仅计算ros到web端延迟)
* **新增** 支持图像按百分比缩放 [查看详情](https://gitlab.zhito.com/xuhuijun/zhitov/-/issues/4)
* **新增** 支持ros parameters读写 [查看详情](https://gitlab.zhito.com/xuhuijun/zhitov/-/issues/2)
* **修复** 悬浮信息窗，支持自定义字段

## v 1.8 2021-12-31

* **新增** 图像压缩，基于NVJPEG
* **新增** 点云压缩，基于PCL库
* **新增** 悬浮信息窗，支持自定义字段

## v 1.7 2021-12-24

* **新增** 接入dreamview路线选择功能
* **新增** 支持障碍物按通道区分着色
* **新增** 车辆状态增加档位显示
* **新增** 支持Protobuf、JSON消息（图表面板、原始消息面板）
* **新增** 视觉InnerCameraOutput障碍物三维可视化
* **新增** ADM设备状态显示
* **优化** Bridge启动优化，支持按通道数据类型自动匹配转换

## v 1.6 2021-12-10


* **新增** 车道线消息可视化（图像标记）
* **新增** 目标检测消息可视化（图像标记）
* **新增** 目标跟踪（mono）速度、纵向距离属性可视化（图表）
* **优化** 部分组件重构，解决长时间运行内存泄露

## v 1.5 2021-12-03

* **新增**  RViz ST图表插件
* **新增**  RViz JPEG图像显示插件
* **新增**  RViz 车辆状态插件
* **新增**  集成Ros WebBridge，用于webvis接入
* **新增**  Webvis 车辆状态面板
* **新增**  Webvis地图面板
* **新增**  感知对象 SensorFrame接入
* **优化**  根据图表可视化需求优化zhito2ros_msg消息
* **优化**  支持按自定义频率接收消息

## v 1.4 2021-11-19

* **新增** 增加Planning 12种统计图表显示
* **新增** 障碍物分类着色，距离、速度显示
* **新增** 支持web版访问
* **优化** 修复时间戳导致的coredump
* **优化** 修复目标车遗留轨迹、自车丢失问题
* **优化** 修复规划线冲突问题
* **优化** 修复markerarray空元素导致的崩溃
* **优化** 优化帧率、高度导致的目标卡顿、抖动等问题

## v1.0  2021-11-05

* **新增** 支持融合消息障碍物
* **新增** 支持地图消息显示
* **新增** 支持定位消息
* **新增** 支持障碍物预测消息显示
* **新增** 支持激光点云显示
