import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectTimeout } from '../redux/userSlice';
import Logout from '../pages/User/Login/Logout';

const AuthProtectedRoute = (props) => {
  const location = useLocation();
  const expiry = useSelector(selectTimeout);
  const authLogin = useSelector(selectLoggedIn);

  if (expiry !== null && new Date() >= expiry) {
    alert('Session expired');
    return <Logout />;
  }
  if (authLogin) {
    return <Route {...props} />;
  } else {
    alert('You are not logged in! Redirecting...');
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }
};

export default AuthProtectedRoute;
