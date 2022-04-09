import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCustomFormsAPI } from "../api/formAPI";
import { Link, useRouteMatch } from "react-router-dom";

export default function Home() {

  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);

  const admin_id = 2;

  useEffect(() => {
    (async () => {
      const forms = await fetchCustomFormsAPI(admin_id);
      setPending(forms.completed.map((element, index) => ({ ...element, "id": index })));
    })();
  }, [0])

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "10px", paddingLeft: "100px", paddingRight: "100px"}}
    >
        <Typography sx={{fontSize: 48, ml: '10px'}} gutterBottom component="div">
            Forms
        </Typography>
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 1500, border: 1 }}>
          <CardContent>
            <Grid
              container
              display="flex"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography sx={{ fontSize: 24, mb: '1px'}} gutterBottom component="div">
                Items To Complete:
              </Typography>
              {pending.map((item, index) => (
                <Grid container xs={12}>
                  <Grid item xs={8}>
                    <Typography sx={{ float:"left",fontSize: 18, mb: '1px' }} component="div">
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button component={Link} to={`forms/complete/${item.form_id}`} variant="outlined" size="small" startIcon={<EditIcon />}>Complete Form</Button>
                  </Grid>
                </ Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 1500, mt: "40px", border: 1 }}>
          <CardContent>
            <Grid
              container
              display="flex"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography sx={{ fontSize: 24, mb: '1px'}} gutterBottom component="div">
                Completed:
              </Typography>
              {completed.map((item, index) => (
                <Grid container xs={12}>
                  <Grid item xs={8}>
                    <Typography sx={{ float: "left", fontSize: 18, mb: '1px' }} component="div">
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button component={Link} to={`forms/view/${item.form_id}`} variant="outlined" size="small" startIcon={<VisibilityIcon />}>View Form</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="outlined" size="small" startIcon={<EditIcon />}>Edit Response</Button>
                  </Grid>
                </ Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    );
}