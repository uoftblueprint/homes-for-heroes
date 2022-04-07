import './App.css';

import NavBar from './components/NavBar';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import FormTop from './pages/User/Form/FormTop.js';
import FormCreate from './pages/User/Form/FormCreate';
import FormView from './pages/User/Form/FormView';
import FormEdit from './pages/User/Form/FormEdit';

import CaseList from './pages/Admin/UserCase/CaseList';
import Login from './pages/User/Login/Login';
import CRM from './pages/Admin/UserCrm/CRM';
import Privileges from './pages/Admin/Privileges/Privileges';
import ProfilePage from './pages/User/ProfilePage/ProfilePage';

import ExternalRelations from './pages/Admin/PartnerCrm/ExternalRelations';
import SignupForm from './components/SignupFormVeteran.jsx';

import CaseDetail from './pages/User/CaseDetails/CaseDetail';

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
          <Route exact path="/forms" component={FormTop} />
          <Route exact path="/forms/create" component={FormCreate} />
          <Route exact path="/forms/view/:formId" component={FormView} />
          <Route exact path="/forms/edit/:formId" component={FormEdit} />
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
          <Route
            exact
            path="/external/"
            render={(props) => <ExternalRelations {...props} />}
          />
          {/* temp profile page: */}
          <Route
            exact
            path="/profile"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />

          <Route
            exact
            path="/signup/:jwt"
            render={(props) => <SignupForm {...props} />}
          />
        </Switch>
      </header>
    </div>
  );
}

export default App;
