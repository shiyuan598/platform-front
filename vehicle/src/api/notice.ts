import { get, post, del } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

function getNoticeList() {
    return get(baseUrl + "/notice/list");
}

function getSummary() {
    return get(baseUrl + "/statis/summary");
}

function addNotice(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/notice/add", values);
}

function deleteNotice(id: number) {
    return del(baseUrl + "/notice/delete", {
        id
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSummary,
    getNoticeList,
    addNotice,
    deleteNotice
};
