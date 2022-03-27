import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import validator from 'validator';

export default function AddRowButton() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState(''); 
  const [emailError, setEmailError] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmailError(!validator.isEmail(e.target.value));    
    setEmail(e.target.value);
  }

  const addRow = () => { 
    handleClose();
  }

  return (
    <Grid sx={{ marginRight: "auto" }}>
      <Button endIcon={<AddIcon />} onClick={handleOpen}> 
        Add Veteran 
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
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
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}