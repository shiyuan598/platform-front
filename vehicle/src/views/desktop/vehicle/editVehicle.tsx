import { Modal, Form, Input, Select, message, Spin } from 'antd';
import React, { Fragment, useState } from 'react';
import { vehicle as vehicleApi } from "../../../api";

const { Option } = Select;

const App = (props: any) => {
    const {modalShow, setModalShow, callback, data } = props;
    const [loading, setLoading] = useState(false); // loading
    const [form] = Form.useForm();
    const handleOk = () => {
        if (!loading) {
            form.submit();
        }
    };

    const handleCancel = () => {
        setModalShow(false);
        form.resetFields();
    };

    const onFinish = (values: any) => {
        setLoading(true);
        vehicleApi.editVehicle({
            ...values,
            id: data.id,
            vehicleNo: data.vehicleNo
        }).then(v => {
            if (v.code === 0) {
                setModalShow(false);
                form.resetFields();
                callback(true);
            } else {
                message.error(v.msg);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Fragment>
            <Modal destroyOnClose={true} title="编辑车辆" open={modalShow} onOk={handleOk} onCancel={handleCancel} okText="确认"
                cancelText="取消">
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{vehicleNo: data?.vehicleNo, place: data?.place, state: data?.state }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="车辆编号"
                            name="vehicleNo"
                            required={true}
                            rules={[{ required: true, message: '请输入车辆编号' }]}
                        >
                            <Input placeholder='请输入车辆编号' disabled />
                        </Form.Item>
                        <Form.Item name="place" label="地点" required={true} rules={[{ required: true, message: '请输入车辆地点' }]}>
                            <Input placeholder='请输入车辆地点' />
                        </Form.Item>
                        <Form.Item name="state" label="状态" required={true} rules={[{ required: true, message: '请选择车辆状态' }]}>
                            <Select
                                placeholder="请选择车辆状态"
                                allowClear
                            >
                                <Option value={1}>可用</Option>
                                <Option value={0}>不可用</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </Fragment>
    );
};

export default App;