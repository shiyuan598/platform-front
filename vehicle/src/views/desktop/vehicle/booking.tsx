import { Modal, Form, Input, Select, DatePicker, Spin, message, TreeSelect } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import type { Moment } from 'moment';
import moment from 'moment';
import { ModalContext, DataContext, UserContext } from '../../../context';
import { dict as dictApi, vehicle as vehicleApi, order as orderApi } from "../../../api";

const { Option } = Select;
const { RangePicker } = DatePicker;

const App = () => {
    const { modalShow, setModalShow, curRow } = useContext(ModalContext) as {
        modalShow: boolean, setModalShow: Function,
        curRow: object, setCurRow: Function
    };
    const { orderNum, setOrderNum } = useContext(DataContext) as {
        orderNum: number,
        setOrderNum: Function
    };
    const { userInfo } = useContext(UserContext) as {
        userInfo: {
            id: number,
            username: string,
            role: number,
            token?: string
        }
    };
    const history = useHistory();
    const [loading, setLoading] = useState(false); // loading

    let vehicleId: number | undefined = undefined;
    let vehicleNo: string | undefined = undefined;
    let vehicleProject: string | undefined = undefined;
    let timeSpan: [Moment, Moment] | null = null;
    if (curRow) {
        vehicleId = (curRow as { id: number }).id;
        vehicleNo = (curRow as { vehicleNo: string }).vehicleNo;
        vehicleProject = (curRow as { project: string }).project;
        timeSpan = (curRow as { timeSpan: [Moment, Moment] | null }).timeSpan;
    }

    const [loadList, setLoadList] = useState([] as { id: number, name: string }[]);
    const [vehicleList, setVehicleList] = useState([] as { id: number, vehicleNo: string, project: string }[]);
    const [module, setModule] = useState("");
    const [treeData, setTreeData] = useState([]);
    const [selectVehicle, setSelectVehicle] = useState({} as { id: number, vehicleNo: string, project: string });

    const getSelectVehicle = (id:number) => {
        return vehicleList.find(item => item.id === id) as { id: number, vehicleNo: string, project: string };  
    };

    useEffect(() => {
        dictApi.getModule().then((v) => {
            if (v.code === 0) {
                setTreeData(v.data.map((d: { id: number, name: string }) => ({
                    value: d.id,
                    label: d.name,
                    isLeaf: true
                })));
            } else {
                message.error(v.msg);
            }
        });
        dictApi.getLoad().then((v) => {
            if (v.code === 0) {
                setLoadList(v.data);
            } else {
                message.error(v.msg);
            }
        });
        if (!vehicleNo) {
            vehicleApi.getAvailableVehicle().then(v => {
                if (v.code === 0) {
                    setVehicleList(v.data);
                } else {
                    message.error(v.msg);
                }
            });
        }
    }, [vehicleNo]);

    const [form] = Form.useForm();

    const closeModal = () => {
        setLoading(false);
        setModalShow(false);
        form.resetFields();
    }
    const handleOk = () => {
        if (!loading) {
            form.submit();
        }
    };

    const handleCancel = () => {
        setDisabledDate(disabledDateFn);
        closeModal();
    };

    const onFinish = (values: any) => {
        setLoading(true);
        if (vehicleNo) {
            // 在车辆列表中点击预订，此时不需要选择车辆了
            values.vehicleId = vehicleId;
            values.vehicleNo = vehicleNo;
            values.vehicleProject = vehicleProject;
        } else {
            // 在订单页面点击预订，此时需要选择车辆，vehicleId在表单中
            values.vehicleNo = selectVehicle.vehicleNo;
            values.vehicleProject = selectVehicle.project;
        }

        orderApi.addOrder({
            ...values,
            subscriber: userInfo.id,
            starttime: values.useTime[0].format("YYYY-MM-DD HH:mm"),
            endtime: values.useTime[1].format("YYYY-MM-DD HH:mm")
        }).then(v => {
            if (v.code === 0) {
                setTimeout(() => {
                    closeModal();
                    message.success("预订成功！");
                    setOrderNum(orderNum + 1);
                    setTimeout(() => {
                        history.push("/desktop/order");
                    }, 500);
                }, 0);
            } else {
                message.error(v.msg);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const onModuleChange = (v: string) => {
        setModule(v);
    };
    const onLoadData = (v: any) => {
        return new Promise((resolve, reject) => {
            resolve(0);
        });
    };

    // 默认情况下只能选择明天开始的时间
    const disabledDateFn = () => (current: Moment): boolean => {
        // 当前日期之前的不能选择
        if (current.isSameOrAfter(moment(), "day")) {
            return false;
        }
        return true;
    };

    const [disabledDate, setDisabledDate] = useState(disabledDateFn);
    // const [dateRange, setDateRange] = useState(null);

    // const dateChange = (values: any) => {
    //     setDateRange(values);
    // };

    return (
        <Modal destroyOnClose={true} title={`预订${vehicleNo ? vehicleNo : "车辆"}`} open={modalShow} onOk={handleOk} onCancel={handleCancel}>
            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ subscribeNote: "", useTime: timeSpan }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item name="module" label="所属模块" required={true} rules={[{ required: true, message: '请选择所属模块' }]}>
                        <TreeSelect
                            value={module}
                            onChange={onModuleChange}
                            loadData={onLoadData}
                            treeData={treeData}
                            placeholder="请选择所属模块"
                        >
                        </TreeSelect>
                    </Form.Item>
                    {
                        !vehicleNo ? (<Form.Item name="vehicleId" label="车辆编号" required={true} rules={[{ required: true, message: '请选择车辆编号' }]}>
                            <Select
                                onChange={(val) => { setSelectVehicle(getSelectVehicle(val));}}
                                placeholder="请选择车辆编号"
                                allowClear
                            >
                                {
                                    vehicleList.map(item => (
                                        <Option key={item.id} value={item.id}>{`${item.vehicleNo}  -  ${item.project}`}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>) : ""
                    }
                    <Form.Item name="useTime" label="用车时间" required={true} rules={[{ required: true, message: '请输入用车时间' }]}>
                        <RangePicker
                            showTime={{ format: 'HH:mm', minuteStep: 10 }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={["开始时间", "结束时间"]}
                            disabledDate={disabledDate}
                            // onChange={dateChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="约车地点"
                        name="address"
                        required={true}
                        rules={[{ required: true, message: '请输入约车地点' }]}
                    >
                        <Input placeholder='请输入约车地点' />
                    </Form.Item>
                    <Form.Item
                        label="约车目的"
                        name="purpose"
                        required={true}
                        rules={[{ required: true, message: '请输入约车目的' }]}
                    >
                        <Input placeholder='请输入约车目的' />
                    </Form.Item>
                    <Form.Item
                        label="测试路线"
                        name="route"
                    >
                        <Input placeholder='请输入测试路线' />
                    </Form.Item>
                    <Form.Item name="load" label="是否带挂" required={true} rules={[{ required: true, message: '请选择是否带挂' }]}>
                        <Select
                            placeholder="请选择是否带挂"
                            allowClear
                        >
                            {
                                loadList.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="subscribeNote"
                    >
                        <Input placeholder='请输入备注'/>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default App;