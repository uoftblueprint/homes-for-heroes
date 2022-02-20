import * as React from "react";

import PrivSupervisorModal from "./PrivSupervisorModal";

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

export default function PrivSupervisorCard() {
  const [locations, setLocations] = React.useState(["Toronto", "Montreal"]);
  const [svLocation, setSvLocation] = React.useState("Toronto");
  const [dialog, toggleDialog] = React.useState(false);

   return (
    <Card sx={{ maxWidth: 385, mt: "40px", border: 1 }}>
          <CardContent>  
            <Grid container display="flex" direction="row" justify="space-evenly">
            <Typography>Chapter Supervisors</Typography> 
            <Button
              size="small"
              onClick={() => toggleChapterDialog(true)}
              startIcon={<AddIcon />}
              sx={{ marginLeft: "auto" }}
            >
              Add Chapter 
            </Button>
          </Grid>
          <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left" }}
            >
              The following people are chapter supervisors of the selected chapter.
            </Typography>
        <Autocomplete
          disablePortal
          autoHighlight
          blurOnSelect
          value={svLocation}
          onChange={(event, value) => setSvLocation(value)}
          id="combo-box-demo"
          options={locations}
          sx={{ width: 250, mt: '20px' }}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
        <Grid container display="flex" direction="row" justify="space-evenly" sx={{ mt: '15px'}}>
              <Typography>{svLocation} Supervisors</Typography>
              <Button
                size="small"
                onClick={() => toggleDialog(true)}
                startIcon={<AddIcon />}
                sx={{ marginLeft: "auto" }}
              >
                Add New
              </Button> 
        </Grid>    
            <List>
              {supervisors
                .filter((el) => el.svregion === svLocation)
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
                                    svregion: "",
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
                      <ListItemText
                        primary={supervisor.name}
                        secondary={`Supervisor of : ${supervisor.svregion}`}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </CardContent>
          <PrivSupervisorCard />
        </Card>
  );
}
