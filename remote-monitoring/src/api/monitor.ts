import { get, post } from "./fetchTool";

function getVehicleState() {
    return get("/l3-vehicle/monitor/state/online");
}

function getVehiclePosition() {
    return get("/l3-vehicle/monitor/state/position");
}

function getPathRealtime(
    values: { [propName: string]: string | number } = {
        id: "",
        number: "",
        vin: ""
    }
) {
    return post("/l3-vehicle/monitor/path/realtime", values);
}

function getPathHistory(
    values: { [propName: string]: string | number } = {
        dateFrom: "",
        dateTo: "",
        id: "",
        number: "",
        vin: ""
    }
) {
    return post("/l3-vehicle/monitor/path/history", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getVehicleState,
    getVehiclePosition,
    getPathRealtime,
    getPathHistory
};
