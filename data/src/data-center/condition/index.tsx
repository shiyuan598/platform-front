import { useContext } from 'react';
import conditionStyle from './condition.module.scss';
import type { Moment } from 'moment';
import { Tag } from "antd";
import {
    DeleteOutlined,
} from '@ant-design/icons';
import { RangeValue, conditionType } from "../index.d"
import { ConditionContext } from "../context/index"
import tags from '../data/tag';

export default function ConditionComp() {
    const { condition, removeCondition, clearCondition } = useContext(ConditionContext) as {
        condition: conditionType, removeCondition: Function, clearCondition: Function
    };
    const handleClose = (tag: any) => {
        removeCondition(tag);
    }
    const clearAll = () => {
        clearCondition()
    }

    function getLabelName(key: string) {
        switch (key) {
            case "carName":
                return "车型";
            case "tag":
                return "标签";
            case "date":
                return "日期";
            case "bagName":
                return "包名";
            case "name":
                return "名称";
            default:
                return key;
        }
    }

    function findTagNameById(tags: any[], value: string):string {
        let len = tags.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                const item = tags[i];
                if (value.startsWith(item.value)) {
                    if (value === item.value) {
                        return item.label;
                    } else {
                        if (item.subTag) {
                            return findTagNameById(item.subTag, value);
                        } else {
                            return value;
                        }
                    }
                }
            }
            return value;
        } else {
            return value;
        }
    }

    function createConditionTag(key: string, value: string | RangeValue) {
        if (key === "date" && value && value[0] && value[1]) {
            const start = value[0] as Moment;
            const end = value[1] as Moment;
            return getLabelName(key) + "：" + start.format("YYYY-MM-DD") + "至" + end.format("YYYY-MM-DD");
        }
        if (key === "tag") {
            return getLabelName(key) + "：" + findTagNameById(tags, value as string);
        }
        if (key === "bagName") {
            let item = value as string;
            return getLabelName(key) + "：" + (item.endsWith("/") ? item.substring(0, item.length - 1) : item);
        }
        return getLabelName(key) + "：" + value;
    }

    const keys = Object.keys(condition).filter(item => item !== "name");

    return (
        <div className={conditionStyle.container}>
            <div className={conditionStyle.tips}>已选择的条件:</div>
            <div className={conditionStyle.tags}>
                {keys.map((key) => (condition[key] ? <Tag key={key} closable onClose={() => { handleClose(key) }}>{createConditionTag(key, condition[key])}</Tag> : null))}
            </div>
            <div className={conditionStyle.clear} onClick={clearAll}><DeleteOutlined />清空筛选条件</div>
        </div>
    )
}
