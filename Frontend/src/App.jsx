import './App.css';

import AuthProtectedRoute from './components/routes/AuthProtectedRoute';
import AdminProtectedRoute from './components/routes/AdminProtectedRoute';
import SuperadminProtectedRoute from './components/routes/SuperadminProtectedRoute';
import NavBar from './components/NavBar';

import { Route, Switch } from 'react-router-dom';

import FormTop from './pages/form/FormTop.js';
import FormCreate from './pages/form/FormCreate';
import FormView from './pages/User/Form/FormView';
import FormEdit from './pages/form/FormEdit';
import FormComplete from './pages/User/Form/FormComplete';
import FormCompletedView from './pages/User/Form/FormCompletedView';

import CaseList from './pages/Admin/UserCase/CaseList';
import CaseForms from './pages/Admin/UserCase/CaseForms';
import Login from './pages/User/Login/Login';
import ForgotPassword from './pages/User/PasswordReset/ForgotPassword';
import ResetPassword from './pages/User/PasswordReset/ResetPassword';
import VeteranCRM from './pages/Admin/UserCrm/VeteranCRM';
import Logout from './pages/User/Login/Logout';
import Privileges from './pages/Admin/Privileges/Privileges';
import ProfilePage from './pages/User/ProfilePage/ProfilePage';
import Home from './pages/Home.jsx';

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
          <AuthProtectedRoute
            exact
            from="/"
            render={(props) => <Home {...props} />}
          />
          <AdminProtectedRoute
            exact
            path="/usercrm"
            render={(props) => <VeteranCRM {...props} />}
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
          <AuthProtectedRoute
            exact
            path="/questionnaire/view/:questionnaireId"
            render={(props) => <FormCompletedView {...props} />}
          />
          <SuperadminProtectedRoute
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
          <AdminProtectedRoute
            exact
            path="/viewForms/:id"
            render={(props) => <CaseForms {...props} />}
          />
          <SuperadminProtectedRoute
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
          <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} />} />
          <Route exact path="/reset/:jwt" render={(props) => <ResetPassword {...props} />} />
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
