import * as React from "react";

import PrivSupervisorModal from "./PrivSupervisorModal";
import PrivCreateAdmin from "./PrivCreateAdmin";
import PrivChapterModal from './PrivChapterModal';
import { useSnackbar } from "notistack";

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
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function PrivSupervisorCard({ chapters, chapterDialog, toggleChapterDialog }) {
  const [svDialog, toggleSvDialog] = React.useState(false);
  const [caDialog, toggleCaDialog] = React.useState(false);
  const [supervisors, setSupervisors] = React.useState([]);
  const [currChapter, setChapter] = React.useState(chapters[0]);
  const [isLoading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

// When someone adds a new chapter or changes chapter, changes get pushed unless there are none.
React.useEffect(() => {
  setLoading(true);
  const url = `http://localhost:3000/supervisors/${currChapter.name}/listByChapter`;

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      setSupervisors(resp.supervisors);
      setLoading(false);
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
        'Something went wrong',{
          variant: 'error',
          autoHideDuration: 15000,
          action,
        })
    });

}, [currChapter, svDialog, caDialog]);


 const handleUnsetSupervisor = (admin_id) => {
    setSupervisors((prevState) =>
      prevState.map((user) => {
        if (user.admin_id === admin_id) {
          return {
            ...user,
            role_id: 0 
          };
        }
        return user;
      })
    )
    setLoading(true);
    const url = `http://localhost:3000/admins/${admin_id}/unsetSupervisor`;

    fetch(url,{
      method: 'PUT',
      headers:{
      'Content-Type':'application/json'
      },
    })
      .then((resp) => { 
        setLoading(false);
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

  const handleSvOpen = () => {
    toggleSvDialog(true);
  }
   
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
            <Button
              size="small"
              onClick={() => toggleChapterDialog(true)}
              startIcon={<AddIcon />}
              sx={{ marginLeft: "auto" }}
            >
              Add Chapter 
            </Button>
          </Grid>
          <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "left" }}
            >
              The following people are chapter supervisors of the selected chapter.
            </Typography>
        <Autocomplete
          disablePortal
          autoHighlight
          blurOnSelect
          value={currChapter}
          options={chapters}
          getOptionLabel={option => option.name}
          sx={{ width: 250, mt: '20px' }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={(event, value) => {
            if(value !== null){ 
            setChapter(value) 
            }
          }} 
        />
        <Grid container display="flex" direction="row" justify="space-evenly" sx={{ mt: '15px'}}>
              <Typography>{currChapter.name} Supervisors</Typography>
              <Button
                size="small"
                onClick={handleSvOpen}
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
                .filter((el) => el.role_id === 1 && el.chapter_id === currChapter.chapter_id)
                .map((supervisor) => {
                  return (
                    <ListItem
                      secondaryAction={
                        <Button
                          size="small"
                          onClick={() => handleUnsetSupervisor(supervisor.admin_id)}
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
                        secondary={`Supervisor of ${chapters.find(obj => obj.chapter_id === supervisor.chapter_id).name}`}
                      />
                    </ListItem>
                  );
                })}
            </List>  
            }
          </CardContent>
          <PrivSupervisorModal svDialog={svDialog} toggleSvDialog={toggleSvDialog} currChapter={currChapter} />
          <PrivCreateAdmin caDialog={caDialog} toggleCaDialog={toggleCaDialog} chapters={chapters} />
          <PrivChapterModal chapterDialog={chapterDialog} toggleChapterDialog={toggleChapterDialog} />
        </Card> 
        ) 
}
