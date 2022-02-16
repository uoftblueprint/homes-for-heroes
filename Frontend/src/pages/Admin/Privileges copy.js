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
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";

// Demo purposes
const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    border: 0, 
    alignContent: "flex-start",
    justifyContent: "flex-start",
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "small",
      marginTop: "5px",
      marginLeft: "-5px",
      marginBottom: "10px",
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-cell": {
      borderRight: "none",
      borderBottom: "none !important",
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
  },
  SearchInputField: {
    backgroundColor: "#F7F8F9",
    "& .MuiFilledInput-input": {
      padding: "10px",
    },
  },
});

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

export default function Privileges() {

  const classes = useStyles(); 
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [locations, setLocations] = React.useState(["Toronto", "Montreal"]);
  const [svLocation, setSvLocation] = React.useState("Toronto");
  const [dialog, toggleDialog] = React.useState(false);
  const [adminDialog, toggleAdminDialog] = React.useState(false);
  const [chapterDialog, toggleChapterDialog] = React.useState(false);
  const [chapterName, setChapterName] = React.useState("");
  const [supervisors, setSupervisors] = React.useState([
    {
      id: "1",
      name: "Don Jon",
      svregion: "Toronto",
      isAdmin: true,
    },
    {
      id: "2",
      name: "Barry Allen",
      svregion: "Montreal",
      isAdmin: false,
    },
    {
      id: "3",
      name: "Evan Hansen",
      svregion: "Toronto",
      isAdmin: true,
    },
    {
      id: "4",
      name: "Sasha Blouse",
      svregion: "Montreal",
      isAdmin: true,
    },
    {
      id: "5",
      name: "Mary Poppins",
      svregion: "Montreal",
      isAdmin: false,
    },
  ]);

  const handleChapterDialog = () => {
    setLocations(prevArr => [...prevArr, chapterName]);
    toggleChapterDialog(false);
  }
  
  const submitChanges = () => {
    console.log('hi')
  }

  return (
    <Grid display="flex" direction="column">
    <Grid container display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 385, mt: "40px", mr: "30px", border: 1 }}>
        <CardContent>
          <Grid container display="flex" direction="row" justify="space-evenly">
            <Typography>System Admins</Typography>
            <Button
              size="small"
              onClick={() => toggleAdminDialog(true)}
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
        <Dialog
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={adminDialog}
          onClose={() => toggleAdminDialog(false)}
        >
          <DialogTitle>Add System Admin</DialogTitle>
          <DialogContent>
          <TextField
            className={classes.SearchInputField}
            fullWidth 
            variant="outlined"
            placeholder="Search Users"
            name="search"
            type="text"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') { 
                e.target.value = ""
              }
            }}
        /> 
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
            <Button onClick={() => toggleAdminDialog(false)} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
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
        </Card>

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
            <TextField
            className={classes.SearchInputField}
            fullWidth 
            variant="outlined"
            placeholder="Search Users"
            name="search"
            type="text"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') { 
                e.target.value = ""
              }
            }}
        /> 
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
      <Grid
      display='flex'
      >
        <Button
        sx={{ marginLeft: 'auto' }}
        onClick={submitChanges}
        disabled={false}
        >
          Apply Changes
          </Button>
      </Grid>
      </Grid>
  );
}
