import * as React from "react";

import PrivAdminModal from "./PrivAdminModal";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";


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

export default function PrivAdminCard() {  
  const [adminDialog, toggleAdminDialog] = React.useState(false);

  const handleAdminOpen = () => {
    toggleAdminDialog(true) 
  }
 
  return (
    <Card sx={{ maxWidth: 385, mt: "40px", mr: "30px", border: 1 }}>
        <CardContent>
          <Grid container display="flex" direction="row" justify="space-evenly">
            <Typography>System Admins</Typography>
            <Button
              size="small"
              onClick={handleAdminOpen}
              startIcon={<AddIcon />}
              sx={{ marginLeft: "auto" }}
            >
              Add New
            </Button>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left" }}
          >
            System administrators have access to all areas of this application.
            There must always be at least one.
          </Typography>
          <List>
            {supervisors
              .filter((el) => el.isAdmin === true)
              .map((supervisor) => {
                return (
                  <ListItem
                    secondaryAction={
                      <Button
                        size="small"
                        onClick={() =>
                          setSupervisors((prevState) =>
                            prevState.map((user) => {
                              if (user.name === supervisor.name) {
                                return {
                                  ...user,
                                  isAdmin: false,
                                };
                              }
                              return user;
                            })
                          )
                        }
                        startIcon={<DeleteIcon />}
                        sx={{
                          fontWeight: "bold",
                          color: "#C91C1C",
                          marginLeft: "auto",
                        }}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar {...stringAvatar(supervisor.name)} />
                    </ListItemAvatar>
                    <ListItemText primary={supervisor.name} />
                  </ListItem>
                );
              })}
          </List>
        </CardContent> 
        <PrivAdminModal adminDialog={adminDialog} toggleAdminDialog={toggleAdminDialog}/>
      </Card>
  );
}
