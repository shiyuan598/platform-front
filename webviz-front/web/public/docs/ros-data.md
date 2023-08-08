# v3na-ros2-tools
## 1 简介
提供ros2工具以对v3na数据进行录制、播放、查看、数据转换。

## 2 使用

### 2.1 准备
* 初次使用需加载镜像(上车部署请提前下载)
```bash
  curl http://172.16.12.65/v3na_docker_tar_gz | tar -xz
  docker load -i v3na_docker_tar
```




### 2.2 数据订阅&录制
使用ros2 bag sub 替换原有ros2 bag record命令
##### 下载工具并订阅
```bash
  curl http://172.16.12.65/tool/v3na-ros2-tools-v2.4.2.2-1103_tar_gz | tar -xz
  cd v3na-ros2-tools-v2.4.2.2-1103
  # 启动镜像
  ./scripts/zhito_start.sh

  # 进入镜像
  ./scripts/zhito_into.sh

  # 指定ROS_DOMAIN_ID(与v3na端DDS_DOMAIN_ID一致)
  export ROS_DOMAIN_ID=88

  # 使用示例：

  # 仅录包
  ros2 bag sub --bag
  # 仅转发至cyber
  ros2 bag sub --cyber
  # 录包并转发至cyber
  ros2 bag sub --cyber --bag
```

##### 配置&参数：
* ros录制通道配置文件: ./config/sub_config.py
* cyber输出通道配置文件: ./config/mapping.pb.txt
* 增加参数--cyber（默认关闭），开启cyber通道转发
* 增加参数--bag（默认关闭），开启ros2 bag录制
* 默认按60秒分割数据包，无需使用-d 60



### 2.3 数据离线转换（ros2 bag转cyber record）
在docker镜像内执行：
```bash
bag2record path_to_bag_dir
#如:
bag2record /mnt/T7/rosbag2_2022_08_07-19_55_30
```
参数说明:
* $bag_path: ros2 bag 路径，指定文件夹批量转换，或指定单个db3转换。批量转换文件夹下需包含metadata.yaml

## 3 常用命令
```bash
  # 查看topic列表
  ros2 topic list

  # 查看topic频率
  ros2 topic hz /LocalizationEstimate

  # 查看topic实时消息
  ros2 topic echo /LocalizationEstimate

  # 消息回播,支持文件夹(需包含metadata.yaml)或db3
  ros2 bag play rosbag2_xxxxxx
```
