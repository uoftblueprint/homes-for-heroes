import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class CaseCard extends React.Component{

    render() {
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {this.props.user.name}
              </Typography>
              <Typography variant="h5" component="div">
                Notes:
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {this.props.user.notes}
              </Typography>
              <Typography variant="body2">
                {/* Created {this.props.date} by {this.props.signature} */}
                Created at this time by this admin
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
    }
}

export default CaseCard;