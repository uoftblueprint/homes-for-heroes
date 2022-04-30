import * as React from "react";

import { useSnackbar } from "notistack";


import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";

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
    children: `${name.split(" ")?.[0]?.[0] || ''}${name.split(" ")?.[1]?.[0] || ''}`,
  };
}

export default function PrivSupervisorModal({ svDialog, toggleSvDialog, currChapter }) {
  
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [admins, setAdmins] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (searchParams !== ''){
    setLoading(true);
    const url = `/api/admins/getSearchAdmins?name=${searchParams}`;
  
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setAdmins(resp.admins);
        setLoading(false);
      })
      .catch(e => {
        const action = key => (
          <Grid>
              <Button onClick={() => { window.location.reload(); }}>
                Refresh
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => { closeSnackbar(key) }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton> 
          </Grid>
      );
        enqueueSnackbar(
          'Something went wrong',{
            variant: 'error',
            autoHideDuration: 15000,
            action,
          })
      });
    } 
  }, [searchParams, svDialog]);

  const handleSetSupervisor = (admin_id) => {
    setAdmins((prevState) =>
      prevState.map((user) => {
        if (user.user_id === admin_id) {
          return {
            ...user,
            role_id: 1,
            chapter_id: currChapter.chapter_id 
          };
        }
        return user;
      })
    )
    setLoading(true);
    const url = `api/admins/${admin_id}/makeSupervisor`;

    fetch(url,{
      method: 'PUT',
      headers:{
      'Content-Type':'application/json'
      },
    })
      .then((resp) => {
        fetch(`api/supervisors/${admin_id}/assignChapter`,{
          method: 'PUT',
          headers:{
          'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id: currChapter.chapter_id
          })
        })
        setLoading(false);
      })
      .catch(e => {
        const action = key => (
          <Grid>
            <Button onClick={() => { window.location.reload(); }}>
              Refresh
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => { closeSnackbar(key) }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        );
        enqueueSnackbar(
          'Something went wrong', {
          variant: 'error',
          autoHideDuration: 15000,
          action,
        })
      });
  }

  const handleDialogClose = () => {
    // Send SuperAdmin Changes and toggle
    setSearchParams('');
    setAdmins([]);
    toggleSvDialog(false);
    
  }
  return (
    <Grid> 
      <Dialog 
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={svDialog}
          onClose={handleDialogClose}
      >
        <DialogTitle>Add Supervisor</DialogTitle>
        <DialogContent
          sx={{ minHeight: 300 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Admins"
            name="search"
            type="text"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setSearchParams(e.target.value);
              }
            }}
          />
          {isLoading ? 
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress /> 
          </div>
          : 
            <>
              {admins.length === 0 ?  
                <> No results Found </> 
                :
                admins.map((admin) => {
                return (
                  <ListItem
                    key={admin.user_id}
                    secondaryAction={
                      admin.role_id === 1 && admin.chapter_id === currChapter.chapter_id ? (
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
                        onClick={() => handleSetSupervisor(admin.user_id)}
                        startIcon={<AddIcon />}
                        sx={{ color: "#B20009", marginLeft: "auto" }}
                      >
                        Make Supervisor
                      </Button>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(admin.name)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={admin.name} 
                  />
                </ListItem>
              );
            })}
            </>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        </Grid>
  );
}
