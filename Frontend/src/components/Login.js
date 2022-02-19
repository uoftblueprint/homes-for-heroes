import * as React from 'react';
import { useState } from 'react';
import { Button, Checkbox, Container, CssBaseline, FormControlLabel, Typography, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material"
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
  }
});

const INITIAL_USER = {
  email: '',
  password: ''
};  


export default function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setUser(prevState => ({ ...prevState, [name]: value }));
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Email"
              name="Email"
              autoComplete="Email"
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"

              type={showPassword ? "text": "password"}
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
                )
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
              sx={{ mt: 3, mb: 2, textTransform: 'none', fontSize: 16 }}
            >
              Sign In
            </Button>

            <Typography sx={{ fontSize: 14, color: 'grey' }}>
              If you don't have credentials, please contact your team's supervisor for access
            </Typography>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}