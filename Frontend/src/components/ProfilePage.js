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

export default function ProfilePage( {user_id} ) {
   // Tabs
   const [value, setValue] = React.useState(0);
   const handleTabs = (event, val) => {
      setValue(val)
   };

   // User Info Table
   const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      phone: '',
      street_name: '',
      city: '',
      province: '',
      applicant_dob: ''
   });
   const [rows, setRows] = React.useState([]);
   const [loading, setLoading] = React.useState(false);

   function fetchInfo() {
      fetch(`http://localhost:3000/getCustomerInfo/11`)
         .then(resp => resp.json())
         .then(data => {
            setUserInfo({
               ...userInfo,
               name: data.customerInfo[0].name,
               email: data.customerInfo[0].email,
               phone: data.customerInfo[0].phone,
               street_name: data.customerInfo[0].street_name,
               city: data.customerInfo[0].city,
               province: data.customerInfo[0].province,
               applicant_dob:data.customerInfo[0].applicant_dob
            });
            console.log(userInfo);
         })
         .catch(error => {
            console.error(error);
         }
      );
   }

   React.useEffect(() => {
      let active = true;

      (async () => {
         setLoading(true);
         await fetchInfo();
         if (!active) {
            return;
         }
         setLoading(false);
      })();

      return () => {
         active = false;
      };
   }, [])

   React.useEffect(() => {
      changeInfo()
   }, [userInfo])

   const [formInfo, setFormInfo] = useState({})

   const handleSubmit = (event) => {
      event.preventDefault();
      (async () => {
         await setUserInfo({
            ...userInfo,
            ...formInfo
         });
      })();
      setEditingInfo(false)
    };

   const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormInfo({
         ...formInfo,
        [id]: value
      });
    };

   const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         name: userInfo.name,
         email: userInfo.email,
         phone: userInfo.phone,
         street_name: userInfo.street_name,
         city: userInfo.city,
         province: userInfo.province,
         applicant_dob: userInfo.applicant_dob
      })
   };  

   const changeInfo = () => {
      fetch('http://localhost:3000/updateCustomerProfile/11', requestOptions)
         .then(response => response.json());
   }

   // function postInfo(user_id, data) {
   //    fetch(`http://localhost:3000/updateProfile`, {
   //       method: 'POST',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(data),
   //    })
   //    .then(resp => resp.json())
   //    .then(data => {
   //       console.log('Success:', data);
   //    })
   //    .catch((error) => {
   //       console.error('Error:', error);
   //    });
   // }

   //Edit User Info
   const [editingInfo, setEditingInfo] = useState(false);

   const [editPasswordStatus, setEditPasswordStatus] = useState(false);
   //

   // Password
   const [passwordShown, setPasswordShown] = useState(false);

   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   };
   //

   function cleanKey(str) {
      if (str === "applicant_dob") {
         return "date of birth";
      }
      else {
         return str.replace("_", " ")
      }
   }

   function cleanVal(str) {
      if (str[4] === '-' && str[7] === '-' && str[10] === 'T' && str[13] === ':' && str[16] === ':' && str.at(-1) === 'Z') {
         return str.slice(0, 10);
      }
      else {
         return str;
      }
   }


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
               {editingInfo ? (
                  <Box component="form" onSubmit={handleSubmit} sx={{display: 'inline-flex', flexDirection: 'column', height: 500}}>

                     {Object.entries(userInfo).map((row) => (
                        <TextField
                           id={row[0]}
                           label={cleanKey(row[0])}
                           defaultValue={cleanVal(row[1])}
                           value={userInfo[cleanVal(row[1])]}
                           onChange={handleInputChange}
                           size='standard'
                           variant='standard'
                           sx={{ fontSize: '15px', width:500, textTransform: 'capitalize', mb: '8px'}} />
                     ))}

                     <Box sx={{display: 'inline-flex', justifyContent: 'center', mt:'15px'}}>
                        <Button variant='outlined' type='button' onClick={() => setEditingInfo(false)} sx={{mr: 1}}>
                           Cancel
                        </Button>
                        <Button variant='outlined' type='submit' sx={{ml: 1}}>
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

                           {Object.entries(userInfo).map((row) => (
                              <TableRow key={row[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 <TableCell component="th" scope="row" style={{ fontSize: '16px', textTransform: 'capitalize' }}>
                                    {<b>{cleanKey(row[0])}:</b>}
                                 </TableCell>
                                 <TableCell align="right" style={{ fontSize: '16px'}}>{cleanVal(row[1])}</TableCell>
                              </TableRow>
                           ))}
                           </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                     <Box>
                        <Button variant='outlined' startIcon={<EditIcon />} onClick={() => setEditingInfo(true)} sx={{padding: '7px', width:'200px', mt: '15px'}}>
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

