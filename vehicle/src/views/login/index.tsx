import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Input, Form, Toast } from 'antd-mobile';
import {Spin} from "antd";
import { user as userApi } from "../../api";
import { UserContext } from '../../context';
import "./style.scss";

export default function App() {
    const { userInfo, setUserInfo } = useContext(UserContext) as {
        userInfo: {
            username: string,
            role: number,
            token?: string
        },
        setUserInfo: Function
    };
    const [loading, setLoading] = useState(false); // loading
    const history = useHistory();
    const onFinish = (values: any) => {
        setLoading(true);
        userApi.login(values.username, values.password).then(v => {
            if (v.code === 0) {
                setUserInfo(v.data[0]);
                // 将用户信息写入本地存储
                localStorage.setItem("userInfo", JSON.stringify(v.data[0]));
                if (v.data[0].role === 1 || v.data[0].role === 3) {
                    history.push("/desktop");
                } else if (v.data[0].role === 2) {
                    history.push("/mobile");
                }
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '用户名或密码错误！',
                });
            }
        }).finally(() => {
            setLoading(false);
        });
    }
    useEffect(() => {
      if (userInfo && userInfo.role) {
        if (userInfo.role === 1 || userInfo.role === 3) {
            history.push("/desktop");
        } else if (userInfo.role === 2) {
            history.push("/mobile");
        }
      }
    }, [userInfo, history]);
    
    return (
        <div>
            <div className="logo"></div>
            <div className='login'>
                <Spin spinning={loading}>
                    <h2 className='title'>车辆资源管理系统</h2>
                    <Form
                        onFinish={onFinish}
                        layout='horizontal'
                        footer={
                            <Button block type='submit' color='primary' size='large'>
                                登录
                            </Button>
                        }
                    >
                        <Form.Item
                            name='username'
                            label='用户名'
                            required = {true}
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder='请输入用户名' clearable autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='密码'
                            required = {true}
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input placeholder='请输入密码' clearable type='password' />
                        </Form.Item>
                    </Form>
                    <div className='footer-btn'>
                        <Button className='register-btn' color='primary' fill='none' onClick={()=>{
                            history.push("/register");
                        }}>注册用户</Button>
                        <Button className='reset-btn' color='primary' fill='none' onClick={()=>{
                            history.push("/resetPassword");
                        }}>忘记密码</Button>
                    </div>
                </Spin>
            </div>
        </div>
    );
}
