import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout, selectLoggedIn } from '../../../redux/userSlice';
import Typography from '@mui/material/Typography';
import { persistor } from '../../../redux/store';
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const authLogin = useSelector(selectLoggedIn);

  useEffect( ()=> {
    if (!authLogin) {
      alert('User is not logged in.');
      return;
    }

    fetch('/logout').then((response) => {
      if (response.status !== 200) {
        console.warn('Logout error occurred');
      }
      alert('User is logged out.');
      history.replace('/');
      persistor.purge().then(r => {
        dispatch(logout());
      });
    });
  }, []);

  return <Typography color="black">Error Logging out..</Typography>;
}
