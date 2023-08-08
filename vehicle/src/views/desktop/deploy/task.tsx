import { Input, Table, message, Breadcrumb, Tooltip, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "./deploy.module.scss";
import showDeleteConfirm from "../../../components/common/deleteConfirm";
import { isAdmin } from "../../../common/user";
import { deploy as deployApi } from "../../../api";

const { Search } = Input;

interface DataType {
    id: string;
    project: string;
    creator: string;
    vehicle: string;
    package: string;
    state: number;
    state_name: string;
    create_time: string;
}

export default function App() {
    const history = useHistory();
    const [routeParam, setRouteParam] = useState<any>(history.location.state);
    const [keyword, setKeyword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sorter, setSorter] = useState<any>(null);
    const [pageNo, setPageNo] = useState(1);
    const [pagination, setPagination] = useState({});
    const [num, setNum] = useState(0); // 用于触发数据更新

    // 初始化routeParam
    useEffect(() => {
        const routeParam = history.location.state;
        setRouteParam(routeParam);
    }, [history]);

    // 没有参数时回退到项目列表
    useEffect(() => {
        if (!routeParam) {
            history.push("/desktop/deploy/group");
        }
    }, [routeParam, history]);

    const backToGroup = () => {
        history.push("/desktop/deploy/group");
    };

    const cancel = (e: any, v: DataType) => {
        e.stopPropagation();
        showDeleteConfirm({
            title: "取消任务",
            content: "请谨慎操作！",
            onOk: () => {
                deployApi
                    .operateTask({
                        opt: "CANCEL",
                        task_ids: v.id
                    })
                    .then((v) => {
                        // if (v.code === 0) {
                        //     setModuleNum(moduleNum + 1);
                        // } else {
                        //     message.error(v.msg);
                        // }
                        setNum(num + 1);
                    });
            }
        });
    };

    const getData = (pageNo: number, name: string = "", sorter: any) => {
        let { field: order = "id", order: seq = "descend" } = sorter || {};
        setLoading(true);
        deployApi
            .getTask({
                group: routeParam.id,
                vehicle: "",
                project: "",
                pageNo,
                name,
                order,
                seq
            })
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
                field: order ? columnKey : "id",
                order: order || "descend"
            });
        }
    };

    const pageChange = (pageNo: number, pageSize: number) => {
        setPageNo(pageNo);
    };

    useEffect(() => {
        getData(pageNo, keyword, sorter);
    }, [pageNo, keyword, sorter, num]);

    const onSearch = (value: string) => {
        setKeyword(value);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "所属项目",
            width: 140,
            ellipsis: true,
            dataIndex: "project",
            key: "project",
            sorter: true
        },
        {
            title: "车辆",
            width: 120,
            ellipsis: true,
            dataIndex: "vehicle",
            key: "vehicle"
        },
        {
            title: "版本",
            width: 280,
            ellipsis: true,
            dataIndex: "package",
            key: "package",
            render: (v: string) => (
                <Tooltip overlayClassName="tooltip-overlay" placement="topLeft" title={v}>
                    <span>{v}</span>
                </Tooltip>
            )
        },
        {
            title: "状态",
            width: 120,
            ellipsis: true,
            key: "state",
            sorter: true,
            render: (v: DataType) => {
                if (v.state === 0 || v.state === 3) {
                    return <Tag color="#666666">{v.state_name}</Tag>;
                } else if (v.state === 1) {
                    return <Tag color="#48d1cc">{v.state_name}</Tag>;
                } else if (v.state === 2) {
                    return <Tag color="#177ddc">{v.state_name}</Tag>;
                } else if (v.state === 4) {
                    return <Tag color="#00b578">{v.state_name}</Tag>;
                } else if (v.state === 5) {
                    return <Tag color="#ff3141">{v.state_name}</Tag>;
                } else if (v.state === 6) {
                    return <Tag color="#ff8f1f">{v.state_name}</Tag>;
                }
            }
        },
        {
            title: "创建时间",
            width: 170,
            ellipsis: true,
            dataIndex: "create_time",
            key: "create_time",
            sorter: true
        },
        {
            title: "创建人",
            width: 120,
            ellipsis: true,
            dataIndex: "creator",
            key: "creator",
            sorter: true
        },
        {
            title: "操作",
            width: 120,
            dataIndex: "",
            fixed: "right",
            key: "x",
            render: (v: DataType) => {
                return isAdmin() ? (
                    <>
                        <a
                            href="#!"
                            onClick={(e) => {
                                cancel(e, v);
                            }}>
                            取消
                        </a>
                    </>
                ) : (
                    <></>
                );
            }
        }
    ];

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="#!" onClick={backToGroup}>
                    返回
                </Breadcrumb.Item>
                <Breadcrumb.Item>升级任务</Breadcrumb.Item>
            </Breadcrumb>
            <div className={style.tools}>
                <Search placeholder="输入关键字后按Enter键查询" onSearch={onSearch} enterButton />
            </div>
            <Table
                scroll={{ x: 1440 }}
                loading={loading}
                pagination={{
                    ...pagination,
                    showSizeChanger: false,
                    onChange: pageChange
                }}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />
        </div>
    );
}
