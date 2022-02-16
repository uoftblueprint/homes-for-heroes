import * as React from "react";

import PrivAdminCard from "./PrivAdminCard.js"
import PrivAdminModal from "./PrivAdminModal.js";
import PrivSupervisorCard from "./PrivSupervisorCard";
import PrivSupervisorModal from "./PrivSupervisorModal";

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
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";

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

export default function Privileges() {
  
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const [locations, setLocations] = React.useState(["Toronto", "Montreal"]);
  const [svLocation, setSvLocation] = React.useState("Toronto");
  const [dialog, toggleDialog] = React.useState(false);
  const [adminDialog, toggleAdminDialog] = React.useState(false);
  const [chapterDialog, toggleChapterDialog] = React.useState(false);
  const [chapterName, setChapterName] = React.useState("");
  const [supervisors, setSupervisors] = React.useState([
    {
      id: "1",
      name: "Don Jon",
      svregion: "Toronto",
      isAdmin: true,
    },
    {
      id: "2",
      name: "Barry Allen",
      svregion: "Montreal",
      isAdmin: false,
    },
    {
      id: "3",
      name: "Evan Hansen",
      svregion: "Toronto",
      isAdmin: true,
    },
    {
      id: "4",
      name: "Sasha Blouse",
      svregion: "Montreal",
      isAdmin: true,
    },
    {
      id: "5",
      name: "Mary Poppins",
      svregion: "Montreal",
      isAdmin: false,
    },
  ]);

  const handleChapterDialog = () => {
    setLocations(prevArr => [...prevArr, chapterName]);
    toggleChapterDialog(false);
  }
  
  const submitChanges = () => {
    console.log('hi')
  }

  return (
    <Grid display="flex" direction="column">
    <Grid container display="flex" justifyContent="center">
      <PrivAdminCard /> 
      <PrivSupervisorCard />
      </Grid>
      <Grid
      display='flex'
      >
        <Button
        sx={{ marginLeft: 'auto' }}
        onClick={submitChanges}
        disabled={false}
        >
          Apply Changes
          </Button>
      </Grid>
      </Grid>
  );
}
