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


export default function CaseCard() {
  let { id } = useParams();
  const history = useHistory();
  const [curr, setCurr] = useState({});
  const [alert, setAlert] = useState([]);
  const [caseNotes, setCaseNotes] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const [checked, setChecked] = useState([0]);
  const [todoList, setTodoList] = useState([]);

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const [view, setView] = useState(4);

  const deleteOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  const updateOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: {}
  };

  // I need help with this part, this is definitely not good

  useEffect(() => {
    fetch(
      `http://localhost:3000/getCases?user_id=${id}&start_date=1000-01-01&end_date=9999-12-31`
    )
      .then((response) => response.json())
      .then((res) => {
        setCaseNotes(res.cases);
      });
  },);

  useEffect(() => {
    fetch(`http://localhost:3000/getCustomerInfo/${id}/`)
      .then((response) => response.json())
      .then((res) => {
        setCurr(res.customerInfo[0]);
      });
    fetch(`http://localhost:3000/customers/${id}/alertCase`)
      .then((response) => response.json())
      .then((caseNote) => setAlert(caseNote))
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleChangeView = (event) => {
    setView(event.target.value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const addItem = () => {
    const temp = todoList.concat(body);
    setTodoList(temp);
    handleClose();
  }

  const captureBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };

  const editCaseNote = (case_id) => {
    const temp = todoList.concat(body);
    setTodoList(temp);
    editCase(case_id);
    handleClose();
  }

  const editCase = (case_id) => {
    // fetch(`http://localhost:3000/casenote/${case_id}/update`, updateOptions)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
  }

  const deleteCase = (case_id) => {
    fetch(`http://localhost:3000/casenote/${case_id}`, deleteOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
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
                component="a"
                href="intake-form"
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
            <Alert
              variant="outlined"
              severity="info"
              sx={{ mt: "20px", textAlign: "left" }}
              action={
                <div>
                  <IconButton sx={{ marginLeft: "auto" }}>
                    <EditIcon />
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
                {" "}
                Alert created at {alert.last_update} by this admin
              </AlertTitle>
              {alert.notes}
            </Alert>
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
                {todoList.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments" />
                      }
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs ={12}>
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
      <Grid item xs={12}>
        {caseNotes.map((item, index) => (
          <Accordion index={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              
            >
              <Typography>Case Note {index}</Typography>
              <PersonIcon sx={{marginLeft: "10px"}}/>
              <Typography variant="subtitle2" sx={{ marginLeft: "10px" }}>ADMIN NAME</Typography>
              <DateRangeIcon sx={{ marginLeft: "10px" }}/>
              <Typography variant="subtitle2" sx={{ marginLeft: "10px" }}>{new Date(item.last_update).toISOString().slice(0, 10)}</Typography>
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
              <Button onClick={() => editCaseNote(item.case_id)} sx={{ marginLeft : "800px" }} startIcon={<CreateIcon />}>Edit Note</Button>
              <Button onClick={() => deleteCase(item.case_id)} sx={{ float: "right" }} startIcon={<DeleteIcon />}>Delete Note</Button>
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
