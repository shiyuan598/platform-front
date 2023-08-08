import React, {useState, useEffect} from "react";
import dayjs from "dayjs";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RouteList from "./routes";
import { Context } from "../../context";
import { vehicleApi } from "../../api";
import "./main.scss";

export default function App() {
    const [updateTime, setUpdateTime] = useState<string>(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const [vehicleList, setVehicleList] = useState<any>([]);
    useEffect(() => {
        vehicleApi.getVehicle().then((res) => {
            setVehicleList(res?.data?.vehicleInfoDTOList);
        });
    }, []);
    
    return (
        <Context.Provider value={{updateTime, setUpdateTime, vehicleList}}>
            <div className="container">
                <Header></Header>
                <main>
                    <Sidebar></Sidebar>
                    <div className="content">
                        <RouteList></RouteList>
                    </div>
                </main>
            </div>
        </Context.Provider>
    );
}
