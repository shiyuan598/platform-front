import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Radio, Space, Empty, Toast, List, Tag, Popover } from 'antd-mobile';
import {Spin} from "antd";
import { UserOutline } from 'antd-mobile-icons';
import { order as orderApi } from "../../api";
import { DataContext } from './context';
import { UserContext } from '../../context';

const App = () => {
    const [data, setData] = useState([] as { id: number, vehicleNo: string, startTime: string, bookTime: string, state: number, stateName: string }[]);
    const { setCurRow } = useContext(DataContext) as {
        curRow: any,
        setCurRow: Function
    };
    const { userInfo, setUserInfo } = useContext(UserContext) as {
        userInfo: {
            id: number,
            name: string,
            username: string,
            role: number,
            token?: string
        },
        setUserInfo: Function
    };
    const [loading, setLoading] = useState(false); // loading
    const history = useHistory();
    const actionHandler = (key: string) => {
        if (key === "logout") {
            setUserInfo({});
            localStorage.setItem("userInfo", "{}");
            history.push("/login");
        }
    }
    const [order, setOrder] = useState<string>("createTime");
    const [filter, setFilter] = useState<string>("");
    const getData = () => {
        setLoading(true);
        orderApi.getOrderApproved(userInfo.id, order, filter).then(v => {
            if (v.code === 0) {
                setData(v.data);
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '出错了！',
                });
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getData();
    }, [order, filter]);

    const getStateTag = (v: { state: number, stateName: string }) => {
        if (v.state === 0) {
            return (<Tag color="default">{v.stateName}</Tag>);
        } else if (v.state === 1) {
            return (<Tag color="#87d068">{v.stateName}</Tag>);
        }
        else if (v.state === 2) {
            return (<Tag color="danger">{v.stateName}</Tag>);
        }
        else if (v.state === 3) {
            return (<Tag color="primary">{v.stateName}</Tag>);
        }
        else if (v.state === 4) {
            return (<Tag color="success">{v.stateName}</Tag>);
        }
        else if (v.state === 5) {
            return (<Tag color="warning">{v.stateName}</Tag>);
        }
    }

    return (
        <>
            <header>
                <div className='title'>订单列表</div>
                <div className='avatar'>
                    <Popover.Menu
                        mode='dark'
                        actions={[{ key: 'username', text: <span>{(userInfo.username ?? "").toUpperCase()}</span> }, { key: 'logout', text: '注销' }]}
                        placement='rightTop'
                        onAction={node => { actionHandler(node.key as string) }}
                        trigger='click'
                    >
                        <span>
                            <UserOutline />
                            <span className='name'>{userInfo.name}</span>
                        </span>
                    </Popover.Menu>
                </div>
            </header>
            <Spin spinning={loading}>
                <Dropdown>
                    <Dropdown.Item key='sorter' title='排序'>
                        <div style={{ padding: 12 }}>
                            <Radio.Group value={order}
                                onChange={(val) => {
                                    setOrder(val as string);
                                }}
                                defaultValue='createTime'>
                                <Space direction='vertical' block>
                                    <Radio block value='createTime'>
                                        时间排序
                                    </Radio>
                                    <Radio block value='state'>
                                        状态排序
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item key='bizop' title='筛选'>
                        <div style={{ padding: 12 }}>
                            <Radio.Group value={filter}
                                onChange={(val) => {
                                    setFilter(val as string);
                                }} defaultValue=''>
                                <Space direction='vertical' block>
                                    <Radio block value=''>
                                        全部
                                    </Radio>
                                    <Radio block value='1'>
                                        已通过
                                    </Radio>
                                    <Radio block value='3'>
                                        进行中
                                    </Radio>
                                    <Radio block value='4'>
                                        已结束
                                    </Radio>
                                    <Radio block value='5'>
                                        已取消
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
                {
                    data.length ?
                        <List>
                            {
                                data.map(item => (
                                    <List.Item key={item.id} onClick={() => {
                                        setCurRow(item);
                                    }}>
                                        <Space direction='horizontal' style={{ '--gap': '12px' }} block>
                                            <Tag round color='#2db7f5'>
                                                {item.id}
                                            </Tag>
                                            <Tag color='primary' fill='outline'>
                                                {item.vehicleNo}
                                            </Tag>
                                            <Tag color='#ccc' fill='outline'>
                                                {item.startTime}
                                            </Tag>
                                            {
                                                getStateTag(item)
                                            }
                                        </Space>
                                    </List.Item>
                                ))
                            }
                        </List>
                        :
                        <Empty
                            style={{ padding: '40% 0' }}
                            imageStyle={{ width: 256 }}
                            description='暂无数据'
                        />
                }
            </Spin>
        </>
    )
};

export default App;