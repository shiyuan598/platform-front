import React, { useState, useEffect } from "react";
import { formatBytes } from "../../utils/tools";
import { Progress, Tooltip } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useWebSocket } from "../../components/WebSocketService";

export default function App() {
    const history = useHistory();
    const [diskList, setDiskList] = useState<any>([]);
    const { socket, message } = useWebSocket();
    const ip2address = (key: any) => {
        let address = "未知地点";
        switch (key) {
            case "127.0.0.1":
                address = "江枫渔火";
                break;
            case "127.0.0.2":
                address = "鹭点烟汀";
                break;
            case "127.0.0.3":
                address = "林外瑶山";
                break;
            default:
                break;
        }
        return address;
    };

    useEffect(() => {
        if (!message) {
            return;
        }
        const data = JSON.parse(message).data;
        let arr = Object.keys(data).map((key) => {
            let { ip, total_size, progress } = data[key];

            return {
                id: key,
                name: key,
                progress: progress,
                total: total_size,
                location: ip2address(ip)
            };
        });
        setDiskList(arr);
    }, [message]);

    const toLogPage = () => {
        history.push("/log");
    };

    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 text-xs sm:text-xs md:grid-cols-5 md:text-small lg:grid-cols-8 lg:text-base sm:gap-2 md:gap-4 lg:gap-6 gap-4 p-4 pt-6">
            <span className="fixed right-2 top-2 z-10 font-bold text-xs md:text-sm lg:text-base cursor-pointer hover:scale-110" onClick={toLogPage}>
                <FileTextOutlined className="align-[2px]" /> 查看日志
            </span>
            {diskList.map((item: any) => (
                <div
                    key={item.name}
                    className="relative text-center text-gray-300 lg:text-[#bcbcbc] bg-[#141414] hover:cursor-pointer hover:shadow hover:shadow-blue-950">
                    <div className="absolute left-0 bg-emerald-700 px-1">{item.location}</div>
                    <div className="mt-6">
                        <Progress className="custom-progress" type="circle" size={"small"} percent={item.progress} />
                    </div>
                    <span className="block mt-2 flex-nowrap whitespace-nowrap">
                        {formatBytes((item.total * item.progress) / 100)} / {formatBytes(item.total)}
                    </span>
                    <span className="block font-bold text-base sm:text-base md:text-lg lg:text-xl mb-2">
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    );
}
