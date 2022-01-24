import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

function UserInfoCard() {
  const { user_id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/getCustomerInfo/${user_id}/`)
      .then((response) => response.json())
      .then((res) => {
        setUser(res.customerInfo[0]);
      });
  });
  return (
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
            {user.name}
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
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Status: {user.status}</Typography>
            <Grid
              container
              display="flex"
              direction="row"
              justifyContent="flex-start"
              sx={{
                "& > :not(style)": { mr: 15 },
              }}
            >
              <Typography>Next of Kin Contact: {user.kinName}</Typography>
              <Typography>Next of Kin Phone: {user.kinPhoneNumber}</Typography>
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
  );
}

function CaseAlert() {
  const { user_id } = useParams();
  const [currentCase, setCurrentCase] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/customers/${user_id}/alertCase`)
      .then((response) => response.json())
      .then((caseNote) => setCurrentCase(caseNote))
      .catch((err) => {
        console.error(err);
      });
  });
  return (
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
        Alert created at {currentCase.last_update} by this admin
      </AlertTitle>
      {currentCase.notes}
    </Alert>
  );
}

export default function UserInfo() {
  return (
    <Grid>
      <UserInfoCard />
      <CaseAlert />
    </Grid>
  );
}
