import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./views/main/monitor";
import Log from "./views/main/log";

function App() {
    return (
        <Switch>
            <Route path="/main" render={() => <Main />}></Route>
            <Route path="/log" render={() => <Log />}></Route>
            <Redirect from="/" to="/main" exact></Redirect>
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default App;
