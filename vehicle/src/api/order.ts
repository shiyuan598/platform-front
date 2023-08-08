import { get, post, del } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

function getOrder(params: { [propName: string]: string | number }) {
    return get(baseUrl + "/order/list", {
        ...params,
        name: encodeURIComponent(params.name)
    });
}

function getOrderApproved(driver: number, order: string, filter: string) {
    return get(baseUrl + "/order/list", {
        driver,
        order,
        filter
    });
}

function addOrder(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/order/add", values);
}

function deleteOrder(id: number) {
    return del(baseUrl + "/order/delete", {
        id
    });
}

function cancelOrder(id: number) {
    return post(baseUrl + "/order/cancel", {
        id
    });
}

function startOrder(id: number) {
    return post(baseUrl + "/order/start", {
        id
    });
}

function stopOrder(id: number) {
    return post(baseUrl + "/order/stop", {
        id
    });
}

function approveOrder(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/order/update", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getOrder,
    getOrderApproved,
    addOrder,
    deleteOrder,
    cancelOrder,
    startOrder,
    stopOrder,
    approveOrder
};
