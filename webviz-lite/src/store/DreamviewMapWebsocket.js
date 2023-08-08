// import RENDERER from "renderer";
// import Worker from 'utils/webworker.js';
import { zhito } from "@zhito/proto"
import { Evented } from "leaflet";

// import STORE from "./index";

const MapMessage = zhito.hdmap.Map;// simWorldRoot.lookupType("zhito.hdmap.Map");
export default class MapDataWebSocketEndpoint extends Evented {
    // serverAddr: string;
    // websocket: WebSocket|undefined;
    // ready: boolean;
    // currentMode: string;
    // mapData: zhito.hdmap.Map | undefined;
    // removeOldMap: boolean;
    constructor(serverAddr) {
        super();
        this.serverAddr = serverAddr;
        this.currentMode = "";
        this.ready = false;
        this.websocket = this.init();
        this.removeOldMap = false;
    }

    init() {

        try {
            const websocket = new WebSocket(this.serverAddr);
            websocket.binaryType = "arraybuffer";
            websocket.onopen = _e => {
                this.ready = true;
            }
            websocket.onmessage = this.handleMessage;
            websocket.onclose = event => {
                console.log("WebSocket connection closed, close_code: " + event.code);
                this.ready = false;
                setTimeout(() => {
                    this.websocket = this.init();
                }, 10000);
            };
            return websocket;
        } catch (error) {
            console.error("Failed to establish a connection: " + error);
            setTimeout(() => {
                this.websocket = this.init();
            }, 10000);
        }
        return undefined;
    }


    handleMessage = (event) => {
        try {
            const mapData = MapMessage.decode(new Uint8Array(event.data));
            // const removeOldMap = STORE.hmi.inNavigationMode || this.currentMode !== STORE.hmi.currentMode;
            // this.currentMode = STORE.hmi.currentMode;
            this.mapData = mapData;
            // this.removeOldMap = removeOldMap;
            // STORE.setInitializationStatus(true);
            this.fire("map", { data: mapData });
        } catch (e) {
            console.log(e)
        }
    }

    requestMapData(elements) {
        if (!this.ready) {return;}
        this.websocket?.send(JSON.stringify({
            type: "RetrieveMapData",
            elements,
        }));
    }

    requestRelativeMapData(elements) {
        if (!this.ready) {return;}
        this.websocket?.send(JSON.stringify({
            type: "RetrieveRelativeMapData",
            elements,
        }));
    }
}
