import * as React from "react";

import useFetch from "../../../api/useFetch";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



import { CircularProgress } from "@mui/material";

export default function PrivDeleteDialog({ dialog, toggleDialog, user_id }) {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const { fetchWithError } = useFetch()



const handleDelete = (user_id) => {
  (async() => {
      setLoading(true);
      const endpoint = `admins/${user_id}/deleteSupervisor`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        } 
      }
      fetchWithError(endpoint, options);
      setLoading(false);
      toggleDialog(false);
      })();
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
          <Button sx={{color: '#FF0000'}} onClick={() => handleDelete(user_id)}>Delete</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}