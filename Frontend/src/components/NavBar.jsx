import * as React from 'react';
import { AppBar, Toolbar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { withRouter } from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import SvgLogo from './logo.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C91C1C',
    },
    secondary: {
      main: '#2196F3',
    },
  },
});

const Header = (props) => {
  const { history } = props;
  const [open, toggleOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    toggleOpen(false);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: 'User CRM',
      pageURL: '/usercrm',
    },
    {
      menuTitle: 'User Case',
      pageURL: '/usercase',
    },
    {
      menuTitle: 'Forms',
      pageURL: '/forms',
    },
    {
      menuTitle: 'Admin Privileges',
      pageURL: '/admin',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ background: 'primary.main', p: 1.5 }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                sx={{
                  marginRight: theme.spacing(2),
                  color: 'inherit',
                }}
                aria-label="menu"
                onClick={() => toggleOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={() => toggleOpen(false)}
                onOpen={() => toggleOpen(true)}
              >
                <List>
                  {menuItems.map((menuItem) => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                      <ListItem onClick={() => handleMenuClick(pageURL)}>
                        <ListItemText>{menuTitle}</ListItemText>
                      </ListItem>
                    );
                  })}
                  <ListItem onClick={() => handleMenuClick('profile')}>
                    Profile
                  </ListItem>
                  
                  <ListItem onClick={() => handleMenuClick('login')}>
                    Login
                  </ListItem>
                  
                  <ListItem onClick={() => handleMenuClick('signup')}>
                    Signup
                  </ListItem>
                  
                </List>
              </SwipeableDrawer>
            </>
          ) : (
            <>
              <IconButton onClick={() => handleMenuClick('/')}>
                <Icon sx={{ height: 75, width: 75 }}>
                  <img src={SvgLogo} height={75} width={75} alt="" />
                </Icon>
              </IconButton>
              <div
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-evenly',
                }}
              >
                {menuItems.map((menuItem) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Button
                      onClick={() => handleButtonClick(pageURL)}
                      sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        m: 2,
                        fontSize: 16,
                      }}
                    >
                      {menuTitle}
                    </Button>
                  );
                })}
              </div>

              <div style={{ marginLeft: 'auto' }}>
                <Button
                  onClick={() => handleButtonClick('profile')}
                  sx={{
                    marginLeft: 'auto',
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Profile
                </Button>

                <Button
                  onClick={() => handleButtonClick('login')}
                  sx={{
                    marginLeft: 'auto',
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Login
                </Button>

                <Button
                  onClick={() => handleButtonClick('signup')}
                  sx={{
                    marginLeft: 'auto',
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Signup
                </Button>

              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default withRouter(Header);
