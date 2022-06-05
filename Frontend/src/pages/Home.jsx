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
    const currentRoleId = useSelector(selectRoleId); 
    const location = useLocation();
  return currentRoleId !== SUPER_ADMIN_ROLE_ID && currentRoleId !== ADMIN_ROLE_ID ?
  (<UserHome/>)
  :
  (<Redirect
        to={{
          pathname: '/usercrm',
          state: { from: location },
        }}
      />
    );
}