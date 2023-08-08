import { List, message, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../context';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import showDeleteConfirm from '../../../components/common/deleteConfirm';
import { notice as noticeApi } from "../../../api";
import { isAdmin } from "../../../common/user";

const App: React.FC = () => {
  const { noticeNum, setNoticeNum } = useContext(DataContext) as {
    noticeNum: number,
    setNoticeNum: Function
  };
  const [data, setData] = useState([] as { id: number, title: string, content: string, createTime: string }[]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    noticeApi.getNoticeList().then(v => {
      if (v.code === 0) {
        setData(v.data);
      } else {
        message.error("出错了");
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  const deleteNotice = (id: number) => {
    showDeleteConfirm({
      title: "删除公告",
      onOk: () => {
        noticeApi.deleteNotice(id).then(v => {
          if (v.code === 0) {
            setNoticeNum(noticeNum + 1);
          } else {
            message.error("出错了");
          }
        });
      }
    });
  }

  useEffect(() => {
    getData();
  }, [noticeNum]);

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<span>{item.title}
              <span style={{
                paddingLeft: "8px",
                color: "#999",
                fontSize: "12px"
              }}>{item.createTime}</span>
            </span>}
            description={
              <div className='list-content'>
                <div>{item.content}</div>
                {isAdmin() && 
                  <Tooltip title={"删除"}>
                    <div className='btn' onClick={() => {
                      deleteNotice(item.id);
                    }} ><DeleteOutlined /></div>
                  </Tooltip>
                }
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
};

export default React.memo(App);