import * as React from "react";

import { useSnackbar } from "notistack";


import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";

import validator from 'validator';

export default function AddSupporterModal({ dialog, toggleDialog }) {


  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState(''); 
  const [emailError, setEmailError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

const handleAdd = () => {
    let active = true;
    setLoading(true);
    const url = ``;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then((resp) => {
        setLoading(false);
        toggleDialog(false);
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

  const handleEmailChange = (e) => {
    setEmailError(!validator.isEmail(e.target.value));    
    setEmail(e.target.value);
  }

  return (
      <Dialog open={dialog} onClose={() => toggleDialog(false)} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
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
          <Button disabled={emailError} onClick={handleAdd}>Add Supporter</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}