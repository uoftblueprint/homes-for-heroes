import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

export default function CaseCard() {
  let { id } = useParams();
  const history = useHistory();
  const [curr, setCurr] = useState({});
  const [alert, setAlert] = useState([]);
  const [caseNotes, setCaseNotes] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/getCustomerInfo/${id}/`)
      .then((response) => response.json())
      .then((res) => {
        setCurr(res.customerInfo[0]);
      });

    fetch(`http://localhost:3000/customers/${id}/alertCase`)
      .then((response) => response.json())
      .then((caseNote) => setAlert(caseNote))
      .catch((err) => {
        console.error(err);
      });
    fetch(
      `http://localhost:3000/getCases?user_id=${id}&start_date=1000-01-01&end_date=9999-12-31`
    )
      .then((response) => response.json())
      .then((res) => {
        setCaseNotes(res.cases);
        console.log(res.cases);
      });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "5px", paddingLeft: "100px", paddingRight: "100px" }}
    >
      <Grid item xs={1}>
        <Button variant="outlined" onClick={() => history.goBack()}>
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 1000, mt: "40px", border: 1 }}>
          <CardContent>
            <Grid
              container
              display="flex"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography gutterBottom variant="h2" component="div">
                {curr.name}
              </Typography>
              <Grid
                container
                display="flex"
                direction="row"
                justifyContent="flex-start"
                sx={{
                  "& > :not(style)": { mr: 15, mb: 5 },
                }}
              >
                <Typography>Email: {curr.email}</Typography>
                <Typography>Phone: {curr.phone}</Typography>
                <Typography>Status: {curr.alert_case_id}</Typography>
                <Grid
                  container
                  display="flex"
                  direction="row"
                  justifyContent="flex-start"
                  sx={{
                    "& > :not(style)": { mr: 15 },
                  }}
                >
                  <Typography>Next of Kin Contact: {curr.kinName}</Typography>
                  <Typography>
                    Next of Kin Phone: {curr.kinPhoneNumber}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                component="a"
                href="intake-form"
                variant="outlined"
                startIcon={<VisibilityIcon />}
              >
                View Intake Form
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Alert
          variant="outlined"
          severity="info"
          sx={{ mt: "15px", textAlign: "left" }}
          action={
            <div>
              <IconButton sx={{ marginLeft: "auto" }}>
                <EditIcon />
              </IconButton>
              <IconButton>
                {/* Currently don't know what to set the true false as so a placeholder for now.
                      Will have to figure out how to setup case updates as well? Will there be an API controller made for it? */}

                {alertOpen ? (
                  <ExpandLessOutlinedIcon onClick={() => setAlertOpen(false)} />
                ) : (
                  <ExpandMoreOutlinedIcon onClick={() => setAlertOpen(true)} />
                )}
              </IconButton>
            </div>
          }
        >
          <AlertTitle>
            {" "}
            Alert created at {alert.last_update} by this admin
          </AlertTitle>
          {alert.notes}
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
              <Typography>{item.notes}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
}
