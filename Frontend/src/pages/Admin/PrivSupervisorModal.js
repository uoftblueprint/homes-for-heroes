import * as React from "react";


import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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

export default function PrivSupervisorModal() {
  
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [dialog, toggleDialog] = React.useState(false); 
  const [chapterDialog, toggleChapterDialog] = React.useState(false);
  const [chapterName, setChapterName] = React.useState(""); 

  const handleChapterDialog = () => {
    setLocations(prevArr => [...prevArr, chapterName]);
    toggleChapterDialog(false);
  }
  
  return (
    <Grid>
    <Dialog
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={chapterDialog}
          onClose={() => toggleChapterDialog(false)}
        >
          <DialogTitle>Add Chapter</DialogTitle>
          <DialogContent>
          <TextField 
          label="Chapter Name" 
          variant='standard' 
          value={chapterName} 
          onChange={(e) => setChapterName(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChapterDialog}>
              Add Chapter
            </Button>
          </DialogActions>
        </Dialog>        

        <Dialog
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={dialog}
          onClose={() => toggleDialog(false)}
        >
          <DialogTitle>Add Supervisor</DialogTitle>
          <DialogContent>
            {supervisors.map((supervisor) => {
              return (
                <ListItem
                  secondaryAction={
                    supervisor.svregion === svLocation ? (
                      <Button
                        disabled
                        size="small"
                        startIcon={<CheckIcon />}
                        sx={{ color: "#BDBDBD", marginLeft: "auto" }}
                      >
                        Already Supervisor
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
                                  svregion: svLocation,
                                };
                              }
                              return user;
                            })
                          )
                        }
                        startIcon={<AddIcon />}
                        sx={{ color: "#B20009", marginLeft: "auto" }}
                      >
                        Make Supervisor
                      </Button>
                    )
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => toggleDialog(false)} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        </Grid>
  );
}
