import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login.js';
import CRM from './components/CRM.js';
import { Typography } from '@mui/material';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Switch>
          <Route exact from="/" render={props => <Typography color='black'>Home</Typography>} />
          <Route exact path="/usercrm" render={props => <CRM {...props} />} />
          <Route exact path="/usercase" render={props => <Login {...props} />} />
          <Route exact path="/forms" render={props => <Typography color='black'>Forms</Typography>} />
          <Route exact path="/admin" render={props => <Typography color='black'>Admin</Typography>} />
          <Route exact path='/login' render={props => <Login {...props} />} />
          {/* <Route path="/Home" component={Home} />
        <Route path="/CaseDetails" component={CaseDetails} />
        <Route path="/UserList" component={UserList} />
        <Route path="Login" component={Login} /> */}
        </Switch> 

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;