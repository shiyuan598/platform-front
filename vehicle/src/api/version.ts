import { get } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

function getCarInfo(pageNo: number, name?: string) {
    if (name) {
        return get(baseUrl + "/version/carinfo/list", {
            pageNo,
            name: encodeURIComponent(name)
        });
    } else {
        return get(baseUrl + "/version/carinfo/list", {
            pageNo
        });
    }
}

function getCarInfoHistory(carId: string) {
    return get(baseUrl + "/version/carinfo/history", {
        car_id: carId
    });
}

function getCarInfoHistoryDetail(carId: string, timestamp: number) {
    return get(baseUrl + "/version/carinfo/history/detail", {
        car_id: carId,
        timestamp
    });
}

function getCameraInfo(carId: string) {
    return get(baseUrl + "/version/camera/info", {
        car_id: carId
    });
}

function getCamera(carId: string, timestamp: number) {
    return get(
        "/version/camera/data",
        {
            car_id: carId,
            timestamp
        },
        true
    );
}

function getCameraNew(carId: string, id: number) {
    return get(
        "/version/camera/new",
        {
            car_id: carId,
            id
        },
        true
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getCarInfo,
    getCarInfoHistory,
    getCarInfoHistoryDetail,
    getCameraInfo,
    getCamera,
    getCameraNew
};
