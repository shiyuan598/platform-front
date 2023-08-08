// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2019-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import * as Proto from "@zhito/proto";
import ROSLIB from "@foxglove/roslibjs";
// import { LazyMessageReader } from "@foxglove/rosmsg-serialization";


const subConfig = [
  {
    name: "chassis",
    topic: "/zhito/canbus/chassis",
    proto: "zhito.canbus.Chassis",
    syncEnabled: false,
  },
  {
    name: "localization",
    topic: "/zhito/localization/pose",
    proto: "zhito.localization.LocalizationEstimate",
    cacheSize: 100,
    syncEnabled: true,
  },
  {
    name: "obstacle",
    topic: "/zhito/perception/obstacles",
    proto: "zhito.perception.PerceptionObstacles",
    cacheSize: 1,
    syncEnabled: true,
  },
  {
    name: "planning",
    topic: "/zhito/planning",
    proto: "zhito.planning.ADCTrajectory",
    cacheSize: 1,
    syncEnabled: true,
  }
]

const MAX_DELAY_MS = 100;
var textEncoder = new TextEncoder();
const ObservedType = {
  /** @type {Proto.zhito.canbus.Chassis|undefined} */
  chassis: null,
  /** @type {Proto.zhito.perception.PerceptionObstacles|undefined} */
  obstacle: null,
  /** @type {Proto.zhito.localization.LocalizationEstimate undefined} */
  pose: null,
  /** @type {Proto.zhito.planning.ADCTrajectory|undefined} */
  planning: null
}

export default class RosBridgePlayer {
  constructor(){
    this._ros = new ROSLIB.Ros({url:`ws://${window.location.hostname}:9090`});
    this.ready = false;
    this.initialize();
    /** @type {ObservedType} */
    this.observed = {
      chassis: null,
      obstacle: null,
      pose: null,
      planning: null
    }
    this.cachedPos = []
  }

  reset(){
    this.observed = {
      chassis: null,
      obstacle: null,
      pose: null,
      planning: null
    }
  }

  /**
   * 
   * @return {ObservedType|undefined}
   */
  getSyncMessages(){
    if(this.cachedPos.length===0){
      return undefined;
    }
    const observed = this.observed;
    this.reset();
    const currentTime = observed.obstacle?.header.timestamp_sec ?? observed.planning?.header.timestamp_sec;
    if(currentTime>0){
      let minDelta = 100;
      let matchedIndex = -1;
      this.cachedPos.forEach((pos,i)=>{
        const poseTime = pos.header.timestamp_sec;
        const delta = Math.abs(poseTime-currentTime)
        if(delta<minDelta){
          minDelta = delta;
          matchedIndex = i
        }
      })
      if(matchedIndex>-1){
        observed.pose = this.cachedPos[matchedIndex];
        this.cachedPos = this.cachedPos.slice(matchedIndex+1,this.cachedPos.length);
      }
    }else{
      observed.pose = this.cachedPos.pop();
      this.cachedPose = [];
    }
    return observed;
  }

  async initialize(){
    const ros = this._ros;


    subConfig.forEach(item=>{
      const name = item.name;
      let decoder = Proto;
      item.proto.split(".").map(key => {
        decoder = decoder[key] || {};
      })
      const listener = new ROSLIB.Topic({
        ros : ros,
        name : item.topic,
        compression: "cbor"
        // messageType : 'zhito2ros_msg/ZhitoProto'
      });
      listener.subscribe((message) => {
        try{
          if(!decoder?.decode){
            return;
          }
          const decodedMsg = decoder?.decode(message.data);
          if(name!=="localization"){
            this.observed[name] = decodedMsg
          } else{
            this.cachedPos.push(decodedMsg)
            if(this.cachedPos.length>item.cacheSize){
              this.cachedPos = this.cachedPos.slice(this.cachedPos.length-item.cacheSize,this.cachedPos.length);
            }
          }
        } catch(e){
          console.log('decode msg ' +  message.proto + ' failed');
        }

        
      });
    })

    return new Promise((resolve,reject)=>{
      ros.on('error', (error) => {
        console.log(error);
        this.ready = false;
        reject("ros bridge connection failed");
      });
    
      // Find out exactly when we made a connection.
      ros.on('connection', () => {
        console.log('Connection made!');
        this.ready = true;
        resolve(true);
      });
    
      ros.on('close', function() {
        console.log('Connection closed.');
        this.ready = false;
      });
    
      // Create a connection to the rosbridge WebSocket server.
      ros.connect('ws://localhost:9090');
    })
  
    // Then we add a callback to be called every time a message is published on this topic.
    
  }
}

