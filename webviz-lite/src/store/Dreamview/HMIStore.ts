
// import create from 'zustand'
// // import WS from "store/websocket";
// // import UTTERANCE from "store/utterance";
// // import RENDERER from "renderer";


// const TELEOP_MODE = Object.freeze({
//     CAR: 'Car Teleop',
//     CONSOLE: 'Console Teleop',
// });


// const useHMIStore = create(set => ({
//     bears: 0,
//     increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 })
//   }))

// export default class HMI {
//     modes = [];
//     @observable currentMode = 'none';

//     vehicles = [];
//     @observable currentVehicle = 'none';
//     defaultVehicleSize = {
//         height: 4.2,
//         width: 2.55,
//         length: 6.915,
//     };
//     defaultTrailerSize = {
//         height: 4,
//         width: 2.55,
//         length: 12.4,
//     };
//     vehicleParam = {
//         frontEdgeToCenter: 4.415,
//         backEdgeToCenter: 1.685,
//         leftEdgeToCenter: 1.025,
//         rightEdgeToCenter: 1.025,
//         height: 2.54,
//         width: 2.05,
//         length: 6.1,
//         steerRatio: 22,
//         wheelBase: 3.3,
//     };

//     maps = [];
//     @observable currentMap = 'none';

//     @observable moduleStatus = observable.map();
//     @observable componentStatus = observable.map();
//     @observable enableStartAuto = false;
//     @observable dockerImage = 'unknown';
//     @observable isPause = false;
//     @observable isCoDriver = false;
//     @observable isDrivingMode = false;
//     @observable isMute = false;
//     @observable isShowingCustom = false;
//     @observable isShowingSearchID = false;

//     displayName = {};
//     utmZoneId = 10;

//     @observable isCalibrationMode = false;
//     @observable dataCollectionUpdateStatus = observable.map();
//     @observable dataCollectionProgress = observable.map();

//     @action toggleCoDriverFlag() {
//         this.isCoDriver = !this.isCoDriver;
//     }

//     @action toggleMuteFlag() {
//         this.isMute = !this.isMute;
//         UTTERANCE.setMute(this.isMute);
//     }

//     @action togglePause() {
//         this.isPause = !this.isPause;
//         WS.controlPause(this.isPause);
//     }

//     @action setDrivingMode(enable) {
//         this.isDrivingMode = enable;
//     }

//     @action setShowCustom(enable) {
//         this.isShowingCustom = enable;
//     }

//     @action setShowSearchID(enable) {
//         this.isShowingSearchID = enable;
//     }

//     @action updateStatus(newStatus) {
//         if (newStatus.dockerImage) {
//             this.dockerImage = newStatus.dockerImage;
//         }
//         if (newStatus.utmZoneId) {
//             this.utmZoneId = newStatus.utmZoneId;
//         }

//         if (newStatus.modes) {
//             this.modes = newStatus.modes.sort();
//         }
//         if (newStatus.currentMode) {
//             this.isCalibrationMode = (newStatus.currentMode.toLowerCase().includes('calibration'));
//             if (this.currentMode !== newStatus.currentMode) {
//                 this.resetDataCollectionProgress();
//             }
//             this.currentMode = newStatus.currentMode;
//         }

//         if (newStatus.maps) {
//             this.maps = newStatus.maps.sort();
//         }
//         if (newStatus.currentMap) {
//             this.currentMap = newStatus.currentMap;
//         }

//         if (newStatus.vehicles) {
//             this.vehicles = newStatus.vehicles.sort();
//         }
//         if (newStatus.currentVehicle) {
//             if (this.isCalibrationMode && this.currentVehicle !== newStatus.currentVehicle) {
//                 this.resetDataCollectionProgress();
//             }
//             this.currentVehicle = newStatus.currentVehicle;
//         }

//         if (newStatus.modules) {
//             const newKeyList = JSON.stringify(Object.keys(newStatus.modules).sort());
//             const curKeyList = JSON.stringify(this.moduleStatus.keys().sort());
//             if (newKeyList !== curKeyList) {
//                 this.moduleStatus.clear();
//             }
//             for (const key in newStatus.modules) {
//                 this.moduleStatus.set(key, newStatus.modules[key]);
//             }
//         }

//         if (newStatus.monitoredComponents) {
//             const newKeyList = JSON.stringify(Object.keys(newStatus.monitoredComponents).sort());
//             const curKeyList = JSON.stringify(this.componentStatus.keys().sort());
//             if (newKeyList !== curKeyList) {
//                 this.componentStatus.clear();
//             }
//             for (const key in newStatus.monitoredComponents) {
//                 this.componentStatus.set(key, newStatus.monitoredComponents[key]);
//             }
//         }

//         // if (typeof newStatus.passengerMsg === "string") {
//         //     UTTERANCE.speakRepeatedly(newStatus.passengerMsg);
//         // }
//     }

//     @action update(world) {
//         this.enableStartAuto = world.engageAdvice === "READY_TO_ENGAGE";
//     }

//     // updateVehicleParam(vehicleParam) {
//     //     this.vehicleParam = vehicleParam;
//     //     RENDERER.adc.resizeCarScale(
//     //         this.vehicleParam.length / this.defaultVehicleSize.length,
//     //         this.vehicleParam.width / this.defaultVehicleSize.width,
//     //         this.vehicleParam.height / this.defaultVehicleSize.height);
//     //     RENDERER.adc.resizeTrailerScale(
//     //         this.vehicleParam.trailerLength / this.defaultTrailerSize.length,
//     //         this.vehicleParam.trailerWidth / this.defaultTrailerSize.width,
//     //         this.vehicleParam.trailerHeight / this.defaultTrailerSize.height);
//     // }

//     @action toggleModule(id) {
//         this.moduleStatus.set(id, !this.moduleStatus.get(id));
//         const command = this.moduleStatus.get(id) ? "START_MODULE" : "STOP_MODULE";
//         WS.executeModuleCommand(id, command);
//     }

//     @computed get inNavigationMode() {
//         return this.currentMode === "Navigation";
//     }

//     @computed get inCarTeleopMode() {
//         return this.currentMode === TELEOP_MODE.CAR;
//     }

//     @computed get inConsoleTeleopMode() {
//         return this.currentMode === TELEOP_MODE.CONSOLE;
//     }

//     @computed get inTeleopMode() {
//         return Object.values(TELEOP_MODE).includes(this.currentMode);
//     }

//     @computed get shouldDisplayNavigationMap() {
//         return this.inNavigationMode || this.inTeleopMode;
//     }

//     @action resetDataCollectionProgress() {
//         this.dataCollectionUpdateStatus.clear();
//         this.dataCollectionProgress.clear();
//     }

//     @action updateDataCollectionProgress(data) {
//         Object.keys(data).sort().forEach((scenarioName) => {
//             if (!this.dataCollectionProgress.has(scenarioName)) {
//                 this.dataCollectionProgress.set(scenarioName, observable.map());
//                 this.dataCollectionUpdateStatus.set(scenarioName, observable.map());
//             }
//             const categoryProgress = this.dataCollectionProgress.get(scenarioName);
//             const categoryStatus = this.dataCollectionUpdateStatus.get(scenarioName);
//             const scenario = data[scenarioName];
//             Object.keys(scenario).sort().forEach((categoryName) => {
//                 const isUpdated = categoryProgress.get(categoryName) !== scenario[categoryName];
//                 categoryProgress.set(categoryName, scenario[categoryName]);
//                 categoryStatus.set(categoryName, isUpdated);
//             });
//         });
//     }

//     rotate2DPoint({ x, y }, rotationInRad) {
//         return {
//             x: x * Math.cos(rotationInRad) - y * Math.sin(rotationInRad),
//             y: x * Math.sin(rotationInRad) + y * Math.cos(rotationInRad),
//         };
//     }

//     calculateCarPolygonPoints(positionX, positionY, headingInRad) {
//         const config = this.vehicleParam;
//         const polygonPoints = [
//             { y: -config.leftEdgeToCenter, x: config.frontEdgeToCenter },
//             { y: config.rightEdgeToCenter, x: config.frontEdgeToCenter },
//             { y: config.rightEdgeToCenter, x: -config.backEdgeToCenter },
//             { y: -config.leftEdgeToCenter, x: -config.backEdgeToCenter },
//             { y: -config.leftEdgeToCenter, x: config.frontEdgeToCenter },
//         ];

//         polygonPoints.forEach((point) => {
//             const newPoint = this.rotate2DPoint(point, headingInRad);
//             point.x = positionX + newPoint.x;
//             point.y = positionY + newPoint.y;
//         });

//         return polygonPoints;
//     }
// }
