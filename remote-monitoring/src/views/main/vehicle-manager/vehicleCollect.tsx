import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, Form, Input, Select, message } from "antd";
import style from "./style.module.scss";
import { Context } from "./context";
import { vehicleApi } from "../../../api";

export default function App() {
    const { vehicleCount, setVehicleCount } = useContext(Context) as {
        vehicleCount: number;
        setVehicleCount: Function;
    };
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
    };
    const onFinish = (values: any) => {
        vehicleApi.addVehicle(values).then(() => {
            setVehicleCount(vehicleCount + 1); // 触发查询
            form.resetFields();
            message.success("录入成功！");
        });
    };
    return (
        <div className={style["form-container"]}>
            <Form labelCol={{ flex: "80px" }} labelAlign="left" labelWrap colon={false} form={form} onFinish={onFinish}>
                <Form.Item name="model" label="车型" required={true} rules={[{ required: true, message: "请输入车型" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="number" label="车牌号" required={true} rules={[{ required: true, message: "请输入车牌号" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item
                    name="softwareVersion"
                    label="软件版本"
                    required={true}
                    rules={[{ required: true, message: "请输入软件版本" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="vin" label="VIN码" required={true} rules={[{ required: true, message: "请输入VIN码" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item
                    name="parts"
                    label="智驾系统零部件"
                    required={true}
                    rules={[{ required: true, message: "请输入智驾系统零部件" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
            </Form>
            <div className={style.buttons}>
                <Button onClick={handleOk} type="primary">
                    录入
                </Button>
            </div>
        </div>
    );
}