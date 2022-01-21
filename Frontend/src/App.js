import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";
import { Typography } from "@mui/material/"

import ProfilePage from './components/ProfilePage.js';
import CRM from "./components/CRM"
import CaseList from "./components/CaseList"
import Login from "./components/Login"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact from="/" render={props => <Typography color='black'>Home</Typography>} />
        <Route exact path="/usercrm" render={props => <CRM {...props} />} />
        <Route exact path="/usercase" render={props => <CaseList {...props} />} />
        <Route exact path="/profilepage" render={props => <ProfilePage {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
      </Switch>
    </div>
  );
}

export default App;