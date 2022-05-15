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

export default function AddVolunteerModal({ dialog, toggleDialog }) {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(''); 
  const [village, setVillage] = React.useState('');
  const [date_joined, setDate] = React.useState('');
  const [role, setRole] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name_error, setNameError] = React.useState(false); 
  const [village_error, setVillageError] = React.useState(false);
  const [date_joined_error, setDateError] = React.useState(false);
  const [role_error, setRoleError] = React.useState(false);
  const [phone_error, setPhoneError] = React.useState(false);
  const [email_error, setEmailError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


const fieldsValidated = () => {
  if (
  !validator.isEmpty(name) && 
  !validator.isEmpty(village) &&
  !validator.isEmpty(date_joined) &&
  !validator.isEmpty(role) &&
  validator.isMobilePhone(phone),
  validator.isEmail(email)
  ){
    return true;
  }
  else{
  setNameError(validator.isEmpty(name));  
  setVillageError(validator.isEmpty(village));
  setDateError(validator.isEmpty(date_joined));
  setRoleError(validator.isEmpty(role));
  setPhoneError(!validator.isMobilePhone(phone));
  setEmailError(!validator.isEmail(email));
  return false;
  }
}
const handleAdd = () => {
  if (fieldsValidated() === true){ 
    setLoading(true);
    const url = `/api/volunteers/create?`;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name,
        village: village, 
        date_joined: date_joined,
        role: role,
        phone: phone,
        email: email
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
            />
            <TextField
            autoFocus
            margin="dense"
            id="village"
            label="Village" 
            value={village}
            error={village_error}
            helperText={village_error ? 'Please enter a valid village!': ''}
            onChange={(e) => setVillage(e.target.value)}
            fullWidth
            variant="standard" 
            />  
            <TextField
            autoFocus
            margin="dense"
            id="role"
            label="Role" 
            value={role}
            error={role_error}
            helperText={role_error ? 'Please enter a valid Role!' : ''}
            onChange={(e) => setRole(e.target.value)}
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
            sx={{ mb: 3 }} 
            /> 
            <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email" 
            value={email}
            error={email_error}
            helperText={email_error ? 'Please enter a valid Email!' : ''}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard" 
            sx={{ mb: 3 }} 
            /> 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isMobile ?  
              <MobileDatePicker 
              label="Date Joined"
              inputFormat="yyyy-MM-dd"
              value={date_joined} 
              onChange={(v) => setDate(JSON.stringify(v).slice(1,11))}
              renderInput={(params) => <TextField 
                error={date_joined_error}
                helperText={date_joined_error ? 'Date cannot be empty!' : ''}
                {...params} />}
              />
              :
              <DesktopDatePicker 
              label="Date Joined"
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              value={date_joined} 
              onChange={(v) => setDate(JSON.stringify(v).slice(1,11))}
              renderInput={(params) => <TextField 
                error={date_joined_error}
                helperText={date_joined_error ? 'Date cannot be empty!' : ''}
                {...params} />}
              />
              }
            </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Add Volunteer</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}