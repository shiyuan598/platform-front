import { Input, Table, message, Tooltip } from "antd";
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
    create_time: string;
    cur_package: string;
    vehicles: string;
    packages: string;
    unfinished: string;
    total: string;
}

export default function App() {
    const history = useHistory();
    const [keyword, setKeyword] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sorter, setSorter] = useState<any>(null);
    const [pageNo, setPageNo] = useState(1);
    const [pagination, setPagination] = useState({});
    const [num, setNum] = useState(0); // 用于触发数据更新

    const show = (e: any, v: DataType) => {
        e.stopPropagation();
        history.push("/desktop/deploy/task", { ...v });
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
                        group_ids: v.id
                    })
                    .then((v) => {
                        // if (v.code === 0) {
                        //     setModuleNum(moduleNum + 1);
                        // } else {
                        //     message.error(v.msg);
                        // }
                        setNum(num + 1); // 触发数据更新
                    });
            }
        });
    };

    const getData = (pageNo: number, name: string = "", sorter: any) => {
        let { field: order = "id", order: seq = "descend" } = sorter || {};
        setLoading(true);
        deployApi
            .geTaskGroup({
                pageNo,
                name,
                order,
                seq
            })
            .then((v) => {
                if (v.code === 0) {
                    console.info(v.data);
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
            dataIndex: "vehicles",
            key: "vehicles",
            render: (v: string) => (
                <Tooltip placement="topLeft" title={v}>
                    <span>{v}</span>
                </Tooltip>
            )
        },
        {
            title: "版本",
            width: 280,
            ellipsis: true,
            dataIndex: "packages",
            key: "packages",
            render: (v: string) => (
                <Tooltip
                    overlayClassName="tooltip-overlay"
                    placement="topLeft"
                    title={() =>
                        v.split(",").map((item: string) => (
                            <div className="item" key={item}>
                                {item}
                            </div>
                        ))
                    }>
                    <span>{v}</span>
                </Tooltip>
            )
        },
        {
            title: "当前版本",
            width: 280,
            ellipsis: true,
            dataIndex: "cur_package",
            key: "cur_package",
            render: (v: string) => (
                <Tooltip
                    overlayClassName="tooltip-overlay"
                    placement="topLeft"
                    title={() =>
                        v.split(",").map((item: string) => (
                            <div className="item" key={item}>
                                {item}
                            </div>
                        ))
                    }>
                    <span>{v}</span>
                </Tooltip>
            )
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
            title: "进行中 / 总数",
            width: 120,
            key: "name",
            render: (record: DataType) => <span>{`${record.unfinished} / ${record.total}`}</span>
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
                        <a
                            href="#!"
                            onClick={(e) => {
                                show(e, v);
                            }}>
                            查看
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
            <h4>升级任务组</h4>
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
                onRow={(record) => {
                    return {
                        onDoubleClick: (event) => {
                            show(event, record);
                        }
                    };
                }}
            />
        </div>
    );
}
