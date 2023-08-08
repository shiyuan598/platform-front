## Zhito  WebVis

### 1. 简介

Zhito2Ros Bridge用于ZhitoAuto Protobuf消息到RosMsg的转换, 创建由cyber channel到ros topic一一对应的通道, 同时生成可用于Rviz/WebViz的可视化消息.
您可在启动Bridge后使用本程序附带的RViz/WebViz访问可视化结果.


访问[完整文档](http://172.16.15.76/webvis-doc)

![image-20211227170158672](docs/readme.assets/image-20211227170158672.png)


### 2. 二次开发

##### 开发
```bash
yarn web:build:prod
```

##### 构建
```bash
./scripts/build_web.sh
```
