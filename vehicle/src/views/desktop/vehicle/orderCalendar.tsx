import { Modal, Calendar, message, Spin, Popover } from "antd";
import React, { Fragment, useContext, useState, useEffect } from "react";
import type { Moment } from "moment";
import { ModalContext } from "../../../context";
import style from "./orderCalendar.module.scss";
import { vehicle as vehicleApi } from "../../../api";
import { transformPhoneNumber } from "../../../common/util";
import moment from "moment";

const App = () => {
    const { modalShow, setModalShow, curRow } = useContext(ModalContext) as {
        modalShow: boolean;
        setModalShow: Function;
        curRow: { id: string; vehicleNo: string };
        setCurRow: Function;
    };
    const [orderData, setOrderData] = useState(
        [] as { date: string; bookTime: string; name: string; telephone: string, module: string }[]
    );
    const [loading, setLoading] = useState(false); // loading

    const handleOk = () => {
        setModalShow(false);
    };

    const handleCancel = () => {
        setModalShow(false);
    };

    const getFormatBookTimeList = (data: { startTime: string; endTime: string; name: string; telephone: string; module: string }[]) => {
        let bookTime: { date: string; bookTime: string; name: string; telephone: string; module: string }[] = [];
        data.forEach((item) => {
            bookTime.push(...foramtBookTime(item.startTime, item.endTime, item.name, item.telephone, item.module));
        });
        return bookTime;
    };

    const foramtBookTime = (startTime: string, endTime: string, name: string, telephone: string, module: string) => {
        let res = [];
        let sDate = moment(startTime).format("YYYY-MM-DD");
        let eDate = moment(endTime).format("YYYY-MM-DD");
        let sTime = moment(startTime).format("HH:mm");
        let eTime = moment(endTime).format("HH:mm");
        if (moment(sDate).isSame(moment(eDate))) {
            res.push({
                date: sDate,
                bookTime: `${sTime} - ${eTime}`
            });
        } else {
            let curDate = moment(sDate);
            while (!curDate.isAfter(moment(eDate))) {
                res.push({
                    date: curDate.format("YYYY-MM-DD"),
                    bookTime: "00:00 - 24:00"
                });
                curDate.add(1, "d");
            }
            res[0].bookTime = `${sTime} - 24:00`;
            res[res.length - 1].bookTime = `00:00 - ${eTime}`;
        }
        res = res.map((item) => {
            return {
                ...item,
                name,
                telephone,
                module
            };
        });
        return res;
    };

    useEffect(() => {
        if (curRow?.id) {
            setLoading(true);
            vehicleApi
                .getOrderSummary(curRow.id)
                .then((v) => {
                    if (v.code === 0) {
                        setOrderData(getFormatBookTimeList(v.data));
                    } else {
                        message.error(v.msg);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRow]);

    const dateFullCellRender = (value: Moment) => {
        const matchOrder = orderData.filter((item) => {
            const date = item.date;
            return date === value.format("YYYY-MM-DD");
        });
        return (
            <div className={matchOrder.length ? style["date-cell-picker-disable"] : style["date-cell-picker-enable"]}>
                <div>{value.format("DD")}</div>
                {matchOrder.map((order, index) => {
                    const content = (
                        <div>
                            <p>{`${order.module} ${order.name}`}</p>
                            <p>{transformPhoneNumber(order.telephone)}</p>
                        </div>
                    )
                    return (
                        <Popover key={order.date + order.bookTime} title="预订人信息" content={content}>
                            <div>{order.bookTime}</div>
                        </Popover>
                    );
                })}
            </div>
        );
    };

    return (
        <Fragment>
            <Modal
                width={"75%"}
                title={`${curRow?.vehicleNo}预订情况`}
                open={modalShow}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Spin spinning={loading}>
                    <Calendar className="custom-calendar" dateFullCellRender={dateFullCellRender} />
                </Spin>
            </Modal>
        </Fragment>
    );
};

export default App;
