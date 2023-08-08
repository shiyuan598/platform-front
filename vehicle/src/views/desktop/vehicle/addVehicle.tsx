import { Modal, Form, Input, Select, message } from 'antd';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ModalContext, DataContext } from '../../../context';
import { dict as dictApi, vehicle as vehicleApi } from "../../../api";

const { Option } = Select;

const App = () => {
    const { modalShow, setModalShow } = useContext(ModalContext) as {
        modalShow: boolean, setModalShow: Function,
        curRow: object, setCurRow: Function
    };
    const { vehicleNum, setVehicleNum } = useContext(DataContext) as {
        vehicleNum: number,
        setVehicleNum: Function
    };

    const [projectList, setProjectList] = useState([] as { id: number, name: string }[]);

    useEffect(() => {
        dictApi.getProject().then((v) => {
            if (v.code === 0) {
                setProjectList(v.data);
            } else {
                message.error(v.msg);
            }
        });
    }, []);

    const [form] = Form.useForm();
    const handleOk = () => { 
        form.submit();
    };

    const handleCancel = () => {
        setModalShow(false);
        form.resetFields();
    };

    const checkName = (rule: any, value: any, cb: any) => {
        return new Promise((resolve, reject) => {
            if (!value) {
                reject("请输入车辆编号");
            }
            vehicleApi.checkNoExist(value).then(v => {
                if (v.data) {
                    resolve("");
                } else {
                    reject("车辆编号已存在");
                }
            }).catch(() => {
                reject("验证车辆编号出错");
            });
        });
    };

    const onFinish = (values: any) => {
        vehicleApi.addVehicle(values).then(v => {
            if (v.code === 0) {
                setModalShow(false);
                form.resetFields();
                setVehicleNum(vehicleNum + 1);
            } else {
                message.error(v.msg);
            }
        });
    };

    return (
        <Fragment>
            <Modal destroyOnClose={true} title="添加车辆" open={modalShow} onOk={handleOk} onCancel={handleCancel} okText="确认"
                cancelText="取消">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="车辆编号"
                        name="vehicleNo"
                        required={true}
                        rules={[{ validator: checkName }]}
                    >
                        <Input placeholder='请输入车辆编号' />
                    </Form.Item>
                    <Form.Item name="project" label="所属项目" required={true} rules={[{ required: true, message: '请选择所属项目' }]}>
                        <Select
                            placeholder="请选择所属项目"
                            allowClear
                        >
                            {
                                projectList.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
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
            </Modal>
        </Fragment>
    );
};

export default App;