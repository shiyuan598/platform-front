import { post } from "./fetchTool";

function getSummary(
    values: { [propName: string]: string | number } = {
        id: ""
    }
) {
    return post("/l3-vehicle/monitor/fault/total", values);
}

function getErrorcodeStatis(
    values: { [propName: string]: string | number } = {
        id: 0
    }
) {
    return post("/l3-vehicle/monitor/fault/code", values);
}

function getAbortStatis(
    values: { [propName: string]: string | number } = {
        dateFrom: "",
        dateTo: "",
        id: 0
    }
) {
    return post("/l3-vehicle/monitor/fault/abort", values);
}

function getTakeoverStatis(
    values: { [propName: string]: string | number } = {
        dateFrom: "",
        dateTo: "",
        id: 0
    }
) {
    return post("/l3-vehicle/monitor/fault/takeover", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSummary,
    getErrorcodeStatis,
    getAbortStatis,
    getTakeoverStatis
};
