import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function UserInfoForm() {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    kinFirstName: "",
    kinLastName: "",
    kinEmail: "",
    kinPhoneNumber: "",
    status: "",
  });

  const [errorValues, setErrorValues] = React.useState({
    email: false,
    phoneNumber: false,
    kinEmail: false,
    kinPhoneNumber: false,
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlePhone = (event) => {
    if (
      event.target.value === "" ||
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        event.target.value
      )
    ) {
      setErrorValues({ ...errorValues, [event.target.name]: false });
    } else {
      setErrorValues({ ...errorValues, [event.target.name]: true });
    }
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleEmail = (event) => {
    if (
      event.target.value === "" ||
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        event.target.value
      )
    ) {
      setErrorValues({ ...errorValues, [event.target.name]: false });
    } else {
      setErrorValues({ ...errorValues, [event.target.name]: true });
    }
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    alert("Form Submitted!");
  };

  return (
    <Card sx={{ maxWidth: 1500 }}>
      <CardContent>
        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <Typography gutterBottom variant="h2" component="div">
            {values.firstName + values.lastName === ""
              ? "Your Name"
              : values.firstName + " " + values.lastName}
          </Typography>
          <Grid
            container
            display="flex"
            direction="row"
            justifyContent="flex-start"
            sx={{
              "& > :not(style)": { mr: 10, mb: 5 },
            }}
          >
            <FormControl>
              <TextField
                id="first-name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                label="First Name"
                variant="standard"
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                id="last-name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                label="Last Name"
                variant="standard"
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                id="email"
                name="email"
                value={values.email}
                onChange={handleEmail}
                label="Email Address"
                variant="standard"
                required
                error={errorValues.email}
                helperText={errorValues.email ? "Invalid Email Address!" : ""}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="phone-number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handlePhone}
                label="Phone Number"
                variant="standard"
                required
                error={errorValues.phoneNumber}
                helperText={
                  errorValues.phoneNumber ? "Invalid Phone Number!" : ""
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                label="Status"
                variant="standard"
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                id="kin-first-name"
                name="kinFirstName"
                value={values.kinFirstName}
                onChange={handleChange}
                label="First Name Of Next Kin"
                variant="standard"
              />
            </FormControl>
            <FormControl>
              <TextField
                id="kin-last-name"
                name="kinLastName"
                value={values.kinLastName}
                onChange={handleChange}
                label="Last Name of Next Kin"
                variant="standard"
              />
            </FormControl>
            <FormControl>
              <TextField
                id="kin-email"
                name="kinEmail"
                value={values.kinEmail}
                onChange={handleEmail}
                label="Email Address of Next Kin"
                variant="standard"
                error={errorValues.kinEmail}
                helperText={
                  errorValues.kinEmail ? "Invalid Email Address!" : ""
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                name="kinPhoneNumber"
                value={values.kinPhoneNumber}
                onChange={handlePhone}
                label="Phone Number of Next Kin"
                variant="standard"
                error={errorValues.kinPhoneNumber}
                helperText={
                  errorValues.kinPhoneNumber ? "Invalid Phone Number!" : ""
                }
              />
            </FormControl>
          </Grid>
          <Button
            variant="contained"
            disabled={
              !Object.values(errorValues).every((item) => item === false)
            }
            type="submit"
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}
