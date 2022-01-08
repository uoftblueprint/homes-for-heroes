import './App.css';

import NavBar from './components/NavBar';
import CaseList from './components/CaseList';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login.js';
import CRM from './components/CRM.js';
import Privileges from './components/Privileges.js';
import ProfilePage from './components/ProfilePage.js';
import { Typography } from '@mui/material';
import CaseDetail from './components/CaseDetail';
import FormTop from './components/form/FormTop.js';
import FormCreator from "./components/form/FormCreator";
import FormView from "./components/form/FormView";
import FormEditor from "./components/form/FormEditor";

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
            <Route exact path="/forms/create" component={FormCreator} />
            <Route exact path="/forms/view/:formId" component={FormView} />
            <Route exact path="/forms/edit/:formId" component={FormEditor} />
          <Route exact path="/admin" render={props => <Privileges {...props} />} />
          <Route exact path="/casenotes/:id" render={props => <CaseDetail {...props} />} />
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