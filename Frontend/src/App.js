import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";

import ProfilePage from './components/ProfilePage.js';
import CRM from "./components/CRM"
import CaseList from "./components/CaseList"
import Login from "./components/Login"
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact from="/" render={props => <Home {...props} />} />
        <Route exact path="/usercrm" render={props => <CRM {...props} />} />
        <Route exact path="/usercase" render={props => <CaseList {...props} />} />
        <Route exact path="/profilepage" render={props => <ProfilePage {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        {/* <Route path="/Home" component={Home} />
        <Route path="/CaseDetails" component={CaseDetails} />
        <Route path="/UserList" component={UserList} />
        <Route path="Login" component={Login} /> */}
      </Switch>
    </div>
  );
}

export default App;