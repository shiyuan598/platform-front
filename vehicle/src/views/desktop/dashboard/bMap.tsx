import React, { Fragment, useEffect, useState } from "react";
import mapStyle from "./dashboard.module.scss"

export default function App() {
    const [maskVisible, setMaskVisible] = useState(true);

    useEffect(() => {
        const map = new BMapGL.Map('map');
        map.centerAndZoom(new BMapGL.Point(120.647445, 31.416957), 12);
        map.enableScrollWheelZoom(true);
        map.setMapStyleV2({ styleId: "0e16a97c212f5c41ac6146df1d5ea179" });
        map.addControl(new BMapGL.ZoomControl());
        // 隐藏室内图
        map.setDisplayOptions({
            indoor: false
        });
        map.addEventListener("tileloaded", () => {
            if (maskVisible) {
                setMaskVisible(false);
            }
        })
    }, []);
    return (
        <Fragment>
            <div className={mapStyle["bmap-container"]} id="map">
            </div>
            <div className={maskVisible ? mapStyle["map-mask"] : mapStyle["map-mask-hide"]}>{
                maskVisible
            }</div>
        </Fragment>
    );
}
