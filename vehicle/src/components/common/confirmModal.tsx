import { CheckCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

const { confirm } = Modal;

const showConfirm = ({title, content, onOk=()=>{}, onCancel=()=>{}}: { title:string, content?: string | React.ReactNode, onOk:Function, onCancel?: Function}) => {
    confirm({
        title: title || "确认信息",
        icon: <CheckCircleOutlined />,
        content: content || "请谨慎操作！",
        width: 560,
        okType: 'primary',
        onOk() {
            onOk();
        },
        onCancel() {
            onCancel();
        },
    });
};

export default showConfirm;