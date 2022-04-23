import * as React from "react";

import { useSnackbar } from "notistack";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";

import validator from 'validator';

export default function AddSupporterModal({ dialog, toggleDialog }) {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [date_gifted, setDate] = React.useState(''); 
  const [gift_provided, setProvided] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [name_error, setNameError] = React.useState(false); 
  const [date_gifted_error, setDateError] = React.useState(false);
  const [gift_provided_error, setGiftError] = React.useState(false);
  const [phone_error, setPhoneError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

const fieldsValidated = () => {
  if (
  !validator.isEmpty(name) && 
  !validator.isEmpty(date_gifted) &&
  !validator.isEmpty(gift_provided) &&
  validator.isMobilePhone(phone)
  ){
    return true;
  }
  else{
  setNameError(validator.isEmpty(name));  
  setDateError(validator.isEmpty(date_gifted));
  setGiftError(validator.isEmpty(gift_provided));
  setPhoneError(!validator.isMobilePhone(phone));
  return false;
  }
}

const handleAdd = () => {
  if (fieldsValidated() === true){
    setLoading(true);
    const url = `http://localhost:3000/api/supporters/create?`;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name,
        date_gifted: date_gifted,
        gift_provided: gift_provided,
        phone: phone
      })
    })
      .then((resp) => {
        if (!resp.ok){
          setLoading(false);
          throw new Error(); 
        }
        else{ 
        setLoading(false);
        toggleDialog(false);
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
            id="name"
            label="Name"
            value={name}
            error={name_error}
            helperText={name_error ? 'Please enter a valid name!' : ''}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="standard" 
            sx={{ mb: 3 }} 
            />  
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isMobile ?  
              <MobileDatePicker 
              label="Date Gifted"
              inputFormat="yyyy-MM-dd"
              value={date_gifted}
              onChange={(v) => setDate(JSON.stringify(v).slice(1,11))}
              renderInput={(params) => <TextField 
                error={date_gifted_error}
                helperText={date_gifted_error ? 'Date cannot be empty!' : ''}
                {...params} />}
              />
              :
              <DesktopDatePicker 
              label="Date Gifted"
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              value={date_gifted}
              onChange={(v) => setDate(JSON.stringify(v).slice(1,11))}
              renderInput={(params) => <TextField 
                error={date_gifted_error}
                helperText={date_gifted_error ? 'Date cannot be empty!' : ''}
                {...params} />}
              />
              }
            </LocalizationProvider>
            <TextField
            autoFocus
            margin="dense"
            id="gift_provided"
            label="Gift Provided" 
            value={gift_provided}
            error={gift_provided_error}
            helperText={gift_provided_error ? 'Please enter a valid Gift Provided!' : ''}
            onChange={(e) => setProvided(e.target.value)}
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
          <Button onClick={handleAdd}>Add Supporter</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}