import {
  Alert,
  TextField,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/userSlice';

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

// Tabs
function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
//

export default function ProfilePage({ user_id }) {
  // Tabs
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = React.useState(0);

  const [success, setSuccess] = React.useState(false);

  const handleTabs = (event, val) => {
    setValue(val);
  };
  //

  const [loading, setLoading] = React.useState(false); // TODO: implement loading spinner?

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

  const currentUserId = useSelector(selectUser).user_id;

  function fetchInfo() {
    return new Promise((resolve) => {
      fetch(`/api/getCustomerInfo/${currentUserId}`, {
        method: 'GET',
        credentials: 'include'
      })
          .then(resp => resp.json())
          .then(data => resolve(data.customerInfo[0]))
    })
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchInfo();
      setUserInfo({
            name: data.name,
            email: data.email,
            phone: data.phone,
            street_name: data.street_name,
            city: data.city,
            province: data.province,
            applicant_dob:data.applicant_dob.slice(0, 10),
      });
      setFormInfo({
          name: data.name,
          email: data.email,
          phone: data.phone,
          street_name: data.street_name,
          city: data.city,
          province: data.province,
          applicant_dob:data.applicant_dob.slice(0, 10),
      });
      setLoading(false);
    })();
  }, [])

  const [errorStr, setErrorStr] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorStr('')

    if (!validator.isEmail(formInfo.email) | !validator.isMobilePhone(formInfo.phone)) {
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
       setErrorStr('')
       setEditingInfo(false)
       changeInfo()
    }
  };

  const handleInputChange = (id, value) => {
    setFormInfo({
       ...formInfo,
      [id]: value
    });
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(
      {
        [currentUserId]:
        {
          name: formInfo.name,
          email: formInfo.email,
          applicant_phone: formInfo.phone,
          street_name: formInfo.street_name,
          city: formInfo.city,
          province: formInfo.province,
          applicant_dob: formInfo.applicant_dob
        }
      }) 
 };

  const changeInfo = () => {
    console.log(requestOptions)
    fetch('/api/updateUserInfo', requestOptions)
      .then(response => response.json());
    setUserInfo({
      ...formInfo
    })
  }

  const [pwErrorStr, setPwErrorStr] = useState('');

  const [passwords, setPasswords] = useState({old: '', new: '', new2: '' });
     
  const handlePasswordInputChange = (event) => {
    const { id, value } = event.target;
    setPasswords({
       ...passwords,
       [id]: value
    })
  }

  const handlePasswordSubmit = (event) => {
    setPwErrorStr('')
    event.preventDefault()
    if (passwords.new !== passwords.new2) {
       setPwErrorStr('Error: passwords do not match')
    } else {
       setPwErrorStr('')
       changePassword()
       // TODO: check for valid/strong password?
    }
  }
 
  const passwordRequestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      oldPassword: passwords.old,
      newPassword: passwords.new,
    })
  };

  const changePassword = () => {
    console.log(passwordRequestOptions)
    fetch('/api/changePassword', passwordRequestOptions)
      .then(res => res.json())
      .then(res => {
        if(res.errors)
          setPwErrorStr(res.errors.map(e => `${e.param}: ${e.msg}`).join(', '))
        else if (res.success)
          setSuccess(true);
      });
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


  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography sx={{fontSize: '1.8rem', fontWeight: 600, mt: '75px', mb: '25px'}}>
          Your Profile
        </Typography>

        <Tabs
          value={value}
          onChange={handleTabs}
          sx={{ mb: '20px' }}
          centered
        >
          <Tab
            icon={<InfoIcon />}
            iconPosition="start"
            label="User Information"
            sx={{ width: '300px' }}
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Manage Password"
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          {editingInfo ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                height: 500,
              }}
            >
              {Object.entries(userInfo).map((row) => {
                if (row[0] === 'province') {
                  return (
                  <TextField
                    required
                    id={row[0]}
                    sx={{mt: 1, mb: 1.5}}
                    label="province"
                    select
                    name="Province"
                    value={userInfo[row[0]]}
                    onChange={e => handleInputChange(row[0], e.target.value)}
                  >
                    <MenuItem value={'ON'}>ON</MenuItem>
                    <MenuItem value={'QC'}>QC</MenuItem>
                    <MenuItem value={'AB'}>AB</MenuItem>
                    <MenuItem value={'BC'}>BC</MenuItem>
                    <MenuItem value={'NB'}>NB</MenuItem>
                    <MenuItem value={'NL'}>NL</MenuItem>
                    <MenuItem value={'PE'}>PE</MenuItem>
                    <MenuItem value={'NS'}>NS</MenuItem>
                    <MenuItem value={'MB'}>MB</MenuItem>
                    <MenuItem value={'SK'}>SK</MenuItem>
                    <MenuItem value={'YT'}>YT</MenuItem>
                    <MenuItem value={'NT'}>NT</MenuItem>
                    <MenuItem value={'NU'}>NU</MenuItem>
                  </TextField>
                  )
                }
                else if (row[0] === 'applicant_dob'){
                  return (
                    <LocalizationProvider sx={{mt: 10}} dateAdapter={AdapterDateFns}>
                      {isMobile ?
                        <MobileDatePicker
                          required
                          value={formInfo[row[0]].split('-').join('/')}
                          onChange={v => handleInputChange(row[0], v.toISOString().slice(0,10))}
                          renderInput={(params) => <TextField
                            {...params} />} 
                        />
                        :
                        <DesktopDatePicker
                          required
                          label="Date of Birth"
                          inputFormat='yyyy-MM-dd'
                          mask='____-__-__'
                          value={formInfo[row[0]].split('-').join('/')}
                          onChange={(v) => handleInputChange(row[0], v.toISOString().slice(0,10))}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      }
                    </LocalizationProvider>
                  )
                }
                else{
                return (
                <TextField
                  required
                  id={row[0]}
                  label={cleanKey(row[0])}
                  value={formInfo[row[0]]}
                  onChange={e => handleInputChange(row[0], e.target.value)}
                  size='standard'
                  variant='standard'
                  sx={{ 
                    fontSize: '15px', 
                    width:500, 
                    textTransform: 'capitalize', 
                    mb: '8px',
                  }} 
                />
              )}
            }
              )}
              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  mt: '15px',
                  mb: '15px',
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setEditingInfo(false)}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type='submit'
                  sx={{ ml: 1 }}
                >
                  Submit
                </Button>
              </Box>
              { 
                errorStr !== '' ? 
                (
                  <Alert variant="filled" severity="error">
                      {errorStr}
                  </Alert>
                ) : 
                null 
              }
            </Box>
          ) : (
            <Box
              sx={{
                height: 500,
                display: 'inline-flex',
                flexDirection: 'column',
              }}
            >
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: '500px' }} aria-label="simple table">
                    <TableBody>
                      {Object.entries(userInfo).map((row) => (
                        <TableRow
                          key={row[0]}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 } 
                          }}
                        >
                          <TableCell 
                            component="th" 
                            scope="row" 
                            style={{
                              fontSize: '16px',
                              textTransform: 'capitalize' 
                            }}
                          >
                              {<b>{cleanKey(row[0])}:</b>}
                          </TableCell>
                          <TableCell align="right" style={{ fontSize: '16px'}}>{row[1]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditingInfo(true)}
                  sx={{
                    padding: '7px',
                    width: '200px',
                    mt: '15px',
                  }}
                >
                  Edit Information
                </Button>
              </Box>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
            <div>
              <Box sx={{ height: 500 }}>
                <Box
                  component="form"
                  onSubmit={handlePasswordSubmit}
                  sx={{
                    width: '350px',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                  }}
                >
                  <TextField
                    required
                    label="Current Password"
                    type="password"
                    sx={{
                      width: '100%',
                      mt: '20px',
                      mb: '15px',
                    }}
                    id="old"
                    value={passwords.old}
                    onChange={handlePasswordInputChange}
                  />
                  <TextField 
                    required
                    label="New Password" 
                    type="password"
                    sx={{ 
                      width: '100%',
                      mb: '15px'
                    }} 
                    id="new"
                    value={passwords.new}
                    onChange={handlePasswordInputChange}
                  />
                  <TextField
                    label="Re-enter New Password"
                    type="password"
                    sx={{
                      width: '100%',
                      mb: '15px' 
                    }}
                    id="new2"
                    value={passwords.new2}
                    onChange={handlePasswordInputChange}
                  />
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                      width:'40%', 
                      mb: '15px'
                    }}
                  >
                    Submit
                  </Button>
                  { pwErrorStr !== '' ? 
                    (
                      <Alert variant="filled" severity="error" sx={{width:'100%'}}>
                        {pwErrorStr}
                      </Alert>
                    ) : 
                    null 
                  }
                  {success ? (
                    <Alert variant="filled" severity="success" sx={{width:'100%'}}>
                      {'Password has been changed!'}
                    </Alert>
                  ) : null}
                </Box>
              </Box>
            </div>
        </TabPanel>
      </div>
    </ThemeProvider>
  );
}
