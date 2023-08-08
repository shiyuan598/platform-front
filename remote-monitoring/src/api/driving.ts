import { post } from "./fetchTool";

function getSummary(
    values: { [propName: string]: string | number } = {
        id: ""
    }
) {
    return post("/l3-vehicle/monitor/driving/data", values);
}

function getFuelStatis(
    values: { [propName: string]: string | number } = {
        dateFrom: "",
        dateTo: "",
        id: 0
    }
) {
    return post("/l3-vehicle/monitor/driving/fuel", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSummary,
    getFuelStatis
};
