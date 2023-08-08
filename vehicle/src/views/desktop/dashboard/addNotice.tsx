import { Modal, Form, Input, InputNumber, message, Spin } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { ModalContext, DataContext } from '../../../context';
import { notice as noticeApi } from "../../../api";
import moment from 'moment';

const { TextArea } = Input;

const App = () => {
    const { modalShow, setModalShow } = useContext(ModalContext) as {
        modalShow: boolean, setModalShow: Function
    };
    const { noticeNum, setNoticeNum } = useContext(DataContext) as {
        noticeNum: number,
        setNoticeNum: Function
    };
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
        const expire = moment().add(values.expire, "d").format("YYYY-MM-DD") + " 23:59:59";
        noticeApi.addNotice({
            ...values,
            expire
        }).then(v => {
            if (v.code === 0) {
                setModalShow(false);
                form.resetFields();
                setNoticeNum(noticeNum + 1);
            } else {
                message.error(v.msg);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Fragment>
            <Modal destroyOnClose={true} title="添加公告" open={modalShow} onOk={handleOk} onCancel={handleCancel} okText="确认"
                cancelText="取消">
                <Spin spinning={loading}>
                    <Form
                        className='custom-form'
                        form={form}
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{expire: 1}}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            required={true}
                            rules={[{ required: true, message: '请输入标题' }]}
                        >
                            <Input placeholder='请输入标题' />
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                            required={true}
                            rules={[{ required: true, message: '请输入内容' }]}
                        >
                            <TextArea style={{ resize: 'none' }} rows={3} showCount placeholder="请输入内容" maxLength={70} />
                        </Form.Item>
                        <Form.Item
                            label="有效期"
                            name="expire"
                            required={true}
                            rules={[{ required: true, message: '请输入天数' }]}
                        >
                            <InputNumber placeholder="请输入天数" min={1} max={30} addonAfter="天"/>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </Fragment>
    );
};

export default App;