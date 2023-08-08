
const fs = require("fs");
const path = require("path");
var {parse} =require("@foxglove/rosmsg")

const ZhitoMsgDefs = {}
function genFileList(filepath) {
  var filesList = [];
  readFile(filepath, filesList);
  return filesList;
}

function readFile(filepath, filesList) {
  files = fs.readdirSync(filepath); // 需要用到同步读取
  files.forEach(
    /**
     *
     * @param {string} file
     */
    (file) => {

        states = fs.statSync(filepath + "/" + file);
        if (states.isDirectory()) {
            readFile(filepath + "/" + file, filesList);
        } else {
            if(file.endsWith(".msg")){
              const def = fs.readFileSync(path.resolve(filepath,file),"utf-8");
              const ns = filepath.split("./src/")[1]+"/"+file.split(".msg")[0]
              ZhitoMsgDefs[ns] = def
            }
              // console.log(filepath,file)
        }
  });
}

let res = genFileList("./src"); // __dirname是当前路径，可以修改
const outputStr = `export default ${JSON.stringify(ZhitoMsgDefs)}`
fs.writeFileSync("index.js",outputStr)
