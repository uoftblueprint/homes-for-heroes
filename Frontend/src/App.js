import './App.css';
import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Typography } from '@mui/material';
import FormTop from './pages/Form/FormTop.js';
import FormCreate from "./pages/Form/FormCreate";
import FormView from "./pages/Form/FormView";
import FormEdit from "./pages/Form/FormEdit";
import NavBar from './components/NavBar';
import CaseList from './pages/UserCase/CaseList';
import Login from './pages/Login/Login.js';
import CRM from './pages/UserCrm/CRM.js';
import Privileges from './pages/Admin/Privileges copy.js';
import ProfilePage from './pages/ProfilePage/ProfilePage.js';
import CaseDetail from './pages/CaseDetails/CaseDetail';
import PartnerCRM from './pages/PartnerCrm/PartnerCRM.js';


function App() { 
  return (
    <div className="App">
      <header className="App-header">    
        <NavBar />
        <Switch>
          <Route exact from="/" render={props => <Typography color='black'>Home</Typography>} />
          <Route exact path="/usercrm" render={props => <CRM {...props} />} />
          <Route exact path="/usercase" render={props => <CaseList {...props} />} />
          <Route exact path="/forms" component={FormTop} />
            <Route exact path="/forms/create" component={FormCreate} />
            <Route exact path="/forms/view/:formId" component={FormView} />
            <Route exact path="/forms/edit/:formId" component={FormEdit} />
          <Route exact path="/admin" render={props => <Privileges {...props} />} />
          <Route exact path="/casenotes/:id" render={props => <CaseDetail {...props} />} />
          <Route exact path="/partnercrm" render={props => <PartnerCRM {...props} />} /> 
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