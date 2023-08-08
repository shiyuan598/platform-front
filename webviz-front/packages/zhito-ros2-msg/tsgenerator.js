const fs = require("fs");

const { parse, stringify } = require("@foxglove/rosmsg");
const ZHITO_ROS2_MSG = require("./index_common");
const result ={};
Object.keys(ZHITO_ROS2_MSG).map(key=>{
  try{
    result[key] = parse(ZHITO_ROS2_MSG[key],{ros2:true});
  } catch(e){}

})
fs.writeFileSync("./defs.json",JSON.stringify(result))
