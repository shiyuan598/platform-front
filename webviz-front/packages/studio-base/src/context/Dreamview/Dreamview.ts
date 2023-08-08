import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import RosbridgePlayer from "@foxglove/studio-base/players/RosbridgePlayer";

import MapWebSocketEndpoint from "./DreamviewMapWebsocket";
import RealtimeWebSocketEndpoint from "./DreamviewWebsocket";

function deduceWebsocketServerAddr(type: string) {
    const server = window.location.origin;
    const link = document.createElement("a");
    link.href = server;
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const port = 8889;

    let path = "";
    switch (type) {
        case "map":
            path = "map";
            break;
        case "point_cloud":
            path = "pointcloud";
            break;
        case "sim_world":
            path = "websocket";
            break;
        case "camera":
            path = "camera";
            break;
        case "teleop":
            path = "teleop";
            break;
    }
    return `${protocol}://${link.hostname}:${port}/${path}`;
}
const simWorldServerAddr = deduceWebsocketServerAddr("sim_world");

let dreamviewServer: RealtimeWebSocketEndpoint;


const mapServerAddr = deduceWebsocketServerAddr("map");
let dreamviewMapserver:MapWebSocketEndpoint;

let currentPlayer:RosbridgePlayer|undefined;

export const updateDreamviewPlayer = (player:RosbridgePlayer|undefined)=>{
    currentPlayer = player;
    const offline = !(player?.onlinePlayer);
    useWorldStore.setState({offline})
}

export const useDreamviewPlayer = ():RosbridgePlayer|undefined=>{
    return currentPlayer;
}
export const useDreamviewServer = (): RealtimeWebSocketEndpoint => {
    if (!dreamviewServer) {
        dreamviewServer = new RealtimeWebSocketEndpoint(simWorldServerAddr);
    }
    return dreamviewServer;
}

export const useDreamViewMapServer = ():MapWebSocketEndpoint=>{
    if (!dreamviewMapserver) {
        dreamviewMapserver = new MapWebSocketEndpoint(mapServerAddr);
    }
    return dreamviewMapserver;
}
