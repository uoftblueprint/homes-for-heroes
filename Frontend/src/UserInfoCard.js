import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function UserInfoForm(props) {
  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardContent>
        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography gutterBottom variant="h2" component="div">
            {props.user.name}
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
            <Typography>Email: {props.user.email}</Typography>
            <Typography>Phone: {props.user.phoneNumber}</Typography>
            <Typography>Status: {props.user.status}</Typography>
            <Grid
              container
              display="flex"
              direction="row"
              justifyContent="flex-start"
              sx={{
                "& > :not(style)": { mr: 15, mb: 5 },
              }}
            >
              <Typography>Next of Kin Contact: {props.user.kinName}</Typography>
              <Typography>
                Next of Kin Phone: {props.user.kinPhoneNumber}
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
  );
}
