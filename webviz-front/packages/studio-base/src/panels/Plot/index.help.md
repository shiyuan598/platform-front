

# 快捷键

<kbd>滚轮</kbd> – 水平缩放

<kbd>v</kbd> + <kbd>滚轮</kbd> – 垂直缩放

<kbd>b</kbd> + <kbd>滚轮</kbd> – 垂直+水平缩放

<kbd>双击</kbd> – 重置视图

# 语法

## Topic+Key取值

- `/some/topic.value`
- `/some_topic.inner_object.value`

## 函数操作(仅支持图表)

对数值提供内置函数进行转换, 如：
  - 速度单位转换: `/zhito/canbus/chassis.speed_mps.@mps2kph`
  - 时间单位转换 `/zhito/canbus/chassis.header.timestamp_sec.@m1e3`

支持的函数列表：

- abs       - 求绝对值
- acos      - 求反余弦值
- asin      - 求反正弦
- atan      - 求反正切
- ceil      - 向上舍入为其最接近的整数
- cos       - 求余弦值
- log       - 求e为底的自然对数：
- round     - 将数字四舍五入到最接近的整数
- sin       - 求正弦值
- sqrt      - 求平方根
- tan       - 求正切值
- trunc     - 去除小数部分
- negative  - 求相反数
- deg2rad   - 度转弧度
- rad2deg   - 弧度转度
- mps2kph   - 米/秒转千米/时
- kph2mps   - 千米/时转米/秒
- recip     - 倒数
- m1e1-m1e9 - 乘以10的n次方
- d1e1-d1e9 - 除以10的n次方



## 数组取值

- 单个对象
  - `/some_topic.many_values[0]`
  - `/some_topic.many_values[1].width`
  - `/some_topic.many_values[-1]` (最后一位)
- 按索引范围
  - `/some_topic.many_values[1:3].x`
  - `/some_topic.many_values[:].x`
  - `/some_topic.many_values[-2:-1]`

## 条件过滤

- 单个对象取值过滤
  - `/perception/inner/PrefusedObjects{sensor_id=="radar_fusion"}`
- 数组批量过滤
  - `/perception/inner/PrefusedObjects.frame.objects[:]{id==240}`
- 多个条件组合过滤
  - `/perception/inner/PrefusedObjects{sensor_id=="radar_fusion"}.frame.objects[:]{id==240}`
