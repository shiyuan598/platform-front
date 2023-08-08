import { get, post } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

function getTotal(orderId: number, vehicleNo: string) {
    return get(baseUrl + "/fuel/total", {
        orderId,
        vehicleNo
    });
}

function addFuel(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/fuel/add", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getTotal,
    addFuel
};
