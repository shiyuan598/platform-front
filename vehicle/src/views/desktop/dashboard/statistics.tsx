import { Card, Statistic, message, Spin } from 'antd';
import React, {useState, useEffect } from 'react';
import { statis as statisApi } from "../../../api";
import style from "./dashboard.module.scss"

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState({} as any);
    const getSummary = () => {
        setLoading(true);
        statisApi.getSummary().then(v => {
            if (v.code === 0) {
                setSummary(v.data);
            } else {
                message.error("出错了");
            }
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(() => {
        getSummary();
    }, []);

    return (
        <Spin spinning={loading}>
            <div className={style["site-statistic-demo-card"]}>
                <Card>
                    <Statistic
                        title="车辆总数"
                        value={summary.totalVehicle}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="已预定车辆数"
                        value={summary.orderedVehicle}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="预定总时长"
                        value={summary.totalDuration || 0 }
                        suffix="小时"
                    />
                </Card>
                <Card>
                    <Statistic
                        title="订单总数"
                        value={summary.totalOrder}
                    />
                </Card>
                <Card>
                    <Statistic
                        title="未处理订单数"
                        value={summary.unhandleOrder}
                    />
                </Card>
            </div>
        </Spin>
    );
};

export default React.memo(App);