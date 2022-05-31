import * as React from 'react';
import { useState } from 'react';
import { Button, Alert, Typography, TextField, Box } from '@mui/material';

import validator from 'validator';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');

  const [emailSent, setEmailSent] = useState(false);

  const [emailValid, setEmailValid] = useState(true);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // upon successful email sending, show success alert

    if (!validator.isEmail(email)) {
      setEmailValid(false);
    } else {
      setEmailSent(true);
      setEmailValid(true);
    }
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: '1.8rem', fontWeight: 600, mt: '75px', mb: '25px' }}
      >
        Verify your email
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          width: '20vw',
          minWidth: '300px',
        }}
      >
        <TextField
          required
          id="email"
          label="Email"
          name="Email"
          autoComplete="Email"
          onChange={handleEmailChange}
          value={email}
          sx={{
            width: '100%',
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{
            padding: '7px',
            mt: '15px',
          }}
        >
          Send verification email
        </Button>

        {emailSent | !emailValid ? (
          <Alert
            variant="filled"
            severity={emailValid ? 'success' : 'error'}
            sx={{
              mt: '40px',
            }}
          >
            {emailValid
              ? 'Email sent - Check your inbox!'
              : 'Please enter a valid email'}
          </Alert>
        ) : null}
      </Box>
    </Box>
  );
}
