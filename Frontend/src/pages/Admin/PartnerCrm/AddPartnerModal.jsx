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

export default function AddPartnerModal({ dialog, toggleDialog }) {


  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const [org_name, setName] = React.useState('');
  const [city, setCity] = React.useState('');
  const [village, setVillage] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAdd = () => {
    let active = true;
    setLoading(true);
    const url = `http://localhost:3000/api/partners/create?`;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: org_name,
        city: city, 
        village: village,
        address: address,
        phone: phone
      }) 
    })
      .then((resp) => {
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
  
  return (
      <Dialog open={dialog} onClose={() => toggleDialog(false)} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
        <DialogTitle>Add Veteran</DialogTitle>
        <DialogContent> 
        <TextField
            autoFocus
            margin="dense"
            id="org_name"
            label="Organization Name"
            value={org_name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="standard" 
            />
            <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            variant="standard" 
            /> 
            <TextField
            autoFocus
            margin="dense"
            id="village"
            label="Village" 
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            fullWidth
            variant="standard" 
            />  
            <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            variant="standard" 
            /> 
            <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            variant="standard" 
            />  
        </DialogContent>
        <DialogActions>
          <Button disabled={emailError} onClick={handleAdd}>Add Partner</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}