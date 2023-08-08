import { get } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

// 总览统计：车辆总数、已预订的车辆数、预订总时长、订单总数、未处理订单数
function getSummary() {
    return get(baseUrl + "/statis/summary");
}

// 统计分析：总量统计
function getTotal(values: { [propName: string]: any }) {
    return get(baseUrl + "/statis/total", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSummary,
    getTotal
};
