import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

export default function Home() {
    return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "10px", paddingLeft: "100px", paddingRight: "100px"}}
    >
        <Typography sx={{fontSize: 48, mb: '1px'}} gutterBottom component="div">
            Forms
        </Typography>
      <Grid item xs={12}>
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
                Items To Complete:
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
              </Grid>
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    );
}