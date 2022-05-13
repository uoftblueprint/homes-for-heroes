import * as React from "react";

import PrivSupervisorModal from "./PrivSupervisorModal";
import PrivCreateAdmin from "./PrivCreateAdmin";
import PrivChapterModal from './PrivChapterModal';
import PrivDeleteDialog from './PrivDeleteDialog';

import useFetch from "../../../api/useFetch";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

// Demo purposes

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")?.[0]?.[0] || ''}${name.split(" ")?.[1]?.[0] || ''}`,
  };
}

export default function PrivSupervisorCard({ chapters, chapterDialog, toggleChapterDialog, state, update}) {
  const [svDialog, toggleSvDialog] = React.useState(false);
  const [caDialog, toggleCaDialog] = React.useState(false);
  const [deDialog, toggleDeDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [supervisors, setSupervisors] = React.useState([]);
  const [currChapter, setChapter] = React.useState(chapters.length === 0 ? {
    chapter_name: '',
    chapter_id: null
  } : 
  chapters[0]
  );
  const [isLoading, setLoading] = React.useState(false);
  const { fetchWithError } = useFetch();

// When someone adds a new chapter or changes chapter, changes get pushed unless there are none.
React.useEffect(() => {
  (async() => {
      setLoading(true);
      const endpoint = `admins/${currChapter.chapter_id}/listByChapter`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
      const response = await fetchWithError(endpoint, options);
      if (response.constructor === Array) {
        setSupervisors(response);
      }
      setLoading(false);
      })();
  }, [currChapter, svDialog, caDialog, deDialog, state]); 
   
   return (
    <Card sx={{ maxWidth: 385, mt: "40px", border: 1 }}>
          <CardContent> 
            <Grid container display="flex" direction="row" justify="space-evenly">
            <Typography>Chapter Supervisors</Typography> 
           <Button
              size="small"
              onClick={() => toggleCaDialog(true)}
              startIcon={<AddIcon />}
              sx={{ marginLeft: "auto" }}
            >
              Create Admin
            </Button>  
          <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left" }}
            >
              The following people are chapter supervisors of the selected chapter.
            </Typography>
            <Button
              size="small"
              onClick={() => toggleChapterDialog(true)}
              startIcon={<AddIcon />}
              sx={{ marginLeft: "auto" }}
            >
              Add Chapter 
            </Button>
            </Grid>
        <Autocomplete
          disablePortal
          autoHighlight
          blurOnSelect
          value={currChapter}
          options={chapters}
          getOptionLabel={option=> option.chapter_name}
          sx={{ width: 250, mt: '20px' }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={(event, value) => {
            if(value !== null){ 
            setChapter(value) 
            }
          }} 
        />
        <Grid container display="flex" direction="row" justify="space-evenly" sx={{ mt: '15px'}}>
              <Typography>{currChapter.chapter_name} Supervisors</Typography>
              <Button
                size="small"
                onClick={() => toggleSvDialog(true)}
                startIcon={<AddIcon />}
                sx={{ marginLeft: "auto" }}
              >
                Add New
              </Button> 
        </Grid>    
            {isLoading ?  
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <CircularProgress />
           </div>
            : <List>
              {supervisors
                .filter((el) => el.chapter_id === currChapter.chapter_id)
                .map((supervisor) => {
                  return (
                    <ListItem
                      secondaryAction={
                        <Button
                          size="small"
                          onClick={() => {
                            setDeleteId(supervisor.user_id);
                            toggleDeDialog(true);
                          }
                          }
                          startIcon={<DeleteIcon />}
                          sx={{
                            fontWeight: "bold",
                            color: "#C91C1C",
                            marginLeft: "auto",
                          }}
                        >
                          Remove
                        </Button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar {...stringAvatar(supervisor.name)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={supervisor.name}
                        secondary={`Supervisor of ${chapters.find(obj => obj.chapter_id === supervisor.chapter_id).chapter_name}`}
                      />
                    </ListItem>
                  );
                })}
            </List>  
            }
          </CardContent>
          <PrivSupervisorModal svDialog={svDialog} toggleSvDialog={toggleSvDialog} currChapter={currChapter} />
          <PrivCreateAdmin caDialog={caDialog} toggleCaDialog={toggleCaDialog} currChapter={currChapter} />
          <PrivChapterModal chapterDialog={chapterDialog} toggleChapterDialog={toggleChapterDialog} />
          <PrivDeleteDialog dialog={deDialog} toggleDialog={toggleDeDialog} user_id={deleteId} /> 
        </Card> 
        ) 
}
