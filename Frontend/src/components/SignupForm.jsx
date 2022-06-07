import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
  Button,
  Typography,
  TextField,
  Box,
  Form,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import validator from 'validator';

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


import { useParams, useHistory } from 'react-router-dom';

export default function SignupForm() {
  const [formInfo, setFormInfo] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    applicant_dob: '',
    street_name: '',
    city: '',
    province: '',
    referral: '',
    curr: 1, // does not change
  });

  const [veteranInfo, setVeteranInfo] = useState({
    income: '0',
    demographic: '',
  });

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  let { jwt } = useParams();
  let history = useHistory();

  const [partners, setPartners] = useState([]);
  const [roleID, setRoleID] = useState(0);

  const [errorStr, setErrorStr] = useState('');
  const [pwErrorStr, setPwErrorStr] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);

      // const verified = await verifyUser();
      const verified = { success: true };
      if (!verified.success) {
        setIsLoading(false);
        setIsVerified(false);
      } else {
        try {
          const data = await fetchPartners();
          setPartners(data['partners']);
          const role_id_data = await fetchRoleID();
          setRoleID(role_id_data.role_id);

          setIsLoading(false);
        } catch (err) {
          setErrorStr(err);
        }
      }
    })();
  }, []);

  function fetchPartners() {
    return new Promise((resolve) => {
      fetch('/api/partners')
        .then((resp) => resp.json())
        .then((data) => resolve(data));
    });
  }

  function fetchRoleID() {
    return new Promise((resolve, reject) => {
      fetch(`/api/checkJWT/${jwt}`)
        .then((resp) => resp.json())
        .then((data) => resolve(data))
        .catch(reject);
    });
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handleVeteranFormChange = (event) => {
    const { name, value } = event.target;
    setVeteranInfo({
      ...veteranInfo,
      [name]: value,
    });
  };

  const handleAdminPasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleAdminPasswordConfirmChange = (event) => {
    const { value } = event.target;
    setPasswordConfirm(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorStr('');
    setPwErrorStr('');

    const { email, phone, applicant_dob } = formInfo;

    let errorLst = [];
    let pwErrorLst = [];

    if (!validator.isEmail(email)) {
      errorLst.push(' email');
    }

    if (!validator.isMobilePhone(phone)) {
      errorLst.push(' phone number');
    }

    if (!validator.isDate(applicant_dob, { format: 'YYYY-MM-DD' })) {
      errorLst.push(' date of birth');
    }

    if (password.length < 8) {
      pwErrorLst.push(' 8 letters');
    }

    if (password.replace(/[^a-z]/g, '').length < 1) {
      pwErrorLst.push(' 1 lowercase letter');
    }

    if (password.replace(/[^A-Z]/g, '').length < 1) {
      pwErrorLst.push(' 1 uppercase letter');
    }

    if (password.replace(/[^0-9]/g, '').length < 1) {
      pwErrorLst.push(' 1 number');
    }

    if (
      password.replace(/[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '').length < 1
    ) {
      pwErrorLst.push(' 1 symbol');
    }

    if (
      password !== passwordConfirm
    ) {
      errorLst.push(' | Passwords do not match');
    }

    if (errorLst.length || pwErrorLst.length) {
      if (errorLst.length) {
        setErrorStr('Error - Invalid' + errorLst.toString());
      }
      if (pwErrorLst.length) {
        setPwErrorStr('Password error - need at least' + pwErrorLst.toString());
      }
    } else {
      setErrorStr('');
      setPwErrorStr('');
      pushInfo();
    }
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formInfo.name,
      gender: formInfo.gender,
      email: formInfo.email,
      password,
      phone: formInfo.phone,
      applicant_dob: formInfo.applicant_dob,
      street_name: formInfo.street_name,
      city: formInfo.city,
      province: formInfo.province,
      ...(roleID === 0 && {
        income: veteranInfo.income,
        demographic: veteranInfo.demographic,
        referral: formInfo.referral,
      }),
      curr_level: formInfo.curr,
      jwt,
    }),
  };

  function pushInfo() {
    fetch(`/api/signup`, requestOptions)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.success) {
          history.push('/');
        }
      });
  }

  if (isLoading) {
    return (
      <Typography
        sx={{
          fontSize: '1.8rem',
          fontweight: 600,
          mt: '30vh',
          mb: '30vh',
        }}
      >
        Loading...
      </Typography>
    );
  } else if (!isVerified) {
    return (
      <Box
        sx={{
          mt: '20vh',
          mb: '30vh',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontweight: 600,
            mb: '20px',
          }}
        >
          Oops! You can't access this page.
        </Typography>
        <Button
          onClick={() => history.push('/')}
          variant="contained"
          sx={{
            fontSize: '1.2rem',
          }}
        >
          Return to home
        </Button>
      </Box>
    );
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: '1.8rem',
          fontWeight: 600,
          mb: '25px',
        }}
      >
        Please fill out the following fields
      </Typography>

      <TextField
        required
        label="Name"
        name="name"
        value={formInfo.name}
        onChange={handleFormChange}
      />

      <FormControl
        sx={{
          mt: '25px',
        }}
      >
        <FormLabel
          sx={{
            display: 'block',
            alignSelf: 'left',
          }}
        >
          Gender
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="gender"
          value={formInfo.gender}
          onChange={handleFormChange}
        >
          <FormControlLabel
            value="F"
            control={<Radio required={true} />}
            label="Female"
          />
          <FormControlLabel
            value="M"
            control={<Radio required={true} />}
            label="Male"
          />
          <FormControlLabel
            value="O"
            control={<Radio required={true} />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>

      <TextField
        required
        label="Email"
        name="email"
        value={formInfo.email}
        onChange={handleFormChange}
        sx={{
          mt: '25px',
        }}
      />

      <TextField
        required
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handleAdminPasswordChange}
        sx={{
          mt: '25px',
        }}
      />

      <TextField
        required
        label="Confirm Password"
        name="confirm_password"
        type="password"
        value={passwordConfirm}
        onChange={handleAdminPasswordConfirmChange}
        sx={{
          mt: '25px',
        }}
      />

      <TextField
        required
        label="Phone Number"
        name="phone"
        value={formInfo.phone}
        onChange={handleFormChange}
        sx={{
          mt: '25px',
          mb: '25px',
          width: '60%',
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isMobile ?
          <MobileDatePicker
            label="Date of Birth"
            inputFormat="yyyy-MM-dd"
              value={formInfo.applicant_dob}
              onChange={(v) => setFormInfo({
                ...formInfo,
                applicant_dob : JSON.stringify(v).slice(1, 11)
              })}
              renderInput={(params) => <TextField {...params} />}
            />
            :
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              value={formInfo.applicant_dob}
              onChange={(v) => setFormInfo({
                ...formInfo,
                applicant_dob: JSON.stringify(v).slice(1, 11)
              })}
              renderInput={(params) => <TextField {...params} />}
            />
          }
        </LocalizationProvider>

      <Box id="location">
        <TextField
          required
          label="Street Address"
          name="street_name"
          value={formInfo.street_name}
          onChange={handleFormChange}
          sx={{
            width: '50%',
            mt: '25px',
          }}
        />
        <TextField
          required
          label="City"
          name="city"
          value={formInfo.city}
          onChange={handleFormChange}
          sx={{
            width: '25%',
            mt: '25px',
          }}
        />
        <FormControl
          sx={{
            width: '25%',
            mt: '25px',
          }}
        >
          <InputLabel>Province *</InputLabel>
          <Select
            required
            label="Province"
            name="province"
            value={formInfo.province}
            onChange={handleFormChange}
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
          </Select>
        </FormControl>
      </Box>
      {roleID === 0 ? (
        <Box>
          <Box
            sx={{
              width: '100%',
              mt: '25px',
            }}
          >
            <TextField
              required
              label="Income"
              name="income"
              value={veteranInfo.income}
              onChange={handleVeteranFormChange}
              sx={{
                width: '50%',
              }}
            />
            <TextField
              required
              label="Demographic"
              name="demographic"
              value={veteranInfo.demographic}
              onChange={handleVeteranFormChange}
              sx={{
                width: '50%',
              }}
            />
          </Box>
          <FormControl
            sx={{
              mt: '25px',
            }}
          >
            <>
              <InputLabel>Incoming Referral</InputLabel>
              <Select 
                label="Incoming Referral"
                name="referral"
                value={partners[0] ? partners[0].org_name : null}
                onChange={handleFormChange}
              >
                {!partners
                  ? null
                  : partners.map(({ org_name }) => (
                      <MenuItem value={org_name}>{org_name}</MenuItem>
                    ))}
              </Select>
            </>
          </FormControl>
        </Box>
      ) : null}

      <Button
        variant="outlined"
        type="submit"
        sx={{
          mt: '25px',
          p: '10px',
        }}
      >
        Submit
      </Button>

      {errorStr !== '' ? (
        <Alert variant="filled" severity="error">
          {errorStr}
        </Alert>
      ) : null}

      {pwErrorStr !== '' ? (
        <Alert variant="filled" severity="error">
          {pwErrorStr}
        </Alert>
      ) : null}
    </Box>
  );
}
