import './App.css';

import NavBar from './components/NavBar';
import CaseList from './components/CaseList';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import CRM from './components/CRM.jsx';
import Privileges from './components/Privileges.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import { Typography } from '@mui/material';
import CaseDetail from './components/CaseDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Switch>
          <Route
            exact
            from="/"
            render={(props) => <Typography color="black">Home</Typography>}
          />
          <Route exact path="/usercrm" render={(props) => <CRM {...props} />} />
          <Route
            exact
            path="/usercase"
            render={(props) => <CaseList {...props} />}
          />
          <Route
            exact
            path="/forms"
            render={(props) => <Typography color="black">Forms</Typography>}
          />
          <Route
            exact
            path="/admin"
            render={(props) => <Privileges {...props} />}
          />
          <Route
            exact
            path="/casenotes/:id"
            render={(props) => <CaseDetail {...props} />}
          />
          {/* temp profile page: */}
          <Route
            exact
            path="/profile"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
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