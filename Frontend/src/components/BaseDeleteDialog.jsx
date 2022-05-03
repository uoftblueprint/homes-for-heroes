import * as React from "react";

import useFetch from "../api/useFetch";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



import { CircularProgress } from "@mui/material";

export default function BaseDeleteDialog({ dialog, deDialogEndpoint, toggleDialog, veterans, setVeterans, names, setNames, demoName}) {


  const theme = useTheme();
  const [isLoading, setLoading] = React.useState(false);
  const { fetchWithError } = useFetch()



const handleDelete = (user_id) => {
  (async() => {
      setLoading(true);
      const endpoint = deDialogEndpoint;
      const options =  {
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          rows: veterans
        })
      }
      await fetchWithError(endpoint, options); 
      setVeterans([]); 
      setNames([]);
      setLoading(false);
      toggleDialog(false);
      })(); 
};

  return (
      <Dialog open={dialog} onClose={() => toggleDialog(false)} PaperProps={{ sx: { width: "50%"} }}>
        <DialogTitle>Delete these {demoName}s?</DialogTitle>
        {isLoading ?
        <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
        </div>
        :
        <DialogContent>
        <DialogContentText>
            Deleting these {demoName}s will remove all information related to these {demoName}s.
        </DialogContentText> 
        <List>
            {names
              .map((name) => {
                return (
                  <ListItem>
                    <ListItemText primary={name} />
                  </ListItem>
                );
              })}
          </List>
        </DialogContent>
        }
        <DialogActions>
          <Button sx={{color: '#FF0000'}} onClick={handleDelete}>Delete</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}