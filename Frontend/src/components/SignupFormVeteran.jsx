import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
  Form,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { useParams } from 'react-router-dom';

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
    income: 0,
    demographic: '',
  });

  const [password, setPassword] = useState('');

  let { jwt } = useParams();
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleID, setRoleID] = useState(0);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);

      const data = await fetchPartners();
      // const id = await fetchRoleID();
      setPartners(data['partners']);
      // setRoleID(id['role_id']);
      setRoleID(0);

      setIsLoading(false);
    })();
  }, []);

  function fetchPartners() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/partners')
        .then((resp) => resp.json())
        .then((data) => resolve(data));
    });
  }

  // function fetchRoleID() {
  //   return new Promise((resolve) => {
  //     fetch('http://localhost:3000/roleid')
  //       .then((resp) => resp.json())
  //       .then((data) => resolve(data));
  //   });
  // }

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

  const handleSubmit = () => {
    pushInfo();
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formInfo.name,
      gender: formInfo.gender,
      email: formInfo.email,
      ...(roleID === 0 && { password: password }),
      phone: formInfo.phone,
      applicant_dob: formInfo.applicant_dob,
      street_name: formInfo.street_name,
      city: formInfo.city,
      province: formInfo.province,
      ...(roleID === 1 && {
        income: veteranInfo.income,
        demographic: veteranInfo.demographic,
      }),
      referral: formInfo.referral,
      curr: formInfo.curr,
    }),
  };

  function pushInfo() {
    fetch(`http://localhost:3000/signup/${jwt}`, requestOptions).then(
      (response) => response.json(),
    );
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
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
          mt: '75px',
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
          required
          name="gender"
          value={formInfo.gender}
          onChange={handleFormChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
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

      {roleID === 0 ? (
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
      ) : null}

      <Box>
        <TextField
          required
          label="Phone Number"
          name="phone"
          value={formInfo.phone}
          onChange={handleFormChange}
          sx={{
            mt: '25px',
            width: '60%',
          }}
        />

        <TextField
          required
          label="Date of Birth"
          name="applicant_dob"
          value={formInfo.applicant_dob}
          onChange={handleFormChange}
          sx={{
            mt: '25px',
            width: '40%',
          }}
        />
      </Box>

      <Box id="location">
        <TextField
          required
          label="Street Name"
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

      {roleID === 1 ? (
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
      ) : null}

      <FormControl
        sx={{
          mt: '25px',
        }}
      >
        <>
          <InputLabel>Incoming Referral *</InputLabel>
          <Select
            required
            label="Incoming Referral"
            name="referral"
            value={formInfo.referral}
            onChange={handleFormChange}
          >
            {partners.map(({ org_name }) => (
              <MenuItem value={org_name}>{org_name}</MenuItem>
            ))}
          </Select>
        </>
      </FormControl>

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
    </Box>
  );
}
