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
  const [org_name_error, setNameError] = React.useState(false); 
  const [city_error, setCityError] = React.useState(false);
  const [village_error, setVillageError] = React.useState(false);
  const [address_error, setAddressError] = React.useState(false);
  const [phone_error, setPhoneError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fieldsValidated = () => {
    if (
      !validator.isEmpty(org_name) &&
      !validator.isEmpty(city) &&
      !validator.isEmpty(village) &&
      !validator.isEmpty(address) && 
      validator.isMobilePhone(phone)
    ) {
      return true;
    }
    else {
      setNameError(validator.isEmpty(org_name));
      setCityError(validator.isEmpty(city));
      setVillageError(validator.isEmpty(village));
      setAddressError(validator.isEmpty(address));
      setPhoneError(!validator.isMobilePhone(phone));
      return false;
    }
  }

  const handleAdd = () => {
    if (fieldsValidated() === true){
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
        if (!resp.ok){
          setLoading(false);
          throw new Error()
        }
        else{ 
        setLoading(false);
        toggleDialog(false);;
        }
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
            error={org_name_error}
            helperText={org_name_error ? 'Please enter a valid Name!' : ''}
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
            error={city_error}
            helperText={phone_error ? 'Please enter a valid City!' : ''}
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
            error={village_error}
            helperText={village_error ? 'Please enter a valid Village!' : ''}
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
            error={address_error}
            helperText={address_error ? 'Please enter a valid Address!' : ''}
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
            error={phone_error}
            helperText={phone_error ? 'Please enter a valid Phone Number!' : ''}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            variant="standard" 
            />  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Add Partner</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}