import React, { useState } from 'react';
import OrderList from "./orderList";
import OrderDetail from "./orderDetail";
import { DataContext } from './context';
import "./style.scss";

const App = () => {
    const [orderNum, setOrderNum] = useState(0);
    const [curRow, setCurRow] = useState(null);
    return (
        <div className='mobile'>
            <DataContext.Provider value={{ orderNum, setOrderNum, curRow, setCurRow }}>
                {
                    curRow ? <OrderDetail></OrderDetail> :  <OrderList></OrderList>
                }
            </DataContext.Provider>
        </div>
    )
};

export default App;