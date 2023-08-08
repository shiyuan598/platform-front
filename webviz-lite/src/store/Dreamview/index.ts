import { makeObservable, observable, computed, action } from "mobx"

import HMI from "./hmi";
// import CameraData from "store/camera_data";
// import ControlData from "store/control_data";
// import Dimension from 'store/dimension';
// import Latency from "store/latency";
// import Meters from "store/meters";
// import Monitor from "store/monitor";
// import Options from "store/options";
// import PlanningData from "store/planning_data";
// import Playback from "store/playback";
// import RouteEditingManager from "store/route_editing_manager";
// import StoryTellers from "store/story_tellers";
// import Teleop from "store/teleop";
// import TrafficSignal from "store/traffic_signal";

class DreamviewStore {

    // Mutable States
    @observable timestamp = 0;

    @observable isInitialized = false;

    @observable hmi = new HMI();

    // @observable planningData = new PlanningData();

    // @observable controlData = new ControlData();

    // @observable latency = new Latency();

    // @observable playback = OFFLINE_PLAYBACK ? new Playback() : null;

    // @observable trafficSignal = new TrafficSignal();

    // @observable meters = new Meters();

    // @observable monitor = new Monitor();

    // @observable options = new Options();

    // @observable routeEditingManager = new RouteEditingManager();

    @observable geolocation = {};

    @observable moduleDelay = observable.map();

    // @observable cameraData = new CameraData();

    // @observable storyTellers = new StoryTellers();

    // @observable teleop = new Teleop();

    // @observable dimension = new Dimension(this.hmi, this.options);

    @observable newDisengagementReminder = false;

    @observable offlineViewErrorMsg = null;

    @computed get enableHMIButtonsOnly() {
        return !this.isInitialized;
    }

    constructor(){
        makeObservable(this);
    }


    @action updateTimestamp(newTimestamp:number) {
        this.timestamp = newTimestamp;
    }

    @action setInitializationStatus(status:boolean) {
        this.isInitialized = status;
    }

    // @action setGeolocation(newGeolocation) {
    //     this.geolocation = newGeolocation;
    // }

    // @action setOfflineViewErrorMsg(msg) {
    //     this.offlineViewErrorMsg = msg;
    // }

    // @action updateModuleDelay(world) {
    //     if (world && world.delay) {
    //         for (module in world.delay) {
    //             const hasNotUpdated = (world.delay[module] < 0);
    //             const delay = hasNotUpdated ? '-' : world.delay[module].toFixed(2);
    //             if (this.moduleDelay.has(module)) {
    //                 this.moduleDelay.get(module).delay = delay;
    //             } else {
    //                 this.moduleDelay.set(module, {
    //                     delay: delay,
    //                     name: module[0].toUpperCase() + module.slice(1),
    //                 });
    //             }
    //         }
    //     }
    // }


    // handleOptionToggle(option) {
    //     const oldShowMonitor = this.options.showMonitor;
    //     const oldShowTools = this.options.showTools;
    //     const oldShowRouteEditingBar = this.options.showRouteEditingBar;

    //     this.options.toggle(option);

    //     // disable tools after toggling
    //     if (oldShowMonitor && !this.options.showMonitor) {
    //         this.dimension.disableMonitor();
    //     }
    //     if (oldShowRouteEditingBar && !this.options.showRouteEditingBar) {
    //         this.routeEditingManager.disableRouteEditing();
    //     }

    //     // enable selected tool
    //     if (!oldShowMonitor && this.options.showMonitor) {
    //         this.dimension.enableMonitor();
    //     } else if (oldShowTools !== this.options.showTools) {
    //         this.dimension.update();
    //     }
    //     if (option === "showRouteEditingBar") {
    //         this.options.showPOI = false;
    //         this.routeEditingManager.enableRouteEditing();
    //     }
    // }

    // setOptionStatus(option, enabled) {
    //     const oldStatus = this.options[option];
    //     const newStatus = (enabled || false);
    //     if (oldStatus !== newStatus) {
    //         this.handleOptionToggle(option);
    //     }
    // }

    // updateCustomizedToggles(world) {
    //     const newToggles = {};
    //     if (world.planningData) {
    //         // Add customized toggles for planning paths
    //         if (world.planningData.path) {
    //             world.planningData.path.forEach((path) => {
    //                 const pathName = path.name;
    //                 if (this.options.customizedToggles.has(pathName)) {
    //                     newToggles[pathName] = this.options.customizedToggles.get(pathName);
    //                 } else {
    //                     newToggles[pathName] = true;
    //                 }
    //             });
    //         }

    //         // Add pull over status toggle
    //         if (world.planningData.pullOver) {
    //             const keyword = 'pullOver';
    //             if (this.options.customizedToggles.has(keyword)) {
    //                 newToggles[keyword] = this.options.customizedToggles.get(keyword);
    //             } else {
    //                 newToggles[keyword] = true;
    //             }
    //         }
    //     }
    //     this.options.setCustomizedToggles(newToggles);
    // }

    // handleDrivingModeChange(wasAutoMode, isAutoMode) {
    //     if (this.options.enableSimControl) {
    //         return;
    //     }

    //     const hasDisengagement = wasAutoMode && !isAutoMode;
    //     const hasAuto = !wasAutoMode && isAutoMode;

    //     this.newDisengagementReminder = this.hmi.isCoDriver && hasDisengagement;
    //     if (this.newDisengagementReminder && !this.options.showDataRecorder) {
    //         this.handleOptionToggle('showDataRecorder');
    //     }

    //     if (hasAuto && !this.options.lockTaskPanel) {
    //         this.handleOptionToggle('lockTaskPanel');
    //     } else if (hasDisengagement && this.options.lockTaskPanel) {
    //         this.handleOptionToggle('lockTaskPanel');
    //     }
    // }

    update(world:unknown, _isNewMode:unknown) {
        // if (isNewMode) {
        //     this.options.resetOptions();
        //     this.dimension.disableMonitor();
        //     this.routeEditingManager.disableRouteEditing();
        // }

        // this.updateTimestamp(world.timestamp);
        // this.updateModuleDelay(world);

        // const wasAutoMode = this.meters.isAutoMode;
        // this.meters.update(world);
        // this.handleDrivingModeChange(wasAutoMode, this.meters.isAutoMode);

        // this.monitor.update(world);
        // this.trafficSignal.update(world);
        this.hmi.update(world);

        // this.updateCustomizedToggles(world);
        // if (this.options.showPNCMonitor) {
        //     this.storyTellers.update(world);
        //     this.planningData.update(world);
        //     this.controlData.update(world, this.hmi.vehicleParam);
        //     this.latency.update(world);
        // }

        // if (this.hmi.inCarTeleopMode) {
        //     this.setOptionStatus('showCarTeleopMonitor', true);
        // } else if (this.hmi.inConsoleTeleopMode) {
        //     this.setOptionStatus('showConsoleTeleopMonitor', true);
        // }
    }
}

export const dreamviewStore = new DreamviewStore();

export default dreamviewStore;
