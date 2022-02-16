import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";

// Demo purposes

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function PrivAdminModal({ adminDialog, toggleAdminDialog }) {
  
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));


  const getAdminList = () => {
    //fetch all admins 
  }
  
  const handleDialogClose = () => {
    // Send SuperAdmin Changes and toggle
    toggleAdminDialog(false);
  }
   return (
    <Dialog
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={adminDialog}
          onClose={handleDialogClose}
        >
          <DialogTitle>Add System Admin</DialogTitle>
          <DialogContent>
            {supervisors.map((supervisor) => {
              return (
                <ListItem
                  secondaryAction={
                    supervisor.isAdmin === true ? (
                      <Button
                        disabled
                        size="small"
                        startIcon={<CheckIcon />}
                        sx={{ color: "#BDBDBD", marginLeft: "auto" }}
                      >
                        Already Admin
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        onClick={() =>
                          setSupervisors((prevState) =>
                            prevState.map((user) => {
                              if (user.name === supervisor.name) {
                                return {
                                  ...user,
                                  isAdmin: true,
                                };
                              }
                              return user;
                            })
                          )
                        }
                        startIcon={<AddIcon />}
                        sx={{ color: "#B20009", marginLeft: "auto" }}
                      >
                        Make Admin
                      </Button>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(supervisor.name)} />
                  </ListItemAvatar>
                  <ListItemText primary={supervisor.name} />
                </ListItem>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
  );
}
