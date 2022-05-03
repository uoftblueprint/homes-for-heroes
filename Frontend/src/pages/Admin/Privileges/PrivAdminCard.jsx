import * as React from "react";

import PrivAdminModal from "./PrivAdminModal";
import useFetch from "../../../api/useFetch";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/userSlice';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

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

export default function PrivAdminCard({ state, update }) {
  const [adminDialog, toggleAdminDialog] = React.useState(false);
  const [superadmins, setSuperadmins] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const { fetchWithError } = useFetch();
  const currentUserId = useSelector(selectUser).user_id;

  React.useEffect(() => {
    (async () => {
    setLoading(true);
    const endpoint = `superadmins/getAll`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }
    const response = await fetchWithError(endpoint, options); 
    setSuperadmins(response.superadmin);
    setLoading(false);
    })();

    }, [adminDialog, state]);

  const handleAdminOpen = () => {
    toggleAdminDialog(true);
  };

  const handleUnsetSuperadmin = (admin_id) => {
    setSuperadmins((prevState) =>
      prevState.map((user) => {
        if (user.user_id === admin_id) {
          return {
            ...user,
            role_id: 0,
          };
        }
        return user;
      })
    );
    (async() => {
      setLoading(true);
      const endpoint = `admins/${admin_id}/unsetSuperadmin`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        } 
      }
      fetchWithError(endpoint, options);
      update(!state);
      setLoading(false);
      })();
  };

  return (
    <Card sx={{ maxWidth: 385, mt: "40px", mr: "30px", border: 1 }}>
      <CardContent>
        <Grid container display="flex" direction="row" justify="space-evenly">
          <Typography>Superadmins</Typography>
          <Button
            size="small"
            onClick={handleAdminOpen}
            startIcon={<AddIcon />}
            sx={{ marginLeft: "auto" }}
          >
            Add New
          </Button>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          Superadministrators have access to all areas of this application.
          There must always be at least one.
        </Typography>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <List>
            {superadmins 
              .map((superadmin) => {
                return (
                  superadmin.user_id === currentUserId ? 
                    <ListItem
                    key={superadmin.user_id}
                    secondaryAction={
                      <Button
                        disabled
                        size="small"
                        onClick={() =>
                          handleUnsetSuperadmin(superadmin.user_id)
                        } 
                        sx={{
                          fontWeight: "bold",
                          color: "#C91C1C",
                          marginLeft: "auto",
                        }}
                      >
                        Current User 
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar {...stringAvatar(superadmin.name)} />
                    </ListItemAvatar>
                    <ListItemText primary={superadmin.name} />
                  </ListItem>
                :
                  <ListItem
                    key={superadmin.user_id}
                    secondaryAction={
                      <Button
                        size="small"
                        onClick={() =>
                          handleUnsetSuperadmin(superadmin.user_id)
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
                      <Avatar {...stringAvatar(superadmin.name)} />
                    </ListItemAvatar>
                    <ListItemText primary={superadmin.name} />
                  </ListItem> 
                );
              })}
          </List>
        )}
      </CardContent>
      <PrivAdminModal
        adminDialog={adminDialog}
        toggleAdminDialog={toggleAdminDialog}
        state={state}
        update={update}
      />
    </Card>
  );
}
