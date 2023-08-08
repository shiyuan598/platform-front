import { get, post, del } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

function getVehicle(pageNo: number, name = "", order = "", seq = "") {
    return get(baseUrl + "/vehicle/list", {
        pageNo,
        name: encodeURIComponent(name),
        order,
        seq
    });
}

function getUseTime(start: string, end: string, vehicleIds: string = "") {
    return get(baseUrl + "/vehicle/usetime", {
        start,
        end,
        vehicleIds
    });
}

function checkNoExist(vehicleNo: string) {
    return get(baseUrl + "/vehicle/check/noexist", {
        vehicleNo
    });
}

function addVehicle(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/vehicle/add", values);
}

function editVehicle(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/vehicle/update", values);
}

function deleteVehicle(id: string) {
    return del(baseUrl + "/vehicle/delete", {
        id
    });
}

function getAvailableVehicle(projectIds: string = "", keyword: string = "") {
    return get(baseUrl + "/vehicle/list/available", {
        projectIds,
        keyword
    });
}

function getOrderSummary(vehicleId: string) {
    return get(baseUrl + "/order/summary", {
        vehicleId
    });
}

function getOrderPresent(vehicleId: string) {
    return get(baseUrl + "/order/present", {
        vehicleId
    });
}

function getVehiclesPosition() {
    return get(baseUrl + "/vehicle/position");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getVehicle,
    getUseTime,
    checkNoExist,
    addVehicle,
    editVehicle,
    deleteVehicle,
    getAvailableVehicle,
    getOrderSummary,
    getOrderPresent,
    getVehiclesPosition
};
