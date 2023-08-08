import { conditionType } from "../index.d";
import { Breadcrumb, Table, Modal, message, Form, Input } from 'antd';
import { Fragment, useState, useContext, useEffect } from 'react';
import ReactJSONViewer from "react-json-view";
import Highlight from 'react-highlight';

import "highlight.js/styles/base16/solarized-dark.css";
import type { Moment } from 'moment';
import listStyle from "./list.module.scss";
import { ConditionContext } from "../context/index";
import { changeSizeUnit } from "../utils/convert";
import { getSearchParams } from "../utils/urlTool";

const globalConfig = window.globalConfig;

const App = () => {
    const { condition, addCondition, removeCondition } = useContext(ConditionContext) as {
        condition: conditionType, addCondition: Function, removeCondition: Function
    };
    const [loadingList, setLoadingList] = useState(false);
    const [tableData, setTableData] = useState([]); // 列表数据
    const [overviewModalVisible, setOverViewModalVisible] = useState(false);
    const [overviewData, setOverviewData] = useState({}); // 预览的数据
    const [downloadModalVisible, setDownloadModalVisible] = useState(false);
    const [downloadData, setDownloadData] = useState({ tips: "", info: "" }); // 下载信息
    const [relateJiraModalShow, setRelateJiraModalShow] = useState(false); // 关联Jira
    const [relateJiraForm] = Form.useForm();
    const [count, setCount] = useState(0); // 列表的数据个数
    const [preDir, setPreDir] = useState([] as string[]); // 面包屑
    const [issueStatus, setIssueStatus] = useState(0); // 标识创建了一次jira issue
    const [curName, setCurName] = useState(""); // 当前点击的数据的name

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '名称',
            dataIndex: 'showName',
            key: 'name'
        },
        {
            title: '大小',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (v: { id: string, name: string, issueStatus: number, jira_id: string, url: string }) => {
                function getJiraOperate(v: { name: string, jira_id: string }) {
                    if (!condition.bagName) {
                        return "";
                    }
                    if (v.name.includes(".")) {
                        return ""
                    } else {
                        if (!!v.jira_id) {
                            return (<a href="#!" onClick={(e) => handleViewJiraIssue(e, v.jira_id)}>查看Jira</a>);
                        } else {
                            return (<Fragment>
                                <a href="#!" onClick={(e) => handleCreateJiraIssue(e, v.name)}>创建Jira</a>
                                <a href="#!" onClick={(e) => handleRelateJiraIssue(e, v.name)}>关联Jira</a>
                            </Fragment>);
                        }
                    }
                }
                return (<Fragment>
                    <a href="#!" onClick={(e) => downloadFile(e, v)}>下载</a>
                    {v.name.endsWith(".json") ? <a href="#!" onClick={(e) => overviewFile(e, v)}>预览</a> : ""}
                    {!condition.bagName && !v.issueStatus ? <a href="#!" onClick={(e) => handleCreateJiraIssue(e, v.name)}>创建Jira</a> : ""}
                    {getJiraOperate(v)}
                    {v.url && !v.url.includes(".db3") ? <a href="#!" onClick={(e) => handleDisplay(e, v.url)}>播放数据</a> : ""}
                </Fragment>);
            }
        },
    ];

    const handleViewJiraIssue = (e: any, jiraId: string) => {
        e.stopPropagation();
        window.open(globalConfig.jira.software + jiraId, "_blank");
    }

    const handleDisplay = (e: any, dataUrl: string) => {
        e.stopPropagation();
        let downloadUrl = dataUrl.replace(globalConfig.minIO.server, globalConfig.webviz.url);
        let url = `${globalConfig.webviz.url}?ds=record-remote-file&ds.url=${encodeURIComponent(downloadUrl)}`;
        window.open(url, "_blank");
    }

    const createJiraIssue = (name: string, jiraId: string = "") => {
        setLoadingList(true);
        let path = name;
        if (condition.bagName) {
            path = condition.bagName + preDir.join("") + name;
        }
        let url = `${globalConfig.dataApi}/set_jira?bag_name=${path}&jira_id=${jiraId}`;
        return fetch(url, {
            method: "get",
        });
    }

    const handleCreateJiraIssue = (e: any, name: string) => {
        e.stopPropagation();

        setLoadingList(true);
        createJiraIssue(name).then((v) => {
            setIssueStatus(issueStatus + 1);
            message.success("创建成功!");
        })
            .catch(error => {
                console.error('Error:', error);
                message.error("创建失败!");
            }).finally(() => { setLoadingList(false) });
    }

    const handleRelateJiraIssue = (e: any, name: string) => {
        e.stopPropagation();
        setCurName(name);
        setRelateJiraModalShow(true);
    }

    const handleRelateJiraModalOk = () => {
        relateJiraForm.submit();
    }

    const handleRelateJiraModalCancel = () => {
        setRelateJiraModalShow(false);
        relateJiraForm.resetFields();
    }

    const onFinish = (values: any) => {
        createJiraIssue(curName, values.jiraId).then((v) => {
            setIssueStatus(issueStatus + 1);
            message.success("关联成功!");
            setRelateJiraModalShow(false);
            relateJiraForm.resetFields();
        })
            .catch(error => {
                console.error('Error:', error);
                message.error("关联失败!");
            });
    };

    const overviewFile = async (e: any, v: any) => {
        e.stopPropagation();
        let jsonData = await fetch(`${globalConfig.dataApi}/viewfile?bag_name=${condition.bagName + v.name}`, {
            method: "get",
        }).then(v => v.json());
        setOverviewData(jsonData);
        setOverViewModalVisible(true);
    }
    const handleCancelOverviewModel = () => {
        setOverViewModalVisible(false);
    }
    const downloadFile = async (e: any, v: any) => {
        e.stopPropagation();
        const { server, username, password, buckets } = globalConfig.minIO;
        let path = v.name;
        if (condition.bagName) {
            path = condition.bagName + preDir.join("") + v.name;
        }
        setDownloadData({
            tips: `wget "ftp://172.16.18.80/system_package/minio_amd64.deb" -O "minio_client_amd64.deb" --ftp-user=zhito --ftp-password=abcd123$ \nsudo dpkg -i minio_client_amd64.deb \nmcli alias set minio/ ${server} ${username} ${password}`,
            info: `mcli cp --recursive minio/${buckets}/${path} ./minio_download `
        });
        setDownloadModalVisible(true);
    }
    const handleCancelDownloadModel = () => {
        setDownloadModalVisible(false);
    }
    const handleCopy = (data: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(data).then(() => {
                message.success("复制成功！");
            });

        } else {
            const el = document.createElement('textarea');
            el.value = data;
            document.body.appendChild(el);
            el.select();
            const flag = document.execCommand('copy', false);
            document.body.removeChild(el);
            flag && message.success("复制成功！");
        }
    }
    const handleBreadcrumbClick = (name: string, index: number) => {
        if (index === 0 && !preDir.length) { // 只有包名时禁止点击
            return;
        }
        if (index === preDir.length) { // 最后一项禁止点击
            return;
        }
        setPreDir([...preDir.slice(0, index)]);
        if (index < 0) {
            removeCondition("bagName");
        }
    }

    const handleRowDoubleClick = (e: any, v: any) => {
        // 文件不支持点击, 路径后以斜线结束, 文件名含点
        if (v.name.endsWith("/") && !v.name.includes(".")) {
            if (!condition.bagName) { // 点击包名时添加到condition.bagName中
                addCondition({
                    key: "bagName",
                    value: v.name
                });
            } else { // 点击目录时添加到preDir
                setPreDir([...preDir, v.name]);
            }
        }
    }

    useEffect(() => {
        let dir = getSearchParams("dir");
        if (dir) {
            setPreDir([dir]);
            let bagName = getSearchParams("bagName");
            if (bagName) {
                addCondition({
                    key: "bagName",
                    value: bagName + "/"
                });
            }
        }
    }, []);

    useEffect(() => {
        const { bagName = "" } = condition;
        if (bagName === "" && preDir.length) {
            setPreDir([]);
        }
    }, [condition, preDir.length]);

    useEffect(() => {
        if (!condition.bagName && preDir.length) { // 包名为空，但路径有值时 
            return;
        }
        setLoadingList(true);
        const { tag = "", carName = "", date, bagName = "", name = "" } = condition;
        let start: string = "";
        let end: string = "";
        if (date) {
            const dateRange = date as [Moment, Moment];
            let formatter = "YYYY MM DD";
            start = (new Date((dateRange[0] as Moment).format(formatter))).getTime() + "";
            end = (new Date((dateRange[1] as Moment).format(formatter) + " 23:59:59")).getTime() + "";;
        }
        let url = `${globalConfig.dataApi}/query?car_name=${carName}&start_time=${start}&end_time=${end}&tag=${tag}`;
        if (name && !bagName) {
            url += `&bag_name=${name}`;
        } else {
            url += `&bag_name=${(bagName ? bagName : "") + preDir.join("")}`;
        }
        fetch(url, {
            method: "get",
        }).then(response => response.json())
            .then(res => {
                let tableData: { name: string, showName: string }[] = res.result.map((item: any, index: number) => {
                    let { name, events, issueStatus, url, jira_id, size, description } = item;
                    return {
                        events,
                        issueStatus,
                        name,
                        url,
                        jira_id,
                        showName: name.endsWith("/") ? name.substring(0, name.length - 1) : name,
                        size: changeSizeUnit(size),
                        description
                    };
                }
                );
                tableData.sort((a: any, b: any) => a.showName > b.showName ? 1 : -1); // 排序
                tableData = tableData.map((item, index) => ({ // 添加序号
                    id: index + 1,
                    ...item
                }));
                setTableData(tableData as []);
                setCount(res.result.length);
            })
            .catch(error => {
                console.error('Error:', error);
            }).finally(() => { setLoadingList(false) });
    }, [condition, preDir, issueStatus]);

    return (
        <div>
            <div className={listStyle.tools}>
                <span className={listStyle.info}>
                    {count ? `共查询到 ${count} 条数据` : ""}
                </span>
            </div>
            <Breadcrumb separator="">
                {
                    condition.bagName ?
                        <Fragment>
                            <Breadcrumb.Item href="#!" key={"bagName-1"} onClick={() => {
                                handleBreadcrumbClick("", -1)
                            }}>数据包</Breadcrumb.Item>
                            <Breadcrumb.Separator />
                            <Breadcrumb.Item href="#!" onClick={() => {
                                handleBreadcrumbClick(condition.bagName as string, 0)
                            }}>{(condition.bagName as string).substring(0, condition.bagName.length - 1)}</Breadcrumb.Item>
                        </Fragment> : ""
                }
                {
                    preDir.map((item, index) => {
                        return (
                            <Fragment key={item + "breadcrumb"}>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item href="#!" onClick={() => {
                                    handleBreadcrumbClick(item, index + 1)
                                }}>{item.endsWith("/") ? item.substring(0, item.length - 1) : item}</Breadcrumb.Item>
                            </Fragment>
                        )
                    })
                }
            </Breadcrumb>
            <Table
                rowKey={(record: { [propName: string]: any }) => record.id + ''}
                onRow={(record) => {
                    return {
                        onClick: (e) => {
                            handleRowDoubleClick(e, record)
                        }
                    }
                }}
                columns={columns}
                dataSource={tableData}
                loading={loadingList}
            />
            <Modal width={700} title="预览" open={overviewModalVisible} footer={null} onCancel={handleCancelOverviewModel}>
                <ReactJSONViewer displayDataTypes={false} theme="ashes" src={overviewData}></ReactJSONViewer>
            </Modal>
            <Modal destroyOnClose={true} width={700} wrapClassName="code-modal" title="下载" open={downloadModalVisible} footer={null} onCancel={handleCancelDownloadModel}>
                <h3>1.第一次使用请先安装minio-cli:</h3>
                <div className='code-container'>
                    <Highlight className="javascript mycode" >
                        <pre><code className="bash">{downloadData.tips}</code></pre>
                    </Highlight>
                    <a href="#!" onClick={() => { handleCopy(downloadData.tips) }}>复制</a>
                </div>
                <h3>2.下载命令:</h3>
                <div className='code-container'>
                    <Highlight className="javascript mycode" >
                        <pre><code className="bash">{downloadData.info}</code></pre>
                    </Highlight>
                    <a href="#!" onClick={() => { handleCopy(downloadData.info) }}>复制</a>
                </div>
            </Modal>
            <Modal title="关联Jira" open={relateJiraModalShow} onOk={handleRelateJiraModalOk} onCancel={handleRelateJiraModalCancel}>
                <Form form={relateJiraForm} onFinish={onFinish}>
                    <Form.Item
                        label="Jira Id"
                        name="jiraId"
                        rules={[{ required: true, message: '请输入Jira Id!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default App;
