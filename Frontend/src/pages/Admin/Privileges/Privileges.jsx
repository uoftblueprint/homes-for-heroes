import * as React from "react";

import useFetch from "../../../api/useFetch";

import PrivAdminCard from "./PrivAdminCard"
import PrivSupervisorCard from "./PrivSupervisorCard";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";



export default function Privileges() {

  const [chapters, addChapters] = React.useState([]); 
  const [isLoading, setLoading] = React.useState(true);
  const [chapterDialog, toggleChapterDialog] = React.useState(false);  
  const [state, update] = React.useState(false);
  const { fetchWithError } = useFetch();
  


  React.useEffect(() => {
    (async() => {
      setLoading(true);
      const endpoint = `chapters/getAll`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
      const response = await fetchWithError(endpoint, options);
      if (response.chapters.constructor === Array){ 
        addChapters(response.chapters);
      }
      setLoading(false);
      })();
  }, [chapterDialog]);


  return (
    <>
      <Typography sx={{ fontSize: 48, mb: '1px' }}>
        Admin Privileges
      </Typography>
      <Grid container display="flex" justifyContent="center"> 
        {isLoading ? <CircularProgress />
        :
        <>
        <PrivAdminCard state={state} update={update} />
        <PrivSupervisorCard chapters={chapters} chapterDialog={chapterDialog} toggleChapterDialog={toggleChapterDialog} state={state} update={update}/>
        </>
        }
      </Grid>
    </>
  );
}
