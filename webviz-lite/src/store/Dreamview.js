

import MapWebSocketEndpoint from "./DreamviewMapWebsocket";
import RealtimeWebSocketEndpoint from "./DreamviewWebsocket";

function deduceWebsocketServerAddr(type) {
    const server = window.location.origin;
    const link = document.createElement("a");
    link.href = server;
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const port = 8888;

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

let dreamviewServer;


const mapServerAddr = deduceWebsocketServerAddr("map");
let dreamviewMapserver;


// export const updateDreamviewPlayer = (player)=>{
//     // currentPlayer = player;
//     const offline = !(player?.onlinePlayer);
//     useWorldStore.setState({offline})
// }

// export const useDreamviewPlayer = ()=>{
//     return currentPlayer;
// }
export const useDreamviewServer = () => {
    if (!dreamviewServer) {
        dreamviewServer = new RealtimeWebSocketEndpoint(simWorldServerAddr);
    }
    return dreamviewServer;
}

export const useDreamViewMapServer = ()=>{
    if (!dreamviewMapserver) {
        dreamviewMapserver = new MapWebSocketEndpoint(mapServerAddr);
    }
    return dreamviewMapserver;
}
