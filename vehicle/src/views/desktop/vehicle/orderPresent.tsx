import { Modal, Timeline, message, Tag, Empty, Spin } from 'antd';
import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ModalContext } from '../../../context';
import { vehicle as vehicleApi } from "../../../api";

const App = () => {
    const { modalShow, setModalShow, curRow } = useContext(ModalContext) as {
        modalShow: boolean, setModalShow: Function,
        curRow: { id: string; vehicleNo: string }, setCurRow: Function
    };
    const [orderData, setOrderData] = useState([] as { id: string, useTime: string, name: string, telephone: string, state: number, stateName: string, module: string }[])
    const [loading, setLoading] = useState(false); // loading

    const handleOk = () => {
        setModalShow(false);
    };

    const handleCancel = () => {
        setModalShow(false);
    };

    const getColor = (state: number) => {
        let color = "#666";
        switch (state) {
            case 0:
                color = "#666";
                break;
            case 1:
                color = "#87d068";
                break;
            case 2:
                color = "#ff3141";
                break;
            case 3:
                color = "#1677ff";
                break;
            case 4:
                color = "#00b578";
                break;
            case 5:
                color = "#ff8f1f";
                break;

            default:
                break;
        }
        return color;
    };

    useEffect(() => {
        if (curRow?.id) {
            setLoading(true);
            vehicleApi.getOrderPresent(curRow.id).then(v => {
                if (v.code === 0) {
                    setOrderData(v.data);
                } else {
                    message.error(v.msg);
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [curRow]);

    return (
        <Fragment>
            <Modal width={600} title={`${curRow?.vehicleNo}当日订单`} open={modalShow} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <Spin spinning={loading}>
                    <Timeline mode="left">
                        {
                            orderData.map(item => (
                                <Timeline.Item key={item.id} label={item.useTime} color={getColor(item.state)}>
                                    <Tag>{item.module}</Tag>
                                    <Tag>{item.name}</Tag>
                                    <Tag>{item.telephone}</Tag>
                                    <Tag color={getColor(item.state)}>{item.stateName}</Tag>
                                </Timeline.Item>
                            ))
                        }
                        {!orderData.length && <Empty />}
                    </Timeline>
                </Spin>
            </Modal>
        </Fragment>
    );
};

export default App;