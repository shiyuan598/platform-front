import List from './list';
import { Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import style from './vehicle.module.scss';
import { ModalContext } from '../../../context';
import AddVehicleModal from './addVehicle';
import { isAdmin } from "../../../common/user";

const { Search } = Input;

export default function App() {
    const [modalShow, setModalShow] = useState(false);
    const [keyword, setKeyword] = useState<string>("");
    
    const addVehicle = () => {
        setModalShow(true);
    }

    const onSearch = (value: string) => {
        setKeyword(value);
    };
    return (
        <div>
            <h4>车辆列表</h4>
            <div className={style.tools}>
                {isAdmin() && <Button type="primary" icon={<PlusOutlined />} onClick={addVehicle} >添加车辆</Button>}
                <Search placeholder="输入关键字后按Enter键查询" onSearch={onSearch} enterButton />
                <ModalContext.Provider value={{ modalShow, setModalShow }}>
                    {modalShow && <AddVehicleModal></AddVehicleModal>}
                </ModalContext.Provider>
            </div>
            <List keyword={keyword}></List>
        </div>
    )
}
