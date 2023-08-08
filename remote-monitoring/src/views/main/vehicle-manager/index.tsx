import React, { useRef, useState, useEffect, Fragment } from "react";
import VehicleCollect from "./vehicleCollect";
import VehicleSearch from "./vehicleSearch";
import VehicleList from "./vehicleList";
import {Context} from './context'

const tabs = [
    {
        id: "vehicleCollect",
        label: "车辆录入"
    },
    {
        id: "vehicleSearch",
        label: "车辆查询"
    }
];

export default function App() {
    const [tab, setTab] = useState("vehicleSearch");
    const [vehicleCount, setVehicleCount] = useState(0);
    const [queryParam, setQueryParam] = useState({});

    useEffect(() => {
      // 切换tab时清空查询参数
      setQueryParam({});
    }, [tab]);
    
    return (
        <Context.Provider value={{vehicleCount, setVehicleCount, queryParam, setQueryParam}}>
            <ul className="tabs clearfix">
                {tabs.map(item => (
                    <li
                        className={`tab top ${tab === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => {
                            setTab(item.id);
                        }}>
                        {item.label}
                    </li>
                ))}
            </ul>
            {tab === "vehicleCollect" ? <VehicleCollect /> : <VehicleSearch />}
            <ul className="tabs clearfix">
                <li className="tab active">车辆管理</li>
            </ul>
            <VehicleList />
        </Context.Provider>
    );
}
