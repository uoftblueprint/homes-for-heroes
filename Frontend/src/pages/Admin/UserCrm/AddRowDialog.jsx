import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import validator from 'validator';

import { useSnackbar } from "notistack";

export default function AddRowButton({ dialog, toggleDialog }) {
  const [isLoading, setLoading] = React.useState(false); 
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState(''); 
  const [gender, setGender] = React.useState('M');
  const [phone, setPhone] = React.useState('');
  const [name_error, setNameError] = React.useState(false);
  const [email_error, setEmailError] = React.useState(false);
  const [gender_error, setGenderError] = React.useState(false);
  const [phone_error, setPhoneError] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const fieldsValidated = () => {
    if (
    !validator.isEmpty(name) && 
    validator.isEmail(email) &&
    validator.isAlpha(gender) &&
    validator.isMobilePhone(phone)
    ){
      return true;
    }
    else{
    setNameError(validator.isEmpty(name));  
    setEmailError(!validator.isEmail(email));
    setGenderError(!validator.isAlpha(gender));
    setPhoneError(!validator.isMobilePhone(phone));
    return false;
    }
  }

  const handleAdd = () => {
    if (fieldsValidated() === true){
      setLoading(true);
      const url = `/api/createVeteran`;

      fetch(url,{
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          gender: gender,
          phone: phone
        })
      })
        .then((resp) => {
          if (!resp.ok){
            setLoading(false);
            toggleDialog(false);
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
    <Grid sx={{ marginRight: "auto" }}>  
      <Dialog open={dialog} onClose={() => toggleDialog(false)} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
        <DialogTitle>Add Veteran</DialogTitle>
        {isLoading ?  
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <CircularProgress />
           </div>
            : 
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
            id="email"
            label="Email" 
            value={email}
            error={email_error}
            helperText={email_error ? 'Please enter a valid Email!' : ''}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard" 
            /> 
            <TextField
            autoFocus
            margin="dense"
            id="gender"
            label="Gender" 
            value={gender}
            error={gender_error}
            helperText={phone_error ? 'Please enter a valid Gender!' : ''}
            onChange={(e) => setGender(e.target.value)} 
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
        }
        <DialogActions>
          <Button onClick={handleAdd}>Add Veteran</Button>
          <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog> 
    </Grid>
  );
}