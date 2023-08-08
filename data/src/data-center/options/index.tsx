import { Input, Select, TreeSelect, DatePicker } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import { useState, useContext } from 'react';
import optionsStyle from './options.module.scss';
import { RangeValue, conditionType } from "../index.d";
import { ConditionContext } from "../context/index";
import tagData from '../data/tag';
import carName from '../data/carName';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const App = () => {
    const { condition, addCondition } = useContext(ConditionContext) as {
        condition: conditionType, addCondition: Function
    };;
    const handleChange = (data: { key: string, value: string | any }) => {
        addCondition(data);
    }
    const [name, setName] = useState("");
    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleChange({
                key: "name", value: e.target.value
            });
        }
    }

    const onSearch = (v: any) => {
        handleChange({
            key: "name", value: v
        });
    }

    const handleDateChange = (val: RangeValue) => {
        if (val && val[0] && val[1]) {
            handleChange({
                key: "date", value: val
            });
        }
    }

    const [dates, setDates] = useState<RangeValue>(null);
    const disabledDate = (current: Moment) => {
        if (!dates) {
            return false;
        }
        // 当前日期之后的不能选择
        if (current.isAfter(moment())) {
            return true;
        }
        // 选择的时间范围不超过90天
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 90;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 90;
        return !!tooEarly || !!tooLate;
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            setDates([null, null]);
        }
    };

    return (<ul className={optionsStyle.container}>
        <li>
            <span className={optionsStyle.label}>车型:</span>
            <Select
                placeholder={"请选择车型"}
                value={condition.carName}
                style={{
                    width: 240,
                }}
                onChange={(v) => {
                    handleChange({
                        key: "carName", value: v
                    })
                }}
            >
                {carName.map((item) => (<Option key={item} value={item}>{item}</Option>))}
            </Select>
        </li>
        <li>
            <span className={optionsStyle.label}>标签:</span>
            <TreeSelect
                placeholder={"请选择标签"}
                fieldNames={{ label: "label", value: "value", children: "subTag" }}
                style={{ width: 240 }}
                value={condition.tag as string}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={tagData}
                treeDefaultExpandedKeys={["0"]}
                onChange={(v: string) => {
                    handleChange({
                        key: "tag", value: v
                    })
                }}
            />
        </li>
        <li>
            <span className={optionsStyle.label}>日期:</span>
            <RangePicker
                allowClear={false}
                style={{ width: 240 }}
                placeholder={["开始时间", "结束时间"]}
                value={condition.date as RangeValue}
                disabledDate={disabledDate}
                onCalendarChange={val => setDates(val)}
                onChange={val => { handleDateChange(val) }}
                onOpenChange={onOpenChange}
            />
        </li>
        {
            !condition.bagName ? <li>
                <span className={optionsStyle.label}>名称:</span>
                <Search allowClear placeholder="请输入名称查询" value={name} onChange={val => setName(val.target.value)} onKeyDown={handleKeyDown} onSearch={onSearch} style={{ width: 240 }} />
            </li> : ""
        }
    </ul>);
};

export default App;
