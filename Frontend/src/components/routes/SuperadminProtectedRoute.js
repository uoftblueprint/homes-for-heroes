import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { selectRoleId } from '../../redux/userSlice';
import AuthProtectedRoute from './AuthProtectedRoute';
import { SUPER_ADMIN_ROLE_ID } from '../constants';

const SuperadminProtectedRoute = (props) => {
  const roleId = useSelector(selectRoleId);
  const location = useLocation();

  if (roleId !== SUPER_ADMIN_ROLE_ID) {
    alert('You are not authorized to access this page');
    return <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
  }
  else{
    return <AuthProtectedRoute {...props} />;
  }
};

export default SuperadminProtectedRoute;
