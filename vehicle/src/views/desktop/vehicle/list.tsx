import { message, Tag } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, Fragment, useEffect, useContext } from "react";
import showDeleteConfirm from "../../../components/common/deleteConfirm";
import BookingModal from "./booking";
import EditVehicleModal from "./editVehicle";
import OrderCalendarModal from "./orderCalendar";
import OrderPresentModal from "./orderPresent";
import { ModalContext, DataContext } from "../../../context";
import { vehicle as vehicleApi } from "../../../api";
import { isAdmin } from "../../../common/user";
import style from "./vehicle.module.scss";

interface DataType {
    id: string;
    vehicleNo: string;
    type: string;
    project: string;
    place: string;
    state: number;
    stateName: string;
    orderState: number;
    name: string;
    telephone: string;
}

const App = (props: { keyword: string }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sorter, setSorter] = useState<any>(null);
    const [pageNo, setPageNo] = useState(1);
    const [pagination, setPagination] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [orderCalendarModalShow, setOrderCalendarModalShow] = useState(false);
    const [orderPresentModalShow, setOrderPresentModalShow] = useState(false);
    const [curRow, setCurRow] = useState<DataType | null>(null);
    const { vehicleNum, setVehicleNum } = useContext(DataContext) as {
        vehicleNum: number;
        setVehicleNum: Function;
    };

    const deleteVehicle = (e: any, v: DataType) => {
        e.stopPropagation();
        showDeleteConfirm({
            title: "删除车辆",
            onOk: () => {
                vehicleApi.deleteVehicle(v.id).then((v) => {
                    if (v.code === 0) {
                        setVehicleNum(vehicleNum + 1);
                    } else {
                        message.error(v.msg);
                    }
                });
            }
        });
    };

    const editVehicle = (e: any, v: DataType) => {
        e.stopPropagation();
        setEditModalShow(true);
        setCurRow(v);
    };
    const editModalCallback = (res: boolean) => {
        if (res) {
            setVehicleNum(vehicleNum + 1);
        }
    };

    const showOrderCalendar = (e: any, v: DataType) => {
        e.stopPropagation();
        setOrderCalendarModalShow(true);
        setCurRow(v);
    };

    const showOrderPresent = (e: any, v: DataType) => {
        e.stopPropagation();
        setOrderPresentModalShow(true);
        setCurRow(v);
    };

    const apply = (e: any, v: DataType) => {
        e.stopPropagation();
        setModalShow(true);
        setCurRow(v);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "车辆编号",
            dataIndex: "vehicleNo",
            key: "vehicleNo",
            sorter: true
        },
        {
            title: "所属项目",
            dataIndex: "project",
            key: "project",
            sorter: true
        },
        {
            title: "地点",
            dataIndex: "place",
            key: "place",
            sorter: true
        },
        {
            title: "状态",
            dataIndex: "stateName",
            key: "stateName",
            sorter: true
        },
        {
            title: "今日预订",
            dataIndex: "",
            key: "orderState",
            render: (v: DataType) => {
                return (
                    <Fragment>
                        {v.name != null && v.orderState != null ? (
                            <span
                                className="status"
                                onClick={(e) => {
                                    showOrderPresent(e, v);
                                }}>
                                <Tag color="#177ddc">{`${v.name} ${v.telephone}`}</Tag>
                            </span>
                        ) : (
                            <span>...</span>
                        )}
                    </Fragment>
                );
            }
        },
        {
            title: "全部预订",
            dataIndex: "",
            key: "x",
            render: (v: DataType) => {
                return (
                    <Fragment>
                        <a href="#!" onClick={(e) => showOrderCalendar(e, v)}>
                            订单日历
                        </a>
                    </Fragment>
                );
            }
        },
        {
            title: "操作",
            dataIndex: "",
            key: "y",
            render: (v: DataType) => {
                return (
                    <Fragment>
                        {isAdmin() && (
                            <>
                                <a href="#!" onClick={(e) => deleteVehicle(e, v)}>
                                    删除
                                </a>
                                <a href="#!" onClick={(e) => editVehicle(e, v)}>
                                    编辑
                                </a>
                            </>
                        )}
                        {v.state === 1 ? (
                            <a href="#!" onClick={(e) => apply(e, v)}>
                                预订
                            </a>
                        ) : (
                            ""
                        )}
                    </Fragment>
                );
            }
        }
    ];

    const getData = (pageNo: number, name: string = "", sorter: any) => {
        let { field: order = "", order: seq = "" } = sorter || {};
        setLoading(true);
        vehicleApi
            .getVehicle(pageNo, name, order, seq)
            .then((v) => {
                if (v.code === 0) {
                    setData(v.data);
                    setPagination(v.pagination);
                } else {
                    message.error(v.msg);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        const action = extra.action;
        if (action === "sort") {
            const { order, columnKey } = sorter;
            setSorter({
                field: columnKey,
                order: order
            });
        }
    };

    const pageChange = (pageNo: number, pageSize: number) => {
        setPageNo(pageNo);
    };

    // 搜索条件变化时页码重置为1
    useEffect(() => {
        setPageNo(1);
    }, [props.keyword]);

    useEffect(() => {
        getData(pageNo, props.keyword, sorter);
    }, [pageNo, vehicleNum, props.keyword, sorter]);

    return (
        <Fragment>
            <Table
                loading={loading}
                pagination={{
                    ...pagination,
                    showSizeChanger: false,
                    onChange: pageChange
                }}
                className={style.list}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />
            <ModalContext.Provider value={{ modalShow, setModalShow, curRow, setCurRow }}>
                {modalShow && <BookingModal></BookingModal>}
            </ModalContext.Provider>
            {editModalShow && (
                <EditVehicleModal
                    modalShow={editModalShow}
                    setModalShow={setEditModalShow}
                    callback={editModalCallback}
                    data={curRow}></EditVehicleModal>
            )}
            <ModalContext.Provider
                value={{
                    modalShow: orderCalendarModalShow,
                    setModalShow: setOrderCalendarModalShow,
                    curRow,
                    setCurRow
                }}>
                {orderCalendarModalShow && <OrderCalendarModal></OrderCalendarModal>}
            </ModalContext.Provider>
            <ModalContext.Provider
                value={{ modalShow: orderPresentModalShow, setModalShow: setOrderPresentModalShow, curRow, setCurRow }}>
                {orderPresentModalShow && <OrderPresentModal></OrderPresentModal>}
            </ModalContext.Provider>
        </Fragment>
    );
};

export default App;
