import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCaseButton() {
  const [dt, setDate] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState("");
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNote = () => {
    let dt = new Date().toLocaleDateString();
    setDate(dt);
    fetch('/casenote', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id:name,
        admin_id:"admin",
        notes:body,
      })
    }).then(response=>response.json()).then(data=>{
         console.log(data);
    })
    handleClose();
  }

  const captureName = (e) => {
    setName(e.target.value);
  }

  const captureBody = (e) => {
    setBody(e.target.value);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Popup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Case Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Client Name"
            type="client"
            fullWidth
            variant="standard"
            onChange={captureName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Notes"
            multiline
            maxRows={10}
            type="notes"
            fullWidth
            variant="standard"
            onChange={captureBody}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNote}>Add Note</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}