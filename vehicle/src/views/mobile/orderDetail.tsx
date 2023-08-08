import React, { useState, useEffect, useContext } from 'react';
import { AutoCenter, Button, Divider, Space, NavBar, Toast, Tag, Dialog, Form, Stepper, DotLoading } from 'antd-mobile';
import {Spin} from "antd";
import { order as orderApi, fuel as fuelApi } from "../../api";

import { DataContext } from './context';
const App = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [fuel, setFuel] = useState({ count: 0, volume: 0, amount: 0 });
    const { curRow, setCurRow } = useContext(DataContext) as {
        curRow: any,
        setCurRow: Function
    };
    const [loading, setLoading] = useState(false); // loading
    const [fuelLoading, setFuelLoading] = useState(false); // loading

    const getButtonText = (v: { state: number, stateName: string }) => {
        if (v.state === 1) {
            return "开始";
        } else if (v.state === 3) {
            return "结束";
        } else {
            return v.stateName;
        }
    }
    const getButtonEnable = (state: number) => {
        return state === 1 || state === 3;
    }
    const startStopOrder = (row: { id: number, state: number, vehicleNo: string }) => {
        if (row.state !== 1 && row.state !== 3) {
            return;
        }
        Dialog.confirm({
            content: row.state === 1 ? '是否开始订单?' : '是否结束订单?',
            onConfirm: async () => {
                const res = await row.state === 1 ? orderApi.startOrder(row.id) : orderApi.stopOrder(row.id);
                res.then(v => {
                    if (v.code === 0) {
                        getOrder(curRow.id);
                        Toast.show({
                            icon: 'success',
                            content: row.state === 1 ? '已开始订单！' : '已结束订单！',
                        });
                    } else {
                        Toast.show({
                            icon: 'fail',
                            content: '出错了！',
                        });
                    }
                });
            },
        });
    };
    const getOrder = (id: number) => {
        setLoading(true);
        orderApi.getOrder({id: curRow.id}).then(v => {
            setCurRow(v.data[0]);
        }).finally(() => {
            setLoading(false);
        });
    };
    const getFuel = (orderId: number, vehicleNo: string) => {
        setLoading(true);
        fuelApi.getTotal(orderId, vehicleNo).then(v => {
            setFuel(v.data[0]);
        }).finally(() => {
            setLoading(false);
        });
    };
    const addFuel = (row: { id: number, state: number, vehicleNo: string }) => {
        setVisible(true);
    };

    const onFinish = (values: any) => {
        setFuelLoading(true);
        fuelApi.addFuel({
            ...values,
            orderId: curRow.id,
            vehicleNo: curRow.vehicleNo
        }).then(v => {
            if (v.code === 0) {
                form.resetFields();
                setVisible(false);
                Toast.show({
                    icon: 'success',
                    content: '已完成加油！',
                });
                getFuel(curRow.id, curRow.vehicleNo);
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '出错了！',
                });
            }
        }).finally(() => {
            setFuelLoading(false);
        });
    };
    const onAction = (action: any, index: number) => {
        if (action.key === "cancel") {
            setVisible(false);
        } else if (action.key === "confirm") {
            if (!fuelLoading) {
                form.submit();
            }
        }
    };

    useEffect(() => {
        if (curRow) {
            getFuel(curRow.id, curRow.vehicleNo);
        }
    }, [curRow]);

    return (
        <>
            <NavBar back='返回' onBack={() => {
                setCurRow(null);
            }}>
                订单详情
            </NavBar>
            <Spin spinning={loading}>
                <AutoCenter className='order-operation'>
                    <Space style={{ '--gap': '48px' }}>
                        <div className='button-container'>
                            <Button onClick={() => { startStopOrder(curRow); }} disabled={!getButtonEnable(curRow.state)} block size='large' shape='rounded' color='primary'>
                                {getButtonText(curRow)} {getButtonEnable(curRow.state) && <><br/><DotLoading /></>}
                            </Button>
                            <AutoCenter>
                                <Tag round color='#87d068'>
                                    {curRow.updateTime}
                                </Tag>
                            </AutoCenter>
                        </div>
                        <div className='button-container'>
                            <Button onClick={() => { addFuel(curRow); }} disabled={!getButtonEnable(curRow.state)} block size='large' shape='rounded' color='warning'>
                                加油{getButtonEnable(curRow.state) && <><br/><DotLoading /></>}
                            </Button>
                            <AutoCenter>
                                <Space>
                                    <Tag round color='#87d068'>
                                        {Math.ceil(fuel.count)}次
                                    </Tag>
                                    <Tag round color='#87d068'>
                                        {Math.ceil(fuel.amount)}元
                                    </Tag>
                                </Space>
                            </AutoCenter>
                        </div>
                    </Space>
                </AutoCenter>
                <Divider contentPosition='left'>订单信息</Divider>
                {
                    curRow ?
                        <div className='data-tag-container'>
                            <div className='data-tag'>
                                <div className="text">{curRow.vehicleNo}</div>
                                <div className="desc">车辆编号</div>
                            </div>
                            <div className='data-tag'>
                                <div className="text">{curRow.load}</div>
                                <div className="desc">带挂</div>
                            </div>
                            <div className='data-tag'>
                                <div className="text">{curRow.subscriberName}</div>
                                <div className="desc">约车人</div>
                            </div>
                            <div className='data-tag'>
                                <div className="text">{curRow.subscriberPhone}</div>
                                <div className="desc">联系方式</div>
                            </div>
                            <div className='data-tag'>
                                <div className="text">{curRow.startTime}</div>
                                <div className="desc">预约开始时间</div>
                            </div>
                            <div className='data-tag'>
                                <div className="text">{curRow.endTime}</div>
                                <div className="desc">预约结束时间</div>
                            </div>
                            <div className='data-tag'>
                                <div className="text">{curRow.address}</div>
                                <div className="desc">地点</div>
                            </div>
                            {curRow.subscribeNote ?
                                <div className='data-tag'>
                                    <div className="text">{curRow.subscribeNote}</div>
                                    <div className="desc">备注</div>
                                </div> : null
                            }
                        </div>
                        : <></>
                }
            </Spin>

            <Dialog
                visible={visible}
                content={<Spin spinning={fuelLoading}>
                    <Form layout='horizontal' form={form} onFinish={onFinish}>
                        <Form.Item name='volume' label='加油量(L)' rules={[{ required: true, message: '请输入加油量!' }]}>
                            <Stepper min={0} />
                        </Form.Item>
                        <Form.Item name='amount' label='金额(元)' rules={[{ required: true, message: '请输入金额!' }]}>
                            <Stepper min={0} />
                        </Form.Item>
                    </Form>
                </Spin>}
                onClose={() => {
                    setVisible(false)
                }}
                onAction={onAction}
                actions={[
                    [{
                        key: 'cancel',
                        text: '取消'
                    },
                    {
                        key: 'confirm',
                        text: '确定',
                    }]
                ]}
            />
        </>
    )
};

export default App;