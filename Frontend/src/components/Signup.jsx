import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

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

export default function Signup() {
  const [email, setEmail] = React.useState('');
  const [newPassword1, setNewPassword1] = React.useState('');
  const [newPassword2, setNewPassword2] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleNewPassword1Change(e) {
    setNewPassword1(e.target.value);
  }

  function handleNewPassword2Change(e) {
    setNewPassword2(e.target.value);
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const res = await fetch('http://localhost:3000/api/signup', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, newPassword1 }),
  //     });
  //     const { token } = await res.json();
  //     console.log(token);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          history.push('/verify');
        }
      });
  };

  const [showNewPassword1, setShowNewPassword1] = useState(false);
  const handleClickShowNewPassword1 = () => {
    setShowNewPassword1(!showNewPassword1);
  };

  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const handleClickShowNewPassword2 = () => {
    setShowNewPassword2(!showNewPassword2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = (endpoint) => {
    history.push(`/api/oauth2/${endpoint}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            Sign up for access to the system
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              name="Email"
              autoComplete="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              label="Password"
              name="password"
              value={newPassword1}
              autoComplete="current-password"
              type={showNewPassword1 ? 'text' : 'password'}
              onChange={handleNewPassword1Change}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword1}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewPassword1 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              fullWidth
              margin="normal"
              id="password2"
              label="Confirm Password"
              name="password2"
              value={newPassword2}
              autoComplete="current-password"
              type={showNewPassword2 ? 'text' : 'password'}
              onChange={handleNewPassword2Change}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword2}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            /> */}
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
              Sign Up
            </Button>

            <Typography sx={{ mt: 3 }}>Or, sign in with...</Typography>

            <Box>
              <Button onClick={() => handleButtonClick('google')}>
                Google
              </Button>
              <Button onClick={() => handleButtonClick('facebook')}>
                Facebook
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
