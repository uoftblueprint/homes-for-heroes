import * as React from 'react';
import { AppBar, Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from '@mui/material';
import { withRouter } from "react-router-dom";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box'

import { createTheme, ThemeProvider } from '@mui/material/styles' 

const theme = createTheme({
   palette: {
      primary: {
         main: '#C91C1C',
      },
      secondary: {
         main: '#2196F3',
      },
   }
});

const Header = props => {
  const { history } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/"
    },
    {
      menuTitle: "User CRM",
      pageURL: "/usercrm"
    },
    {
      menuTitle: "User Case",
      pageURL: "/usercase"
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ background: 'primary.main', p: 1.5}}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ mr: 7 }}
          >
            HFH
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                sx={{
                  marginRight: theme.spacing(2),
                  color: "inherit"
                }}
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
                <MenuItem onClick={() => handleMenuClick("login")}>
                  Login
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div sx={{
                display: "flex",
                flex: 1,
                justifyContent: "space-evenly"
              }}>
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Button
                      onClick={() => handleButtonClick(pageURL)}
                      sx={{ color: 'white', m: 2, fontSize: 16 }}
                    >
                      {menuTitle}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                onClick={() => handleButtonClick("login")}
                sx={{ color: 'white', fontSize: 16 }}
              >
                Login
              </Button>
            </>
        )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default withRouter(Header);