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

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormInfo({
      ...formInfo,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function fetchPartners() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/partners')
        .then((resp) => resp.json())
        .then((data) => resolve(data));
    });
  }

  React.useEffect(() => {
    (async () => {
      const data = await fetchPartners();
      setPartners(data);
    })();
  }, []);

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
        id="name"
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
          id="gender"
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
        id="email"
        value={formInfo.email}
        onChange={handleFormChange}
        sx={{
          mt: '25px',
        }}
      />

      <TextField
        required
        label="Phone Number"
        id="phone"
        value={formInfo.phone}
        onChange={handleFormChange}
        sx={{
          mt: '25px',
        }}
      />

      <TextField
        required
        label="Date of Birth"
        id="applicant_dob"
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
          id="street_name"
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
          id="city"
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
            id="province"
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
        {partners ? (
          <>
            <InputLabel>Incoming Referral *</InputLabel>
            <Select
              required
              label="Incoming Referral"
              id="referral"
              value={formInfo.referral}
              onChange={handleFormChange}
            >
              {Object.entries(partners).map((row) => (
                <MenuItem value={row['org_name']}>{row['org_name']}</MenuItem>
              ))}
            </Select>
          </>
        ) : null}
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
