import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Link,
  Typography,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoggedIn } from '../../../redux/userSlice';
import { useHistory, useLocation } from 'react-router-dom';

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

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const history = useHistory();

  const authLogin = useSelector(selectLoggedIn);

  if (authLogin) {
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 200) {
        const { expires, role_id, user_id } = await res.json();
        dispatch(
            login({
              user_id: user_id,
              email: email,
              password: password,
              loggedIn: true,
              timeout: expires,
              role_id: role_id,
            }),
        );
        const {from} = location.state || {from: {pathname: '/'}};
        history.replace(from);
      } else {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            Sign in to access system
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
              value={email}
              autoComplete="Email"
              onChange={handleEmailChange}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              label="Password"
              name="password"
              value={password}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
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
              Sign In
            </Button>
            <Link href='/forgotpassword'>
              <Typography sx={{ fontSize: 18, color: 'grey' }}>
              Forgot Password? 
            </Typography>
            </Link>
            <Typography sx={{ fontSize: 14, color: 'grey' }}>
              If you don&apos;t have credentials, please contact your
              team&apos;s supervisor for access
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
