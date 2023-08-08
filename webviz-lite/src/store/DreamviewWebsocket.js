import { Evented } from "leaflet";

// import STORE from "./index";
// import RENDERER from "renderer";
// import MAP_NAVIGATOR from "components/Navigation/MapNavigator";
// import UTTERANCE from "store/utterance";
// import Worker from 'utils/webworker.js';

export default class RealtimeWebSocketEndpoint extends Evented {
    constructor(serverAddr) {
        super();
        this.serverAddr = serverAddr;
        this.simWorldUpdatePeriodMs = 100;
        this.simWorldLastUpdateTimestamp = 0;
        this.mapUpdatePeriodMs = 1000;
        this.mapLastUpdateTimestamp = 0;
        this.updatePOI = true;
        this.routingTime = undefined;
        this.currentMode = null;
        this.websocket = this.init();
        // this.worker = new Worker();
        this.ready = false;
    }


    handleMessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            // const message = event.data;
            switch (message.type) {
                case "HMIStatus":
                    // STORE.hmi.updateStatus(message.data);
                    // RENDERER.updateGroundImage(STORE.hmi.currentMap);
                    break;
                    // case "VehicleParam":
                    //     STORE.hmi.updateVehicleParam(message.data);
                    //     break;
                    // case "SimControlStatus":
                    // STORE.setOptionStatus('enableSimControl', message.enabled);
                    break;
                // case "SimWorldUpdate":
                //     this.checkMessage(message);

                //     const isNewMode = (this.currentMode &&
                //                        this.currentMode !== STORE.hmi.currentMode);
                //     const isNavigationModeInvolved = (this.currentMode === 'Navigation' ||
                //                                     STORE.hmi.currentMode === 'Navigation');
                //     this.currentMode = STORE.hmi.currentMode;
                //     if (STORE.hmi.shouldDisplayNavigationMap) {
                //         if (MAP_NAVIGATOR.isInitialized()) {
                //             MAP_NAVIGATOR.update(message);
                //         }

                //         if (STORE.hmi.inNavigationMode) {
                //             // In navigation mode, the coordinate system is FLU and
                //             // relative position of the ego-car is (0, 0). But,
                //             // absolute position of the ego-car is needed in MAP_NAVIGATOR.
                //             message.autoDrivingCar.positionX = 0;
                //             message.autoDrivingCar.positionY = 0;
                //             message.autoDrivingCar.heading = 0;

                //             RENDERER.coordinates.setSystem("FLU");
                //             this.mapUpdatePeriodMs = 100;
                //         }
                //     } else {
                //         RENDERER.coordinates.setSystem("ENU");
                //         this.mapUpdatePeriodMs = 1000;
                //     }

                //     STORE.update(message, isNewMode);
                //     RENDERER.maybeInitializeOffest(
                //         message.autoDrivingCar.positionX,
                //         message.autoDrivingCar.positionY,
                //         // Updating offset only if navigation mode is involved since
                //         // its coordination system is different from rest of the modes.
                //         isNewMode && isNavigationModeInvolved);
                //     RENDERER.updateWorld(message);
                //     this.updateMapIndex(message);
                //     if (this.routingTime !== message.routingTime) {
                //         // A new routing needs to be fetched from backend.
                //         this.requestRoutePath();
                //         this.routingTime = message.routingTime;
                //     }
                //     break;
                case "MapElementIds":
                    // RENDERER.updateMapIndex(message.mapHash,
                    // message.mapElementIds, message.mapRadius);
                    break;
                // case "DefaultEndPoint":
                //     STORE.routeEditingManager.updateDefaultRoutingEndPoint(message);
                //     break;
                // case "RoutePath":
                //     RENDERER.updateRouting(message.routingTime, message.routePath);
                //     break;
                // case "RoutingPointCheckResult":
                //     if (message.error) {
                //         RENDERER.removeInvalidRoutingPoint(message.pointId, message.error);
                //     }
                //     break;
                // case "DataCollectionProgress":
                //     if (message) {
                //         STORE.hmi.updateDataCollectionProgress(message.data);
                //     }
                //     break;
            }

            // console.log(data);
            this.fire(message.type, message);
        } catch (e) {

        }


    }
    init(){

        try {
            const websocket = new WebSocket(this.serverAddr);
            websocket.binaryType = "arraybuffer";
            websocket.onopen = _e => {
                this.ready = true;
            }
            websocket.onmessage = this.handleMessage;
            websocket.onclose = _event => {
                setTimeout(() => {
                    this.websocket = this.init();
                }, 10000);
            };
            return websocket;
        } catch (error) {
            setTimeout(() => {
                this.websocket = this.init();
            }, 10000);
        }
        return undefined;

    }





    // checkRoutingPoint(point) {
    //     const request = {
    //         type: "CheckRoutingPoint",
    //         point: point
    //     };
    //     this.websocket.send(JSON.stringify(request));
    // }

    // requestMapElementIdsByRadius(radius) {
    //     this.websocket.send(JSON.stringify({
    //         type: "RetrieveMapElementIdsByRadius",
    //         radius: radius,
    //     }));
    // }

    requestRoute(start, start_heading, waypoint, end, parkingInfo, current_poi) {
        if (!this.ready) {
            return
        }
        const request = {
            type: "SendRoutingRequest",
            start,
            end,
            waypoint,
            default_route_name: current_poi,
            parkingInfo
        };
        if (start_heading) {
            request.start.heading = start_heading;
        }
        this.websocket?.send(JSON.stringify(request));
    }

    requestDefaultRoutingEndPoint() {
        if (!this.ready) {
            setTimeout(() => {
                this.requestDefaultRoutingEndPoint();
            }, 100)
            return;
        }
        this.websocket?.send(JSON.stringify({
            type: "GetDefaultEndPoint",
        }));
    }


    requestRoutePath() {
        if (!this.ready) {
            setTimeout(() => {
                this.requestRoutePath();
            }, 100)
            return;
        }
        this.websocket?.send(JSON.stringify({
            type: "RequestRoutePath",
        }));
    }

    requestHmiStatus() {
        if (!this.ready) {
            return
        }
        this.websocket?.send(JSON.stringify({
            type: "HMIStatus"
        }));
    }

    requestMapElementIdsByRadius(radius) {
        if (!this.ready) {
            return
        }
        this.websocket?.send(JSON.stringify({
            type: "RetrieveMapElementIdsByRadius",
            radius,
        }));
    }

    changeMap(map) {
        if (!this.ready) {
            return
        }
        console.log(map, "map")
        this.websocket?.send(JSON.stringify({
            type: "HMIAction",
            action: "CHANGE_MAP",
            value: map,
        }));
        this.updatePOI = true;
    }

    // publishNavigationInfo(data) {
    //     this.websocket.send(data);
    // }

    // requestDataCollectionProgress() {
    //     this.websocket.send(JSON.stringify({
    //         type: "RequestDataCollectionProgress",
    //     }));
    // }

    // setPointCloudWS(pointcloudws) {
    //     this.pointcloudWS = pointcloudws;
    // }
}
