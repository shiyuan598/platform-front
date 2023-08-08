import React, { useState, useEffect } from 'react'
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dashboardStyle from "./dashboard.module.scss"
import Statistics from './statistics';
import Map from './map';
import NoticeList from "./noticeList";
import AddNoticeModal from './addNotice';
import { ModalContext } from '../../../context';
import { useLocation, useHistory } from 'react-router-dom';
import { isAdmin } from "../../../common/user";

function Dashboard() {

  const [modalShow, setModalShow] = useState(false);
  const addNotice = () => {
    setModalShow(true);
  };

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/desktop/home") {
      if (sessionStorage.getItem("mapReload") !== "true") {
        window.location.reload();
        sessionStorage.setItem("mapReload", "true");
      }
    }
  }, [location, history])


  return (
    <div className={dashboardStyle.container}>
      <div className={dashboardStyle.main}>
        <div className={dashboardStyle.statistics}>
          <Statistics></Statistics>
        </div>
        <div className={dashboardStyle.mapContainer}>
          <Map></Map>
        </div>
      </div>
      <div className={dashboardStyle.notice}>
        <div className={dashboardStyle.header}>
          <span>公告</span>
          {isAdmin() && 
            <Tooltip title={"添加公告"}>
              <span className={dashboardStyle.btn} onClick={addNotice}>
                <PlusOutlined />
              </span>
            </Tooltip>
          }
          <ModalContext.Provider value={{ modalShow, setModalShow }}>
            <AddNoticeModal></AddNoticeModal>
          </ModalContext.Provider>
        </div>
        <NoticeList></NoticeList>
      </div>
    </div>
  )
}

export default React.memo(Dashboard);