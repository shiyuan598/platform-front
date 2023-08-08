import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './views/main/index';
import User from './views/user/index';

function App() {
    return <Switch>
      <Route path="/main"  render={() => <Main /> }></Route>
      <Route path="/user"  render={() => <User /> }></Route>
      <Redirect from="/" to="/main" exact></Redirect>
    </Switch>;
}

export default App;
