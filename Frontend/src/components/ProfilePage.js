import { TextField, Box, Button, Typography, Tabs, Tab, Table,TableContainer, TableBody, TableRow, TableCell, Alert } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';

import { createTheme, ThemeProvider } from '@mui/material/styles' 

import validator from 'validator'

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

export default function ProfilePage() {
   // Tabs
   const [value, setValue] = React.useState(0);
   const handleTabs = (event, val) => {
      setValue(val)
   };

   // User Info Table
   const [formInfo, setFormInfo] = useState({
      name: '',
      email: '',
      phone: '',
      street_name: '',
      city: '',
      province: '',
      applicant_dob: ''
   });

   const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      phone: '',
      street_name: '',
      city: '',
      province: '',
      applicant_dob: ''
   });
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
            setFormInfo({
               ...formInfo,
               name: data.customerInfo[0].name,
               email: data.customerInfo[0].email,
               phone: data.customerInfo[0].phone,
               street_name: data.customerInfo[0].street_name,
               city: data.customerInfo[0].city,
               province: data.customerInfo[0].province,
               applicant_dob:data.customerInfo[0].applicant_dob
            });
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

   // React.useEffect(() => {
   //    changeInfo()
   // }, [userInfo])

   const [errorStr, setErrorStr] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();
      setErrorStr('')

      console.log(userInfo, formInfo)

      if (!validator.isEmail(formInfo.email) | !validator.isMobilePhone(formInfo.phone) | !validator.isDate(formInfo.applicant_dob)) {
         let errorLst = []

         if (!validator.isEmail(formInfo.email)) {
            errorLst.push(' email')
         }
         
         if (!validator.isMobilePhone(formInfo.phone)) {
            errorLst.push(' phone number')
         }
         
         if (!validator.isDate(formInfo.applicant_dob)) {
            errorLst.push(' date of birth')
         }

         const converted = errorLst.toString()
         setErrorStr('Error - Invalid' + converted)
      } else {
         (async () => {
            await setUserInfo({
               ...userInfo,
               ...formInfo
            });
         })();
         setErrorStr('')
         setEditingInfo(false)
         changeInfo()   
      }
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
      console.log(requestOptions)
      fetch('http://localhost:3000/updateCustomerProfile/11', requestOptions)
         .then(response => response.json());
   }

   const [pwErrorStr, setPwErrorStr] = useState('');

   const [passwords, setPasswords] = useState({old: '', new: '', new2: '' });
   
   const handlePasswordInputChange = (event) => {
      const { id, value } = event.target;
      console.log(id)
      console.log(value)
      console.log(passwords)
      setPasswords({
         ...passwords,
         [id]: value
      })
   }

   const handlePasswordSubmit = (event) => {
      setPwErrorStr('')
      event.preventDefault()
      if (passwords.old !== 'old') {
         // TODO - implement verifying password
         setPwErrorStr('Error: current password incorrect')
      } else if (passwords.new!== passwords.new2) {
         setPwErrorStr('Error: passwords do not match')
      } else {
         setPwErrorStr('')
         changePassword()
      }
   }
   
   const changePassword = () => {
      console.log(passwords)
      // TODO - implement changing password
   }

   //Edit User Info
   const [editingInfo, setEditingInfo] = useState(false);

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
                           required
                           id={row[0]}
                           label={cleanKey(row[0])}
                           defaultValue={cleanVal(row[1])}
                           value={userInfo[row[1]]}
                           //value={userInfo[row[0]]}
                           onChange={handleInputChange}
                           size='standard'
                           variant='standard'
                           sx={{ fontSize: '15px', width:500, textTransform: 'capitalize', mb: '8px'}} />
                     ))}

                     <Box sx={{display: 'inline-flex', justifyContent: 'center', mt:'15px', mb:'15px'}}>
                        <Button variant='outlined' type='button' onClick={() => setEditingInfo(false)} sx={{mr: 1}}>
                           Cancel
                        </Button>
                        <Button variant='outlined' type='submit' sx={{ml: 1}}>
                           Submit
                        </Button>
                     </Box>
                     { errorStr !== '' ? (
                        <Alert variant="filled" severity="error">
                           {errorStr}
                        </Alert>
                     ) : null }

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
               <div>
                  <Box sx={{height: 500   }}>
                     <Box component="form" onSubmit={handlePasswordSubmit} sx={{ width: '350px', display: 'inline-flex', flexDirection: 'column', alignItems:'flex-end'}}>
                        <TextField required label='Current Password' type='password' sx={{width: '100%', mt:'20px', mb: '15px'}} id='old' value={passwords.old} onChange={handlePasswordInputChange}/>
                        <TextField required label='New Password' type='password' sx={{width: '100%', mb: '15px'}} id='new' value={passwords.new} onChange={handlePasswordInputChange}/>
                        <TextField required label='Re-enter New Password' type='password' sx={{width:'100%', mb: '15px'}} id='new2' value={passwords.new2} onChange={handlePasswordInputChange}/>
                        <Button variant='outlined' type='submit' sx={{width:'40%', mb:'15px'}}>
                           Submit
                        </Button>
                        { pwErrorStr !== '' ? (
                           <Alert variant="filled" severity="error" sx={{width:'100%'}}>
                              {pwErrorStr}
                           </Alert>
                        ) : null }
                     </Box>
                  </Box>
               </div>
            </TabPanel>

         </div>
      </ThemeProvider>
   );
}

