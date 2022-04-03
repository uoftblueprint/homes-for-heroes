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

  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    pushInfo()
  };

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formInfo.name,
      email: formInfo.email,
      phone: formInfo.phone,
      street_name: formInfo.street_name,
      city: formInfo.city,
      province: formInfo.province,
      applicant_dob: formInfo.applicant_dob,
    }),
  };

  const pushInfo = () = {
    // fetch(
    //   'http://localhost:3000/updateCustomerProfile/11',
    //   requestOptions,
    // ).then((response) => response.json());
    // setUserInfo({
    //   ...formInfo,
    // });
  }

  function fetchPartners() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/partners')
        .then((resp) => resp.json())
        .then((data) => resolve(data));
    });
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetchPartners();
      setPartners(data['partners']);

      setIsLoading(false);
    })();
  }, []);

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

      <TextField
        required
        label="Phone Number"
        name="phone"
        value={formInfo.phone}
        onChange={handleFormChange}
        sx={{
          mt: '25px',
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
        }}
      />

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
