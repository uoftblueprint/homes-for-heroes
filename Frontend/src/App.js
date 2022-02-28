import './App.css';
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Typography } from '@mui/material';
import NavBar from './components/NavBar';
import CaseList from './pages/Admin/UserCase/CaseList';
import Login from './pages/User/ProfilePage/Login/Login.js';
import CRM from './pages/Admin/UserCrm/CRM.js';
import Privileges from './pages/Admin/Privileges/Privileges.js';
import ProfilePage from './pages/User/ProfilePage/ProfilePage.js';
import CaseDetail from './pages/User/CaseDetails/CaseDetail';
import ExternalRelations from './pages/Admin/PartnerCrm/ExternalRelations';


function App() { 
  return (
    <div className="App">
      <header className="App-header">    
        <NavBar />
        <Switch>
          <Route exact from="/" render={props => <Typography color='black'>Home</Typography>} />
          <Route exact path="/usercrm" render={props => <CRM {...props} />} />
          <Route exact path="/usercase" render={props => <CaseList {...props} />} />
          <Route exact path="/forms" render={props => <Typography color='black'>Forms</Typography>} />
          <Route exact path="/admin" render={props => <Privileges {...props} />} />
          <Route exact path="/casenotes/:id" render={props => <CaseDetail {...props} />} />
          <Route exact path="/partnercrm" render={props => <ExternalRelations {...props} />} /> 
          {/* temp profile page: */}
          <Route exact path="/profile" render={props => <ProfilePage {...props} />} />
          <Route exact path='/login' render={props => <Login {...props} />} />
          {/* <Route path="/Home" component={Home} />
        <Route path="/CaseDetails" component={CaseDetails} />
        <Route path="/UserList" component={UserList} />
        <Route path="Login" component={Login} /> */}
        </Switch> 
      </header>
    </div>
  );
}

export default App;