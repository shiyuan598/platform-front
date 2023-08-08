export const coordinateTransform = {
    /**
     * WGS84转GCj02
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * @param lngData
     * @param latData
     * @returns {*[]}
     */
    wgs84togcj02tobd09(lngData, latData) {
        const xPI = (3.14159265358979324 * 3000.0) / 180.0;
        const PI = 3.1415926535897932384626;
        const a = 6378245.0;
        const ee = 0.00669342162296594323;
        let lng = Number(lngData);
        let lat = Number(latData); // WGS84转GCj02
        let dlat = this.transformlat(lng - 105.0, lat - 35.0);
        let dlng = this.transformlng(lng - 105.0, lat - 35.0);
        let radlat = (lat / 180.0) * PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
        let mglat = lat + dlat;
        let mglng = lng + dlng;
        this.gcj02_to_bd09(mglng, mglat);
    },
    transformlat(lng, lat) {
        const PI = 3.1415926535897932384626
        let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
        return ret
    },
    transformlng(lng, lat) {
        const PI = 3.1415926535897932384626
        let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
        return ret
    },
    // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
    gcj02_to_bd09(mglng, mglat) {
        const xPI = (3.14159265358979324 * 3000.0) / 180.0;
        let z =
            Math.sqrt(mglng * mglng + mglat * mglat) +
            0.00002 * Math.sin(mglat * xPI);
        let theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * xPI);
        let bdlng = z * Math.cos(theta) + 0.0065;
        let bdlat = z * Math.sin(theta) + 0.006; // return [bdlng, bdlat]
        return { lng: bdlng, lat: bdlat };
    },
}
