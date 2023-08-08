import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { WebSocketService } from './components/WebSocketService';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const globalConfig = window.globalConfig;
const socketUrl = globalConfig.socketIo;
root.render(
    <Router>
        <div className="h-screen w-screen">
        <WebSocketService socketUrl={socketUrl}> 
            <App></App>
        </WebSocketService>
        </div>
    </Router>
);
