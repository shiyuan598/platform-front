import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import VehicleMonitor from "../vehicle-monitor";
import DrivingData from "../driving-data";
import ExceptionInfo from "../exception-info";
import VehicleManager from "../vehicle-manager";

function RouteList() {
    return (
        <Switch>
            <Route path="/main/vehicle-monitor" render={() => <VehicleMonitor />}></Route>
            <Route path="/main/driving-data" render={() => <DrivingData />}></Route>
            <Route path="/main/exception-info" render={() => <ExceptionInfo />}></Route>
            <Route path="/main/vehicle-manager" render={() => <VehicleManager />}></Route>
            <Redirect from="/main" to="/main/vehicle-monitor"></Redirect>
        </Switch>
    );
}

export default React.memo(RouteList);
