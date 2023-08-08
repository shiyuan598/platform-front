import { createContext } from 'react';

export const DataContext: {
    curRow?: object,
    setCurRow?: Function
    orderNum?: number,
    setOrderNum?: Function,
} | any = createContext(null);