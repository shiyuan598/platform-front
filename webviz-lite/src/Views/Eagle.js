/* eslint-disable */
import React, { useRef, useEffect, useContext } from "react";
import MapStyle from './EagleMapStyle';
import { RouteContext } from '../context/RouteContext';
import "../style/eagle.scss";

function addMarker(map, lnglat, imageName) {
    if (map) {
        var el = document.createElement('div');
        el.id = 'marker';
        el.style["background-image"] = `url(${imageName})`;
        el.style["background-size"] = "cover";
        el.style.width = "32px";
        el.style.height = "32px";
        return new minemap.Marker(el, { offset: [-16, -30] }).setLngLat(lnglat).addTo(map);
    }
}

function addVehicle(map, lanlat) {
    if (map) {
        var el = document.createElement('div');
        el.className = "map-animation-marker";
        var el1 = document.createElement('p');
        el.appendChild(el1);
        var el2 = document.createElement('div');
        el.appendChild(el2);

        return new minemap.Marker(el)
            .setLngLat(lanlat)
            .addTo(map);
    }
}

var jsonData = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": [[120.642573, 31.420291], [120.643687, 31.426207], [120.651349, 31.42469], [120.651349, 31.42469], [120.65717, 31.420068], [120.672945, 31.413226], [120.678622, 31.40922], [120.672801, 31.410329], [120.685449, 31.408172], [120.684695, 31.406878]]
    },
    "properties": {
        "title": "路线一",
    },
};

export default function Eagle() {
    const { route } = useContext(RouteContext);
    let map = useRef(null);
    let startMarker = useRef(null);
    let endMarker = useRef(null);
    let vehicleMarker = useRef(null);

    useEffect(() => {
        /**
         * 全局参数设置
         */
        minemap.domainUrl = "//minedata.cn";
        minemap.dataDomainUrl = "//minedata.cn";
        minemap.serverDomainUrl = "//minedata.cn";
        minemap.spriteUrl = "//minedata.cn/minemapapi/v2.1.0/sprite/sprite";
        minemap.serviceUrl = "//minedata.cn/service/";

        minemap.key = "16be596e00c44c86bb1569cb53424dc9";
        minemap.solution = 12624;

        const mapInstance = new minemap.Map({
            container: "map",
            style: MapStyle,
            center: [120.643687, 31.426207],
            zoom: 15.5,
            pitch: 0,
            maxZoom: 17,
            minZoom: 3,
            projection: "MERCATOR"
        });
        map.current = mapInstance;

        mapInstance.on("load", () => {
            // 添加路线图层
            mapInstance.addSource("lineSource", {
                "type": "geojson",
                "data": jsonData
            });

            mapInstance.addLayer({
                "id": "lineLayer",
                "type": "line",//图层类型为"line"
                "source": "lineSource",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-width": 3,
                    "line-color": "#4169E1",
                    "line-border-color": "#1E90FF",
                    "line-border-width": 1
                },
                "minzoom": 1,
                "maxzoom": 17.5
            });

            // 添加路线端点/车辆位置marker
            startMarker.current = addMarker(mapInstance, [120.642573, 31.420291], "/images/start.png");
            endMarker.current = addMarker(mapInstance, [120.684695, 31.406878], "/images/end.png");
            vehicleMarker.current = addVehicle(mapInstance, [120.643687, 31.426207]);
        });
    }, []);

    useEffect(() => {
        if (map.current && route) {
            let { lineData } = route;
            const source = map.current.getSource("lineSource");
            if (source) {
                source.setData(lineData);
            }
            if (startMarker.current && endMarker.current) {
                startMarker.current.setLngLat(lineData.geometry.coordinates[0]);
                endMarker.current.setLngLat(lineData.geometry.coordinates[lineData.geometry.coordinates.length - 1]);
            }
        }
    }, [route]);

    useEffect(() => {
        function getRandomLngLat(lnglat) {
            const minX = 120.48;
            const maxX = 121;
            const minY = 31.2;
            const maxY = 31.5;
            let {lng, lat} = lnglat;
            let gap = 0.001 * Math.random() * (Math.random() > 0.5 ? -1 : 1);
            lng += gap;
            if (lng > maxX || lng < minX) {
                lng -= gap * 2;
            }
            lat += gap;
            if (lat > maxY || lat < minY) {
                lat -= gap * 2;
            }
            return [lng, lat];
        }
        let timer = null;
        timer = setInterval(() => {
            if (map.current && vehicleMarker.current) {
                const lnglat = getRandomLngLat(vehicleMarker.current.getLngLat());
                vehicleMarker.current.setLngLat(lnglat);
                map.current.setCenter(lnglat);
            }
        }, 2000);

        return () => {
            clearInterval(timer);
        }
    }, [map, vehicleMarker]);

    return (
        <div className="map-container" id="map">
        </div>
    );
}
