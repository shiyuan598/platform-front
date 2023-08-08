// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import { makeStyles, Stack, Text } from "@fluentui/react";


// import { useDataSourceInfo } from "@foxglove/studio-base/PanelAPI";
// import usePublisher from "@foxglove/studio-base/hooks/usePublisher";
// import RoutingPanel from "./RoutingPanel";
import { observer } from "mobx-react-lite"
import { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";

import { ToolGroup } from "@foxglove/studio-base/components/ExpandingToolbar";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import Radio from "@foxglove/studio-base/components/Radio";
import STORE from "@foxglove/studio-base/context/Dreamview/"
import { useDreamviewServer } from "@foxglove/studio-base/context/Dreamview/Dreamview";
import HMI from "@foxglove/studio-base/context/Dreamview/hmi";
import { LOCAL_MAP_RADIUS } from "@foxglove/studio-base/panels/ThreeDimensionalViz/OfflineMap";
import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { JSONArray, JSONObject } from "@foxglove/studio-base/types/Messages";
import { SaveConfig } from "@foxglove/studio-base/types/panels";

import helpContent from "./index.help.md";

type PoiPanelProps = {
    config: unknown;
    saveConfig: SaveConfig<unknown>;
};

const useStyles = makeStyles(() => ({


    button: {

    },
    root: {
        flexFlow: "wrap",
        " > div": {
            width: "140px"
        }
    }

}))

const RoutingPanel = observer((_props: PoiPanelProps & { hmi: HMI }) => {
    // const { topics } = PanelAPI.useDataSourceInfo();
    // const { datatypes } = useDataSourceInfo();
    // const [poi, setPoi] = useState<JSONArray>([]);
    const { localization } = useWorldStore(state => ({ localization: state.localization }))
    const [select, setSelect] = useState("");
    const { hmi } = _props;
    // const [position, setPosition] = useState({ x: 0, y: 0, heading: 0 });
    // const [currentPOI, setCurrentPOI] = useState("");
    const [poiList, setPoiList] = useState<{ id: string, label: string }[]>([]);
    const routingTopic = "/zhito2ros/routing_proxy"
    // const type = "zhito2ros_msg/ZhitoJson"
    const [defaultParkingInfo, setDefaultParkingInfo] = useState({} as any)
    const [defaultRoutingEndPoint, setDefaultRoutingEndPoint] = useState({} as any)
    // const defaultRoutingEndPoint = {} as any;
    // const defaultParkingInfo = {} as any;
    const updateDefaultRoutingEndPoint = useCallback((poi: JSONArray) => {
        for (let i = 0; i < poi.length; ++i) {
            const place = poi[i] as JSONObject;
            const name = place.name as any;
            defaultRoutingEndPoint[name] = place.waypoint;
            defaultParkingInfo[name] = place.parkingInfo;

            // Default string value is empty string in proto.
            // Remove this unset field here to prevent empty string
            // sends in routing request.
            if (defaultParkingInfo[name].parkingSpaceId === "") {
                delete defaultParkingInfo[name].parkingSpaceId;
                if (defaultParkingInfo[name].length === 0) {
                    delete defaultParkingInfo[name];
                }
            }
        }
        setDefaultParkingInfo(defaultParkingInfo);
        setDefaultRoutingEndPoint(defaultRoutingEndPoint);
        // setPoi(poi);
        const list = poi.map((item) => {
            const name = (item as JSONObject).name as string
            return {
                id: name,
                label: name
            }
        })
        setPoiList(list);
    }, [])
    const carPos = useMemo(() => {
        const result = { x: 0, y: 0, heading: 0 };
        result.x = localization.pose?.position?.x || 0;
        result.y = localization.pose?.position?.y || 0;
        result.heading = localization.pose?.heading || 0;

        return result;
    }, [localization])
    useEffect(() => {
        const server = useDreamviewServer();
        server.requestDefaultRoutingEndPoint();
        server.on("DefaultEndPoint", (event) => {
            //@ts-ignore
            updateDefaultRoutingEndPoint(event.poi);
        })
    }, [routingTopic]);

    // const requestRoute = useCallback((_poiName: string) => {

    // }, [carPos])
    // const { [routingTopic]: messages = [] } = PanelAPI.useMessagesByTopic({
    //     topics: [routingTopic],
    //     historySize: 1,
    // }) as unknown as { [key: string]: MessageEvent<ZhitoJSON>[] };

    const mapList = useMemo(() => {
        return hmi.maps.map(map => ({ id: map.replace("/zhito/map/data/", ""), label: map.replace("/zhito/map/data/", "") }))
    }, [hmi.maps])
    const requestMap = useCallback((map: string) => {
        const server = useDreamviewServer();
        server.changeMap(map);
        setTimeout(() => {
            server.requestMapElementIdsByRadius(LOCAL_MAP_RADIUS * 1.5);
        }, 4000)
    }, []);

    const onSelectChange = useCallback((select: string) => {
        setSelect(select);
        // requestRoute(select);
        // setCurrentPOI(select);
        const points = defaultRoutingEndPoint[select];
        const parkingInfo = defaultParkingInfo[select];
        const start = (points.length > 1) ? points[0] : { x: carPos.x, y: carPos.y };
        const start_heading = (points.length > 1) ? null : carPos.heading;
        const end = points[points.length - 1];
        const waypoint = (points.length > 1) ? points.slice(1, -1) : [];
        const server = useDreamviewServer();
        server.requestRoute(start, start_heading, waypoint, end, parkingInfo,
            select);
    }, [carPos]);
    const classes = useStyles()
    return (
        <Stack verticalFill style={{ justifyContent: "center", padding: "10px 20px" }}>
            <PanelToolbar helpContent={helpContent} floating>
            </PanelToolbar>

            <Text >地图：</Text>
            <Stack className={classes.root} >
                <ToolGroup name="Maps">
                    <Radio
                        selectedId={hmi?.currentMap}
                        onChange={(val) => { requestMap(val) }}
                        options={mapList}
                    />
                </ToolGroup>
            </Stack>
            <Text >目的地：</Text>
            <Stack className={classes.root} >
                <ToolGroup name="Topics">
                    <Radio
                        selectedId={select}
                        onChange={(val) => { onSelectChange(val) }}
                        options={poiList}
                    />
                </ToolGroup>
            </Stack>
        </Stack>
    )
})

// type Props = {
//     config: unknown;
//     saveConfig: SaveConfig<unknown>;
// };

// RoutingPanel.panelType = "routing";
// RoutingPanel.supportsStrictMode = false;

export default observer((props: PoiPanelProps) => {
    return <RoutingPanel {...props} hmi={STORE.hmi} />
});
