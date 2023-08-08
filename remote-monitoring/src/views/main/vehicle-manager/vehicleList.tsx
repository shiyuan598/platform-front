import React, { useRef, useState, useEffect, useContext } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import style from "./style.module.scss";
import { Context } from "./context";
import { vehicleApi } from "../../../api";
import ConfirmModal from "../../../components/common/confirmModal"

interface DataType {
    id: string;
    model: string;
    number: string;
    vin: string;
    softwareVersion: string;
    parts: string;
    status: number;
    createTime: string;
}

export default function App() {
    const { vehicleCount, setVehicleCount, queryParam } = useContext(Context) as {
        vehicleCount: number;
        setVehicleCount: Function;
        queryParam: object;
    };

    const [id, setId] = useState<number>(0);

    const deleteVehicle = (e: any, v: DataType) => {
        e.stopPropagation();
        ConfirmModal({
          title: "删除车辆",
          onOk: () => {
            vehicleApi.deleteVehicle(v.id).then(v => {
              if (v.code === 0) {
                setVehicleCount(vehicleCount + 1);
              }
            });
          }
        });
      }
    
    const columns: TableColumnsType<DataType> = [
        { title: "车型", dataIndex: "model", key: "model" },
        { title: "车牌号", dataIndex: "number", key: "number" },
        { title: "VIN码", dataIndex: "vin", key: "vin" },
        { title: "软件版本", dataIndex: "softwareVersion", key: "softwareVersion" },
        { title: "智驾系统零部件", dataIndex: "parts", key: "parts" },
        { title: "状态", dataIndex: "status", key: "status" },
        { title: "创建日期", dataIndex: "createTime", key: "createTime" },
        {
            title: "操作",
            key: "operation",
            width: 140,
            render: (text, record, index) => (
                <div style={{ textAlign: "right" }}>
                    <span className={style.action}>
                        <PlusOutlined />
                    </span>
                    <span className={style.action}>
                        <FormOutlined />
                    </span>
                    <span onClick={(e) => deleteVehicle(e, record)} className={style.action}>
                        <DeleteOutlined />
                    </span>
                </div>
            )
        }
    ];

    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        vehicleApi.getVehicle(queryParam as { [propName: string]: string }).then((res) => {
            setData(res?.data?.vehicleInfoDTOList);
        });
    }, [vehicleCount, queryParam]);

    return <Table columns={columns} dataSource={data} />;
}
