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
  const [emailError, setEmailError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

const handleAdd = () => {
    let active = true;
    setLoading(true);
    const url = `http://localhost:3000/api/volunteers/create?`;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name,
        village: village, 
        date_joined: JSON.stringify(date_joined).slice(1,11),
        role: role,
        phone: phone
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
            id="role"
            label="Role" 
            value={role}
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
            onChange={(e) => setPhone(e.target.value)}
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
              onChange={(v) => setDate(v)}
              renderInput={(params) => <TextField {...params} />}
              />
              :
              <DesktopDatePicker 
              label="Date Joined"
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              value={date_joined}
              onChange={(v) => setDate(v)}
              renderInput={(params) => <TextField {...params} />}
              />
              }
            </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button disabled={emailError} onClick={handleAdd}>Add Volunteer</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}