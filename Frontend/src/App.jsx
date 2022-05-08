import './App.css';

import AuthProtectedRoute from './components/routes/AuthProtectedRoute';
import AdminProtectedRoute from './components/routes/AdminProtectedRoute';
import NavBar from './components/NavBar';

import { Route, Switch } from 'react-router-dom';

import FormTop from './pages/User/Form/FormTop.js';
import FormCreate from './pages/User/Form/FormCreate';
import FormView from './pages/User/Form/FormView';
import FormEdit from './pages/User/Form/FormEdit';
import FormComplete from './pages/User/Form/FormComplete';

import CaseList from './pages/Admin/UserCase/CaseList';
import Login from './pages/User/Login/Login';
import Logout from './pages/User/Login/Logout';
import CRM from './pages/Admin/UserCrm/CRM';
import Privileges from './pages/Admin/Privileges/Privileges';
import ProfilePage from './pages/User/ProfilePage/ProfilePage';
import Home from './pages/User/Home/Home.jsx';

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
            render={(props) => <Home {...props} />}
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
          <AuthProtectedRoute
            exact
            path="/forms/complete/:formId"
            render={(props) => <FormComplete {...props} />}
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
          <Route
            path="/signup/:jwt"
            render={(props) => <SignupForm {...props} />}
          />
        </Switch>
      </header>
    </div>
  );
}

export default App;
