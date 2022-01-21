import * as React from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

export default function CaseCard({ user, note }) {
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
      <Button variant="outlined" size="small"><VisibilityIcon></VisibilityIcon>View Full Profile</Button>
      </Grid>
      <Grid item xs={6}>
      <Button variant="outlined" size="small"><AddIcon></AddIcon>Add Case Notes</Button>
      </Grid>
    </Grid>
  );
}
