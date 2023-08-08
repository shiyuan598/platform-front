import { get } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

// 查询所属项目
function getProject() {
    return get(baseUrl + "/dict/project");
}

// 查询所属模块
function getModule(pid = 0) {
    return get(baseUrl + "/dict/module", { pid: pid });
}

// 查询车辆带挂
function getLoad() {
    return get(baseUrl + "/dict/load");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getProject,
    getModule,
    getLoad
};
