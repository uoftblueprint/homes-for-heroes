import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { selectRoleId } from '../../redux/userSlice';
import AuthProtectedRoute from './AuthProtectedRoute';
import { ADMIN_ROLE_ID, SUPER_ADMIN_ROLE_ID } from '../constants';

const AdminProtectedRoute = (props) => {
  const roleId = useSelector(selectRoleId);
  const location = useLocation();

  if (roleId !== ADMIN_ROLE_ID && roleId !== SUPER_ADMIN_ROLE_ID) {
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

export default AdminProtectedRoute;
