import * as React from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function CaseCard({ user, note }) {
  const history = useHistory();

  const viewProfile = () => {
    history.push(`/casenotes/${user.user_id}`);
  }

  const addCase = () => {
    history.push(`/addcase/${user.user_id}`);
  }

  return (
    <Grid container spacing={2} sx={{marginBottom: '20px'}}>
      {note ?
      <Grid item xs={12}>
      <Alert
      variant="outlined"
      severity="info"
      sx={{width: '80%', margin: 'auto', textAlign: 'left'}}
      > 
      <AlertTitle>Alert created at {note.last_update.slice(0, 10)} by this admin</AlertTitle>{note.notes}</Alert> 
      </Grid>
      :
      <></>
      }
      <Grid item xs={6}>
        <Button variant="outlined" size="small" onClick={viewProfile} startIcon={<VisibilityIcon />}>View Full Profile</Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" size="small" onClick={addCase} startIcon={<AddOutlinedIcon />}>Add Case</Button>
      </Grid>
    </Grid>
    );
}
