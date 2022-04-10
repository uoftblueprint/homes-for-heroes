import './App.css';

import AuthProtectedRoute from './components/AuthProtectedRoute';
import NavBar from './components/NavBar';

import { Route, Switch } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import FormTop from './pages/User/Form/FormTop.js';
import FormCreate from './pages/User/Form/FormCreate';
import FormView from './pages/User/Form/FormView';
import FormEdit from './pages/User/Form/FormEdit';

import CaseList from './pages/Admin/UserCase/CaseList';
import Login from './pages/User/Login/Login';
import Logout from './pages/User/Login/Logout';
import CRM from './pages/Admin/UserCrm/CRM';
import Privileges from './pages/Admin/Privileges/Privileges';
import ProfilePage from './pages/User/ProfilePage/ProfilePage';

import ExternalRelations from './pages/Admin/PartnerCrm/ExternalRelations';
import SignupForm from './components/SignupForm.jsx';

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
          <AuthProtectedRoute
            exact
            path="/usercrm"
            render={(props) => <CRM {...props} />}
          />
          <AuthProtectedRoute
            exact
            path="/usercase"
            render={(props) => <CaseList {...props} />}
          />
          <AuthProtectedRoute exact path="/forms" component={FormTop} />
          <AuthProtectedRoute
            exact
            path="/forms/create"
            component={FormCreate}
          />
          <AuthProtectedRoute
            exact
            path="/forms/view/:formId"
            component={FormView}
          />
          <AuthProtectedRoute
            exact
            path="/forms/edit/:formId"
            component={FormEdit}
          />
          <AuthProtectedRoute
            exact
            path="/admin"
            render={(props) => <Privileges {...props} />}
          />
          <AuthProtectedRoute
            exact
            path="/casenotes/:id"
            render={(props) => <CaseDetail {...props} />}
          />
          <AuthProtectedRoute
            exact
            path="/external/"
            render={(props) => <ExternalRelations {...props} />}
          />
          {/* temp profile page: */}
          <AuthProtectedRoute
            exact
            path="/profile"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <AuthProtectedRoute
            exact
            path="/logout"
            render={(props) => <Logout {...props} />}
          />
          <Switch>
            <Route
              path="/signupform/:jwt"
              render={(props) => <SignupForm {...props} />}
            />
          </Switch>
        </Switch>
      </header>
    </div>
  );
}

export default App;
