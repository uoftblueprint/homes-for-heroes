import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

export default function CaseCard() {
  let { id } = useParams();
  const history = useHistory();
  const [curr, setCurr] = useState({});
  const [alert, setAlert] = useState([]);
  const [caseNotes, setCaseNotes] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const [checked, setChecked] = useState([0]);
  const [todo, setTodo] = useState([]);

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [currCaseId, setCurrCaseId] = useState(0);
  const [currTitle, setCurrTitle] = useState('');
  const [currBody, setCurrBody] = useState('');
  const [alertCaseId, setAlertCaseId] = useState(0);

  const [view, setView] = useState(4);

  const { search } = window.location;
  const query = new URLSearchParams(search).get('search');
  const [searchQuery, setSearchQuery] = useState(query || '');

  const getOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const deleteOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  const updateOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  };

  const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  };

  const addCase = () => {
    history.push(`/addcase/${id}`);
  }

  useEffect(() => {
    fetch(`/api/getToDo/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setTodo(JSON.parse(res.payload[0].todo).notes);
      });
    fetch(
      `/api/getCases?user_id=${id}&start_date=1000-01-01&end_date=9999-12-31`
      )
      .then((response) => response.json())
      .then((res) => {
        setCaseNotes(res.cases);
      });
  }, [])

  useEffect(() => {
    fetch(`/api/getCustomerInfo/${id}/`)
      .then((response) => response.json())
      .then((res) => {
        setCurr(res.customerInfo[0]);
      });
    fetch(`/api/customers/${id}/alertCase`)
      .then((response) => response.json())
      .then((caseNote) => setAlert(caseNote))
      .catch((err) => {
        console.error(err);
      });
    fetch(`/api/customers/${id}/alertCaseID`)
      .then((response) => response.json())
      .then((res) => {
        setAlertCaseId(res.id);
      });
  }, [id]);

  const handleChangeView = (event) => {
    setView(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const addItem = () => {
    var nextKey = todo ? Object.keys(todo).length : 1;
    console.log(typeof todo);
    let temp = [...todo, {"id": nextKey, "value": body}];
    let payload = JSON.stringify({notes: temp});
    fetch(`/api/updateToDo/${id}?todo=${payload}`, postOptions)
    .then((response) => response.json());
    setTodo(temp);
    handleClose();
  }

  const handleToggle = (value) => () => {
    const newChecked = [...checked];

    var toggledItemIndex = todo.findIndex(object => {
      return object.id === value;
    });
    todo.splice(toggledItemIndex, 1)
    
    let payload = JSON.stringify({notes: todo});
    fetch(`/api/updateToDo/${id}?todo=${payload}`, postOptions)
    .then((response) => response.json());

    setChecked(newChecked);
  };

    const captureTitle = (e) => {
      e.preventDefault();
      setTitle(e.target.value);
    };

  const captureBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };

  const filterNotes = (posts, query) => {
    if (view === 4) {
      if (!query) {
        return posts.filter((post) => {
          return post.case_id !== alertCaseId;
        });
      }
      {
      return posts.filter((post) => {
        return post.title.includes(query) && post.case_id !== alertCaseId;
      });
      }
    }
    else{
      if (!query) {
        return posts.filter((post) => {
          return post.case_id !== alertCaseId && post.category == view;
        });
      }
      {
      return posts.filter((post) => {
        return post.title.includes(query) && post.case_id !== alertCaseId && post.category == view;
      });
      }
    }
  };

  const captureNote = (e) => {
    e.preventDefault();
    setNewNote(e.target.value);
    setCurrBody(e.target.value);
  };

  const editCaseNote = (case_id, title, notes) => {
    setNoteOpen(true);
    setCurrCaseId(case_id);
    setCurrBody(notes);
    setCurrTitle(title);
    setTitle(title);
  }

  const updateCaseNote = () => {
    fetch(`/api/casenote/${currCaseId}/update?new_note=${newNote}&new_title=${title}`, updateOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .then(() => {
        fetch(
        `/api/getCases?user_id=${id}&start_date=1000-01-01&end_date=9999-12-31`
        )
        .then((response) => response.json())
        .then((res) => {
          setCaseNotes(res.cases);
        });
      })
      .then(() => {
        fetch(`/api/customers/${id}/alertCase`)
        .then((response) => response.json())
        .then((caseNote) => setAlert(caseNote))
        .catch((err) => {
          console.error(err);
        });
      });
    setNoteOpen(false);
  }

  const deleteCase = (case_id) => {
    fetch(`/api/casenote/${case_id}`, deleteOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .then(() => {
        fetch(
        `/api/getCases?user_id=${id}&start_date=1000-01-01&end_date=9999-12-31`
        )
        .then((response) => response.json())
        .then((res) => {
          setCaseNotes(res.cases);
        });
      });
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: "5px", paddingLeft: "200px", paddingRight: "200px" }}
    >
      <Grid item xs={12}>
        <Button variant="outlined" sx={{float: "left"}} onClick={() => history.goBack()}>
          Back
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ maxHeight: 270, maxWidth: 500, mt: "20px", border: 1}}>
          <CardContent>
            <Grid
              container
              display="flex"
              direction="column"
              justifyContent="left"
            >
              <Typography gutterBottom variant="h2" component="div">
                {curr.name}
              </Typography>
              <Grid
                container
                display="flex"
                direction="column"
                justifyContent="flex-start"
              >
                <Typography>
                  City: {curr.city}
                </Typography>
                <Typography>
                  Village: ...
                </Typography>
                <Typography>
                  Service No: {id}
                </Typography>
              </Grid>
              <Button
                onClick={(e) => {history.push(`/viewForms/${id}`)}}
                variant="outlined"
                startIcon={<VisibilityIcon />}
              >
                View Intake Form
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          display="flex"
          direction="column"
        >
          <Grid item xs={12}> 
             {alert.error === 'No Alerts' ? <></>
              :
            <Alert
              variant="outlined"
              severity="info"
              sx={{ mt: "20px", textAlign: "left" }}
              action={
                <div>
                  <IconButton sx={{ marginLeft: "auto" }}>
                    <EditIcon onClick={() => editCaseNote(alert.case_id, alert.title, alert.notes)}/>
                  </IconButton>
                  <IconButton>
                    {alertOpen ? (
                      <ExpandLessOutlinedIcon onClick={() => setAlertOpen(false)} />
                    ) : (
                      <ExpandMoreOutlinedIcon onClick={() => setAlertOpen(true)} />
                    )}
                  </IconButton>
                </div>
              }
            >
              <AlertTitle>
                {alert.title}
              </AlertTitle>
              Alert created at {alert.last_update} by this admin.<br/>
              {alert.notes}
            </Alert>
            }
          </Grid>
          <Grid item xs={12}>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{ sx: { width: '50%', height: '50%' } }}
            >
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Notes"
                  multiline
                  minRows={15}
                  maxRows={50}
                  type="notes"
                  fullWidth
                  variant="standard"
                  onChange={captureBody}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={addItem}>Add Note</Button>
              </DialogActions>
            </Dialog>
            <Box border={3} borderColor="gray" sx={{ mt: "20px", overflow: "auto", maxHeight: 200}}>
              <Typography variant="h6">{curr.name}'s To-Do list:</Typography>
              <Button onClick={handleOpen} startIcon={<AddIcon />}>Add Item</Button>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {!todo ? (<></>) : todo.map(item => {
                  const labelId = `checkbox-list-label-${item.value}`;
                  return (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments" />
                      }
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(item.value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={item.value} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs ={2}>
        <FormControl sx={{ width: "200px", float: "left"}}>
          <InputLabel>Showing</InputLabel>
          <Select
            value={view}
            label="Showing"
            onChange={handleChangeView}
          >
            <MenuItem value={0}>Discovery</MenuItem>
            <MenuItem value={1}>Recovery</MenuItem>
            <MenuItem value={2}>Retraining</MenuItem>
            <MenuItem value={3}>Thriving</MenuItem>
            <MenuItem value={4}>All Case Notes</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs ={8}>
        <TextField
          sx={{
            backgroundColor: '#F7F8F9',
            width: '75%',
            marginBottom: '2%',
          }}
          fullWidth
          variant="outlined"
          placeholder="Search Users"
          name="search"
          type="text"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
          }}
          onInput={(e) => {setSearchQuery(e.target.value)}}
        />
      </Grid>
      <Grid item xs ={2}>
        <Button variant="outlined" size="large" onClick={addCase} startIcon={<AddOutlinedIcon />}>Add Case</Button>
      </Grid>
      <Dialog
        open={noteOpen}
        onClose={handleClose}
        PaperProps={{ sx: { width: '50%', height: '50%' } }}
        >
          <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="Edit Title"
            minRows={1}
            maxRows={1}
            type="notes"
            fullWidth
            variant="standard"
            onChange={captureTitle}
            defaultValue={currTitle}
            />
            <TextField
              autoFocus
              margin="dense"
              id="editeNotes"
              label="Edit Notes"
              multiline
              minRows={15}
              maxRows={50}
              type="notes"
              fullWidth
              variant="standard"
              onChange={captureNote}
              value={currBody}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={updateCaseNote}>Edit Case Note</Button>
          </DialogActions>
       </Dialog>
       <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { width: '50%', height: '50%' } }}
          >
          <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="Edit Note"
            multiline
            minRows={15}
            maxRows={50}
            type="notes"
            fullWidth
            variant="standard"
            onChange={captureBody}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addItem}>Submit Changes</Button>
          </DialogActions>
        </Dialog>
      <Grid item xs={12}>
        {filterNotes(caseNotes, searchQuery).map((item, index) => (
          <Accordion index={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container spacing={0} alignItems="center" display='flex' direction="row" justifyContent="flex-start">
                <Grid item xs={2}>
                  <Typography noWrap >{item.title}</Typography>
                </Grid>
                <Grid item xs={1} container display='flex' direction="row" >
                  <PersonIcon sx={{}}/>
                  <Typography variant="subtitle2" sx={{ WebkitLineClamp: 1}}>ADMIN</Typography>
                </Grid>
                <Grid item xs={2} container display='flex' direction="row">
                  <DateRangeIcon sx={{  }}/>
                  <Typography variant="subtitle2" sx={{WebkitLineClamp: 1 }}>{new Date(item.last_update).toISOString().slice(0, 10)}</Typography>
                </Grid>
                <Grid item xs={7} container display='flex' direction="row" justifyContent="flex-end">
                  <Grid item xs={3} >
                    <Button onClick={() => editCaseNote(item.case_id, item.title, item.notes)} startIcon={<CreateIcon />}>Edit Note</Button>
                  </Grid>
                  <Grid item xs={3} >
                    <Button onClick={() => deleteCase(item.case_id)} startIcon={<DeleteIcon />}>Delete Note</Button>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.notes}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
}
