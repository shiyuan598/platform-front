const style = {
    "solution": {
        "bearing": 0.0,
        "center": "[116.40717,39.90469]",
        "icon": "nightblue",
        "maxZoom": 17.0,
        "minZoom": 3.0,
        "name": "蓝黑地图",
        "pitch": 0.0,
        "template": "0",
        "zoom": 10.25
    },
    "sources": {
        "Merge_1": {
            "tiles": ["//minedata.cn/service/data/mvt-layer?datasource=merge&z={z}&x={x}&y={y}&request=GetTile&key=16be596e00c44c86bb1569cb53424dc9"],
            "type": "vector"
        }
    },
    "sprite": "minemap://sprite/sprite",
    "layers": [{
        "layout": { "visibility": "visible" },
        "maxzoom": 18.0,
        "paint": { "background-color": "#181b26" },
        "layerInfo": {
            "zindex": 0,
            "datatype": "background",
            "prefix": "104",
            "sourcemaxzoom": 22.0,
            "groupid": "",
            "name": "背景",
            "describe": "背景",
            "source": "",
            "groupname": "",
            "sourceminzoom": 0.0
        },
        "source": "",
        "source-layer": "",
        "id": "6a6377987929469995b7604460a1e04b",
        "type": "background",
        "minzoom": 3.0
    }, {
        "layout": { "visibility": "visible" },
        "maxzoom": 5.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 1,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 8.5,
            "groupid": "0f94af90",
            "name": "世界地图水系面",
            "describe": "世界地图水系面",
            "source": "Worldwaterface",
            "groupname": "轮廓面",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldwaterface",
        "id": "4a812fc84526418abab487833e8e933f",
        "type": "fill",
        "minzoom": 3
    }, {
        "layout": { "visibility": "visible" },
        "maxzoom": 8.5,
        "paint": { "fill-color": "#181b26" },
        "layerInfo": {
            "zindex": 2,
            "datatype": "fill",
            "prefix": "104",
            "sourcemaxzoom": 8.5,
            "groupid": "0f94af90",
            "name": "世界地图",
            "describe": "世界地图",
            "source": "Worldcountries",
            "groupname": "轮廓面",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldcountries",
        "id": "5bbf6e3f777a45058d03dcf99665ecf3",
        "type": "fill",
        "minzoom": 3
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 1]],
        "maxzoom": 17.5,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 3,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "0f94af90",
            "name": "水域面-海岸线",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "轮廓面",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "e481c021d295421cb84e856b8886f702",
        "type": "fill",
        "minzoom": 5.0
    }, {
        "layout": { "visibility": "none" },
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#112a4b", "fill-color": "#112a4b", "fill-antialias": true },
        "layerInfo": {
            "zindex": 5,
            "datatype": "fill",
            "prefix": "106004",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "小区面",
            "describe": "小区面",
            "source": "ResidentialPolygon",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "ResidentialPolygon",
        "id": "8b678538a29842bf8b928f50301b85f4",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["in", "kind", 31, 38]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#071637", "fill-color": "#071637", "fill-antialias": true },
        "layerInfo": {
            "zindex": 6,
            "datatype": "fill",
            "prefix": "106006",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-文化区域",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "03f12ec99cf74fdc9cf50971b7014993",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["==", "kind", 11]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#0e234e", "fill-color": "#0e234e", "fill-antialias": true },
        "layerInfo": {
            "zindex": 7,
            "datatype": "fill",
            "prefix": "106005",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-机场",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "8da9a5f72a6945a0aac4f20b78a5bf95",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["==", "kind", 12]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#0c1f49", "fill-color": "#0c1f49", "fill-antialias": true },
        "layerInfo": {
            "zindex": 8,
            "datatype": "fill",
            "prefix": "106005",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-机场跑道",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "b7ebad47a00f4a02a8c62a98984b8e0c",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["==", "kind", 7]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#0b1a3b", "fill-color": "#0b1a3b", "fill-antialias": true },
        "layerInfo": {
            "zindex": 9,
            "datatype": "fill",
            "prefix": "106004",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-工业区",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "60b5da1dbd96452abe75c5f13dc22ca3",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["in", "kind", 30, 36, 35, 2]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#061940", "fill-color": "#061940", "fill-antialias": true },
        "layerInfo": {
            "zindex": 10,
            "datatype": "fill",
            "prefix": "106007",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-商业",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "0a9ce96feb1e4202b4e4fc20a0481abb",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["in", "kind", 32, 34, 33, 39]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#091b43", "fill-color": "#091b43", "fill-antialias": true },
        "layerInfo": {
            "zindex": 11,
            "datatype": "fill",
            "prefix": "106009",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-公共区域",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "eeab4c4dfbec49659c99822539b92d7d",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["==", "kind", 3]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#223459", "fill-color": "#223459", "fill-antialias": true },
        "layerInfo": {
            "zindex": 12,
            "datatype": "fill",
            "prefix": "106003",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-医院",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "6245d8ec870d4bad94d2394dfee74014",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["==", "kind", 1]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#07183a", "fill-color": "#07183a", "fill-antialias": true },
        "layerInfo": {
            "zindex": 13,
            "datatype": "fill",
            "prefix": "106006",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-大学",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "73f17895620242b18c435d14e93cbd1d",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["in", "kind", 6, 40]],
        "maxzoom": 17.5,
        "paint": {
            "fill-outline-color": "#103462",
            "fill-color": "#103462",
            "fill-opacity": 0.25,
            "fill-antialias": true
        },
        "layerInfo": {
            "zindex": 14,
            "datatype": "fill",
            "prefix": "106008",
            "sourcemaxzoom": 17.5,
            "groupid": "061236f8",
            "name": "土地利用-停车场",
            "describe": "土地利用",
            "source": "Landuse",
            "groupname": "土地利用",
            "sourceminzoom": 12.0
        },
        "source": "Merge_1",
        "source-layer": "Landuse",
        "id": "99c60b8113cf4ff28a59ce1c77e98f02",
        "type": "fill",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6]],
        "maxzoom": 8.5,
        "paint": { "line-width": 1.0, "line-opacity": 1.0, "line-dasharray": [6, 3, 3, 4], "line-color": "#1979b0" },
        "layerInfo": {
            "zindex": 15,
            "datatype": "line",
            "prefix": "103003",
            "sourcemaxzoom": 8.5,
            "groupid": "77fb5fc8",
            "name": "特别行政区边界",
            "describe": "行政区划边界",
            "source": "Adminbound",
            "groupname": "行政区划边界",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminbound",
        "id": "30d8fbd264ca4cbc933690b71e64edb0",
        "type": "line",
        "minzoom": 3
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 5]],
        "maxzoom": 8.5,
        "paint": { "line-width": 1.0, "line-opacity": 1.0, "line-dasharray": [5, 3], "line-color": "#1979b0" },
        "layerInfo": {
            "zindex": 16,
            "datatype": "line",
            "prefix": "103003",
            "sourcemaxzoom": 8.5,
            "groupid": "77fb5fc8",
            "name": "省界",
            "describe": "行政区划边界",
            "source": "Adminbound",
            "groupname": "行政区划边界",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminbound",
        "id": "c827d9fee5cb4f4d9271f5830da1389a",
        "type": "line",
        "minzoom": 3
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2]],
        "maxzoom": 7.0,
        "paint": {
            "line-width": { "stops": [[3, 1], [8, 2]], "base": 1.2 },
            "line-dasharray": [3, 3, 5, 5],
            "line-color": "#2f92ce"
        },
        "layerInfo": {
            "zindex": 17,
            "datatype": "line",
            "prefix": "103002",
            "sourcemaxzoom": 8.5,
            "groupid": "77fb5fc8",
            "name": "国界争议区域",
            "describe": "行政区划边界",
            "source": "Adminbound",
            "groupname": "行政区划边界",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminbound",
        "id": "49979d9be1cb460b8245200c71110d03",
        "type": "line",
        "minzoom": 3
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["in", "kind", 3, 1]],
        "maxzoom": 7.0,
        "paint": { "line-width": { "stops": [[3, 1], [8, 2]], "base": 1.2 }, "line-color": "#2f92ce" },
        "layerInfo": {
            "zindex": 18,
            "datatype": "line",
            "prefix": "103002",
            "sourcemaxzoom": 8.5,
            "groupid": "77fb5fc8",
            "name": "国界",
            "describe": "行政区划边界",
            "source": "Adminbound",
            "groupname": "行政区划边界",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminbound",
        "id": "679570c79a5348ab9e64bbe2311eebad",
        "type": "line",
        "minzoom": 3
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", "1"]],
        "maxzoom": 17.5,
        "paint": { "fill-color": "#181b26" },
        "layerInfo": {
            "zindex": 19,
            "datatype": "fill",
            "prefix": "104",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地-岛无属性2",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "c2beeba2439a4827904e534dcc2a5928",
        "type": "fill",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", [">=", "area_level", 75], ["==", "kind", "1"]],
        "maxzoom": 8.0,
        "paint": { "fill-color": "#181b26" },
        "layerInfo": {
            "zindex": 20,
            "datatype": "fill",
            "prefix": "104",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地-岛无属性1",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "8f888524d95a493c83be0424e2287f00",
        "type": "fill",
        "minzoom": 5.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["in", "kind", "7", "9", "6", "8"], [">=", "area_level", 98]],
        "maxzoom": 9.0,
        "paint": { "fill-outline-color": "#122448", "fill-color": "#1a1f2c", "fill-antialias": true },
        "layerInfo": {
            "zindex": 21,
            "datatype": "fill",
            "prefix": "106001",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地1",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "bd7b2718563e4549b6df016a8425deff",
        "type": "fill",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["in", "kind", "7", "9", "6", "8"], [">=", "area_level", 97]],
        "maxzoom": 10.0,
        "paint": { "fill-outline-color": "#122448", "fill-color": "#1a1f2c", "fill-antialias": true },
        "layerInfo": {
            "zindex": 22,
            "datatype": "fill",
            "prefix": "106001",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地2",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "f12ee079c84a413bbe13ea26601eb4f0",
        "type": "fill",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["in", "kind", "7", "9", "6", "8"], [">=", "area_level", 90]],
        "maxzoom": 12.0,
        "paint": { "fill-outline-color": "#122448", "fill-color": "#1a1f2c", "fill-antialias": true },
        "layerInfo": {
            "zindex": 23,
            "datatype": "fill",
            "prefix": "106001",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地3",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "55eccf75b28c4ce5b914248287aa99c5",
        "type": "fill",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["in", "kind", "7", "9", "6", "8"], [">=", "area_level", 75]],
        "maxzoom": 14.0,
        "paint": { "fill-outline-color": "#122448", "fill-color": "#1a1f2c", "fill-antialias": true },
        "layerInfo": {
            "zindex": 24,
            "datatype": "fill",
            "prefix": "106001",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地4",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "73c20674e3814c718e5cc29d16f7158d",
        "type": "fill",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["in", "kind", "7", "9", "6", "8"]],
        "maxzoom": 17.5,
        "paint": { "fill-outline-color": "#122448", "fill-color": "#1a1f2c", "fill-antialias": true },
        "layerInfo": {
            "zindex": 25,
            "datatype": "fill",
            "prefix": "106001",
            "sourcemaxzoom": 17.5,
            "groupid": "6b95434e",
            "name": "绿地5",
            "describe": "绿地",
            "source": "Greenface",
            "groupname": "绿地",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Greenface",
        "id": "078c046ce78f429c8e865d8f1d6235f4",
        "type": "fill",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "maxzoom": 7.0,
        "paint": {
            "line-width": { "stops": [[5, 0.7], [6, 0.8], [7, 1.6], [9, 1.6], [20, 10]], "base": 1 },
            "line-color": "#19355f"
        },
        "layerInfo": {
            "zindex": 26,
            "datatype": "line",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "单线河",
            "describe": "单线河",
            "source": "Waterline",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterline",
        "id": "76c3020232f04db294bd0d1bdcefee7f",
        "type": "line",
        "minzoom": 3.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 5], ["==", "display_class", 8]],
        "maxzoom": 17.5,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 27,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-港湾",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "735733a0649641b589a53b79ca5b55d5",
        "type": "fill",
        "minzoom": 3.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 3]],
        "maxzoom": 17.5,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 28,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河7",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "82d9c44166254936989b6308a9ed69da",
        "type": "fill",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", [">=", "display_class", 1], [">=", "area_level", 72], ["==", "kind", 3]],
        "maxzoom": 13.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 29,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河6",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "aac8343d207543ec81d8e58ee48ebb60",
        "type": "fill",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", [">=", "display_class", 2], ["==", "kind", 3]],
        "maxzoom": 14.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 30,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河5",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "bcf44688a7f14a978a4ca154f5a435c6",
        "type": "fill",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", [">=", "display_class", 3], ["==", "kind", 3]],
        "maxzoom": 12.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 31,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河4",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "6929da7db4894583b73bdd1f48685a52",
        "type": "fill",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", [">=", "display_class", 5], ["==", "kind", 3]],
        "maxzoom": 10.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 32,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河3",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "40eb63b65b894dc88716370f6876dadd",
        "type": "fill",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", [">=", "display_class", 7], ["==", "kind", 3]],
        "maxzoom": 10.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 33,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河2",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "d3a142f91db1440baa554c5b6b763bb2",
        "type": "fill",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "none" },
        "filter": ["all", ["==", "kind", 3], ["==", "display_class", 8]],
        "maxzoom": 7.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 34,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-双线河1",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "4a40b892b3334e19956cfb588f6e5b13",
        "type": "fill",
        "minzoom": 3.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 3], ["==", "display_class", -2]],
        "maxzoom": 10.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 35,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-黄金坪",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "04065a5384244b5181d774af62103529",
        "type": "fill",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 1]],
        "maxzoom": 17.5,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 36,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼7",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "c0ed280f17fc40d8a182636f425176d5",
        "type": "fill",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 1], [">=", "area_level", 10]],
        "maxzoom": 14.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 37,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼6",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "432b5d6bdd744ac5b3c874a66ac2f50b",
        "type": "fill",
        "minzoom": 11.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 1], [">=", "area_level", 20]],
        "maxzoom": 11.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 38,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼5",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "decf82da9605403cbb7b5d0ea76655c8",
        "type": "fill",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 1], [">=", "area_level", 40]],
        "maxzoom": 10.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 39,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼4",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "82f403ae280f406cb2f8f914d262d6c3",
        "type": "fill",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 1], [">=", "area_level", 85]],
        "maxzoom": 9.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 40,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼3",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "c5fa2c3c2b444810aad2729fdcf33d7a",
        "type": "fill",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 4], [">=", "area_level", 50]],
        "maxzoom": 8.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 41,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼2",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "e7096eb14bf143a8b51b85a741727432",
        "type": "fill",
        "minzoom": 6.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "kind", 2], [">=", "display_class", 7]],
        "maxzoom": 6.0,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 42,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-湖沼1",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "ddcf18e3c86b47a28010fc35a3abae80",
        "type": "fill",
        "minzoom": 5.0
    }, {
        "layout": { "visibility": "visible" },
        "filter": ["all", ["==", "display_class", -1]],
        "maxzoom": 17.5,
        "paint": { "fill-color": "#1a232f" },
        "layerInfo": {
            "zindex": 43,
            "datatype": "fill",
            "prefix": "102",
            "sourcemaxzoom": 17.5,
            "groupid": "9627501e",
            "name": "水域面-鸭绿江",
            "describe": "水域面",
            "source": "Waterface",
            "groupname": "水系",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Waterface",
        "id": "9eb254965f384e23bb3079fffaa198ce",
        "type": "fill",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[6, 1.5], [20, 10]], "base": 1.2 }, "line-color": "#1c283f" },
        "layerInfo": {
            "zindex": 44,
            "datatype": "line",
            "prefix": "101009",
            "sourcemaxzoom": 17.5,
            "groupid": "50829a6f",
            "name": "铁路_边框",
            "describe": "铁路",
            "source": "Railway",
            "groupname": "铁路",
            "sourceminzoom": 6.0
        },
        "source": "Merge_1",
        "source-layer": "Railway",
        "id": "2fcf65b0985d4d3a8080b1fab0501fc1",
        "type": "line",
        "minzoom": 6
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[6, 0.5], [20, 8]], "base": 1.2 },
            "line-dasharray": [8, 8],
            "line-color": "#283956"
        },
        "layerInfo": {
            "zindex": 46,
            "datatype": "line",
            "prefix": "101009",
            "sourcemaxzoom": 17.5,
            "groupid": "50829a6f",
            "name": "铁路_线",
            "describe": "铁路",
            "source": "Railway",
            "groupname": "铁路",
            "sourceminzoom": 6.0
        },
        "source": "Merge_1",
        "source-layer": "Railway",
        "id": "c8bfcb2bfcf74060beed24c67298fd28",
        "type": "line",
        "minzoom": 6
    }, {
        "layout": { "visibility": "none" },
        "maxzoom": 17.5,
        "paint": {
            "fill-outline-color": "#4a4a4a",
            "fill-color": { "property": "color", "type": "identity" },
            "fill-opacity": 0.6,
            "fill-antialias": true
        },
        "layerInfo": {
            "zindex": 47,
            "datatype": "fill",
            "prefix": "106005",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "地铁站点面",
            "describe": "地铁站点面",
            "source": "Subwaypolygon",
            "groupname": "",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Subwaypolygon",
        "id": "73bc8a01c63d4e4097f64de33c25bb41",
        "type": "fill",
        "minzoom": 16.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "functionclass", 5], ["in", "kind", 13, 10, 8, 9], ["in", "const_st", 3, 4]],
        "maxzoom": 17.5,
        "paint": { "line-width": 2, "line-dasharray": [3, 3], "line-color": "#939fae" },
        "layerInfo": {
            "zindex": 48,
            "datatype": "line",
            "prefix": "101008",
            "sourcemaxzoom": 17.5,
            "groupid": "5e08568d",
            "name": "FC5_14",
            "describe": "道路",
            "source": "Road",
            "groupname": "在建施工道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "92242f0a56684df58f17de7fdade68f1",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "functionclass", 5], ["in", "kind", 2, 1, 3, 4], ["in", "const_st", 3, 4]],
        "maxzoom": 17.5,
        "paint": { "line-width": 2, "line-dasharray": [3, 3], "line-color": "#939fae" },
        "layerInfo": {
            "zindex": 49,
            "datatype": "line",
            "prefix": "101008",
            "sourcemaxzoom": 17.5,
            "groupid": "5e08568d",
            "name": "FC5",
            "describe": "道路",
            "source": "Road",
            "groupname": "在建施工道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a21d7b84dcb64f5182af2e257be06308",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["in", "functionclass", 1, 4, 2, 3], ["in", "const_st", 3, 4]],
        "maxzoom": 17.5,
        "paint": { "line-width": 2.0, "line-dasharray": [3, 3], "line-color": "#939fae" },
        "layerInfo": {
            "zindex": 50,
            "datatype": "line",
            "prefix": "101008",
            "sourcemaxzoom": 17.5,
            "groupid": "5e08568d",
            "name": "FC1-4",
            "describe": "道路",
            "source": "Road",
            "groupname": "在建施工道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "8ae4ffdf1b4046e6b197a31ad9428025",
        "type": "line",
        "minzoom": 11.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 5], ["arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 51,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC5_县道_辅路出入口边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "324840efdc6f489db7d842e896dc9d72",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 52,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC5_城市_匝道IC边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7f1c4b2d63c8498ab27d5593cb385266",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["arrin", "form", "13", "36", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 53,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC5_高速道路_停车POI边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "8e07a7c4242b4ee183e04aaaf6c10a33",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 4], ["arrin", "form", "34", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 54,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC4_省道_辅路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d11b353f071e4bf8971bc8f36672c72c",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 4], ["arrin", "form", "50", "34", "37", "39", "38"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 55,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC4_国道_辅左右出入边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b45d67a20b9b41318e3f176c7d2458df",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 56,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC4_城市_IC匝道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a859606ec2fc43239fa47f138d94a8e6",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["arrin", "form", "39", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 57,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC4_高速_主辅路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "0244f04a8ec340189e2a3e2e8eef8fd7",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 3], ["arrin", "form", "34", "37", "38"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 58,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC3_县道_辅路左右转边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "fe7cb6ffa945444fab82947a506535dd",
        "type": "line",
        "minzoom": 10
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["arrin", "form", "50", "37", "38", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 59,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC3_省道_辅交左右转边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e2d3e72e15b6453c909ba4119a4f174b",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 3], ["arrin", "form", "39"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 60,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC3_国道_辅路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "625a80733db942f5867056edac456a06",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 61,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC3_城市_IC匝道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "81b679be20f2428395f5e7fe403c7916",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["arrin", "form", "39", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 62,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC3_高速_主辅路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e8570caf4634497099915fbbf659dddc",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 2], ["==", "const_st", 1], ["arrin", "form", "50", "34", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 63,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC2_省道_辅路IC边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "0c4623cb4acd4d7a845d98aa9e779c48",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 2], ["arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 64,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC2_国道_辅路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "ab7015c0973c4b339dad2cc4898bcb84",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 65,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC2_城市_匝道IC边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "554391be6daf4922b0f878ac2e98beb0",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 66,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC2_高速_匝道IC边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "dfcdb0cec58c4b2a97e0e1779a6be46e",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 67,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC1_城市_匝道IC边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "fb2e80441b9546b4b2c5488722bf23c6",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["arrin", "form", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 3]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 68,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "f4e761e7",
            "name": "FC1_高速_匝道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道边框",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "9e15a9acb6ec47a7a645d86db80c0ade",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 5], ["arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 69,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "e851db6b",
            "name": "FC5_县道_辅路出入口",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC5",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d93a18cb1b9f41dea2b152c3a5075880",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 70,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "e851db6b",
            "name": "FC5_城市_匝道IC",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC5",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "02bb5e09e2cb4b6292327862554c4bb6",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["arrin", "form", "13", "36", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 71,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "e851db6b",
            "name": "FC5_高速道路_停车POI",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC5",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "00f7362501334b189db19773c03481e4",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 4], ["arrin", "form", "34", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 72,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "2f7e3f88",
            "name": "FC4_省道_辅路",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC4",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "05ea8cb5710f4224894dfff85a488616",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 4], ["arrin", "form", "50", "34", "37", "39", "38"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 73,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "2f7e3f88",
            "name": "FC4_国道_辅左右出入口",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC4",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "eb9875d59c5c42c59c8d4e780604fb17",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 74,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "2f7e3f88",
            "name": "FC4_城市_IC匝道",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC4",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "cf9f80ba67ed4da3b7121b43e6cfcd47",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["arrin", "form", "39", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 75,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "2f7e3f88",
            "name": "FC4_高速_主辅路出入口",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC4",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "787f43c1950d48299d2184e5e2314c2d",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 3], ["arrin", "form", "34", "37", "38"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 76,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "d87d8ce4",
            "name": "FC3_县道_辅路左右转",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC3",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "30225840f166459bab99195d2498e3ec",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["arrin", "form", "50", "37", "38", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 77,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "d87d8ce4",
            "name": "FC3_省道_辅交叉左右转",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC3",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "bfaa27dd08e14e1eb2fec72ca397795a",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 3], ["arrin", "form", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 78,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "d87d8ce4",
            "name": "FC3_国道_辅路",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC3",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "c04d1f8f50224163b8edbfc784b3f65e",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.0,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 79,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "d87d8ce4",
            "name": "FC3_城市_IC匝道",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC3",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "963cb162fe3f403381c040fcaf33811b",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 80,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "d87d8ce4",
            "name": "FC3_城市_IC匝道_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC3",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "cf0ec964158849f7a60d3650b2e0da43",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["arrin", "form", "39", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 81,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "d87d8ce4",
            "name": "FC3_高速_主辅路出入口",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC3",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "ff23ce3aa32141b6a8b21aea488f4462",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 2], ["==", "const_st", 1], ["arrin", "form", "50", "34", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 82,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "267a44c8",
            "name": "FC2_省道_辅路IC",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC2",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "9725c1bd504a42449cba3191cf558b01",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 2], ["arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 83,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "267a44c8",
            "name": "FC2_国道_辅路",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC2",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "21e4d0c8c175480c823fa56c9c97094f",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["arrin", "form", "10"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 84,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "267a44c8",
            "name": "FC2_城市_IC",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC2",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "30cff760aa3a4ee0bcb1f3d00e7b35bc",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "10"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 85,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "267a44c8",
            "name": "FC2_高速_匝道IC",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC2",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e390bcdf43224df696d550dd6396741c",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 86,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "e17226be",
            "name": "FC1_城市_匝道IC",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC1",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3543a8df36364a89931313bac05861d3",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "square" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["arrin", "form", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 87,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "e17226be",
            "name": "FC1_高速_匝道",
            "describe": "道路",
            "source": "Road",
            "groupname": "匝道_FC1",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7d7468b11e1549db8e73b95525038cd2",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 13], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#3983d9"
        },
        "layerInfo": {
            "zindex": 88,
            "datatype": "line",
            "prefix": "101007",
            "sourcemaxzoom": 17.5,
            "groupid": "477b5043",
            "name": "FC5_轮渡",
            "describe": "道路",
            "source": "Road",
            "groupname": "轮渡",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b94aacb63a4749c1930be7bcc3c19c21",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 13], ["==", "functionclass", 4], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#3983d9"
        },
        "layerInfo": {
            "zindex": 89,
            "datatype": "line",
            "prefix": "101007",
            "sourcemaxzoom": 17.5,
            "groupid": "477b5043",
            "name": "FC4_轮渡",
            "describe": "道路",
            "source": "Road",
            "groupname": "轮渡",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "f25d29cbb8514e6493f3be17c839282f",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 13], ["==", "functionclass", 3], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#3983d9"
        },
        "layerInfo": {
            "zindex": 90,
            "datatype": "line",
            "prefix": "101007",
            "sourcemaxzoom": 17.5,
            "groupid": "477b5043",
            "name": "FC3_轮渡",
            "describe": "道路",
            "source": "Road",
            "groupname": "轮渡",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "5d3a52de17414546b8f91116bb472ef5",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 13], ["==", "functionclass", 2], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#3983d9"
        },
        "layerInfo": {
            "zindex": 91,
            "datatype": "line",
            "prefix": "101007",
            "sourcemaxzoom": 17.5,
            "groupid": "477b5043",
            "name": "FC2_轮渡",
            "describe": "道路",
            "source": "Road",
            "groupname": "轮渡",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "bca7abf35d764551a9996fd8ede77867",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 13], ["==", "functionclass", 1], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#3983d9"
        },
        "layerInfo": {
            "zindex": 92,
            "datatype": "line",
            "prefix": "101007",
            "sourcemaxzoom": 17.5,
            "groupid": "477b5043",
            "name": "FC1_轮渡",
            "describe": "道路",
            "source": "Road",
            "groupname": "轮渡",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "dca1476f025a466fbe4667ea2d47b8fd",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 10]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[12, 0.5], [14, 0.8], [18, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[14, 1], [18, 4]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 93,
            "datatype": "line",
            "prefix": "101006",
            "sourcemaxzoom": 17.5,
            "groupid": "ca0d4ea8",
            "name": "步行道路_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "步行道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "41a93bb1050b431589bed79876b27c12",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 10]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[14, 1], [18, 6]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 94,
            "datatype": "line",
            "prefix": "101006",
            "sourcemaxzoom": 17.5,
            "groupid": "ca0d4ea8",
            "name": "步行道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "步行道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3fa15fd126894934b2ceb4a13a041e72",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 9]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 8]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 95,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "9e8fd4ca",
            "name": "九级道路_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "九级道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a765cf6417f3421081a5fcd001addee8",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 9]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 8]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 96,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "9e8fd4ca",
            "name": "九级道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "九级道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "20656c7805334698b931f21ec2c68863",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 97,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC5_其他道路_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "c9079ebfc335466ea1fb7c7964e9e1d0",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 4]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 98,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC4其他道路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "55a7cab1cc3f4bb89f9a774dd006b1c5",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 3]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 99,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC3其他道路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "5a30f4e682584ce7927b120f2e26eeec",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 2]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 100,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC2其他道路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "54f6e48c16f2431b85208bf539abbcd0",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 101,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC1其他道路边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7d906f3decf94cc1a1ae29e84f3d2049",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 102,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC5其他道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "2487f37e26684187a0418eabd0f941aa",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 4]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 103,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC4其他道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "69fa19a8ab05411491ee3b2b91d0f82f",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 3]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 104,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC3其他道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7f498e8eb0494a42a5f8642d0368ba12",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 2]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 105,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC2其他道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "1c3ff46ab987458c9080d39aec821658",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 106,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "b86c8735",
            "name": "FC1其他道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "其他道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "04a4b2dddfae4adaa6149a79b28bcdb9",
        "type": "line",
        "minzoom": 5.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 5], ["!arrin", "form", "31"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 107,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC5_乡镇村_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "49b4b3657a8246708cf0b2fb4f955aa5",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 4], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[12, 0.2], [18, 1.2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [12, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 108,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC4_乡镇村_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d188e1378c984a5d9ec8ce917c59a2ac",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 3], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 109,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC3_乡镇村_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "45e85585494a4f96b21f6a5dac23aad2",
        "type": "line",
        "minzoom": 11.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 2], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 110,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC2_乡镇村_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "07b9433bce794a2ba72fb4d6f2fa57ee",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 1], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 111,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC1乡镇村_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "15aad5ac40ca4fec9752c8ffade6dfef",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 5], ["arrin", "form", "31"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 112,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC5_乡镇村_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "2967f6a1b6594bb9a0e7a819d8c525c1",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 4], ["arrin", "form", "31"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 113,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC4_乡镇村_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3c2da85606c94592a66e5caa74055b83",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 3], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 114,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC3_乡镇村_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "bae3154038914ac7be00fdda7e105b36",
        "type": "line",
        "minzoom": 11
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 2], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 115,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC2_乡镇村_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a12166f08cf14065b122c8ba80f04d8c",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 1], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 116,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC1_乡镇村_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "8019f28ad1ef4d96a1114855a9b42a37",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 117,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC5_乡镇村道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "1e32864126394c759e7314da6fae9f59",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 4], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [12, 1], [13, 3], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 118,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC4_乡镇村道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "cb3eb1dbbf7444daaf7f332275cbcb7e",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 3], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 119,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC3_乡镇村道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "817be9be0a014adf94a8f97289552eaa",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 2], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 120,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC2_乡镇村道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "1e00545a44024ceebf7b6cb0682aab9a",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], ["==", "functionclass", 1], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [9, 1], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 121,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "3b964675",
            "name": "FC1乡镇村道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "乡镇村",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "18193eea9fe641058c5982afd9d2343d",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 5], ["!arrin", "form", "31", "34", "39"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [11, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 122,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC5_县道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7bfb574bf18c43e596205ec5e5410be6",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 4], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 123,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC4_县道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "cd50b9705c0946108b317e4c29d3c3be",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 3], ["!arrin", "form", "31", "34", "37", "38"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 124,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC3_县道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "658109465807487f8526cd1e7fc0aff4",
        "type": "line",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 2], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 125,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC2_县道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e9621e30f97f4feaadf39d8f60142908",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 1], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 126,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC1县道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "587f7b2c5fde4167833919e9420a43ff",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 5], ["arrin", "form", "31"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 127,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC5_县道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "734930904dad4c519738f3dc544d1f42",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 4], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 128,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC4_县道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3add7559920840bbbef295c5691e1344",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 3], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 129,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC3_县道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "0fd72c395caf4b9a9db534dc6ae83eb2",
        "type": "line",
        "minzoom": 11.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 2], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 130,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC2_县道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a41bfe6ffbb74ed381ab8b1f700dd5b4",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 1], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 131,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC1县道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "10f8067ec66345dd91d34232ec8fbfac",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 5], ["!arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 132,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC5_县道",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d7ad5e0e31d64f9a974b4020390ae020",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 4], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 133,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC4_县道",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "13d1637f6855493d82f482c2f82e86c8",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 3], ["!arrin", "form", "34", "37", "38"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 134,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC3_县道",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "db405ba386ca40faab33ab6dde78a8f5",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 2], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 135,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC2_县道",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "921217d39090461d8e0014dc990213a8",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], ["==", "functionclass", 1], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 136,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "5482b733",
            "name": "FC1县道",
            "describe": "道路",
            "source": "Road",
            "groupname": "县道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "215697beb4744e8b9c0b85a1a3b99f24",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 5], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 137,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC5_省道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "2416408fd8194ccd9ee82d267103efee",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 5], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 138,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC5_省道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "bb75d16e75114e64a430f14f3aeb175c",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 4], ["!arrin", "form", "31", "34"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 139,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC4_省道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "59c62ee23ddd479980a173d1a4f0b6db",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 4], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 140,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC4_省道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "12d50a96204643969de8fb50cc66c884",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["!arrin", "form", "31", "50", "37", "38", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.0,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 141,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC3_省道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "32377e38754c4d318c4df32510d7ddf8",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["!arrin", "form", "31", "50", "37", "38", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 142,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC3_省道_边框_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a1184ae0ae254f81be20fd6839e0b477",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 143,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC3_省道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e07f77de2fce41d586f81a3b2ca0b835",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 2], ["!arrin", "form", "31", "34", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 144,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC2_省道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e715879e11e24f5eaa4f1e8735d66f22",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 2], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 145,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC2_省道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7ff48e32fc254b229c19d5ff9cb706cb",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 1], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 146,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC1_省道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "c8d69a35be8148909e2ff96acc929409",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 1], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 147,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC1_省道_隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b1be363039aa4733bf7c0df0456febc8",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 5], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 148,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC5_省道",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "cd06001f90f04ae2a00d087d7ce67c2c",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 4], ["!arrin", "form", "34"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 149,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC4_省道",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "28e79b59a633462a9f798bd9bcabf04f",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["!arrin", "form", "50", "37", "38", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.0,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 150,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC3_省道",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "2c39613925784b7fbb75d577bf4a07e1",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 3], ["!arrin", "form", "50", "37", "38", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 151,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC3_省道_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "1d363bb70e904b859f6df9df187c2203",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 2], ["==", "const_st", 1], ["!arrin", "form", "34", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 152,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC2_省道",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a9fb1d70b0344cadb7a5ab8844905b57",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], ["==", "functionclass", 1], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 153,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "a1b89732",
            "name": "FC1_省道",
            "describe": "道路",
            "source": "Road",
            "groupname": "省道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "56721acc99144d3daa504bc02d40185a",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 5], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 154,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC5_国道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d9d3ed7f4ab348deb35f5579af1f14d8",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 5], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 155,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC5国道隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "46c1a84b84a64f259d135ef635724351",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 4], ["!arrin", "form", "31", "50", "34", "37", "39", "38"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 156,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC4_国道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3f9ed9db811a400c9cc5e70049c2c240",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 4], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 157,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC4国道隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d48009cc1e9940c9bb6a60ef7e695dff",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 3], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 158,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC3国道隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a9328e59e9384347bb97f74e3fdc045e",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 3], ["!arrin", "form", "31", "39"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 159,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC3_国道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "84c79c4c40bc4fa49dffd2489b820e12",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 2], ["!arrin", "form", "31", "34", "39"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 160,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC2_国道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "6abaff7dcb104fbe8b524ab1b47084eb",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 2], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 161,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC2国道隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "ab21083cd045445e8cf44c35efce77f4",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 1], ["!arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 162,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC1_国道_边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e411ff31853847b88e3533b2527eecdf",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 1], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 163,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC1国道隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7e35aaaf512640eb82ed4184cfe0401a",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 5], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 164,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC5国道",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "67eac6b56be24a998d515eca33fc463e",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 4], ["!arrin", "form", "50", "34", "37", "39", "38"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 165,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC4国道",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7b0156faf1a2456588fe4e5e530449f2",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 3], ["==", "const_st", 1], ["!arrin", "form", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 166,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC3国道",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "5cbebf119c474c339424a866fcf0ae20",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 2], ["!arrin", "form", "34", "39"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 167,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC2国道",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a9de35b15c5646429188e3b6043b32db",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], ["==", "functionclass", 1], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 168,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "181d2941",
            "name": "FC1国道",
            "describe": "道路",
            "source": "Road",
            "groupname": "国道",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d15b6b602d5d40a5ab24a1a4a4504c1a",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [17, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 169,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC5城市JCT边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "54ae59b5d84640b498b5c37712705d3c",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 170,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC4城市边框JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "c2c01ec2c65b4f74b6e8401df97fd650",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 171,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC5城市隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "63b122c983654a00824849bcd50930b4",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["!arrin", "form", "31", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 172,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC5城市边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "78279ea9e797437c8b1bb69c04fc46a4",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["!arrin", "form", "31", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 173,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC4城市边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "1c417b70aec1453389a1282cdc8cd08c",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 174,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC3城市边框JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "09c5da296116422cb9a28402b53c37d0",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 175,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC4城市隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "de5e1f5c4da5484bb949e3b4845c4a79",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["!arrin", "form", "31", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 176,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC3城市边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "15d187d5e4814c45b2540fa8c16c2eee",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 177,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC3城市隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "329b2afc57be4553877d17b12f02c328",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["!arrin", "form", "31", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.0,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 178,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2城市边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "82d03eab02e8429da495e88fc4ca43e1",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["!arrin", "form", "31", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 179,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2城市边框_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "05836fa88dad46b29a2a97c8c90a0868",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 180,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2城市边框JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "077c9bcbe65145edb68065d66a68b79f",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 181,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2城市隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "511ddbb4e1364f84a05498efe7662154",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["!arrin", "form", "31", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 182,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC1城市边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "903734f173b94f029c551178ab6df719",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 183,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC1城市边框JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "318d9fa1699f46538c5d1a90b16dea81",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 184,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC1城市隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "260b1ec055c443069cafad28812200df",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["!arrin", "form", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 185,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC5_城市高速_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "af2214d057a144f98ab632e9b4fbbec5",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["!arrin", "form", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 186,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC4_城市高速_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "4d99d2d44a16465daaf9f50e373e9ccf",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["!arrin", "form", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 187,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC3_城市高速_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "17dc2c7f7a0c4cd0be009a782d7a8132",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["!arrin", "form", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.0,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 188,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2_城市高速_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "33c5292c96904c54acf1ac37ea254db5",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["!arrin", "form", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 189,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2_城市高速_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a8cf4bec212c4840bae078bf34927ef5",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["!arrin", "form", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 190,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC1_城市高速_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3c4270b1aa654e518ee21f22e1a42dfb",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 5], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 191,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC5城市JCT_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3dcc3285c616490cbeb2a1ba22008d27",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 4], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 192,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC4城市JCT_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "4129c3c402374194b51dae886a4626bb",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 3], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 193,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC3城市JCT_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "847efbbfea0945c2bfbad1e9e9b5cb17",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 2], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 194,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC2城市JCT_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "558a639320a74e949a74260f14101431",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], ["==", "functionclass", 1], ["==", "const_st", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.6], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 195,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "39e449d2",
            "name": "FC1城市JCT_16",
            "describe": "道路",
            "source": "Road",
            "groupname": "城市高速",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "25ca82a8f0044e688ee43f446cec4a79",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["!arrin", "form", "31", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 196,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC5高速边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3f2524a5ecc34ac7bda3df19203b3334",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 197,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC5高速隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "0c8cc81e5fb2453f82d14bc72792a514",
        "type": "line",
        "minzoom": 12
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["!arrin", "form", "31", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 198,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC4高速边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "995ee898582145a48ab1bfdd9ce59fbf",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 199,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC4高速隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "2f57116bb07a426db78ba34659d9865c",
        "type": "line",
        "minzoom": 9
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["!arrin", "form", "31", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 200,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC3高速边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "698dbf0633354d579bf7ded70904fbe4",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 201,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC3高速隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "ae8ae105ddb148b28a9857fdf1175128",
        "type": "line",
        "minzoom": 8
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["!arrin", "form", "31", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 202,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2高速边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b8a646a47d09491eb35c8ddc93944502",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 203,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2高速隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "be4a2231ce974253a885f5d07e31ef1f",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["!arrin", "form", "31", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 204,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC1高速边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "680d4e9f5d7740778b3b8ef97c2ac36f",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["arrin", "form", "31"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 2]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-dasharray": [3, 3],
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 205,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC1高速隧道边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a6e787b0708f4ce7b4ef15d472fcca9d",
        "type": "line",
        "minzoom": 7
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["!arrin", "form", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 206,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC5_高速道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "3a07d087fe7948f6b12d28a03efc0112",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["!arrin", "form", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 207,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC4_高速道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "c945f34ded0140b58027a64f0aa6951a",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["!arrin", "form", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 208,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC3_高速道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "96d3103f31114b1a92098cd6bf599e1e",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["!arrin", "form", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.7], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 209,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2_高速道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "f96a45d5a86d48b69c930f1807dbb3ab",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["!arrin", "form", "10", "15"], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.7], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 210,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC1_高速道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "214b777e070042a6a6ec5540fbd038ee",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 211,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC5高速JCT边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "5fff2cd0f98c4b24be9cf59370fee7cb",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 212,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC4高速JCT边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b0ada6342ad742a087513aae1f0478c1",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 213,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC3高速JCT边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "c06b718530fb4f7b88e5b6e519ae0a4a",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "11"]],
        "maxzoom": 17.0,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 214,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2高速JCT边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7254adb6a2564ed4bcdc46256e6574bf",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 215,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2高速JCT边框_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "8ef1058598fd491a9fff8b8bbecfdefe",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 216,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC1高速JCT边框",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b300cc24d6c945db84203589bcab656f",
        "type": "line",
        "minzoom": 7.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 5], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 217,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC5高速JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "f1bf97043bf04f879f50e3aae4af9843",
        "type": "line",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 4], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.8], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 218,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC4高速JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "762b18ff158c4c6a94a3c3607bbbf6c2",
        "type": "line",
        "minzoom": 9.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 3], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.8], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 219,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC3高速JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "e8fdc59169644a9ca03410d0bc5ae1bb",
        "type": "line",
        "minzoom": 8.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.8], [6, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 220,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2高速JCT_17",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d59053772a3a4d05a9ec3e6142444bc9",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 2], ["arrin", "form", "11"]],
        "maxzoom": 17.0,
        "paint": { "line-width": { "stops": [[5, 0.8], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 221,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC2高速JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "4b8570a848c74a9c85959398e4d3ad9a",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["==", "functionclass", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 0.8], [6, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 222,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "212da42c",
            "name": "FC1高速JCT",
            "describe": "道路",
            "source": "Road",
            "groupname": "高速道路",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "b49387952a7e47818e331d06ebfb4287",
        "type": "line",
        "minzoom": 5
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], [">=", "zvalue", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 223,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "d499c772",
            "name": "立交其他道路边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "其他道路立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "8615c774513144f0875e4adc15ee4227",
        "type": "line",
        "minzoom": 14
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 8], [">=", "zvalue", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 4]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 224,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "d499c772",
            "name": "立交其他道路",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "其他道路立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "c3eba8600c3e4318adddd1e9903ab662",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 7], [">=", "zvalue", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 225,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "c8ba4fa2",
            "name": "立交乡镇村边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "乡镇村立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "1507d59c4e414aa491a8b213f5c684c9",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 7], [">=", "zvalue", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 226,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "c8ba4fa2",
            "name": "立交乡镇村",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "乡镇村立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "7e357db90a3e4431ac42d175e78c337f",
        "type": "line",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 227,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC5立交县道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "84c3f0ddddb7450cb44ba3e8caeffb14",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 4]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 228,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC4立交县道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "c4a19b39a3e04fbf9302ed07fb72af07",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "34", "37", "38"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1.2]], "base": 1 },
            "line-gap-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 229,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC3立交县道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "1862e72b76ca450eaae84e0366a9a8c0",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 2]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 230,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC2立交县道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "8905a1268d6a4436bb3fa591e78703b1",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 231,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC1立交县道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "26385e4e3a314ec88f35192482dd737f",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 232,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC5立交县道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "0946e09e4a544b0a986aecdfe9ac08c1",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 4]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 233,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC4立交县道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "73107438230d40c4912361754a405add",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "34", "37", "38"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[12, 1], [13, 4], [18, 12]], "base": 1.2 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 234,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC3立交县道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "47e78e3cd5554222ab6951f728906286",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 2]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 235,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC2立交县道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "55ed9fdea8a749e590ced7d3311767b9",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 6], [">=", "zvalue", 1], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 236,
            "datatype": "line",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "20e74db5",
            "name": "FC1立交县道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "县道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "bc7844678e3443d39dd310e44f60371d",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 5], ["!arrin", "form", "34", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 237,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC5立交省道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "0480627398a14c05b2abcd16601ddd73",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 4], ["!arrin", "form", "34", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [14, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 238,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC4立交省道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "f4ee74409d18414ba59d09ab8b8c31b7",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "50", "34", "37", "38", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [14, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 239,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC3立交省道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "2dbca26f822044929555e212a1575e3e",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 2], ["!arrin", "form", "50", "34", "10", "1", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 240,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC2立交省道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "84354bc7d45a4d91984d30f8fa32037d",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 241,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC1立交省道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "7ce55e54607448aebb8ebc8d8477b183",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 5], ["!arrin", "form", "34", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 242,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC5立交省道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "0667da42d978465e86c8042db7a7db2b",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 4], ["!arrin", "form", "34", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 243,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC4立交省道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "848251bd203b4654802bab63911466ae",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "50", "34", "37", "38", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 244,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC3立交省道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "255ae58483134950977b07814b75700d",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 2], ["!arrin", "form", "50", "34", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 245,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC2立交省道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "e8130f066e13477fa51a54de9c792be5",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 4], [">=", "zvalue", 1], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 246,
            "datatype": "line",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "e99e2607",
            "name": "FC1立交省道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "省道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "c96537f125604ba09c19f562d03d20f4",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 5], ["!arrin", "form", "50", "34", "37", "39", "38"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 247,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC5立交国道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "58a4a73d63e94109869a95b38510ca73",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 4], ["!arrin", "form", "50", "34", "37", "39", "38"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 248,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC4立交国道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "bf80c522bb784c69a43ea3c363483174",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "39"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 249,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC3立交国道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "6274a65f855e443a9322899bfc7392ab",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 2], ["!arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 250,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC2立交国道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "84eb8c6671664594a76e2ba35d5bca66",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 0.5]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 },
            "line-color": "#1e2a3b"
        },
        "layerInfo": {
            "zindex": 251,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC1立交国道边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "9d8a3856bf284dc8bb82816a4e3c76d9",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 5], ["!arrin", "form", "50", "34", "37", "39", "38"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 252,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC5立交国道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "188d3efe7b064c209ef3f4c9dbbbd622",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 4], ["!arrin", "form", "50", "34", "37", "39", "38"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 253,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC4立交国道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "6b3fd8bf68124c17ba2720ac1614ea6c",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 254,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC3立交国道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "a81711cafedf465b951dcd93476b465c",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 2], ["!arrin", "form", "34", "39"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 255,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC2立交国道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "d8de0e581c4c49fbb5bcd9e7def83715",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 3], [">=", "zvalue", 1], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 32]], "base": 1.5 }, "line-color": "#222d40" },
        "layerInfo": {
            "zindex": 256,
            "datatype": "line",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "e5d78dd1",
            "name": "FC1立交国道",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "国道立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "7c3f18d2305a4b13a6d57daa10e8f4f1",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 5], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 257,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC5立交城市边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "936697a4d6564902891c610e0b82a7c4",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 4], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 258,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC4立交城市边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "be811091be164bd8baa7b2538d3adc71",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 259,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC3立交城市边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "3cc8c5209008464caa6a1701c35b70f8",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 2], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 260,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC2立交城市边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "2c55631f5b994f41ab248daa54c8e2b4",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 1], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 261,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC1立交城市边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "c73404538be4476c810533c11e0b13c1",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 262,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "立交城市JCT边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "0aa968dd3cf34301a27877b5a0be948f",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 5], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 263,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC5立交城市",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "e863d9abe3bf4d558dc1ad9149a7b642",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 4], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 264,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC4立交城市",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "9b3961026e3e47829f9f3e564492dddb",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 3], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 265,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC3立交城市",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "c07255f0b392407f8e9bbdb6b466febf",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 2], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 266,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC2立交城市",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "9a4618dd010a4087908bab53aed74178",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["==", "functionclass", 1], ["!arrin", "form", "10", "15"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 267,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "FC1立交城市",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "dd47bff10a2948de90aa0c44a0fc9052",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 2], [">=", "zvalue", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 268,
            "datatype": "line",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "fa0e26de",
            "name": "立交城市JCT",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "城市立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "a49e5100279f44a9b74b881e732d45b1",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "39", "10", "15"], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 269,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC5立交高速边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "50d0a7433b9449bf813914b819707aef",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "39", "10", "15"], ["==", "functionclass", 4]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 270,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC4立交高速边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "35bbe77748b64edea70b72b422b1886d",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "39", "10", "15"], ["==", "functionclass", 3]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 271,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC3立交高速边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "94da70bcd4bd4021981c5d4f6fdfc6be",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "14", "52", "15"], ["==", "functionclass", 2]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 272,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC2立交高速边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "4490a0e88acd4b65920c5c0c9fc2c887",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "15"], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.1], [18, 1]], "base": 1.2 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 273,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC1立交高速边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "32d24df6ca864442bf718f54faf629de",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.0,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-color": "#253245"
        },
        "layerInfo": {
            "zindex": 274,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "立交高速JCT边框",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "3d983310c904489db4c7ee1d825c0e2b",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "butt" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.5], [18, 1]], "base": 1 },
            "line-gap-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 275,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "立交高速JCT边框_17",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "7a684abae9de4d299c34212b60edbbb1",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "39", "10", "15"], ["==", "functionclass", 5]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 276,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC5立交高速",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "0055944ba36f4d378cbbab5d02d205d0",
        "type": "line",
        "minzoom": 13
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "39", "10", "15"], ["==", "functionclass", 4]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 277,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC4立交高速",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "4fa1151e40544661b43a2f4f67bbf1e6",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "39", "10", "15"], ["==", "functionclass", 3]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 278,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC3立交高速",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "779d81bf050644a9a3d9367a6f7a921b",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "52", "15"], ["==", "functionclass", 2]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 279,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC2立交高速",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "f42306e4e9da4ad29ce5654f55579e01",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["!arrin", "form", "15"], ["==", "functionclass", 1]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 280,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "FC1立交高速",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "0b7d543ed60f40a1913a2b3860896173",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.0,
        "paint": { "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 }, "line-color": "#2f3e57" },
        "layerInfo": {
            "zindex": 281,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "立交高速JCT",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "c8733c5553494262813ce5b9882c34c0",
        "type": "line",
        "minzoom": 13.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], [">=", "zvalue", 1], ["arrin", "form", "11"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 1], [18, 24]], "base": 1.5 },
            "line-opacity": 0.6,
            "line-color": "#111111"
        },
        "layerInfo": {
            "zindex": 282,
            "datatype": "line",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "94b3c7f8",
            "name": "立交高速JCT_17",
            "describe": "道路立交",
            "source": "Zlevel",
            "groupname": "高速立交",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Zlevel",
        "id": "d5c4b02ffde243838560a275130af71c",
        "type": "line",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "none" },
        "maxzoom": 16.0,
        "paint": {
            "fill-outline-color": "#252f3b",
            "fill-color": "#1f2833",
            "fill-opacity": 1.0,
            "fill-antialias": true
        },
        "layerInfo": {
            "zindex": 283,
            "datatype": "extrusion",
            "prefix": "106002",
            "sourcemaxzoom": 17.5,
            "groupid": "571bd709",
            "name": "建筑物-平面",
            "describe": "建筑物",
            "source": "Merge_1",
            "groupname": "建筑物",
            "sourceminzoom": 14.0
        },
        "source": "Merge_1",
        "source-layer": "Buildingmore",
        "id": "3124c6d29cb04dc5a685db6c8f20cab0",
        "type": "fill",
        "minzoom": 14.0
    }, {
        "layout": { "visibility": "none" },
        "maxzoom": 17.5,
        "paint": {
            "extrusion-height": { "property": "levels", "type": "identity" },
            "extrusion-color": "#3f5067",
            "extrusion-base": 0,
            "extrusion-translate-anchor": "map",
            "extrusion-opacity": 0.3,
            "extrusion-translate": [0, 0]
        },
        "layerInfo": {
            "zindex": 284,
            "datatype": "extrusion",
            "prefix": "106002",
            "sourcemaxzoom": 17.5,
            "groupid": "571bd709",
            "name": "建筑物-立体",
            "describe": "建筑物",
            "source": "Merge_1",
            "groupname": "建筑物",
            "sourceminzoom": 14.0
        },
        "source": "Merge_1",
        "source-layer": "Buildingmore",
        "id": "99b0731b935b40f9b9fe330e439ee45e",
        "type": "extrusion",
        "minzoom": 16.0
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "status", 0]],
        "maxzoom": 17.5,
        "paint": { "line-width": { "stops": [[10, 1.8], [20, 4]], "base": 1.2 }, "line-color": "#4a4a4a" },
        "layerInfo": {
            "zindex": 289,
            "datatype": "line",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "74541ee7",
            "name": "地铁线路_边框",
            "describe": "公共交通线路",
            "source": "Ptline",
            "groupname": "地铁",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptline",
        "id": "2fb23cfb83f641568984792f516e977b",
        "type": "line",
        "minzoom": 10
    }, {
        "layout": { "visibility": "visible", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "status", 0]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[10, 1.8], [20, 4]], "base": 1.2 },
            "line-opacity": 0.2,
            "line-color": { "property": "color", "type": "identity" }
        },
        "layerInfo": {
            "zindex": 290,
            "datatype": "line",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "74541ee7",
            "name": "地铁线路",
            "describe": "公共交通线路",
            "source": "Ptline",
            "groupname": "地铁",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptline",
        "id": "a822856122b243a7bb1540731ec2ebda",
        "type": "line",
        "minzoom": 10
    }, {
        "layout": { "visibility": "visible", "text-size": 12.0, "text-anchor": "center", "icon-image": "metro-station" },
        "filter": ["all", ["==", "status", 0], ["==", "stationtype", 1], ["==", "istransfer", 0]],
        "maxzoom": 12.0,
        "paint": { "icon-color": "#cccccc", "text-translate": [0, 10] },
        "layerInfo": {
            "zindex": 291,
            "datatype": "symbol",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "74541ee7",
            "name": "地铁站_11",
            "describe": "公共交通站点",
            "source": "Ptstop",
            "groupname": "地铁",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptstop",
        "id": "30b509952b9d48ca83f4fd06d8282b68",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "visibility": "none",
            "text-offset": [0, 1],
            "text-size": 12,
            "text-anchor": "center",
            "icon-size": 0.78,
            "symbol-placement": "point",
            "icon-image": "metro-{istransfer}-{city_code}-18",
            "icon-optional": false
        },
        "filter": ["all", ["==", "status", 0], ["==", "stationtype", 1]],
        "maxzoom": 13.0,
        "paint": {
            "text-halo-color": "#ffffff",
            "icon-color": "#171bf0",
            "text-halo-width": 1.5,
            "text-translate": [0, 10]
        },
        "layerInfo": {
            "zindex": 292,
            "datatype": "symbol",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "74541ee7",
            "name": "地铁站_12",
            "describe": "公共交通站点",
            "source": "Ptstop",
            "groupname": "地铁",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptstop",
        "id": "bd9e0488a4b94653ba248a48ba900f90",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [0, 1],
            "text-size": 12,
            "text-anchor": "center",
            "icon-size": 0.89,
            "symbol-placement": "point",
            "icon-image": "metro-{istransfer}-{city_code}-18",
            "icon-optional": false
        },
        "filter": ["all", ["==", "status", 0], ["==", "stationtype", 1]],
        "maxzoom": 14.0,
        "paint": {
            "text-halo-color": "#0e2555",
            "icon-color": "#171bf0",
            "text-color": "#59c3ed",
            "text-halo-width": 1.2,
            "text-translate": [0, 10]
        },
        "layerInfo": {
            "zindex": 293,
            "datatype": "symbol",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "74541ee7",
            "name": "地铁站_13",
            "describe": "公共交通站点",
            "source": "Ptstop",
            "groupname": "地铁",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptstop",
        "id": "482d342f355b42538f368083f466d8e9",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [0, 1],
            "text-size": 12,
            "text-anchor": "center",
            "symbol-placement": "point",
            "icon-image": "metro-{istransfer}-{city_code}-18",
            "icon-optional": false
        },
        "filter": ["all", ["==", "status", 0], ["==", "stationtype", 1]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#0e2555",
            "icon-color": "#171bf0",
            "text-color": "#59c3ed",
            "text-halo-width": 1.2,
            "text-translate": [0, 10]
        },
        "layerInfo": {
            "zindex": 294,
            "datatype": "symbol",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "74541ee7",
            "name": "地铁站_14+",
            "describe": "公共交通站点",
            "source": "Ptstop",
            "groupname": "地铁",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptstop",
        "id": "d9b0aba7b62242f9bc53a6c6cf2e0d85",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 11.0,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 13]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#60a1f0", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 295,
            "datatype": "symbol",
            "prefix": "101007",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "轮渡",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "719d6717717442dfa4ae6250ef26da55",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "visible", "text-field": "{name_zh}", "text-size": 14, "symbol-placement": "line" },
        "filter": ["all", ["in", "functionclass", 5], ["in", "const_st", 3, 4], ["in", "kind", 2, 1, 3, 4]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#4a90e2", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 296,
            "datatype": "symbol",
            "prefix": "101008",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "FC5 施工道路名",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "2429d8ba6ec24f8daf3e359e13c013a4",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": { "visibility": "visible", "text-field": "{name_zh}", "text-size": 14.0, "symbol-placement": "line" },
        "filter": ["all", ["in", "functionclass", 1, 4, 2, 3], ["in", "const_st", 3, 4]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#4a90e2", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 297,
            "datatype": "symbol",
            "prefix": "101008",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "FC1-4 施工道路名",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d76bb754531345bd83bd280143358d6d",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 11.0,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 10]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#60a1f0", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 298,
            "datatype": "symbol",
            "prefix": "101006",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "步行路",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "395d439ab9904ea3b9e2026396a913fe",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 11.0,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 9]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#6c8dac", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 299,
            "datatype": "symbol",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "九级道路",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "d4f6ad1982734c6d832f5d72fd430c64",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 11.0,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 8]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#6c8dac", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 300,
            "datatype": "symbol",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "其他道路",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "fb2d21be222544aebe7989c218b9e6ce",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 11.0,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 7]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#6c8dac", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 301,
            "datatype": "symbol",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "乡镇村",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "a499f1f3c65f45b2914a53109c99da67",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 11.0,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 6]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#6c8dac", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 302,
            "datatype": "symbol",
            "prefix": "101005",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "县道",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "6251dd1a9ad148b89b5be3ce66211df4",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[10, 10], [18, 14]], "base": 1 },
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 4], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#05132e", "icon-color": "#ff0000", "text-color": "#6c8dac", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 303,
            "datatype": "symbol",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "省道",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "1953520bacf0418195d0d8de08ed9b2d",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[10, 10], [18, 14]], "base": 1 },
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 3], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#05132e",
            "icon-color": "#ff0000",
            "text-color": "#749dbb",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 304,
            "datatype": "symbol",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "国道",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "ec5032f31df64fe8b3bb9f3a506b23dd",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[10, 10], [18, 14]], "base": 1 },
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 2], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#05132e",
            "icon-color": "#ff0000",
            "text-color": "#749dbb",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 305,
            "datatype": "symbol",
            "prefix": "101002",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "城市高速",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "eb61b25b265c410b82214d57b52dd906",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[10, 10], [18, 14]], "base": 1 },
            "text-ignore-placement": false,
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "kind", 1], ["==", "const_st", 1]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#05132e",
            "icon-color": "#ff0000",
            "text-color": "#75b3ff",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 306,
            "datatype": "symbol",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "507debac",
            "name": "高速",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路名称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "f2c34a35d2f94c0bac00d7f16df6b436",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "225018", "220400"]],
        "maxzoom": 17.0,
        "paint": {
            "text-halo-color": "#ffffff",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 307,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "024-公司+其他单位",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "d71fbc5a4e954ee390d724f0722126ef",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "180306"], ["!in", "name_zh", "和平广场", "华盛玫瑰广场"]],
        "maxzoom": 16.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 308,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "023-广场",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "bb877e7fda6e4d6494b031701b4660d1",
        "type": "symbol",
        "minzoom": 14
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_230125_16"
        },
        "filter": ["all", ["in", "kindcode", "235021", "235022"], [">", "rank", 3]],
        "maxzoom": 15.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 309,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "022-024-A渡口，码头+港口",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "e09c8820fd9c45209d8c2cbc8ddb214b",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "160207", "160206"], ["==", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 310,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "021-美术馆+科技馆",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "f4cc7304169046879f6b1d775f642d4d",
        "type": "symbol",
        "minzoom": 14
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_230125_16"
        },
        "filter": ["all", ["in", "kindcode", "235021", "235022"], ["==", "rank", 2]],
        "maxzoom": 15,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 311,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "022-024-B渡口，码头+港口",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "7c04c6a4987f4205a67a4cf8fdf60c71",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "130703"]],
        "maxzoom": 16.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 312,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "020-108-A建材",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "36829a7b07774d8f8fa1d240b128e9e9",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "160105"], ["==", "rank", 1]],
        "maxzoom": 15,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 313,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "019-C大专院校",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "decbd52ef3ae4202a2e0e50ab33030a9",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "160105"], ["==", "rank", 2], ["!in", "name_zh", "辽宁地质工程职业学院"]],
        "maxzoom": 15.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 314,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "019-B大专院校",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "4c9cf4bb44f94f5fa8f20247137387ad",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "160105"], ["==", "rank", 3]],
        "maxzoom": 15,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 315,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "019-A大专院校",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "59281d96239a4a338a50a99bd06eb3f1",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_170100_16"
        },
        "filter": ["all", ["==", "kindcode", "175115"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 316,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "017-医院",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "decda05336a44dc497c3ae2628a20732",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "120201"], ["==", "rank", 1]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 317,
            "datatype": "symbol",
            "prefix": "105006",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "016-B小区",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "cd888a9ac7214ab39b451e113a229c73",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "120201"], ["==", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 318,
            "datatype": "symbol",
            "prefix": "105006",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "016-A小区",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "4881ca1607cb4a5f94645e0039886f98",
        "type": "symbol",
        "minzoom": 14
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_160102_16"
        },
        "filter": ["all", ["==", "kindcode", "160103"], ["==", "rank", 1]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 319,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "015-B中学",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "b10058217fbd46d587151767008c6fdc",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_160102_16"
        },
        "filter": ["all", ["==", "kindcode", "160103"], [">=", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 320,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "015-A中学",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "0239dc7407004f1fb20d8c027da3751a",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": { "symbol-avoid-edges": true, "visibility": "visible", "text-field": "{name_zh}", "text-size": 12.0 },
        "filter": ["all", ["==", "kindcode", "230201"], [">=", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5294e1",
            "text-halo-width": 2.0
        },
        "layerInfo": {
            "zindex": 321,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "014-B桥",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "daffb5455f0e4e6a8dd402fae2014c16",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": { "symbol-avoid-edges": true, "visibility": "visible", "text-field": "{name_zh}", "text-size": 12.0 },
        "filter": ["all", ["==", "kindcode", "230201"], ["<=", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5294e1",
            "text-halo-width": 2.0
        },
        "layerInfo": {
            "zindex": 322,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "014-A桥",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "ed17856889034729a210e4e5467c2abb",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[11, 12], [18, 16]], "base": 1 }
        },
        "filter": ["all", ["==", "kindcode", "230202"], ["<=", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5294e1",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 323,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "013-C立交桥",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "3c14a4cb79f24c3bbe13c4804f705c57",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[11, 12], [18, 16]], "base": 1 }
        },
        "filter": ["all", ["==", "kindcode", "230202"], ["==", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5294e1",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 324,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "013-B立交桥",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "7955bc0bf0fa4421a73c275c03fd383d",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, 0],
            "text-size": { "stops": [[11, 12], [18, 16]], "base": 1 },
            "text-anchor": "center",
            "symbol-placement": "point"
        },
        "filter": ["all", ["==", "kindcode", "230202"], [">=", "rank", 4]],
        "maxzoom": 16.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5294e1",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 325,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "013-A立交桥",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "6f2477bcd3a042ec8d80127f3aff7a58",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "rank", 2], ["==", "kindcode", "180309"]],
        "maxzoom": 15,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 326,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "012-B-植物园-01",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "5724c434eb3445d0be4788aed0c8dea2",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180307_16"
        },
        "filter": ["all", ["==", "rank", 2], ["in", "kindcode", "180308", "185119"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 327,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "012-B游乐园+动物园",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "6b7022800e2840749171853a50f6c18c",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "rank", 1], ["==", "kindcode", "180309"]],
        "maxzoom": 15.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 328,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "012-A-植物园-02",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "3ca2e2d81a9c4dcab2a80dd68f2c4f1e",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180307_16"
        },
        "filter": ["all", ["==", "rank", 1], ["in", "kindcode", "180308", "185119"], ["!in", "name_zh", "鸭绿江第一漂"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 329,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "012-A游乐园+动物园",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "648655e228b146bcb544cd329f50be4b",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180105_16"
        },
        "filter": ["all", ["==", "rank", 1], ["in", "kindcode", "180105", "180106"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 330,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "011-C高尔夫球场 高尔夫练习场",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "a55b231acdf541bba08a1205346162ef",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180105_16"
        },
        "filter": ["all", ["==", "rank", 2], ["in", "kindcode", "180105", "180106"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 331,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "011-B高尔夫球场 高尔夫练习场",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "603c251b0d16425bac9ff93fb95483b9",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180105_16"
        },
        "filter": ["all", ["==", "rank", 3], ["in", "kindcode", "180105", "180106"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 332,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "011-A高尔夫球场 高尔夫练习场",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "245dcb5bc7ee4e30bb4e7e3179b84837",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180100_16"
        },
        "filter": ["all", ["==", "kindcode", "185122"], ["==", "rank", 1]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 333,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "010-B体育场，体育馆（滑冰，游泳，网球，排球，羽毛球，田径场，体育中心等）",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "9dd3f505e3374ad8b327829dfcff331a",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180100_16"
        },
        "filter": ["all", ["==", "kindcode", "185122"], [">=", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 334,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "010-A体育场，体育馆（滑冰，游泳，网球，排球，羽毛球，田径场，体育中心等）",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "9e6f4c2b2f3947de807979144f3d1e65",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_130102_16"
        },
        "filter": ["all", ["in", "kindcode", "130102", "130103"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 335,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "009-百货商场/百货商城+百货商店",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "3b12e3f5d8f946ef902a72f150186379",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_120101_16"
        },
        "filter": ["all", ["in", "kindcode", "125134", "125136", "125137", "125138", "125139", "125140"], ["==", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 336,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "008-B星级酒店",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "77d6ef3d36e444e6bcc2a30545193099",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_120101_16"
        },
        "filter": ["all", ["in", "kindcode", "125134", "125136", "125137", "125138", "125139", "125140"], ["==", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 337,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "008-A星级酒店",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "68009c5095364899a7cb57311bca2334",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "bottom",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "200104"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 338,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "007-A商务中心/会馆",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "9b15e0d073cb477aba86ba4edc7092ff",
        "type": "symbol",
        "minzoom": 15
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_200103_16"
        },
        "filter": ["all", ["==", "kindcode", "215032"], ["==", "rank", 1]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 339,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "006-C大厦",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "32c069e55b1e41f791a60c8594933394",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_200103_16"
        },
        "filter": ["all", ["==", "kindcode", "215032"], ["==", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 340,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "006-B大厦",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "a855cb0b28d94d1e94b27179f864d727",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_200103_16"
        },
        "filter": ["all", ["==", "kindcode", "215032"], ["==", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 341,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "006-A大厦",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "026c4d6806974fe698c50f5759234a6b",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "200101"], ["<=", "rank", 2]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 342,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "005-B会议中心，展览中心",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "ce5f14a2e5af44668ca685c644d0de82",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "200101"], [">=", "rank", 3]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 343,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "005-A会议中心，展览中心",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "266defe3ab9f4b2fa35da2e51b7edde0",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180304_16"
        },
        "filter": ["all", ["==", "kindcode", "185120"], ["==", "rank", 1]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 344,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "004-C公园",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "5181ca9c8c4f4b6aa4867c78c6f2b85d",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180304_16"
        },
        "filter": ["all", ["==", "kindcode", "185120"], [">=", "rank", 2]],
        "maxzoom": 16.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 345,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "004-B公园",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "79daf42d13b341708121b48a37599801",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180304_16"
        },
        "filter": ["all", ["==", "kindcode", "185120"], ["==", "rank", 4]],
        "maxzoom": 12.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 346,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "004-A公园",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "461810c023d74f99a7a2e4b193de9a22",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "160205"], ["==", "rank", 1]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 347,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "003-B博物馆，纪念馆，展览馆，陈列馆",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "59897f2912ea45489eafe6bed5db5aef",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "160205"], ["==", "rank", 2], ["!in", "name_zh", "抗美援朝纪念馆"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 348,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "003-A博物馆，纪念馆，展览馆，陈列馆_2",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "4c6b4be5563a4207806c17c089aa12d0",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180400_16"
        },
        "filter": ["all", ["==", "kindcode", "185116"], ["==", "rank", 1], ["!=", "name_zh", "天安门"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 349,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "002-D名胜古迹",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "11d61eb1d24b41f1a1a3f10144ee2577",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180400_16"
        },
        "filter": ["all", ["==", "kindcode", "185116"], ["==", "rank", 2], ["!in", "name_zh", "洞沟古墓群"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 350,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "002-C名胜古迹",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "d1f7eedd09e24822920db37e0e264ebe",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180400_16"
        },
        "filter": ["all", ["==", "kindcode", "185116"], ["==", "rank", 3], ["!in", "name_zh", "火山地质公园南景区", "岳桦双瀑"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 351,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "002-B名胜古迹",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "fa45e51885314660bb1da7114d1fd5a1",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180400_16"
        },
        "filter": ["all", [">=", "rank", 4], ["==", "kindcode", "185116"], ["!=", "name_zh", "高山苔原带"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 352,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "002-A名胜古迹",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "7436fc0ec1ef49939115eb990d7617e8",
        "type": "symbol",
        "minzoom": 10
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_230103_16"
        },
        "filter": ["all", [">=", "rank", 3], ["==", "kindcode", "230107"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 353,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "001-A货运火车站",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "d85c41ae43254aabbd19a2e1def69be3",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "230103", ""], ["==", "name_zh", "临江站"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 354,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "0883c290",
            "name": "001-A临江火车站",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "文字",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "38e663e9bcba4837a8c11924efabb81b",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": { "symbol-avoid-edges": true, "visibility": "none", "icon-size": 0.0, "icon-image": "poi_door_16" },
        "filter": ["all", ["in", "accessflag", 2, 1]],
        "maxzoom": 17.5,
        "paint": { "icon-color": "#ff0000" },
        "layerInfo": {
            "zindex": 355,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "出入口-正门、非正门",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "7781eedc8f2143d7abf259b61925f34a",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "260000", "260100"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 356,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "P-自然地物\\地名-01-11级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "5a9f5122e4684c0c9370464551ee962d",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "250100", "250200"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 357,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "O-农林牧渔业-01-14级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "449e8202707a4116a4f24c67a3a99602",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "240100"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 358,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "N-科研及技术服务-01-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "cfbb793c490a49f08184a0e2abea593d",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "230125", "230206", "230207", "230209", ""], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 359,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-04-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "07d441e81d7d40a393ad5f653353341f",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-offset": [1, 0],
            "text-size": 11,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["in", "kindcode", "230203", "230204"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#ffffff",
            "icon-color": "#ff0000",
            "text-color": "#000000",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 360,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-07-16级-高速出入口",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "cfddfc4435af4ae6b169ba454aa89f62",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "230100", "230108", "230226"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 361,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-03-14级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "d7c1034687d042feaaa56b0d06c7d5d1",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-offset": [1, 0],
            "text-size": 11,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_230207_16"
        },
        "filter": ["all", ["in", "kindcode", "230211", "230212", "230214", "230223", "230224", "230225", "230213"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#ffffff",
            "icon-color": "#ff0000",
            "text-color": "#000000",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 362,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-07-16级+停车场（三类）",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "2bad9f3ca1fd4d2b926df88e96f94e5e",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "230126"], ["==", "generation", 1], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 363,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-01-11级-机场/候机楼-01",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "9fe6e3354ed24beb9b620061093558a4",
        "type": "symbol",
        "minzoom": 11.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": { "stops": [[11, 12], [18, 16]], "base": 1 },
            "text-anchor": "left",
            "icon-size": 1
        },
        "filter": ["all", ["==", "accessflag", 0], ["in", "kindcode", "230201", "230202"], ["!=", "name_zh", "珍珠桥"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 364,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-07-16级-桥+立交桥",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "7acaf84df54645259ccade55a5c31566",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "230127", "230128", "230129", ""], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 365,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-04-15级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "85bbd6ebc9c3499fade62c83e6bae407",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "230103", "230105", "230107", "230215", "230216", "230217", "230218"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 366,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-05-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "abb343adaee84dbd800aa120dd368b1e",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "230130", "230219", "230220", "230221", "230228", "230229"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 367,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-06-17级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "6acbaa4d47434bdf9fcc51f3fb0432d5",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "230126"], ["==", "generation", 2], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 368,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "M-交通运输、仓储-02-12级-机场/候机楼-02",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a747a60285304e81b2117742238b2ce6",
        "type": "symbol",
        "minzoom": 12.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "kindcode", "220300"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 369,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "L-公司企业-01-14级-工业园",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "5ff79ca99cf5443490cb01742f181f84",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "220100", "220400"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 370,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "L-公司企业-02-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "b4b250082bb043eca1a61f25dc8b422b",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "kindcode", "220200"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 371,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "L-公司企业-03-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "c5271a62d3c24e058967c169c13be776",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "210211", "210304"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 372,
            "datatype": "symbol",
            "prefix": "105006",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "K-居民服务-01-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "9c203c2b16aa4ad898fdf2d3ca3869a1",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "poi_code_170100_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "210105"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 373,
            "datatype": "symbol",
            "prefix": "105006",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "K-居民服务-03-17级-宠物医院",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "d0a5234af24a487f840c3b7246a0b9a6",
        "type": "symbol",
        "minzoom": 17
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "210101", "210102", "210103", "210104", "210201", "210202", "210203", "210204", "210206", "210207", "210209", "210210", "210213", "210214", "210216", "210217", "210218", "210219", "210301", "210302", "210303", "210400"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 374,
            "datatype": "symbol",
            "prefix": "105006",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "K-居民服务-03-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "dce65af786f3421c91fb95cfe415f813",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-offset": [1, 0],
            "text-size": 11,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "210215"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#ffffff",
            "icon-color": "#ff0000",
            "text-color": "#000000",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 375,
            "datatype": "symbol",
            "prefix": "105006",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "K-居民服务-02-16级-公共厕所",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "e3c195f6a1274f5d9cc8eef20fa3a2d7",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "kindcode", "200105"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 376,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "J-商业设施、商务服务-01-14级-商业综合体",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "6e2f069d96594b12be5731d73209f48d",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "200200", "200300", "200400", "200404", "200405"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 377,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "J-商业设施、商务服务-04-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "e09d58c2c09947de8e739513be7ea8d1",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "200101", "200104"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 378,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "J-商业设施、商务服务-03-16级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "f28677aaa91448068543f05562eaf576",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "poi_code_200103_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "200103"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 379,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "J-商业设施、商务服务-03-16级-大厦",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "10b5701934e64f6e970c4d9ce6dd03e9",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "200102", "200201"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 380,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "J-商业设施、商务服务-02-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "fb377a028e0d43d1be6d3a7730bdaaf9",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_190101_16"
        },
        "filter": ["all", ["in", "kindcode", "190107", "190108"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 381,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-01-13级-省/直辖市/自治区政府+市县政府",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "313af4b1437c436ea2609915481f3bbe",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_190200_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "190204"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 382,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-06-17级-消防",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "536bdbae53f9429c94b5f5b14f4702c7",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "poi_code_190100_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["in", "kindcode", "190500", "190501"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 383,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-06-17级-国际组织",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a8d3e2714e964a3b8a31cbdc89cf6a1e",
        "type": "symbol",
        "minzoom": 17
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_190101_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "190110"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 384,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-03-15级-政府及管理机构-机关2",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "291959fcd5e54ece810274ffe1b52408",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_190100_16"
        },
        "filter": ["all", ["==", "kindcode", "190102"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 385,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-02-14级-省级政府机关",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "478570a89aae46a5b9bc2305d0da0e63",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "190111", "190112", "190113", "190114", "190301", "190502"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 386,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-06-17级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "5cb23c9b041e4e9d9c597b67a87609c7",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_190200_16"
        },
        "filter": ["all", ["in", "kindcode", "190200", "190201"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 387,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-05-16级-公安机关",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "8176da466be64426a330341390670c66",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "190401", "190402", "190403", "190404"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 388,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-04-15级-宗教",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a3ff34490f364bacbab0c1e691bdff26",
        "type": "symbol",
        "minzoom": 15
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "190400"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 389,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-04-15级-宗教-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a7795afb4f2c49bcb777ffbfb3f3c01f",
        "type": "symbol",
        "minzoom": 15
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_190100_16"
        },
        "filter": ["all", ["in", "kindcode", "190100", "190101", "190103", "190104", "190105", "190106"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 390,
            "datatype": "symbol",
            "prefix": "105004",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "I-公共设施-03-15级-政府及管理机构-机关1",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "68239c5af64a45fcb6f5a48a5ccbee0c",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "180310"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 391,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-07-水族馆-13级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "529a32b9f95340d8a9cc4dc7e62a7dca",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "kindcode", "180109"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 392,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-02-垂钓-14级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "0bc2039d72064e7b93f94368da1d2a54",
        "type": "symbol",
        "minzoom": 14.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_180304_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "180305"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 393,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-04-15级-街心公园",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "912b2389bee04f63af320aa3a3dac0c7",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "180209", "180210", "180211"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 394,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-03-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "146b335db7204638846b364ad0a0fb48",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "accessflag", 0], ["in", "kindcode", "180206", "180207", "180208", "180301", "180302", "180303"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 395,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-03-17级-通用",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "ea5bdf2a265c434c8f3271a575b7c5ab",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "poi_code_180201_16"
        },
        "filter": ["all", ["in", "kindcode", "180201", "180202", "180203", "180204", "180205"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 396,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-03-17级-休闲娱乐",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "7eb4cf7e382840aab7c01d250def03f2",
        "type": "symbol",
        "minzoom": 17
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "180304"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 397,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-05-公园-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "b2ba386ff65849f9a13bfdfcd8d7dd21",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "180100", "180101", "180102", "180103", "180104", "180105", "180106", "180306", "180400"], ["==", "accessflag", 0], ["!=", "name_zh", "澳門總督府"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 398,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-01-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "947fb59ba4a14ae1bbf18869aa0e274d",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "accessflag", 0], ["in", "kindcode", "180107", "180110"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 399,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-01-16级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "f833a494bd69423182d57abf3a77b13d",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "180307", "180308"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 400,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-04-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "12cc41c354284a6e961538c31b867515",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "180309"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 401,
            "datatype": "symbol",
            "prefix": "105002",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "H-运动、休闲-06-植物园-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "7c929949c31449bcbe88511972c66ad7",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_170100_16"
        },
        "filter": ["all", ["in", "kindcode", "170100", "170101", "170102"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 402,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "G-卫生、社保-01-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "264fc9242b6c43bc91eb22d4f3fca636",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "170105"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 403,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "G-卫生、社保-02-16级-急诊",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "62033906bff949418d146ca67546b4cf",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_170100_16"
        },
        "filter": ["all", ["in", "kindcode", "170103", "170104", "170105"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 404,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "G-卫生、社保-02-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "f6d5356d6d354fea995a933d2484de94",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "170107"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 405,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "G-卫生、社保-03-17级-牙科诊所",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a4d6156632174e5f993755083389537a",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "170106", "170108", "170109", "170110", "170201"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 406,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "G-卫生、社保-03-17级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "256ae34a905e4082bb130bf98200d964",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "160201", "160202"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 407,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-03-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "7f737d875f2c4fbf8240e10400e4a14a",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "160105", "160203", "160106", "160107"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 408,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-02-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "3fa66f6ac37b43e1a513505ca15912e9",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "", "160109"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 409,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-02-15级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "f3609c9f128c4652ad217e105d820638",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "160108", "160110", "160209"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 410,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-03-17级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "60510de8071d40569a2bcc7927cab586",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "160101", "160102", "", "160104", "160204", "160205", "160206"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 411,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-01-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "0b0561e0a4b84cbcb765ecef2922b1d8",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "poi_code_160102_16"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "160103"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 412,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-01-16级-中学",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "4ed61708743a45b39714524fe1362c74",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "160100", "160207", "160208"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 413,
            "datatype": "symbol",
            "prefix": "105003",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "F-教育、文化-01-16级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "4d87ded79cca4505b0d9e5e2cd055054",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "150102"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#ffffff",
            "icon-color": "#ff0000",
            "text-color": "#544946",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 414,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "E-金融、保险-03-17级-ATM/自助银行",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "809766b40bc44d85a8084c78901a02ee",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "150101", "150102"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 415,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "E-金融、保险-01-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "7b3c6137d33541cc9a94115826aaa1df",
        "type": "symbol",
        "minzoom": 17
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "150103", "150104"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 416,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "E-金融、保险-01-17级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "6fbfda70443c4e74a9f158cd07c32ef2",
        "type": "symbol",
        "minzoom": 17
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "kindcode", "150200"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 417,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "E-金融、保险-02-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "c1977d8e9b504a2495b8c27e6c0994b1",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "kindcode", "140202"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 418,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "D-汽车销售及服务-02-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "1adfc26dd2844108b9e0cd3bb502c9cf",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "140101", "140104", "140201", "140301", "140302", "140303", "140304"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 419,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "D-汽车销售及服务-01-15级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "fd468f4cdd7047ad95766388df41dfde",
        "type": "symbol",
        "minzoom": 15.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "130101", "130200", "130201", "130202", "130303", "130304", "130501", "130502"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 420,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "C-批发、零售-01-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "f9efc9ce67fa4df38c3f1202e42df025",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "130104", "130105", "130203", "130204", "130205", "130206", "130207", "130302", "130401", "130403", "130404", "130405", "130406", "130407", "130408", "130409", "130410", "130411", "130800", "130801", "130803", "130804", "130805", "130806", "130807"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 421,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "C-批发、零售-01-17级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "08a53eb3488241b6b434063e7662dfdd",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "130102", "130106", "130301"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 422,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "C-批发、零售-02-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "6da217b1e7dc4a0099ed7c5835233680",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["in", "kindcode", "130402", "130601", "130602", "130603", "130700", "130701", "130702", "130703", "130704", "130705"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 423,
            "datatype": "symbol",
            "prefix": "105005",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "C-批发、零售-02-16级-通用图标",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "2ef2bff427724250a955ad9666fda62e",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "120201"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 424,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "B-住、宿-小区-02-14级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "b1ee673b729e4925bfd9b9d7ad1e1126",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "120101", "120102", "120103", "120201"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 425,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "B-住、宿-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "b6c72f6b9a9f4cef86ff9b53006b4942",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "point-11"
        },
        "filter": ["all", ["==", "accessflag", 0], ["==", "kindcode", "120104"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 426,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "B-住、宿-16级-通用图标层",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "855304d11f7f44ce969aebb5970dc48e",
        "type": "symbol",
        "minzoom": 16
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "120201"], ["==", "generation", 2], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 427,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "B-住、宿-小区-01-16级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a754e5da08994ef7b1ed68828b16a257",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "none",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "110101", "110102", "110103", "110200", "110301", "110302", "110303", "110304"], ["==", "accessflag", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#132944",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 428,
            "datatype": "symbol",
            "prefix": "105001",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "A-餐饮-17级",
            "describe": "兴趣点",
            "source": "Poi",
            "groupname": "POI",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Poi",
        "id": "a49b927eb80c494a8ad147cd09db8e08",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "icon-size": 0.0,
            "icon-image": "poi_code_230100_16"
        },
        "filter": ["all", ["==", "stationtype", 0], ["==", "status", 0]],
        "maxzoom": 17.5,
        "paint": { "icon-color": "#e67a7f" },
        "layerInfo": {
            "zindex": 429,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "56f55655",
            "name": "公共交通站点_公交站_16",
            "describe": "公共交通站点",
            "source": "Ptstop",
            "groupname": "POI",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptstop",
        "id": "316b7f1952ab4f5e991666830327ce32",
        "type": "symbol",
        "minzoom": 16.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "icon-rotation-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_brief}",
            "text-rotation-alignment": "viewport",
            "text-size": 9,
            "symbol-placement": "line",
            "icon-image": "Provincial-15-{brief_cnt}"
        },
        "filter": ["all", ["==", "kind", 4], ["==", "const_st", 1]],
        "maxzoom": 11.0,
        "paint": { "icon-color": "#ff0000", "text-color": "#6c8dac", "icon-opacity": 0.95 },
        "layerInfo": {
            "zindex": 430,
            "datatype": "symbol",
            "prefix": "101004",
            "sourcemaxzoom": 17.5,
            "groupid": "d8a2f239",
            "name": "省简称",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路简称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "24e70b493d3b49fbad30412b5117d7bb",
        "type": "symbol",
        "minzoom": 6.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "icon-rotation-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_brief}",
            "text-rotation-alignment": "viewport",
            "text-size": 9.0,
            "symbol-placement": "line",
            "icon-image": "expressway-15-{brief_cnt}"
        },
        "filter": ["all", ["==", "kind", 1], ["==", "const_st", 1]],
        "maxzoom": 11.0,
        "paint": { "icon-color": "#ff0000", "text-color": "#ffffff", "icon-opacity": 0.95 },
        "layerInfo": {
            "zindex": 431,
            "datatype": "symbol",
            "prefix": "101001",
            "sourcemaxzoom": 17.5,
            "groupid": "d8a2f239",
            "name": "高速简称",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路简称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7a7e47b326a3456f9b3a40196bea786a",
        "type": "symbol",
        "minzoom": 6.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "icon-rotation-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_brief}",
            "text-rotation-alignment": "viewport",
            "text-size": 9,
            "symbol-placement": "line",
            "icon-image": "state-15-{brief_cnt}"
        },
        "filter": ["all", ["==", "kind", 3], ["==", "const_st", 1]],
        "maxzoom": 11.0,
        "paint": { "icon-color": "#ff0000", "text-color": "#749dbb", "icon-opacity": 0.95 },
        "layerInfo": {
            "zindex": 432,
            "datatype": "symbol",
            "prefix": "101003",
            "sourcemaxzoom": 17.5,
            "groupid": "d8a2f239",
            "name": "国道简称",
            "describe": "道路名",
            "source": "Road",
            "groupname": "道路简称",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "5d97de51116a439f9fe11004de1844ca",
        "type": "symbol",
        "minzoom": 6.0
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [-1, -1.3],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "钓鱼岛"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 433,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_钓鱼岛",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "d0c9e258310f4e73997ec77c849b6c6b",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, -1],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "东沙群岛"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 434,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_东沙群岛",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "a66568883c714df784f953c6c68f53f0",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [-1, -1],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "西沙群岛"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 435,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_西沙群岛",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "cc2c663db094436cbf3aacb180bd75ff",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [-1, -1],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "中沙群岛"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 436,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_中沙群岛",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "4e9fa0932f5e4f729399b76307935913",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -3],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "南沙群岛"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 437,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_南沙群岛",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "738dac66cf0248008ecbb8ab3b69ae96",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-max-width": 4.0,
            "text-field": "{name_zh}",
            "text-offset": [0, 2],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "黄岩岛（民主礁）"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 438,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_黄岩岛",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "5c9b0829847a47fd8bc60193ceb3a126",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -1],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "曾母暗沙"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 439,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_曾母暗沙",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "9c74c461023444f7b360ea2a43cd2191",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [2, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "赤尾屿"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 440,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_赤尾屿",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "49cca9ad3efa4063950e35fc1b170c0d",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [2, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "kindcode", "275006"], ["==", "name_zh", "黄尾屿"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4a90e2",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 441,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "敏感岛屿_黄尾屿",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "47cd58aabdb24b5bac4d7825e1432f64",
        "type": "symbol",
        "minzoom": 7.0
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 20.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "（台湾省详细资料暂缺）"]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 442,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "台湾资料_6",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "708133db7e3f42ed85ef9af712fc9888",
        "type": "symbol",
        "minzoom": 6.0
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 10.0
        },
        "filter": ["all", ["==", "kindcode", "275007"], ["==", "name_zh", "（台湾省详细资料暂缺）"]],
        "maxzoom": 6.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 443,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "台湾资料_5",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "b6a8f4be2c4747419ceb7a2a68797abb",
        "type": "symbol",
        "minzoom": 5.0
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-rotation-alignment": "viewport",
            "text-size": 12.0,
            "text-anchor": "right"
        },
        "filter": ["all", ["==", "kind", "260100"], ["==", "special", 0], ["!in", "name_zh", "北代岛", "万代岛", "青阳岛"]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#141518", "icon-color": "#ff0000", "text-color": "#506a83", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 444,
            "datatype": "symbol",
            "prefix": "103007",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "村",
            "describe": "乡镇点",
            "source": "Villtown",
            "groupname": "代表点",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Villtown",
        "id": "77051935eb38477bbfa01dc876769141",
        "type": "symbol",
        "minzoom": 13.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-rotation-alignment": "viewport",
            "text-size": 11.0,
            "text-anchor": "right",
            "symbol-placement": "point"
        },
        "filter": ["all", ["==", "kind", "260000"], ["in", "name_tag", 2, 0, 1], ["==", "special", 0]],
        "maxzoom": 17.5,
        "paint": { "text-halo-color": "#141518", "icon-color": "#ff0000", "text-color": "#749dbb", "text-halo-width": 1 },
        "layerInfo": {
            "zindex": 445,
            "datatype": "symbol",
            "prefix": "103006",
            "sourcemaxzoom": 17.5,
            "groupid": "1684d57a",
            "name": "乡镇点",
            "describe": "乡镇点",
            "source": "Villtown",
            "groupname": "代表点",
            "sourceminzoom": 9.0
        },
        "source": "Merge_1",
        "source-layer": "Villtown",
        "id": "7eb6312962f94c6ebf37b979e7d8869c",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, 1],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0
        },
        "filter": ["all", ["==", "type", 4], ["!in", "name_zh", "台湾", "元宝区", "东港市", "集安市", "临江市", "长白朝鲜族自治县", "图们市", "饶河县", "振兴区", "振安区", "呼玛县"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "text-translate-anchor": "map",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 446,
            "datatype": "symbol",
            "prefix": "103005",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "区/自治县_10",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "070ccbba48ab4c35b19c230bbab28820",
        "type": "symbol",
        "minzoom": 7.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, 1.7],
            "text-rotation-alignment": "viewport",
            "text-size": 12,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8,
            "icon-image": "circle-brown-11"
        },
        "filter": ["all", ["==", "capital", 3], ["==", "name_zh", "黑河"]],
        "maxzoom": 10,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 447,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "地级市_黑河",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "430373b48900436196f265533c5a143c",
        "type": "symbol",
        "minzoom": 9.0
    }, {
        "layout": {
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 12,
            "text-anchor": "right",
            "text-allow-overlap": false,
            "icon-text-fit": "none",
            "icon-size": 0.8,
            "icon-image": "circle-brown-11",
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "text-justify": "center",
            "text-offset": [-0.8, 0],
            "icon-offset": [-6, 0],
            "text-rotation-alignment": "viewport",
            "text-ignore-placement": false
        },
        "filter": ["all", ["==", "capital", 3], ["==", "name_zh", "丹东"]],
        "maxzoom": 10,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 448,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "地级市_丹东",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "5715413f4e364659934d0716c996de6d",
        "type": "symbol",
        "minzoom": 5.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -0.3],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8,
            "icon-image": "circle-brown-11"
        },
        "filter": ["all", ["==", "capital", 3], ["!in", "name_tag", 1, 3, 2], ["!in", "name_zh", "黑河", "丹东"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 449,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "地级市",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "02d5168361f54163bbe22c8fb7a2a38d",
        "type": "symbol",
        "minzoom": 5.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-max-width": 6.0,
            "text-field": "{name_zh}",
            "text-offset": [0, -0.3],
            "text-rotation-alignment": "viewport",
            "text-size": 12,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8
        },
        "filter": ["all", ["==", "capital", 3], ["in", "name_tag", 1, 3, 2], ["in", "name_zh", "延边朝鲜族自治州", "德宏傣族景颇族自治州", "西双版纳傣族自治州", "伊犁哈萨克自治州"]],
        "maxzoom": 10,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 450,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "盟自治州_特殊处理",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "f53e50288aa143d18b9f4980680b5447",
        "type": "symbol",
        "minzoom": 5
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-max-width": 6,
            "text-field": "{name_zh}",
            "text-offset": [1.3, 1],
            "text-rotation-alignment": "viewport",
            "text-size": 12,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8
        },
        "filter": ["all", ["==", "capital", 3], ["in", "name_tag", 1, 3, 2], ["==", "name_zh", "怒江傈僳族自治州"]],
        "maxzoom": 10,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 451,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "盟自治州_怒江傈僳族自治州",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "602d140a219c49009741f5c1fbb0076f",
        "type": "symbol",
        "minzoom": 5
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-max-width": 6,
            "text-field": "{name_zh}",
            "text-offset": [2, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 12,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8
        },
        "filter": ["all", ["==", "capital", 3], ["in", "name_tag", 1, 3, 2], ["in", "name_zh", "塔城地区"]],
        "maxzoom": 10,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 452,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "盟自治州_塔城地区",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "62f10f01866b43409e606a9b0ab253b5",
        "type": "symbol",
        "minzoom": 5
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -0.3],
            "text-rotation-alignment": "viewport",
            "text-size": 12.0,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8
        },
        "filter": ["all", ["==", "capital", 3], ["in", "name_tag", 1, 3, 2], ["!in", "name_zh", "延边朝鲜族自治州", "塔城地区", "德宏傣族景颇族自治州", "西双版纳傣族自治州", "怒江傈僳族自治州", "伊犁哈萨克自治州"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 453,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "盟自治州",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "377e93e15e8d4039ad021a4eac7e2d08",
        "type": "symbol",
        "minzoom": 5.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [-0.4, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 14,
            "text-anchor": "right",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8,
            "icon-image": "circle-red-11"
        },
        "filter": ["all", ["==", "name_zh", "澳門"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 454,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "澳门",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "7fb60327f024424aa8ed1b7184884043",
        "type": "symbol",
        "minzoom": 4
    }, {
        "layout": {
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": 14.0,
            "text-anchor": "left",
            "text-allow-overlap": false,
            "icon-size": 0.8,
            "icon-image": "circle-red-11",
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "text-justify": "left",
            "text-offset": [0.4, 0],
            "text-rotation-alignment": "viewport",
            "text-ignore-placement": false
        },
        "filter": ["all", ["==", "name_zh", "香港"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 455,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "香港",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "14e3942d0b9843e48f47e39b24bd4187",
        "type": "symbol",
        "minzoom": 4.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -0.3],
            "text-rotation-alignment": "viewport",
            "text-size": 14.0,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8,
            "icon-image": "circle-red-11"
        },
        "filter": ["all", ["in", "capital", 1, 2], ["!in", "name_zh", "香港", "澳門", "天津"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 456,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "省会/直辖市",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "3fcafb29527d4ce684b2d21390f63586",
        "type": "symbol",
        "minzoom": 4.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [-2.5, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 14.0,
            "text-anchor": "left",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8,
            "icon-image": "circle-red-11"
        },
        "filter": ["all", ["in", "capital", 1, 2], ["==", "name_zh", "天津"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 457,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "直辖市_天津",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "3eac16d018a440f6a425e28e1550c27e",
        "type": "symbol",
        "minzoom": 4.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -0.3],
            "text-rotation-alignment": "viewport",
            "text-size": 14.0,
            "text-anchor": "bottom",
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "icon-size": 0.8
        },
        "filter": ["all", ["==", "name_zh", "（台湾省详细资料暂缺）"]],
        "maxzoom": 10.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3c9cec",
            "text-halo-width": 0.5
        },
        "layerInfo": {
            "zindex": 458,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "台湾资料",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "a764bc0aee6f495da9f4a6287d6e290f",
        "type": "symbol",
        "minzoom": 6.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, -0.3],
            "text-rotation-alignment": "viewport",
            "text-size": 16.0,
            "text-anchor": "bottom",
            "icon-size": 1.0,
            "icon-image": "star-11"
        },
        "filter": ["all", ["in", "capital", 1]],
        "maxzoom": 4.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-halo-width": 10.0,
            "icon-halo-color": "#d0021b",
            "icon-color": "#ff0000",
            "text-color": "#599ef2",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 459,
            "datatype": "symbol",
            "prefix": "103004",
            "sourcemaxzoom": 11.5,
            "groupid": "1684d57a",
            "name": "首都",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "57645774729c427286b0ededa0ef7e37",
        "type": "symbol",
        "minzoom": 3
    }, {
        "layout": {
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-rotation-alignment": "viewport",
            "text-size": 20.0
        },
        "filter": ["all", ["==", "name_zh", "中华人民共和国"]],
        "maxzoom": 4.0,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#73affa",
            "text-halo-width": 2.0
        },
        "layerInfo": {
            "zindex": 460,
            "datatype": "symbol",
            "prefix": "103002",
            "sourcemaxzoom": 8.5,
            "groupid": "1684d57a",
            "name": "中国",
            "describe": "世界地图代表点",
            "source": "Worldannotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldannotation",
        "id": "07f1a3fe85514837ad8bfceb4e741452",
        "type": "symbol",
        "minzoom": 3
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-rotation-alignment": "viewport",
            "text-size": 14.0
        },
        "filter": ["all", ["==", "kind", "275008"], ["!=", "name_zh", "台湾海峡"]],
        "maxzoom": 8.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#267dc6",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 461,
            "datatype": "symbol",
            "prefix": "102",
            "sourcemaxzoom": 8.5,
            "groupid": "1684d57a",
            "name": "海域名",
            "describe": "世界地图代表点",
            "source": "Worldannotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldannotation",
        "id": "2af9933725ea4154a321d147a39f9ba9",
        "type": "symbol",
        "minzoom": 4.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [-1, 0],
            "text-rotation-alignment": "viewport",
            "text-size": 14.0
        },
        "filter": ["all", ["==", "kind", "275008"], ["==", "name_zh", "台湾海峡"]],
        "maxzoom": 8.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4588d6",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 462,
            "datatype": "symbol",
            "prefix": "102",
            "sourcemaxzoom": 8.5,
            "groupid": "1684d57a",
            "name": "海域名_台湾海峡",
            "describe": "世界地图代表点",
            "source": "Worldannotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldannotation",
        "id": "25a3aec25f5e405dba3f5c2e54e14a0d",
        "type": "symbol",
        "minzoom": 5.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-rotation-alignment": "viewport",
            "text-size": 24.0
        },
        "filter": ["all", ["==", "kind", "405002"]],
        "maxzoom": 8.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#3b75ba",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 463,
            "datatype": "symbol",
            "prefix": "103001",
            "sourcemaxzoom": 8.5,
            "groupid": "1684d57a",
            "name": "世界代表点_洲",
            "describe": "世界地图代表点",
            "source": "Worldannotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldannotation",
        "id": "38df542f459a4f5bb5a7ec76428eb282",
        "type": "symbol",
        "minzoom": 3
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "text-pitch-alignment": "viewport",
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-rotation-alignment": "viewport",
            "text-size": 20.0
        },
        "filter": ["all", ["==", "kind", "405003"]],
        "maxzoom": 8.5,
        "paint": {
            "text-halo-color": "#141518",
            "icon-color": "#ff0000",
            "text-color": "#4784b3",
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 464,
            "datatype": "symbol",
            "prefix": "102",
            "sourcemaxzoom": 8.5,
            "groupid": "1684d57a",
            "name": "世界代表点_大洋",
            "describe": "世界地图代表点",
            "source": "Worldannotation",
            "groupname": "代表点",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Worldannotation",
        "id": "ac3b1ebd55024fc8be1fdc5951b54987",
        "type": "symbol",
        "minzoom": 3.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-size": { "stops": [[10, 9], [18, 14]], "base": 1 },
            "symbol-placement": "line"
        },
        "filter": ["all", ["==", "status", 0]],
        "maxzoom": 17.5,
        "paint": {
            "text-halo-color": "#122b4e",
            "icon-color": "#ff0000",
            "text-color": { "property": "color", "type": "identity" },
            "text-halo-width": 1.0
        },
        "layerInfo": {
            "zindex": 465,
            "datatype": "symbol",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "地铁线路名称",
            "describe": "公共交通线路名称",
            "source": "Ptline",
            "groupname": "",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptline",
        "id": "318735de5b1d48feba51470f0a29bebf",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [0, 0.15],
            "text-size": 12,
            "icon-image": "n-point-name-15-{zh_cnt}"
        },
        "filter": ["all", ["==", "type", 4], ["!in", "name_zh", "香洲区（由澳门特别行政区实施管辖）", "台湾", "长白朝鲜族自治县", "集安市", "临江市", "振兴区", "元宝区", "振安区", "爱辉区", "抚远市"]],
        "maxzoom": 11.5,
        "paint": {
            "text-halo-color": "#7599e9",
            "text-translate-anchor": "map",
            "icon-color": "#0c5ab0",
            "text-color": "#ffffff",
            "text-halo-width": 0.0,
            "icon-opacity": 0.9
        },
        "layerInfo": {
            "zindex": 466,
            "datatype": "symbol",
            "prefix": "103005",
            "sourcemaxzoom": 11.5,
            "groupid": "",
            "name": "区/自治县_10+",
            "describe": "行政区划代表点",
            "source": "Adminflag",
            "groupname": "",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Adminflag",
        "id": "00e6c450b85a4cf8af733dda07182329",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["==", "kindcode", "230126"], ["==", "rank", 4], ["!=", "name_zh", "丹东浪头机场"]],
        "maxzoom": 11.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 467,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "018-机场",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "ccfc1441f39c489ead47de9664d2699f",
        "type": "symbol",
        "minzoom": 9.0
    }, {
        "layout": {
            "symbol-avoid-edges": true,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12.0,
            "text-anchor": "left",
            "icon-size": 0.0,
            "icon-image": "poi_code_{kindcode}_16"
        },
        "filter": ["all", ["in", "kindcode", "230103", ""], [">=", "rank", 3], ["!=", "name_zh", "临江站"]],
        "maxzoom": 16.0,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#5299ff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 468,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "001-A火车站+货运火车站",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "02cddc8732ac410290da408bcf04037c",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": {
            "symbol-avoid-edges": false,
            "visibility": "visible",
            "text-field": "{name_zh}",
            "text-offset": [1, 0],
            "text-size": 12,
            "text-anchor": "left",
            "icon-image": "Tiananmen"
        },
        "filter": ["all", ["==", "kindcode", "185116"], ["==", "name_zh", "天安门"]],
        "maxzoom": 16,
        "paint": {
            "text-halo-color": "#1e2222",
            "icon-color": "#ff0000",
            "text-color": "#ffffff",
            "text-halo-width": 1.5
        },
        "layerInfo": {
            "zindex": 469,
            "datatype": "symbol",
            "prefix": "105008",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "002-天安门",
            "describe": "文字",
            "source": "Annotation",
            "groupname": "",
            "sourceminzoom": 3.0
        },
        "source": "Merge_1",
        "source-layer": "Annotation",
        "id": "8e5a3178dd5d4bc0961fc3baa39c9a44",
        "type": "symbol",
        "minzoom": 10.0
    }, {
        "layout": { "visibility": "none", "text-field": "{code}", "text-size": 12.0, "icon-image": "Provincial-15-3" },
        "maxzoom": 17.5,
        "paint": { "icon-color": "#ff0000", "text-color": "#ffffff", "text-translate": [0, 1.6] },
        "layerInfo": {
            "zindex": 470,
            "datatype": "symbol",
            "prefix": "101010",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "地铁出入口",
            "describe": "公共交通出入口",
            "source": "Ptexit",
            "groupname": "",
            "sourceminzoom": 10.0
        },
        "source": "Merge_1",
        "source-layer": "Ptexit",
        "id": "d0dd8ca7d1924debb2198c6b0f35c359",
        "type": "symbol",
        "minzoom": 17.0
    }, {
        "layout": { "visibility": "visible", "icon-size": 0.0, "icon-image": "traffic-light-15" },
        "maxzoom": 17.5,
        "paint": { "icon-color": "#ff0000" },
        "layerInfo": {
            "zindex": 471,
            "datatype": "symbol",
            "prefix": "105007",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "红绿灯",
            "describe": "红绿灯",
            "source": "Trafficlight",
            "groupname": "",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Trafficlight",
        "id": "272745130be44a1393b4eac9f6a9039f",
        "type": "symbol",
        "minzoom": 15.5
    }, {
        "layout": { "visibility": "none", "line-join": "round", "line-cap": "round" },
        "filter": ["all", ["==", "kind", 1], ["arrin", "form", "14"]],
        "maxzoom": 17.5,
        "paint": {
            "line-width": { "stops": [[5, 0.7], [6, 0.8], [7, 1.6], [9, 1.6], [20, 10]], "base": 1 },
            "line-color": { "stops": [[5, "#ffb35b"], [8, "#ffb35b"], [20, "#ffb35b"]], "base": 1 }
        },
        "layerInfo": {
            "zindex": 473,
            "datatype": "line",
            "prefix": "",
            "sourcemaxzoom": 17.5,
            "groupid": "",
            "name": "道路",
            "describe": "道路",
            "source": "Road",
            "groupname": "",
            "sourceminzoom": 5.0
        },
        "source": "Merge_1",
        "source-layer": "Road",
        "id": "7fd63c9150244aacb14f49a3df322285",
        "type": "line",
        "minzoom": 5
    }],
    "glyphs": "minemap://fonts/{fontstack}/{range}",
    "version": 8
};
export default style;
