import * as React from "react";

import useFetch from "../../../api/useFetch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";

import validator from "validator"; 

export default function PrivChapterDialog({ chapterDialog, toggleChapterDialog }) {


  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = React.useState(""); 
  const [name_error, setNameError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const { fetchWithError } = useFetch();



  const fieldsValidated = () => {
    if (
    validator.isAlpha(name)
    )
    {
      return true;
    }
    else{
    setNameError(!validator.isAlpha(name));  
    return false;
    }
  }

  const handleAddChapter = () => {
    (async() => {
      if (fieldsValidated() === true){
      setLoading(true);
      const endpoint = `chapters/create`;
      const options =  {
        method: 'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: name 
        })
      }
      const response = await fetchWithError(endpoint, options); 
      setLoading(false);
      toggleChapterDialog(false);
      }
      })(); 
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
          {isLoading ?  
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <CircularProgress />
           </div>
            : 
          <DialogContent>
          <TextField 
          label="Chapter Name" 
          variant='standard' 
          value={name} 
          error={name_error}
          helperText={name_error ? 'Please enter a valid chapter!' : ''}
          onChange={(e) => setName(e.target.value)} />
          </DialogContent>
          }
          <DialogActions>
            <Button onClick={handleAddChapter}>
              Add Chapter
            </Button>
            <Button onClick={() => toggleChapterDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>         
  </>
)}