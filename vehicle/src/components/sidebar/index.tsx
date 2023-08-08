import {
    HomeOutlined,
    TableOutlined,
    CalendarOutlined,
    ScheduleOutlined,
    LineChartOutlined,
    CarOutlined,
    TeamOutlined,
    FileProtectOutlined,
    DeploymentUnitOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./sidebar.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("首页", "/desktop/home", <HomeOutlined />),
    getItem("车辆管理", "/desktop/vehicle", <TableOutlined />),
    getItem("车辆使用", "/desktop/usetime", <CalendarOutlined />),
    getItem("订单管理", "/desktop/order", <ScheduleOutlined />),
    getItem("统计分析", "/desktop/statis", <LineChartOutlined />),
    getItem("车辆信息", "/desktop/monitor", <CarOutlined />),
    getItem("版本管理", "/desktop/version", <FileProtectOutlined />),
    getItem("用户管理", "/desktop/user", <TeamOutlined />),
    getItem("远程部署", "", <DeploymentUnitOutlined />, [
        getItem("远程升级", "/desktop/deploy/upgrade"),
        getItem("升级任务", "/desktop/deploy/group")
    ])
];

const App: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const onClick: MenuProps["onClick"] = (e) => {
        history.push(e.key); // 跳转到对应的路由
    };

    const [selected, setSelected] = useState("");
    useEffect(() => {
        let pathName = location.pathname === "/" ? "/home" : location.pathname; // 输入/ 匹配/home
        if (location.pathname === "/desktop/deploy/task") { // 升级任务路由的高亮
            pathName = "/desktop/deploy/group";
        }
        setSelected(pathName);
    }, [location]);

    return (
        <Menu
            defaultSelectedKeys={[selected]}
            selectedKeys={[selected]}
            onClick={onClick}
            style={{ width: 256 }}
            mode="inline"
            items={items}
            inlineCollapsed={false}
        />
    );
};

export default App;
