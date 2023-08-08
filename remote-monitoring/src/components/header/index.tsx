import React, {useContext} from "react";
import { Popover } from "antd";
import { QuestionCircleFilled, UserOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom";
import style from "./header.module.scss";
import { Context } from "../../context";

export default function HeaderComp() {
    const { updateTime } = useContext(Context) as {
        updateTime: string;
    };
    
    // const history = useHistory();
    // const logout = () => {
    //     setUserInfo({});
    //     localStorage.setItem("userInfo", "{}");
    //     sessionStorage.setItem("mapReload", "");
    //     history.push("/login");
    // };

    return (
        <div className={style.header}>
            <div className={`${style.item} ${style.time}`}>
                实时数据 {updateTime}
                <Popover content={<div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>} trigger="hover">
                    <span className={style.icon}>
                        <QuestionCircleFilled />
                    </span>
                </Popover>
            </div>
            <div className={`${style.item} ${style.account}`}>
                <span className={style.icon}>
                    <UserOutlined />
                </span>
                Admin
            </div>
            <div className={`${style.item}`}>个人中心</div>
            <div className={`${style.item}`}>切换用户</div>
        </div>
    );
}
