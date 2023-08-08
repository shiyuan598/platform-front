import React, { useState, useEffect } from "react";
import { vehicle as vehicleApi } from "../../../api";
import { message } from 'antd';

function Map() {
  const [map, setMap] = useState(null);
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
      style: "https://service.minedata.cn/map/solu/style/11002",
      center: [120.647445, 31.416957],
      zoom: 12,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
      projection: "MERCATOR",
      logoControl: false
    });
    map.addControl(new minemap.Navigation(), 'bottom-right');
    map.addControl(new minemap.Fullscreen(), 'top-right');
    // map.addControl(new minemap.Scale(), 'top-left');

    map.on("click", (e: any) => {
      console.info([e.lngLat.lng, e.lngLat.lat]);
    });
    setMap(map);
  }, []);

  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    let timer: any = null;
    const getVehicles = () => {
      let atHomePage = window.location.href.includes("/desktop/home");
      if (!atHomePage){
        timer = setTimeout(getVehicles, 3000);
        return;
      }
      vehicleApi.getVehiclesPosition().then(v => {
        if (v.code === 0) {
          setVehicles(v.data);
          timer = setTimeout(getVehicles, 3000);
        } else {
          message.error("出错了");
        }
      });
    };

    getVehicles();

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const [popups, setPopups] = useState([]);
  const [makers, setMakers] = useState([]);
  useEffect(() => {
    if (map) {
      // 删除所有markers和popups
      makers.forEach((item: any) => item.remove());
      popups.forEach((item: any) => item.remove());

      let _popups: any = [];
      let _markers: any = [];
      vehicles.forEach((item: any) => {

        let popup = new minemap.Popup({ closeOnClick: true, closeButton: false, offset: [0, -20] })
          .setLngLat([item.lon, item.lat])
          .setHTML(`
          <h4>${item.vehicleNo}</h4>
        `).addTo(map);
        _popups.push(popup);

        let marker = new minemap.Marker({
          color: '#f30',
          rotation: 0,
          pitchAlignment: 'map',
          rotationAlignment: 'map',
          scale: 0.6
        }).setLngLat([item.lon, item.lat])
          .addTo(map);
        _markers.push(marker);
      });
      setPopups(_popups);
      setMakers(_markers);
    }
  }, [map, vehicles]);
  return (
    <div style={{ height: "100%" }} id="map">
    </div>
  );
}

export default React.memo(Map);