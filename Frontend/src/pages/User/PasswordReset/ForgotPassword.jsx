import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Box,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/forgotpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const { token } = await res.json();
      console.log(token);
      setEmailSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {emailSent ?
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Check your email inbox 
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography>
            A password reset link has been sent to <Box  fontWeight= 'bold' display='inline'>{email}</Box> 
          </Typography> 
          </Box>
        </Box>
      </Container>
      :
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot your password? 
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography>
            Please enter the email address associated with this account. 
          </Typography>
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              name="Email"
              value={email}
              autoComplete="Email"
              onChange={handleEmailChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                textTransform: 'none',
                fontSize: 16,
              }}
            >
              Continue 
            </Button>
          </Box>
        </Box>
      </Container>
      }
    </ThemeProvider>
  );
}
