import * as React from "react";

import PrivAdminCard from "./PrivAdminCard"
import PrivSupervisorCard from "./PrivSupervisorCard";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useSnackbar } from "notistack";




export default function Privileges() {

  const [chapters, addChapters] = React.useState([]); 
  const [isLoading, setLoading] = React.useState(true);
  const [chapterDialog, toggleChapterDialog] = React.useState(false);  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
          if (resp.chapters.constructor === Array) {
            resolve(resp.chapters);
          } else {
            throw new Error();
          }
        })
        .catch(e => {
          const action = key => (
            <Grid>
              <Button onClick={() => { window.location.reload(); }}>
                Refresh
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => { closeSnackbar(key) }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          );
          enqueueSnackbar(
            'Something went wrong', {
            variant: 'error',
            autoHideDuration: 15000,
            action,
          })
        });
    });
  }

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
