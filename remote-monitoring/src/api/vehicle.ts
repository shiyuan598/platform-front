import { get, post } from "./fetchTool";

function getVehicle(
    values: { [propName: string]: string | number } = {
        createTimeFrom: "",
        createTimeTo: "",
        model: "",
        number: "",
        parts: "",
        softwareVersion: "",
        vin: ""
    }
) {
    return post("/l3-vehicle/info/list", values);
}

function addVehicle(values: { [propName: string]: string | number }) {
    return post("/l3-vehicle/info/add", values);
}

function updateVehicle(values: { [propName: string]: string | number }) {
    return post("/l3-vehicle/info/update", values);
}

function deleteVehicle(id: string) {
    return get("/l3-vehicle/info/del/" + id);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle
};
