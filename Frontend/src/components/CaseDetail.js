import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CaseCard() {

    let { id } = useParams();
    const history = useHistory();
    const [curr, setCurr] = useState([]);
    const [alert, setAlert] = useState([]);
    const [caseNotes, setCaseNotes] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3000/customers`)
          .then(response => response.json())
          .then(res => {
            Object.keys(res.customers).map(function(keyName, keyIndex) {
                if(res.customers[keyName].user_id == id){
                    setCurr(res.customers[keyName]);
                }
              })
        })
        fetch(`http://localhost:3000/customers/${id}/alertCase`)
          .then(response => response.json())
          .then(caseNote => setAlert(caseNote))
          .catch(err => {
            console.error(err);
        });
        fetch(`http://localhost:3000/getCases?user_id=${id}`)
          .then(response => response.json())
          .then(res => {
            setCaseNotes(res.cases);
        })
      }, []);
  
    return (
        <Grid container spacing={2} sx={{marginTop: '5px', paddingLeft: '100px', paddingRight: '100px'}}>
            <Grid item xs={1}>
                <Button variant="outlined" onClick={() => history.goBack()}>Back</Button>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} variant="outlined">
                    <CardContent>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 32 }} color="text.primary">
                                    {curr.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: 16 }} color="text.primary">
                                    E-mail: {curr.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: 16 }} color="text.primary">
                                    Phone: {curr.phone}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: 16 }} color="text.primary">
                                    Status: Level {curr.alert_case_id}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: 16 }} color="text.primary">
                                    Next of kin contact: Undetermined
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: 16 }} color="text.primary">
                                    Next of kin phone: Undetermined
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Alert variant="outlined" severity="info" sx={{width: '80%', margin: 'auto', textAlign: 'left'}}>
                    <AlertTitle>Alert: {alert.notes}</AlertTitle>
                </Alert>
            </Grid>
            <Grid item xs={12}>
                    {caseNotes.map((item, index) => (
                        <Accordion index={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Case Note {index}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{item}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
            </Grid>
        </Grid>
      );
  }
  