import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CaseCard ({user, note}) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 550 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         {user.name}
        </Typography>
        <Typography variant="h5" component="div">
          Notes:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {note.notes}
        </Typography>
        <Typography variant="body2">
          {/* Created {props.date} by {props.çsignature} */}
          Created at {note.last_updated} by this admin
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}