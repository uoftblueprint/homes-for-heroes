import * as React from "react";

import { useSnackbar } from "notistack";


import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";

 

export default function PrivChapterDialog({ chapterDialog, toggleChapterDialog }) {


  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [chapterName, setChapterName] = React.useState(""); 
  const [isLoading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

const handleAddChapter = () => {
    setLoading(true);
    const url = `/api/chapters/create`;

    fetch(url,{
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: chapterName 
      })
    })
      .then((resp) => {
        setLoading(false);
        toggleChapterDialog(false);
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
  }

return (
  <>
 <Dialog
          maxWidth="sm"
          fullWidth
          fullScreen={fullscreen}
          open={chapterDialog}
          onClose={() => toggleChapterDialog(false)}
        >
          <DialogTitle>Add Chapter</DialogTitle>
          <DialogContent>
          <TextField 
          label="Chapter Name" 
          variant='standard' 
          value={chapterName} 
          onChange={(e) => setChapterName(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddChapter}>
              Add Chapter
            </Button>
          </DialogActions>
        </Dialog>         
  </>
)
}