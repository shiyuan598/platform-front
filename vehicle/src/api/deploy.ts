import { get, post } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.deployApi;

// 查询所有项目
function getProjects() {
    return get(baseUrl + "/projects");
}

// 查询一个目录下的所有包，artifacts_url在项目上配置
function getPackages(artifacts_url: string) {
    return get(baseUrl + "/packages", { artifacts_url });
}

// 查询一个包对应的json描述文件
function getJsonOfPackage(projectName: string, packageName: string) {
    return get(baseUrl + "/package/json", { projectName: projectName, packageName });
}

// 查询一辆车的版本信息，支持分页，参数：vehicle、page_no、page_size
function getPackageOfVehicle(params: { [propName: string]: string | number }) {
    return get(baseUrl + "/package/list", params);
}

// 查询一个项目的信息
function getVehicleInfo(vehicle: string) {
    return get(baseUrl + "/vehicle/info", { vehicle });
}

// 查询进行中的任务组
function geTaskGroup(params: { [propName: string]: string | number }) {
    return get(baseUrl + "/group/list", params);
}

// 查询升级任务
function getTask(params: { [propName: string]: string | number }) {
    return get(baseUrl + "/task/list", params);
}

// 升级任务
function generatorTask(params: { [propName: string]: string | number }) {
    return post(baseUrl + "/task/upgrade", params);
}

// 操作任务
function operateTask(params: { [propName: string]: string | number }) {
    return post(baseUrl + "/task/operate", params);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getProjects,
    getPackages,
    getJsonOfPackage,
    getPackageOfVehicle,
    getVehicleInfo,
    geTaskGroup,
    getTask,
    generatorTask,
    operateTask
};
