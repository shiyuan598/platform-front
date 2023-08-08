import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./sidebar.scss";

const menus = [
    {
        id: "0-1",
        key: "/main/vehicle-monitor",
        label: "车辆监控",
        subMenu: [
            {
                id: "0-1-1",
                label: "在线状态"
            },
            {
                id: "0-1-2",
                label: "实时位置"
            },
            {
                id: "0-1-3",
                label: "历史轨迹"
            },
            {
                id: "0-1-4",
                label: "实时轨迹"
            }
        ]
    },
    {
        id: "0-2",
        key: "/main/driving-data",
        label: "行驶数据",
        subMenu: [
            {
                id: "0-2-1",
                label: "当前车速"
            },
            {
                id: "0-2-2",
                label: "当前控制模式"
            },
            {
                id: "0-2-3",
                label: "总行驶里程统计"
            },
            {
                id: "0-2-4",
                label: "本次上电周期里程统计"
            },
            {
                id: "0-2-5",
                label: "油耗统计"
            }
        ]
    },
    {
        id: "0-3",
        key: "/main/exception-info",
        label: "异常信息查阅",
        subMenu: [
            {
                id: "0-3-1",
                label: "故障码统计"
            },
            {
                id: "0-3-2",
                label: "异常退出统计"
            },
            {
                id: "0-3-3",
                label: "接管统计"
            },
            {
                id: "0-3-4",
                label: "功能降级统计"
            },
            {
                id: "0-3-5",
                label: "报表管理"
            }
        ]
    },
    {
        id: "0-4",
        key: "/main/vehicle-manager",
        label: "车辆录入和管理",
        subMenu: [
            {
                id: "0-4-1",
                label: "车辆录入"
            },
            {
                id: "0-4-2",
                label: "车辆管理"
            }
        ]
    }
];

export default function App() {
    const location = useLocation();
    const history = useHistory();
    const handleMenuClick = (key: string) => {
        history.push(key); // 跳转到对应的路由
    };

    const [selected, setSelected] = useState("");
    useEffect(() => {
        let pathName = location.pathname === "/" ? "/home" : location.pathname;
        setSelected(pathName);
    }, [location]);

    return (
        <div className="sidebar">
            {menus.map(menu => (
                <div key={menu.id}>
                    <div className={`menu ${selected === menu.key ? 'active' : ''}`} onClick={()=>{handleMenuClick(menu.key)}}>{menu.label}</div>
                    <ul>
                        {menu.subMenu.map(subMenu => (
                            <li className="submenu" key={subMenu.id}>
                                <span>{subMenu.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
