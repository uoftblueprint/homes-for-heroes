import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";

import UserCRM from "./components/UserCRM"
import UserCase from "./components/UserCase"
import Login from "./components/Login"
import Home from './components/Home';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact from="/" render={props => <Home {...props} />} />
        <Route exact path="/usercrm" render={props => <UserCRM {...props} />} />
        <Route exact path="/usercase" render={props => <UserCase {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        {/* <Route path="/Home" component={Home} />
        <Route path="/CaseDetails" component={CaseDetails} />
        <Route path="/UserList" component={UserList} />
        <Route path="Login" component={Login} /> */}
      </Switch>
    </div>
  );
}