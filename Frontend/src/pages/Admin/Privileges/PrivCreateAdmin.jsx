import * as React from "react";

import useFetch from "../../../api/useFetch";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import validator from 'validator';



export default function PrivCreateAdmin({ caDialog, toggleCaDialog, currChapter }) {
  
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState(''); 
  const [name_error, setNameError] = React.useState(false);
  const [email_error, setEmailError] = React.useState(false);
  const { fetchWithError } = useFetch();


  const fieldsValidated = () => {
    if (
    !validator.isEmpty(name) && 
    validator.isEmail(email))
    {
      return true;
    }
    else{
    setNameError(validator.isEmpty(name));  
    setEmailError(!validator.isEmail(email));
    return false;
    }
  }

  const createAdmin = () => {
    (async() => {
    if (fieldsValidated() === true){
      setLoading(true);
      const endpoint = `createAdmin`;
      const options =  {
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          chapter_id: currChapter.chapter_id
        })
      }
      await fetchWithError(endpoint, options); 
      setName('');
      setEmail('');
      setLoading(false);
      toggleCaDialog(false);
    }
    })();  
  }
 
  return (
    <Grid> 
      <Dialog 
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={caDialog}
          onClose={() => toggleCaDialog(false)}
      >
        <DialogTitle>Create Admin</DialogTitle>
        {isLoading ?  
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <CircularProgress />
           </div>
            : 
        <DialogContent
          sx={{ minHeight: 300 }}
        >
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
            {/* <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            variant="standard" 
            />  
            <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <Autocomplete
            disablePortal
            autoHighlight
            blurOnSelect
            value={currChapter}
            options={chapters}
            getOptionLabel={option => option.name}
            sx={{ width: 250, mt: '20px' }}
            renderInput={(params) => <TextField {...params} label="Location" />}
            onChange={(event, value) => {
                if(value !== null){ 
                setChapter(value) 
                }
            }} 
            /> */}
          </DialogContent>
          }
          <DialogActions>
            <Button onClick={createAdmin} autoFocus>
              Done
            </Button>
            <Button onClick={() => toggleCaDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
        </Grid>
  );
}
