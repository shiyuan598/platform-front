import { get } from "./fetchTool";

const getData = (pageNo: number, pageSize: number, type: number|string, keyword: string = "") => {
    return get("/monitor/logs", {
        pageNo,
        pageSize,
        type,
        keyword
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getData: getData
};
