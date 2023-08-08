import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Router>
        <div className="app">
            <ConfigProvider
                locale={zhCN}
                theme={{
                    token: {
                        colorPrimary: "#1f63ff"
                    }
                }}>
                <App />
            </ConfigProvider>
        </div>
    </Router>
);
