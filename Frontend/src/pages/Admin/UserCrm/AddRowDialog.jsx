import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import AddIcon from '@mui/icons-material/Add';
import validator from 'validator';

import { useSnackbar } from "notistack";

export default function AddRowButton({ dialog, setDialog }) {
  const [isLoading, setLoading] = React.useState(false); 
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState(''); 
  const [emailError, setEmailError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleEmailChange = (e) => {
    setEmailError(!validator.isEmail(e.target.value));    
    setEmail(e.target.value);
  }

  const addRow = () => {
    let active = true;
    setLoading(true);
    const url = `http://localhost:3000/createveteran`;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        setDialog(false); 
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

  return (
    <Grid sx={{ marginRight: "auto" }}> 
      <Dialog open={dialog} onClose={() => setDialog(false)} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
        <DialogTitle>Add Veteran</DialogTitle>
        <DialogContent> 
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="standard" 
            />
            <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email" 
            value={email}
            error={emailError}
            onChange={handleEmailChange}
            fullWidth
            variant="standard" 
            /> 
        </DialogContent>
        <DialogActions>
          <Button disabled={emailError} onClick={addRow}>Add Veteran</Button>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}