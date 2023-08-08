import React, { useRef, useState, useEffect, useContext } from "react";
import { RouteContext } from '../context/RouteContext';
import "../style/eagle.scss";
import {coordinateTransform} from "../utils/Coordinate";
import useRosMsgs from "../hooks/useRosMsgs";

function addMarker(map, lnglat, icon) {
    if (map) {
        var point = new BMapGL.Point(...lnglat);
        var marker = new BMapGL.Marker(point, {
            icon: icon
        }); // 创建标注   
        map.addOverlay(marker);
        return marker; // 将标注添加到地图中
    }
    return null;
}

export default function Eagle() {
    const { route } = useContext(RouteContext);
    let map = useRef(null);
    let startMarker = useRef(null);
    let endMarker = useRef(null);
    let vehicleMarker = useRef(null);
    let routeLine = useRef(null);
    const [location, setLocation] = useState([120.736, 31.476]);
    const msgs = useRosMsgs();

    // 获取车辆位置
    useEffect(() => {
        if (msgs?.pose?.pose?.origin_llh) {
            let { lon, lat } = msgs?.pose?.pose?.origin_llh;
            let lonLat = [lon * 180 / Math.PI, lat * 180 / Math.PI];
            let bd09 = coordinateTransform.gcj02_to_bd09(...lonLat);
            setLocation([bd09.lng, bd09.lat]);
        }
    }, [msgs]);

    // 初始化地图
    useEffect(() => {
        const mapInstance = new BMapGL.Map('map');
        mapInstance.centerAndZoom(new BMapGL.Point(120.643687, 31.426207), 16);
        mapInstance.enableScrollWheelZoom(true);
        mapInstance.setMapStyleV2({ styleId: "0e16a97c212f5c41ac6146df1d5ea179" });

        // 隐藏室内图
        mapInstance.setDisplayOptions({
            indoor: false
        });
        map.current = mapInstance;
        // 添加路线端点
        startMarker.current = addMarker(mapInstance, [120.642573, 31.420291], new BMapGL.Icon("/images/start.png", new BMapGL.Size(20, 20)));
        endMarker.current = addMarker(mapInstance, [120.684695, 31.406878], new BMapGL.Icon("/images/end.png", new BMapGL.Size(20, 20)));
        // 车辆位置marker
        // vehicleMarker.current = addMarker(mapInstance, [120.643687, 31.426207], new BMapGL.Icon("/images/car.png", new BMapGL.Size(32, 32)));
        const vehiclePoint = new BMapGL.Circle(new BMapGL.Point(...location), 3, {
            strokeColor: "#ff0000", fillColor: "#ff0000", fillOpacity: 1
        });
        mapInstance.addOverlay(vehiclePoint);
        vehicleMarker.current = vehiclePoint;

    }, []);

    // 显示路线
    useEffect(() => {
        if (map.current && route) {
            let coordinates = route.lineData.geometry.coordinates
            let points = coordinates.map(v => new BMapGL.Point(...v));
            if (routeLine.current) {
                map.current.removeOverlay(routeLine.current);
            }

            var polyline = new BMapGL.Polyline(points, { strokeColor: "#00FF66", strokeWeight: 2, strokeOpacity: 0.5 });
            map.current.addOverlay(polyline);
            routeLine.current = polyline;

            if (startMarker.current && endMarker.current) {
                startMarker.current.setPosition(new BMapGL.Point(...coordinates[0]));
                endMarker.current.setPosition(new BMapGL.Point(...coordinates[coordinates.length - 1]));
            }
        }
    }, [route]);

    // 显示车辆位置
    useEffect(() => {
        if (map.current && vehicleMarker.current) {
            const point = new BMapGL.Point(...location);
            // vehicleMarker.current.setPosition(point);
            vehicleMarker.current.setCenter(point);
            map.current.setCenter(point);
        }
    }, [map, vehicleMarker, location]);

    return (
        <div className="map-container" id="map">
        </div>
    );
}
