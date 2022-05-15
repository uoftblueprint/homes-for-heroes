import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function ResetPassword() {
  const { jwt } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  const validatePassword = () => {
    let pwErrorLst = [];

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
      password.replace(/[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '').length <
      1
    ) {
      pwErrorLst.push(' 1 symbol');
    } 
    if (pwErrorLst.length) {
      return 'Password error - need at least' + pwErrorLst.toString(); 
      
    } else {
      return '';
    }
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('/api/resetPassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newPassword: password, 
          token:jwt 
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirm = () => {
    setShowConfirm(!showConfirm);
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
            Set a new password 
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
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={handlePasswordChange} 
              error={validatePassword() !== ''}
              helperText={validatePassword()}
              type={showPassword ? 'text' : 'password'}
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
            <TextField
              required
              fullWidth
              margin="normal"
              id="password-confirm"
              label="Confirm Password"
              name="password-confirm"
              value={passwordConfirm}
              error={password !== passwordConfirm}
              helperText={password !== passwordConfirm ? `Passwords don't match!` : ''}
              onChange={handlePasswordConfirmChange} 
              type={showConfirm ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
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
              disabled={password !== passwordConfirm || validatePassword() !== ''}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                textTransform: 'none',
                fontSize: 16,
              }}
            >
              Reset Password 
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
