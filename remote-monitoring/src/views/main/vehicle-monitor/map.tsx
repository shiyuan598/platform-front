import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { monitorApi } from "../../../api";

interface MapType {
    getCenter: Function;
    addSource: Function;
    getSource: Function;
    addLayer: Function;
    getLayer: Function;
    setLayoutProperty: Function;
}

function Map(props: { tab: string; }) {
    const { tab } = props;
    const history = useHistory();
    const [map, setMap] = useState<MapType>();
    const [mapLoad, setMapLoad] = useState(false);
    useEffect(() => {
        /**
         * 全局参数设置
         */
        minemap.domainUrl = "https://minemap.minedata.cn";
        minemap.dataDomainUrl = "https://minemap.minedata.cn";
        minemap.serverDomainUrl = "https://sd-data.minedata.cn";
        minemap.spriteUrl = "https://minemap.minedata.cn/minemapapi/v2.1.1/sprite/sprite";
        minemap.serviceUrl = "https://service.minedata.cn/service";
        minemap.key = "ca78282dfff148e3be5390ce027068f5";
        minemap.solution = 11001;

        const map = new minemap.Map({
            container: "map",
            style: "https://service.minedata.cn/map/solu/style/11001",
            center: [120.647445, 31.416957],
            zoom: 12,
            pitch: 0,
            maxZoom: 17,
            minZoom: 3,
            projection: "MERCATOR",
            logoControl: false
        });
        map.addControl(new minemap.Navigation(), "bottom-right");
        map.addControl(new minemap.Fullscreen(), "top-right");
        map.addControl(new minemap.Scale(), "bottom-left");

        map.on("load", () => {
            setMapLoad(true);
        });

        map.on("click", (e: any) => {
            console.info([e.lngLat.lng, e.lngLat.lat]);
        });
        setMap(map as MapType);
    }, []);

    const [popups, setPopups] = useState([]);
    const [makers, setMakers] = useState([]);

    useEffect(() => {
        if (map && mapLoad) {
            // 删除所有markers和popups
            makers.forEach((item: any) => item.remove());
            popups.forEach((item: any) => item.remove());

            // 隐藏实时轨迹图层
            if (map.getLayer("realtimeLayer")) {
                map.setLayoutProperty("realtimeLayer", "visibility", "none");
            }

            if (tab === "realtime-position") {
                monitorApi.getVehiclePosition().then(res => {
                    const vehicleList = res?.data?.positionDTOList;
                    let _popups: any = [];
                    let _markers: any = [];
                    vehicleList.forEach((item: any) => {
                        let popup = new minemap.Popup({ closeOnClick: false, closeButton: false, offset: [0, -17] })
                            .setLngLat([item.longitude, item.latitude])
                            .setHTML(`<h4>${item.number}</h4>`)
                            .addTo(map);
                        _popups.push(popup);

                        var el = document.createElement("div");
                        // 自定义DOM样式 或者通过css类设置
                        el.style["background" as any] = "url(../images/truck.png) center / 24px no-repeat";
                        el.style["background-color" as any] = item.state === 0 ? "#6d6d6d" : "#3370ff";
                        el.style.width = "34px";
                        el.style.height = "34px";
                        el.style["border-radius" as any] = "50%";
                        let marker = new minemap.Marker(el, {
                            offset: [-17, -17],
                            pitchAlignment: "map",
                            rotationAlignment: "map"
                        })
                            .setLngLat([item.longitude, item.latitude])
                            .addTo(map);
                        el.addEventListener("click", () => {
                            // 跳转到车辆行驶数据
                            history.push("/main/driving-data", { ...item });
                        });
                        _markers.push(marker);
                    });
                    setPopups(_popups);
                    setMakers(_markers);
                });
            }
            if (tab === "realtime-trajectory") {
                if (!map.getSource("realtimeSource")) {
                    map.addSource("realtimeSource", {
                        type: "geojson",
                        data: { type: "FeatureCollection", features: [] }
                    });
                    map.addLayer({
                        id: "realtimeLayer",
                        type: "line",
                        source: "realtimeSource",
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                            "border-visibility": "none" //是否开启线边框
                        },
                        paint: {
                            "line-width": 8,
                            "line-color": {
                                type: "categorical",
                                property: "kind",
                                stops: [
                                    [1, "#FF2525"],
                                    [2, "#00C614"]
                                ],
                                default: "#ff0000"
                            },
                            "line-border-width": 2, //设置线边框宽度
                            "line-border-opacity": 1, //设置线边框透明度
                            "line-border-color": {
                                stops: [
                                    [1, "#920000 "],
                                    [2, "#00830C"]
                                ]
                            } //设置线边框颜色
                        },
                        minzoom: 7,
                        maxzoom: 17.5
                    });
                } else {
                    map.setLayoutProperty("realtimeLayer", "visibility", "visible");
                }

                setTimeout(() => {
                    monitorApi.getPathRealtime().then(() => {});
                    const center = map.getCenter();
                    const jsonData = {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "LineString",
                                    coordinates: [
                                        [center.lng - 0.005, center.lat + 0.005],
                                        [center.lng + 0.005, center.lat + 0.005]
                                    ]
                                }
                            }
                        ]
                    };
                    map.getSource("realtimeSource").setData(jsonData);
                }, 100);
            }
            if (tab === "history-trajectory") {
                monitorApi.getPathHistory().then(() => {});
            }
        }
    }, [map, mapLoad, tab]);
    return <div id="map"></div>;
}

export default React.memo(Map);
