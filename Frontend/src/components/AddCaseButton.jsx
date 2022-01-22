import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function AddCaseButton() {
  const [dt, setDate] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState("");
  const [name, setName] = React.useState("");
  const [time, setTime] = React.useState(dt);

  const handleChangeTime = (newTime) => {
    setTime(newTime);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNote = () => {
    let dt = new Date().toLocaleDateString();
    setDate(dt);
    fetch('/api/casenote')
    .then(response=>response.json())
    .then(data =>{
      this.setState({
        user_id:String(name),
        admin_id:"admin",
        notes:String(body),
      });
    }).catch(err => 
      {
        // handle error
    })
    handleClose();
  }

  const addAlertNote = () => {
    let dt = new Date().toLocaleDateString();
    setDate(dt);
    fetch('/api/casenote')
    .then(response=>response.json())
    .then(data =>{
      this.setState({
        user_id:String(name),
        alert_id:'ALERT',
        admin_id:"admin",
        notes:String(body),
      });
    }).catch(err => 
      {
        // handle error
    })
    handleClose();
  }

  const captureName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const captureBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        <AddOutlinedIcon />
        Add Case
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "50%", height: "100%" } }}>
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
            minRows={15}
            maxRows={50}
            type="notes"
            fullWidth
            variant="standard"
            onChange={captureBody}
          />
        </DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Time Picker"
            inputFormat="MM/dd/yyyy"
            value={time}
            onChange={handleChangeTime}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <DialogActions>
          <Button onClick={addAlertNote}>Set Alert</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNote}>Add Note</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}