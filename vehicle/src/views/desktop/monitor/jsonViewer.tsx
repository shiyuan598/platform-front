import React, { useState } from "react";
import { Empty } from "antd";
import ReactJSONViewer from "react-json-view";

export default function JsonViewer(props: { data: object | null }) {
    const jsonData = props.data || {
        soc_version: "GSL3-V3NA-v2.4.2.4-20230703-174149",
        map_version: "[103, 99, 106, 47, 109, 97, 112, 100, 97, 116]",
        camera_models: "ai-camera-model/GSL3/2.4.2/20230307_113000/v3na/",
        lidar_models: "ai-lidar-model/GSL3/v3na/20230703/",
        switch: "",
        rs_m1_producer: "",
        CameraProducer: "",
        aduhw_version: "[86, 52, 46, 48, 48, 46, 48, 48]",
        adusw_version: "[51, 46, 48, 48, 46, 49, 55, 0]",
        fl_radar_sw_version:
            "[67, 82, 53, 84, 80, 95, 90, 72, 73, 84, 79, 95, 66, 76, 48, 53, 95, 86, 48, 56, 95, 83, 32, 32, 32]",
        fr_radar_sw_version:
            "[67, 82, 53, 84, 80, 95, 90, 72, 73, 84, 79, 95, 66, 76, 48, 53, 95, 86, 48, 56, 95, 83, 32, 32, 32]",
        front_radar_sw_version: "[3, 0, 1, 5, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
        lidar_fw_version_pl: "[0, 0, 0, 0, 0]",
        lidar_fw_version_ps: "[0, 0, 0, 0, 0]",
        rl_radar_sw_version: "[2, 30, 4]",
        rr_radar_sw_version: "[2, 30, 4]",
        vin: "[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
        zic_data_protocol_version_fs: "144",
        zic_data_protocol_version_ri: "144",
        zic_data_protocol_version_tsr: "144",
        zic_data_protolcol_version_obj: "144",
        zic_data_protolcol_version_sync: "144",
        zic_data_protolcol_version_tfl: "144",
        zicsw_version: "[86, 50, 46, 48, 50, 46, 48, 49]",
        zt_pdk_version: "[118, 52, 46, 48, 46, 48]",
        processmgr_version: "[78, 65, 0, 0, 0, 0]",
        rs_m1_producer_version: "[78, 65, 0, 0, 0, 0]",
        camera_producer_version: "[78, 65, 0, 0, 0, 0]",
        ai_sw_version:
            "[71, 83, 76, 51, 45, 86, 51, 78, 65, 45, 118, 50, 46, 52, 46, 50, 46, 52, 45, 50, 48, 50, 51, 48, 54, 48, 49, 45]",
        aps_version: "[86, 50, 46, 52, 46, 51]",
        adu_mcu_sw_version: "[78, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
        ota_hw_version: "[86, 1, 46, 0]"
    };

    return jsonData ? (
        <ReactJSONViewer
            style={{ padding: "8px 0 0 8px" }}
            displayDataTypes={false}
            theme="ashes"
            src={jsonData}></ReactJSONViewer>
    ) : (
        <Empty style={{ marginTop: "35%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
}
