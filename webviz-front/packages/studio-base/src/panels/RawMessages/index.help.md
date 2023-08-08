# 语法

## Topic+Key取值

- `/some/topic.value`
- `/some_topic.inner_object.value`

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
