import { get, post, del } from "./fetchTool";
import globalConfig from "./globalConfig";

const baseUrl = globalConfig.baseUrl + globalConfig.vehicleApi;

function getUser(pageNo: number, name: string = "", order = "", seq = "") {
    return get(baseUrl + "/user/list", {
        pageNo,
        name: encodeURIComponent(name),
        order,
        seq
    });
}

function addUser(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/user/add", values);
}

function editUser(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/user/update", values);
}

function deleteUser(id: string) {
    return del(baseUrl + "/user/delete", {
        id
    });
}

function getDriver(username?: string) {
    if (username) {
        return get(baseUrl + "/user/driver", {
            username: username
        });
    } else {
        return get(baseUrl + "/user/driver");
    }
}

function login(username: string, password: string) {
    return post(baseUrl + "/user/login", {
        username,
        password
    });
}

function checkNoExist(username: string) {
    return get(baseUrl + "/user/check/noexist", {
        username
    });
}

function checkCorrect(username: string, telephone: string) {
    return get(baseUrl + "/user/check/correct", {
        username,
        telephone
    });
}

function register(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/user/register", values);
}

function resetPassword(values: { [propName: string]: string | number }) {
    return post(baseUrl + "/user/resetpwd", values);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser,
    addUser,
    editUser,
    deleteUser,
    login,
    checkNoExist,
    checkCorrect,
    getDriver,
    register,
    resetPassword
};
