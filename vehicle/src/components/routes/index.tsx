import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../../views/desktop/dashboard/index";
import Order from "../../views/desktop/order/index";
import Vehicle from "../../views/desktop/vehicle/index";
import UseTime from "../../views/desktop/vehicle/usetime";
import Statis from "../../views/desktop/statis/index";
import Monitor from "../../views/desktop/monitor/index";
import Version from "../../views/desktop/version/index";
import User from "../../views/desktop/user/index";
import Upgrade from "../../views/desktop/deploy/upgrade";
import Group from "../../views/desktop/deploy/group";
import Task from "../../views/desktop/deploy/task";
import KeepAlive from "../common/KeepAlive";

function RouteList() {
    return (
        <>
            <KeepAlive path="/desktop/home">
                <Home />
            </KeepAlive>
            <Switch>
                <Route path="/desktop/order" render={() => <Order />}></Route>
                <Route path="/desktop/vehicle" render={() => <Vehicle />}></Route>
                <Route path="/desktop/usetime" render={() => <UseTime />}></Route>
                <Route path="/desktop/statis" render={() => <Statis />}></Route>
                <Route path="/desktop/monitor" render={() => <Monitor />}></Route>
                <Route path="/desktop/version" render={() => <Version />}></Route>
                <Route path="/desktop/user" render={() => <User />}></Route>
                <Route path="/desktop/deploy/upgrade" render={()=> <Upgrade/>}></Route>
                <Route path="/desktop/deploy/group" render={()=> <Group/>}></Route>
                <Route path="/desktop/deploy/task" render={()=> <Task/>}></Route>
                <Redirect from="/desktop" to="/desktop/home"></Redirect>
            </Switch>
        </>
    );
}

export default React.memo(RouteList);
