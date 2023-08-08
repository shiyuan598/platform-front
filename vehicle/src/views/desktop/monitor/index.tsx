import React, { useState, useEffect } from "react";
import { Tag, Select, Button, Image } from "antd";
import style from "./monitor.module.scss";
import autoDriveImg from "./auto-drive.png";
import videoImg from "./02.png";
import SpeedComp from "./speed";
import MileComp from "./mileage";
import VideoComp from "./video";
import JsonViewer from "./jsonViewer";

export default function App() {
    const [vehicleList, setVehicleList] = useState<string[]>([]);
    const [vehicle, setVehicle] = useState<number>();
    const [packageJson, setPackageJson] = useState<object | null>(null);
    const [speed, setSpeed] = useState<number>(0);

    const [mileage, setMileage] = useState([
        { value: 1048, name: "Total" },
        { value: 735, name: "Auto" }
    ]);

    const [videoCount, setVideoCount] = useState(4);

    // 注意浏览器不支持播放6路以上的flv,需要使用nginx代理一下，分成几部分
    // nginx配置：
    // location / {
    //     proxy_pass http://123.60.179.96:1936;
    //     #add_header Access-Control-Allow-Origin *;
    // }
	
    // const url = "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv";
    // const url = "http://123.60.179.96:1936/live/LFN98LDA5L5S10047.flv";
    const url = "http://172.16.12.84:8098/live/LFN98LDA5L5S10047.flv";
    const urls = [
        "http://123.60.179.96:1936/live/LFN98LDA5L5S10047.flv",
        "http://123.60.179.96:1936/live/LFN98LDA5L5S10047.flv",

        "http://172.16.12.84:8098/live/LFN98LDA5L5S10047.flv",
        "http://172.16.12.84:8098/live/LFN98LDA5L5S10047.flv",

        "http://172.16.12.84:8098/live/LFN98LDA5L5S10047.flv",
        "http://172.16.12.84:8098/live/LFN98LDA5L5S10047.flv",

        "http://123.60.179.96:1936/live/LFN98LDA5L5S10047.flv",
        "http://123.60.179.96:1936/live/LFN98LDA5L5S10047.flv" 
    ];


    const projectChange = (value: number) => {
        setVehicle(value);
    };

    const clickHandler = () => {
        if (speed > 110) {
            setSpeed(10);
        } else {
            setSpeed(speed + 10);
        }
        setMileage([
            { value: mileage[0].value, name: "Total" },
            { value: mileage[1].value + 30, name: "Auto" }
        ]);
        setVideoCount(videoCount === 8 ? 1 : videoCount + 1);
    };

    return (
        <div className={style.container}>
            <h4>车辆信息</h4>
            <div className={style.tools}>
                <span className={style.label}>车辆编号:</span>
                <Select
                    style={{ width: "200px", marginRight: "20px" }}
                    value={vehicle}
                    placeholder="请选择车辆编号"
                    onChange={projectChange}
                    options={vehicleList.map((item: any) => {
                        return { value: item.id, label: item.name };
                    })}></Select>
                <Tag>所属项目：L4</Tag>
                <Tag>J7A01</Tag>
                <Tag color="blue">在线</Tag>
                <Button onClick={clickHandler}>测试数据</Button>
            </div>
            <div className={style.main}>
                <div className={style.content}>
                    <div className={style["card-container"]}>
                        <div className={style["card"]}>
                            <SpeedComp speed={speed}></SpeedComp>
                        </div>
                        <div className={style["card"]}>
                            <MileComp data={mileage}></MileComp>
                        </div>
                        <div style={{ overflow: "hidden" }} className={style["card"]}>
                            <Image
                                style={{ marginTop: "10px", width: "60%" }}
                                preview={false}
                                src={autoDriveImg}></Image>
                            <div className={`${style.driveText} ${style.driveMode}`}>
                                <span>驾驶模式：自动</span>
                                <br />
                                <span>接管次数：2</span>
                            </div>
                        </div>
                        <div className={style["card"]}>
                            <div className={`${style.driveText} ${style.driveData}`}>
                                <span>自启动起：</span>
                                <br />
                                <span>里程：45km</span>
                                <br />
                                <span>时间：0.56h</span>
                                <br />
                                <span>平均速度：86km/h</span>
                                <br />
                                <span>平均油耗：13.6 l/100km</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.videoContainer} ${style[`grid-${videoCount}`]}`}>
                            {
                                Array.from({length: videoCount}).map((v,i) => <VideoComp key={Math.random()} url={urls[i]}></VideoComp>)
                            }
                    </div>
                </div>
                <div className={style.right}>
                    <h4>版本信息</h4>
                    <JsonViewer data={packageJson}></JsonViewer>
                </div>
            </div>
        </div>
    );
}
