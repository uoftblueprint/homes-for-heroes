import * as React from "react";

import PrivAdminCard from "./PrivAdminCard.js"
import PrivSupervisorCard from "./PrivSupervisorCard.js";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

function loadServerRows() {
  return new Promise((resolve) => {
    const url = "http://localhost:3000/chapters/getAll";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => { 
        resolve(resp.chapters); 
      });
  });
}

export default function Privileges() {

  const [chapters, addChapters] = React.useState([]); 
  const [isLoading, setLoading] = React.useState(true);
  const [chapterDialog, toggleChapterDialog] = React.useState(false);


  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newChapters = await loadServerRows();
      if (!active) {
        return;
      }
      addChapters(newChapters);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [chapterDialog]);


  return isLoading ? <CircularProgress /> : (
    <>
      <Typography sx={{ fontSize: 48, mb: '1px' }}>
        Admin Privileges
      </Typography>
      <Grid container display="flex" justifyContent="center">
        <PrivAdminCard />
        <PrivSupervisorCard chapters={chapters} chapterDialog={chapterDialog} toggleChapterDialog={toggleChapterDialog} />
      </Grid>
    </>
  );
}
