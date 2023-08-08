import React, { useState, useEffect, Fragment } from "react";
import "../style/info.scss";
import useRosMsgs from "../hooks/useRosMsgs";

function padStart(str, length=2, fillStr="0") {
  let res = str += "";
  return res.padStart(length, fillStr);
}

export default function Info() {
  const [speed, setSpeed] = useState(0);
  const msgs = useRosMsgs();

  useEffect(() => {
    if (msgs?.chassis?.speed_mps) {
      let v = (msgs?.chassis?.speed_mps * 3.6).toFixed(0);
      setSpeed(v);
    }
  }, [msgs]);

  let date = new Date();

  return (
    <Fragment>
      <div className="title-container">
        <div className="logo"></div>
        <div className="title">ZHITO AUTOPOLIT</div>
      </div>
      <div className='info-container'>
        <p className="speed">
          <span className='number'>{speed}</span>
          <span className='unit'>KM/H</span>
        </p>
        <p className="time">
          {/* <span>{date.getFullYear() + "-" + padStart(date.getMonth() + 1) + "-" + padStart(date.getDate())}</span><br></br> */}
          <span>{padStart(date.getHours()) + ":" + padStart(date.getMinutes()) + ":" + padStart(date.getSeconds())}</span>
        </p>
      </div>
      <div className="traffic-light"></div>
    </Fragment>
  )
}
