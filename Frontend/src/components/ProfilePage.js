import { IconButton, TextField, Box, Button, Typography, Tabs, Tab, Table,TableContainer, TableBody, TableRow, TableCell } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { createTheme, ThemeProvider } from '@mui/material/styles' 

const theme = createTheme({
   palette: {
      background: {
         default: 'white',
      },
      primary: {
         main: '#C91C1C',
      },
      secondary: {
         main: '#2196F3',
      },
   },
});

// Tabs
function TabPanel(props) {
   const {children, value, index} = props;
   return (
      <div>
         {
            value===index && (
               <div>
                  {children}
               </div>
            )
         }
      </div>
   );
}
//

export default function ProfilePage( {user_id} ) {
   // Tabs
   const [value, setValue] = React.useState(0);

   const handleTabs = (event, val) => {
      setValue(val)
   };
   //

   // User Info Table
   const [userInfo, setUserInfo] = useState({});

   fetch(`/api/getCustomerInfo/:${user_id}`)
      .then(response => response.json())
      .then(data => setUserInfo(data))
      .then(console.log(userInfo))
      .catch(error => {
         console.error(error);
      });

   function createInfo(subheading, info) {
      return {subheading, info}
   }

   const rows = [
      createInfo('Name', {userInfo}.name),
      createInfo('Email', {userInfo}.name),
      createInfo('Phone', {userInfo}.phone),
      createInfo('Street Address', {userInfo}.address),
      createInfo('City', {userInfo}.city),
      createInfo('Province', {userInfo}.province),
      createInfo('Date of Birth \n (MM/DD/YYYY)', {userInfo}.birthdate)
   ];
   //

   //Edit User Info
   const [editInfoStatus, setEditInfoStatus] = useState(false);

   const [editPasswordStatus, setEditPasswordStatus] = useState(false);
   //

   // Password
   const [passwordShown, setPasswordShown] = useState(false);

   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   };
   //

   return (
      <ThemeProvider theme={theme}>
         <div>
            <Typography sx={{fontSize: '1.8rem', fontWeight: 600, mt: '75px', mb: '25px'}}>
               Your Profile
            </Typography>

            <Tabs value={value} onChange={handleTabs} sx={{mb:'20px'}} centered>
               <Tab icon={<InfoIcon />} iconPosition="start" label="User Information" sx={{width: '300px'}}/>
               <Tab icon={<SettingsIcon />} iconPosition="start" label="Manage Password"/>
            </Tabs>

            <TabPanel value={value} index={0}>
               {editInfoStatus ? (
                  <Box sx={{display: 'inline-flex', flexDirection: 'column', height: 500}}>
                     {rows.map((row) => (
                        <TextField label={row.subheading} defaultValue={row.info} size='standard' sx={{fontSize: '15px', width:500}} />
                     ))}
                     <Box sx={{display: 'inline-flex', justifyContent: 'center', mt:'15px'}}>
                        <Button variant='outlined' onClick={() => setEditInfoStatus(false)} sx={{mr: 1}}>
                           Cancel
                        </Button>
                        <Button variant='outlined' onClick={() => setEditInfoStatus(false)} sx={{ml: 1}}>
                           Submit
                        </Button>
                     </Box>
                  </Box>
               ) : (
                  <Box sx={{height: 500, display: 'inline-flex', flexDirection: 'column'}}>
                     <Box>
                        <TableContainer>
                           <Table sx={{ minWidth: '500px' }} aria-label="simple table">
                           <TableBody>
                              {rows.map((row) => (
                                 <TableRow
                                 key={row.subheading}
                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                 >
                                 <TableCell component="th" scope="row" style={{ fontSize: '16px'}}>
                                    {<b>{row.subheading}:</b>}
                                 </TableCell>
                                 <TableCell align="right">{row.info}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                     <Box>
                        <Button variant='outlined' startIcon={<EditIcon />} onClick={() => setEditInfoStatus(true)} sx={{padding: '7px', width:'200px', mt: '15px'}}>
                           Edit Information
                        </Button>
                     </Box>
                  </Box>
               )}
            </TabPanel>

            <TabPanel value={value} index={1}>
               {editPasswordStatus ? (
                  <div>
                     <Box sx={{height: 500}}>
                        <Box sx={{display: 'inline-flex', flexDirection: 'column'}}>
                           <TextField label='Current Password' sx={{width: '300px', mt:'20px', mb: '15px'}}/>
                           <TextField label='New Password' sx={{mb: '15px'}}/>
                           <TextField label='Re-enter New Password' sx={{mb: '15px'}}/>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent:'center'}}>
                           <Button variant='outlined' onClick={() => setEditPasswordStatus(false)} sx={{mr:1}}>
                              Cancel
                           </Button>
                           <Button variant='outlined' onClick={() => setEditPasswordStatus(false)} sx={{ml:1}}>
                              Submit
                           </Button>
                        </Box>
                     </Box>
                  </div>
               ) : (
                  <div>
                     <Box sx={{height:500}}>
                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 7, mb: 3}}>
                           <Typography type={passwordShown ? "text": "password"} sx={{fontSize:'18px', padding:'7px 0'}}>
                              <b>Password</b>: {userInfo.password}
                           </Typography>
                           <IconButton onClick={togglePasswordVisibility}>
                              {passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                           </IconButton>
                        </Box>
                        <Button variant='outlined' startIcon={<EditIcon />} onClick={() => setEditPasswordStatus(true)}>
                           Change Password
                        </Button>
                     </Box>
                  </div>
               )}
            </TabPanel>

         </div>
      </ThemeProvider>
   );
}

