import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import style from "./style.module.scss";
import { Context } from "./context";

const { RangePicker } = DatePicker;

export default function App() {
    const { setQueryParam } = useContext(Context) as {
        setQueryParam: Function;
    };
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
    };
    const handleReset = () => {
        form.resetFields();
        setQueryParam({});
    };
    const onFinish = (values: any) => {
        const { model = "", number = "", parts = "", softwareVersion = "", vin = "", date } = values;
        let createTimeFrom = "";
        let createTimeTo = "";
        if (date) {
            createTimeFrom = date[0].format("yyyy-MM-dd");
            createTimeFrom = date[1].format("yyyy-MM-dd");
        }
        setQueryParam({
            createTimeFrom,
            createTimeTo,
            model,
            number,
            parts,
            softwareVersion,
            vin
        });
    };
    return (
        <div className={style["form-container"]}>
            <Form labelCol={{ flex: "80px" }} labelAlign="left" labelWrap colon={false} form={form} onFinish={onFinish}>
                <Form.Item name="model" label="车型">
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="number" label="车牌号">
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="softwareVersion" label="软件版本">
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="vin" label="VIN码">
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="parts" label="智驾系统零部件">
                    <Input placeholder="请输入" />
                </Form.Item>
                {/* <Form.Item name="type" label="车型">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="number" label="车牌号">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="version" label="软件版本">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="vin" label="VIN码">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="sysParts" label="智驾系统零部件">
                    <Select placeholder="请选择" />
                </Form.Item> */}
                <Form.Item name="date" label="创建日期">
                    <RangePicker />
                </Form.Item>
            </Form>
            <div className={style.buttons}>
                <Button onClick={handleOk} type="primary">
                    查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </div>
        </div>
    );
}
