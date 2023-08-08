// 字节转为合适的单位
export function changeSizeUnit(byte) {
    if (typeof byte !== "number") return "";
    var size = "";
    if (byte < 1024) { //如果小于1KB转化成B  
        size = byte + "B";
    } else if (byte < 1024 * 1024) {//如果小于1MB转化成KB  
        size = (byte / 1024).toFixed(2) + "KB";
    } else if (byte < 1024 * 1024 * 1024) { //如果小于1GB转化成MB  
        size = (byte / (1024 * 1024)).toFixed(2) + "MB";
    } else if (byte < 1024 * 1024 * 1024 * 1024) { //如果小于1TB转化成GB 
        size = (byte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    else { //其他转化成TB  
        size = (byte / (1024 * 1024 * 1024 * 1024)).toFixed(2) + "TB";
    }

    //当小数点后为00时 去掉小数部分
    var sizeStr = size + "";
    var len = sizeStr.indexOf(".");
    var dec = sizeStr.substring(len + 1, len + 3);
    if (dec === "00") { 
        return sizeStr.substring(0, len) + sizeStr.substring(len + 3);
    }
    return sizeStr;
}