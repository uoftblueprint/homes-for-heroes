import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Redirect, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UserHome from './User/Home/UserHome';
import { useSelector } from 'react-redux';
import { selectUserId, selectRoleId } from '../redux/userSlice';
import { ADMIN_ROLE_ID, SUPER_ADMIN_ROLE_ID } from '../components/constants';

export default function Home() { 
    const currentUserId = useSelector(selectUserId);
    const currentRoleId = useSelector(selectRoleId); 
    const [currName, setCurrName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        fetch(`/api/getCustomerInfo/${currentUserId}/`)
            .then((response) => response.json())
            .then((res) => {
                setLoading(false);
                setCurrName(res.customerInfo[0].name);
            });
    }, []);

  return isLoading ? 
  (
      <CircularProgress sx={{ mt: 10 }} />
  )
  : currentRoleId !== SUPER_ADMIN_ROLE_ID && currentRoleId !== ADMIN_ROLE_ID ?
  (<UserHome/>)
  :
  (
    // <Grid
    //   container
    //   sx={{ marginTop: "10px", justifyContent: 'center'}}
    // >
    //     <Typography sx={{fontSize: 48 }} component="div">
    //         Welcome, {currName}  
    //     </Typography>
    // </Grid>
    <Redirect
        to={{
          pathname: '/usercrm',
          state: { from: location },
        }}
      />
    );
}