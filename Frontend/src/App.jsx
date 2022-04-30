import './App.css';

import AuthProtectedRoute from './components/routes/AuthProtectedRoute';
import AdminProtectedRoute from './components/routes/AdminProtectedRoute';
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

import CaseDetail from './pages/Admin/UserCase/CaseDetail.jsx';
import AddCase from './pages/Admin/UserCase/AddCase';

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
          <AdminProtectedRoute
            exact
            path="/usercrm"
            render={(props) => <CRM {...props} />}
          />
          <AdminProtectedRoute
            exact
            path="/usercase"
            render={(props) => <CaseList {...props} />}
          />
          <AdminProtectedRoute exact path="/forms" component={FormTop} />
          <AdminProtectedRoute
            exact
            path="/forms/create"
            component={FormCreate}
          />
          <AdminProtectedRoute
            exact
            path="/forms/view/:formId"
            component={FormView}
          />
          <AdminProtectedRoute
            exact
            path="/forms/edit/:formId"
            component={FormEdit}
          />
          <AdminProtectedRoute
            exact
            path="/admin"
            render={(props) => <Privileges {...props} />}
          />
          <AdminProtectedRoute
            exact
            path="/casenotes/:id"
            render={(props) => <CaseDetail {...props} />}
          />
          <AdminProtectedRoute
            exact
            path="/addcase/:id"
            render={(props) => <AddCase {...props} />}
          />
          <Route
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
