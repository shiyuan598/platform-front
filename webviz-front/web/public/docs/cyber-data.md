### 1 接入数据源
可在真实Cyber环境中运行本程序，活通过Cyber_recorder回播数据

### 2 消息及通道配置
默认配置文件存放在 assets/conf/base.xml, 
最小化配置如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<converters>
	<converter type="Transform" proto="zhito.transform.TransformStampeds" sparedFrame="world" limitFPS="false">
        
    </converter>
</converters>
```

#### 2.1 参数说明

#### converter:

 * **type** :Bridge转换器类型
 * **proto**: Cyber消息类型
 * **sparedFrame**: 默认frame，当cyber消息frame为空时填入
 * **limitFPS**: 可选参数，默认false，指定是否限制发送频率，默认发送频率10HZ

#### path：

path为可选配置项，若希望只转发指定通道，可填入此配置项

* **from**: cyber通道名称
* **to**: 自定义ros通道名称

#### 2.2 完整配置项示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<converters>
	<converter type="Transform" proto="zhito.transform.TransformStampeds" sparedFrame="world" limitFPS="false"></converter>
	<converter type="Trajectory" proto="zhito.planning.ADCTrajectory" sparedFrame="world"></converter>
	<converter type="SensorFrame" proto="zhito.perception.SensorFrame" sparedFrame="world"></converter>

	<converter type="Localization" proto="zhito.localization.LocalizationEstimate" sparedFrame="novatel" limitFPS="false"></converter>
	<converter type="Prediction" proto="zhito.prediction.PredictionObstacles" sparedFrame="world" limitFPS="false"></converter>
	<converter type="Fusion" proto="zhito.perception.PerceptionObstacles" sparedFrame="local" limitFPS="false"></converter>
	<converter type="Fusion" proto="zhito.perception.PerceptionObstacles" sparedFrame="world_fixed" limitFPS="false"></converter>

	<converter type="CompressedImage" proto="zhito.drivers.CompressedImage" sparedFrame="world" limitFPS="false"></converter>
	<converter type="Map" proto="zhito.zmap.ZLocMapMessage" sparedFrame="world" limitFPS="false"></converter>

	<converter type="ChassisMsg" proto="zhito.canbus.Chassis" sparedFrame="world" limitFPS="false"></converter>
	<converter type="ControlReferenceInfoMsg" proto="zhito.control.CtrlRefInfo" sparedFrame="world" limitFPS="false"></converter>
	<converter type="PerceptionLoc" proto="zhito.perception.PerceptionLocMessage" sparedFrame="world" limitFPS="false"></converter>
	<converter type="InnerCameraOutput" proto="zhito.perception.onboard.InnerCameraOutputMessage" sparedFrame="world" limitFPS="false"></converter>
	<converter type="PointCloud" proto="zhito.drivers.PointCloud" sparedFrame="radar" limitFPS="false"></converter>
	<converter type="Mcu2Soc" proto="zhito.adm.Mcu2Soc" sparedFrame="world" limitFPS="false"></converter>
	<converter type="RoutingRequest" proto="zhito.routing.RoutingRequest" sparedFrame="world" limitFPS="false"></converter> -->
	<converter type="Image" proto="zhito.drivers.Image" sparedFrame="world" limitFPS="false" />
</converters>
```



#### 2.3 注意事项

* 无需考虑启动顺序，bridge会自动监听新增通道
* 可为同一类proto指定不同转换器，可填入多个converter，优先级从上到下



### 3 支持消息类型

| 描述         | 转换类(BridgeType)      | 接收类型(CyberProto)                                 | 发送类型(RosMsg)                                             |
| ------------ | ----------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| TF           | Transform               | zhito.transform.TransformStampeds                    | geometry_msgs.TransformStamped                              |
| 定位信息     | Localization            | zhito.localization.LocalizationEstimate            | visualization_msgs.Marker、zhito2ros_msg.ZhitoPose         |
| 底盘信息     | ChassisMsg              | zhito.canbus.Chassis                               | zhito2ros_msg.ZhitoChassis                                  |
| 控制信息     | ControlReferenceInfoMsg | zhito.control.CtrlRefInfo                          | zhito2ros_msg.ZhitoControlReferenceInfo                     |
| 惯性测量单元 | Imu                     | zhito.drivers.gnss.Imu                            | sensor_msgs.Imu                                             |
| 原始图像     | Image                   | zhito.drivers.Image                                | sensor_msgs.Image                                           |
| 压缩图像     | CompressedImage         | zhito.drivers.CompressedImage                      | sensor_msgs.CompressedImage                                 |
| 地图         | Map                     | zhito.zmap.ZLocMapMessage                          | visualization_msgs.MarkerArray                              |
| 融合障碍物   | Fusion                  | zhito.perception.PerceptionObstacles               | visualization_msgs.MarkerArray                              |
| 视觉障碍物   | PerceptionLoc           | zhito.perception.onboard.InnerCameraOutputMessage | zhito2ros_msg.ZhitoInnerCameraOutput(原始消息)、zhito2ros_msg.ZhitoImageMarkerArray（图像标记）、visualization_msgs.MarkerArray（三维障碍物） |
| 激光障碍物   | SensorFrame             | zhito.perception.SensorFrame                       | visualization_msgs.MarkerArray                              |
| 预测障碍物   | Prediction              | zhito.prediction.PredictionObstacles               | visualization_msgs.MarkerArray                              |
| 点云         | PointCloud              | zhito.drivers.PointCloud                           | sensor_msgs.PointCloud2                                     |
| 视觉车道线   | InnerCameraOutput       | zhito.perception.PerceptionLocMessage              | zhito2ros_msg.ZhitoImageMarkerArray                         |



