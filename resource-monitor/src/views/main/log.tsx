import React, { useEffect, useState } from "react";
import { Input, Button, List, Spin, Tag, Select } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import logApi from "../../api/log";

const { Search } = Input;

interface DataType {
    gender?: string;
    name: {
        title?: string;
        first?: string;
        last?: string;
    };
    email?: string;
    picture: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
}

const App: React.FC = () => {
    const history = useHistory();
    const [pageNo, setPageNo] = useState(1);
    const [type, setType] = useState<number | string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<DataType[]>([]);

    useEffect(() => {
        const pageSize = 6;
        setLoading(true);
        logApi.getData(pageNo, pageSize, type, keyword).then((res: any) => {
            initLoading && setInitLoading(false);
            const newData = list.concat(res.data);
            console.info(newData);
            setList(newData);
            setLoading(false);
            window.dispatchEvent(new Event("resize"));
        });
    }, [pageNo, type, keyword]);

    const getColorByType = (type: number) => {
        let color = "default";
        switch (type) {
            case 1:
                color = "error";
                break;
            case 2:
                color = "warning";
                break;
            case 3:
                color = "default";
                break;
            default:
                break;
        }
        return color;
    };

    const toHomePage = () => {
        history.push("/main");
    };

    const typeChange = (value: string) => {
        console.info("typeChange:", value);
        setList([]);
        setType(value);
        setPageNo(1);
    };

    const onSearch = (value: string) => {
        setList([]);
        setKeyword(value);
        setPageNo(1);
    };

    const onLoadMore = () => {
        setPageNo(pageNo + 1);
    };

    const loadMore =
        !initLoading && !loading ? (
            <div className="mt-6 text-center">
                <Button onClick={onLoadMore}>查看更多...</Button>
            </div>
        ) : initLoading ? null : (
            <div className="text-center">
                <Spin />
            </div>
        );

    return (
        <div className="p-4">
            <div className="flex justify-between font-bold text-base md:text-lg lg:text-xl">
                <h2>日志管理</h2>
                <span className="text-xs md:text-sm lg:text-base cursor-pointer hover:scale-110" onClick={toHomePage}>
                    <HomeOutlined className="align-[2px]" /> 回到首页
                </span>
            </div>

            <div className="clearfix mt-2">
                <Search
                    className="float-right w-[160px] md:w-[240px] lg:w-[360px]"
                    placeholder="输入关键字后按Enter键查询"
                    onSearch={onSearch}
                    enterButton
                />
                <div className="float-right mr-4">
                    <span className="mr-1">类型:</span>
                    <Select
                        className="w-[80px] md:w-[120px] lg:w-[150px]"
                        allowClear
                        value={type ? type.toString() : ""}
                        defaultValue={"34"}
                        placeholder="请选择类型"
                        onChange={typeChange}
                        options={[
                            { value: "", label: "全部" },
                            { value: "1", label: "Error" },
                            { value: "2", label: "Warn" },
                            { value: "3", label: "Info" }
                        ]}></Select>
                </div>
            </div>
            <List
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item: any) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <span>
                                    <Tag color={getColorByType(item.type)}>{item.typename.toUpperCase()}</Tag>
                                    <Tag>{item.create_time}</Tag>
                                </span>
                            }
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default App;
