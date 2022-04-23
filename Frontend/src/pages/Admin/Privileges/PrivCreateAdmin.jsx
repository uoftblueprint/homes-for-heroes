import * as React from "react";

import { useSnackbar } from "notistack";


import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import Autocomplete from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CloseIcon from '@mui/icons-material/Close';


export default function PrivCreateAdmin({ caDialog, toggleCaDialog, chapters }) {
  
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [currChapter, setChapter] = React.useState(chapters[0]);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState(''); 
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createAdmin = () => {
    let active = true;
    setLoading(true);
    const url = `http://localhost:3000/api/createAdmin`;
    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        // phone: phone,
        // password: password,
        // address: address,
        // chapter_id: currChapter.chapter_id
      })
    })
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        toggleCaDialog(false);
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
    <Grid> 
      <Dialog 
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={caDialog}
          onClose={() => toggleCaDialog(false)}
      >
        <DialogTitle>Create Admin</DialogTitle>
        <DialogContent
          sx={{ minHeight: 500 }}
        >
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
          <DialogActions>
            <Button onClick={createAdmin} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        </Grid>
  );
}
