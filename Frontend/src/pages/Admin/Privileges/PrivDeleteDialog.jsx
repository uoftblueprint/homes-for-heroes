import * as React from "react";

import { useSnackbar } from "notistack";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import DialogContentText from "@mui/material/DialogContentText";

import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";



import { CircularProgress } from "@mui/material";

export default function PrivDeleteDialog({ dialog, toggleDialog, user_id }) {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();



const handleDelete = () => {
  setLoading(true);
  const url = `http://localhost:3000/admins/${user_id}/deleteSupervisor`;

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      setLoading(false);
      toggleDialog(false);
    })
    .catch((e) => {
      const action = (key) => (
        <Grid>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </Button>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      );
      enqueueSnackbar("Something went wrong", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      });
    });
};

  return (
      <Dialog open={dialog} onClose={() => toggleDialog(false)} PaperProps={{ sx: { width: "50%", height: "30%" } }}>
        <DialogTitle>Delete this supervisor?</DialogTitle>
        {isLoading ?
        <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
        </div>
        :
        <DialogContent>
        <DialogContentText>
            Deleting this supervisor will remove all information related to the supervisor.
        </DialogContentText>
        <DialogContentText>
            If you would like to assign the supervisor to a different chapter, change the chapter in the options and add the supervisor there.  
        </DialogContentText>
        </DialogContent>
        }
        <DialogActions>
          <Button sx={{color: '#FF0000'}} onClick={handleDelete}>Delete</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}