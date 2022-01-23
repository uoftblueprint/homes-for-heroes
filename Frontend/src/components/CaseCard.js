import * as React from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCaseButton from './AddCaseButton';

export default function CaseCard({ user, note }) {
  const history = useHistory();

  const viewProfile = () => {
    history.push(`/casenotes/${user.user_id}`);
  }

  return (
    <Grid container spacing={2} sx={{marginBottom: '20px'}}>
      <Grid item xs={12}>
      <Alert
      variant="outlined"
      severity="info"
      sx={{width: '80%', margin: 'auto', textAlign: 'left'}}
      >
      <AlertTitle>Alert created at {note.last_update} by this admin</AlertTitle>{note.notes}</Alert>
      </Grid>
      <Grid item xs={6}>
      <Button variant="outlined" size="small" onClick={viewProfile} startIcon={<VisibilityIcon />}>View Full Profile</Button>
      </Grid>
      <Grid item xs={6}>
      <Button variant="outlined" size="small" startIcon={<AddIcon />}>Add Case Notes</Button>
      </Grid>
    </Grid>
    );
}
