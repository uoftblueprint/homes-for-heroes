import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

export default function AdminHeader() {

  const [auth, setAuth] = React.useState(true);
  const [drawer, setDrawer] = React.useState(false);

  const toggleAuth = () => {
    setAuth(!auth);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  }; 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          {auth ? (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleAuth}
                color="inherit"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleAuth}
                color="inherit"
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <List>
            {["Case Management", "CRM"].map((text, index) => (
              <ListItem
                button
                component="a"
                href={text.replace(/\s+/g, "-").toLowerCase()}
                key={text}
              >
                <ListItemIcon>
                  {index === 0 ? <BusinessCenterIcon /> : <DeviceHubIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  ); 
}

