import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import { Prompt } from 'react-router'
import { useHistory, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../redux/userSlice';

export default function AddCase () {
  
  const [currUser, setCurrUser] = useState({});
  const { id } = useParams();
  const adminId = useSelector(selectUserId);
  const [shouldBlockNavigation, setNavigation] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [stat, setStat] = React.useState(0);
  const history = useHistory();

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: id,
      admin_id: adminId,
      notes: body,
      title: title,
      category: stat,
    }),
  };

  useEffect(() => {
    setNavigation(true);
    fetch(`/api/getCustomerInfo/${id}/`)
      .then((response) => response.json())
      .then((res) => {
        setCurrUser(res.customerInfo[0]);
      });
  }, [id]);

  useEffect(() => {
    if (shouldBlockNavigation) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  });

  const handleChangeStatus = (event) => {
    setStat(event.target.value);
  };

  const handleSubmit = () => {
    fetch('/api/casenote', request)
      .then(response => response.json());
    setNavigation(false);
    history.goBack();
  }

  const captureBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  }

  const captureTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  return (
    <Grid
        container="true"
        spacing={2}
        sx={{ marginTop: "5px", paddingLeft: "100px", paddingRight: "100px" }}
        direction="row"
        justifyContent="flex-start"
        width="max-width"
    >
      <Prompt
        when={shouldBlockNavigation}
        title='Go Back?'
        message='You have not submitted the case note. Going back without submitting will result in losing all the contents of the case note. To finish the case note, simply click cancel and submit.'
      />
      <Grid item xs={3}>
        <Button variant="outlined" onClick={() => history.goBack()}>
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: 48, mb: '1px', float:"left", paddingLeft: "150px", paddingBottom: "20px"}}>Case Note for: {currUser.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
        <InputLabel>Stage</InputLabel>
        <Select
          value={stat}
          label="Stage"
          onChange={handleChangeStatus}
        >
          <MenuItem value={0}>Discovery</MenuItem>
          <MenuItem value={1}>Recovery</MenuItem>
          <MenuItem value={2}>Retraining</MenuItem>
          <MenuItem value={3}>Thriving</MenuItem>
        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={10} marginLeft={"150px"} marginRight={"150px"}>
        <TextField
          autoFocus
          margin="dense"
          id="other"
          label="Title"
          multiline
          minRows={1}
          maxRows={1}
          type="title"
          fullWidth
          variant="standard"
          onChange={captureTitle}
        />
      </Grid>
      <Grid item xs={12} marginLeft={"150px"} marginRight={"150px"}>
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
      </Grid>
      <Grid item xs={12}>
        <Button sx={{ float: "right", marginRight: "150px" }} onClick={handleSubmit} startIcon={<SendIcon />}>Submit</Button>
      </Grid>
    </Grid>
      
  );
}