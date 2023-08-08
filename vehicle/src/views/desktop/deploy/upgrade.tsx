import React, { useState, useEffect } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Switch, Select, Empty, message, Button } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import type { ColumnsType } from "antd/es/table";
import { deploy as deployApi } from "../../../api";
import style from "./deploy.module.scss";
import ReactJSONViewer from "react-json-view";
import { getUserInfo } from "../../../common/user";
import showConfirm from "../../../components/common/confirmModal";

interface ProjectType {
    id: number;
    name: string;
    vehicles: string;
    artifacts_url: string;
}
interface PackageDataType {
    key: string;
    name: string;
    isCur: boolean;
    isLocal: boolean;
}

export default function Upgrade() {
    const [projectId, setProjectId] = useState<number>(); // 项目编号
    const [selectedProject, setSelectedProject] = useState<ProjectType>(); // 当前选择的项目
    const [projectList, setProjectList] = useState<ProjectType[]>([]);
    const [vehicleList, setVehicleList] = useState<string[] | undefined>([]);
    const [vehicles, setVehicles] = useState<string[]>();
    const [packageList, setPackageList] = useState<string[] | undefined>([]);
    const [selectedPackages, setSelectedPackages] = useState<string[]>();
    const [clickedPackage, setClickedPackage] = useState<string>(); // 点击的版本，会显示json
    const [curPackage, setCurPackage] = useState<string>(); // 设置为当前的版本
    const [packageJson, setPackageJson] = useState<object | null>();
    const [tableDataSource, setTableDataSource] = useState<PackageDataType[]>();

    // 初始化查询所有项目
    useEffect(() => {
        deployApi.getProjects().then((v) => {
            if (v.code === 0) {
                setProjectList(v.data);
                if (v.data.length) {
                    setProjectId(v.data[0].id);
                }
            } else {
                message.error(v.msg);
            }
        });
    }, []);

    // 解析项目包含的车辆，并查询项目对应的所有包
    useEffect(() => {
        // 当前选择的项目
        const curProject = projectList.find((item) => item.id === projectId);
        setSelectedProject(curProject);

        // 解析出车辆列表，并选择一辆车
        const vehicleStr = curProject?.vehicles;
        const vehicleArr = vehicleStr?.split(",");
        setVehicleList(vehicleStr?.split(",")); // 车辆列表
        vehicleArr && setVehicles([vehicleArr[0]]);
        setSelectedPackages(undefined); // 清空选择的版本
        setCurPackage(undefined);

        // 查询一个项目下的所有可用的包
        curProject?.artifacts_url &&
            deployApi.getPackages(curProject?.artifacts_url).then((v) => {
                if (v.code === 0) {
                    setPackageList(v.data);
                    if (!v.data) {
                        setPackageList([""]);
                    }
                } else {
                    message.error(v.msg);
                }
            });
    }, [projectList, projectId]);

    useEffect(() => {
        if (vehicles?.length === 1) {
            deployApi.getVehicleInfo(vehicles[0]).then((v) => {
                if (v.code === 0 && v.data && v.data[0]) {
                    const { cur_package, local_packages } = v.data[0];
                    const local_packageArr = local_packages.split(",");
                    setTableDataSource(
                        packageList?.map((value) => {
                            return {
                                key: value,
                                name: value,
                                isCur: value === cur_package,
                                isLocal: local_packageArr.includes(value)
                            };
                        })
                    );
                } else {
                    setTableDataSource(
                        packageList?.map((value) => {
                            return {
                                key: value,
                                name: value,
                                isCur: false,
                                isLocal: false
                            };
                        })
                    );
                    if (v.code === 1) {
                        message.error(v.msg);
                    }
                }
            });
        } else {
            setTableDataSource(
                packageList?.map((value) => {
                    return {
                        key: value,
                        name: value,
                        isCur: false,
                        isLocal: false
                    };
                })
            );
        }
    }, [vehicles, packageList]);

    useEffect(() => {
        setPackageJson(null);
        selectedProject &&
            clickedPackage &&
            deployApi.getJsonOfPackage(selectedProject?.name, clickedPackage).then((v) => {
                if (v.code === 0) {
                    setPackageJson(v.data);
                } else {
                    message.error(v.msg);
                }
            });
    }, [selectedProject, clickedPackage]);

    const projectChange = (value: number) => {
        setProjectId(value);
    };

    const handleVehicleClick = (e: any, v: string) => {
        // 1.不按ctrl键，只选则当前点击的车辆 ok
        // 2.按ctrl键，单击选择or取消选择，实现多选 ok
        // 3.多选车辆时不展示版本的标签 ok
        // 4.高亮的选择需要判断包含 ok
        // 5.升级时车辆，单版本需要判断设置的当前版本==升级版本；单车时需要判断哪些是车端已有版本
        if (e.ctrlKey) {
            // 按ctrl键，单击选择or取消选择，实现多选
            if (vehicles?.includes(v)) {
                if (vehicles.length > 1) {
                    setVehicles([...vehicles.filter((item) => item !== v)]);
                }
            } else {
                vehicles ? setVehicles([...vehicles, v]) : setVehicles([v]);
            }
        } else {
            // 不按ctrl键，只选则当前点击的车辆
            setVehicles([v]);
        }
    };

    const handlePackageClick = (value: string) => {
        setClickedPackage(value);
    };

    const showJson = (e: any, v: any) => {
        e.stopPropagation();
        setClickedPackage(v);
    };

    // 升级单个版本，可能是多个车
    const singleUpgrade = (e: any, v: any) => {
        e.stopPropagation();
        if (!selectedProject || !vehicles) {
            return;
        }
        // 只有一辆车时查询是否为车端已有版本，多车时按artifacts中版本处理
        const isLocal = tableDataSource?.find((d) => d.name === v)?.isLocal;
        let package_on_artifacts: string[] = [];
        let package_on_vehicle: string[] = [];
        if (vehicles?.length === 1) {
            package_on_artifacts = isLocal ? [] : [v];
            package_on_vehicle = isLocal ? [v] : [];
        } else {
            package_on_artifacts = [v];
        }
        upgradeTask(
            selectedProject,
            vehicles,
            package_on_artifacts,
            package_on_vehicle,
            curPackage === v ? v : ""
        ).then((v) => {
            message.info("已开始升级，请到升级任务中查看详情。");
            setSelectedPackages(undefined);
            setCurPackage(undefined);
        });
    };

    // 升级多个车的多个版本
    const multiUpgrade = () => {
        if (!selectedProject || !vehicles || !selectedPackages?.length) {
            return;
        }
        // 只有一辆车时查询是否为车端已有版本，多车时都按artifacts中版本处理
        let package_on_artifacts: string[] = [];
        let package_on_vehicle: string[] = [];
        if (vehicles?.length === 1) {
            package_on_artifacts = selectedPackages.filter((p) => !tableDataSource?.find((v) => v.name === p)?.isLocal);
            package_on_vehicle = selectedPackages.filter((p) => tableDataSource?.find((v) => v.name === p)?.isLocal);
        } else {
            package_on_artifacts = [...selectedPackages];
        }
        upgradeTask(selectedProject, vehicles, package_on_artifacts, package_on_vehicle, curPackage).then((v) => {
            message.info("已开始升级，请到升级任务中查看详情。");
            setSelectedPackages(undefined);
            setCurPackage(undefined);
        });
    };

    const upgradeTask = (
        project: ProjectType,
        vehicles: string[],
        package_on_artifacts: string[],
        package_on_vehicle: string[],
        curPackage: string = ""
    ) => {
        const allPackages = [...package_on_artifacts, ...package_on_vehicle];
        const content = (
            <>
                <ul className="upgrade-info">
                    <li>
                        <span className="label">选择的车辆：</span>
                        <span className="value">{vehicles?.join(", ")}</span>
                    </li>
                    {allPackages.map((v, i) => {
                        return (
                            <li key={v}>
                                <span className="label">{i === 0 ? "选择的版本：" : ""}</span>
                                <span className="value">{v}</span>
                            </li>
                        );
                    })}
                    {curPackage && (
                        <li>
                            <span className="label">设为当前的版本：</span>
                            <span className="value">{curPackage}</span>
                        </li>
                    )}
                </ul>
            </>
        );

        return new Promise((resolve, reject) => {
            showConfirm({
                title: "确认信息",
                content: content,
                onOk: () => {
                    deployApi
                        .generatorTask({
                            project: project.id,
                            project_artifacts: project.artifacts_url,
                            creator: getUserInfo().id,
                            vehicles: vehicles.join(","),
                            package_on_artifacts: package_on_artifacts.join(","),
                            package_on_vehicle: package_on_vehicle.join(","),
                            cur_package: curPackage
                        })
                        .then((v) => {
                            console.info(v);
                            if (v.code === 1) {
                                message.error(v.msg);
                            }
                            resolve(v.code);
                        })
                        .catch(() => {
                            reject();
                        });
                }
            });
        });
    };

    const columns: ColumnsType<PackageDataType> = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (v: string) => (
                <span style={{ cursor: "pointer" }} onClick={() => handlePackageClick(v)}>
                    {v}
                </span>
            )
        },
        {
            title: "标签",
            key: "tags",
            render: (record) => (
                <>
                    {vehicles?.length === 1 ? (
                        <>
                            {record.isLocal && <Tag color="blue">{"车端版本"}</Tag>}
                            {record.isCur && <Tag color="green">{"当前版本"}</Tag>}
                        </>
                    ) : null}
                </>
            )
        },
        {
            title: "设为当前",
            dataIndex: "name",
            render: (v: string) => (
                <Tooltip title={"升级后将该版本设为车端当前"}>
                    <Switch
                        size="small"
                        key={v + "setCur"}
                        checked={v === curPackage}
                        onClick={() => {
                            if (curPackage === v) {
                                setCurPackage(undefined);
                            } else {
                                setCurPackage(v);
                                // 如果将该版本设置为当前，也将勾选该版本
                                selectedPackages?.length
                                    ? setSelectedPackages([...new Set([...selectedPackages, v])])
                                    : setSelectedPackages([v]);
                            }
                        }}
                    />
                </Tooltip>
            )
        },
        {
            title: "操作",
            dataIndex: "name",
            width: 100,
            render: (v: string) => (
                <>
                    <a href="#!" onClick={(e) => showJson(e, v)}>
                        查看
                    </a>
                    <a href="#!" onClick={(e) => singleUpgrade(e, v)}>
                        升级
                    </a>
                </>
            )
        }
    ];

    const rowSelection: TableRowSelection<PackageDataType> = {
        selectedRowKeys: selectedPackages,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedPackages(newSelectedRowKeys.map((item) => item.toString()));
            // 如果设为当前的版本去掉了勾选，那么取消当前版本的设定
            if (curPackage && !newSelectedRowKeys.includes(curPackage)) {
                setCurPackage(undefined);
            }
        }
    };

    return (
        <div className={style.container}>
            <h4>远程升级</h4>
            <div className={style.tools}>
                <span className={style.label}>所属项目:</span>
                <Select
                    style={{ width: "200px", marginRight: "20px" }}
                    value={projectId}
                    placeholder="请选择所属项目"
                    onChange={projectChange}
                    options={projectList.map((item: any) => {
                        return { value: item.id, label: item.name };
                    })}></Select>
                <Tooltip title={selectedPackages?.length ? "升级选择的版本" : "请选择要升级的版本"}>
                    <Button disabled={!selectedPackages?.length} type="primary" onClick={multiUpgrade}>
                        批量升级
                    </Button>
                </Tooltip>
            </div>
            <div className={style.main}>
                <div className={style.left}>
                    <h4>
                        车辆列表{" "}
                        <Tooltip title="按Ctrl键可多选">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </h4>
                    {vehicleList ? (
                        <ul>
                            {vehicleList.map((v) => (
                                <li
                                    key={v}
                                    className={vehicles?.includes(v) ? style.active : ""}
                                    onClick={(e) => handleVehicleClick(e, v)}>
                                    {v}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Empty style={{ marginTop: "35%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                </div>
                <div className={style.content}>
                    <h4>版本列表</h4>
                    {tableDataSource ? (
                        <Table
                            pagination={false}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={tableDataSource}
                        />
                    ) : (
                        <Empty style={{ marginTop: "35%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                </div>
                <div className={style.right}>
                    <h4>{clickedPackage ? `描述文件 - ${clickedPackage}` : "描述文件"}</h4>
                    {packageJson ? (
                        <ReactJSONViewer
                            style={{ padding: "8px 0 0 8px" }}
                            displayDataTypes={false}
                            theme="ashes"
                            src={packageJson}></ReactJSONViewer>
                    ) : (
                        <Empty style={{ marginTop: "35%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                </div>
            </div>
        </div>
    );
}
