import * as React from "react";

import PrivAdminModal from "./PrivAdminModal";

import { useSnackbar } from "notistack";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

export default function PrivAdminCard() {
  const [adminDialog, toggleAdminDialog] = React.useState(false);
  const [superadmins, setSuperadmins] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    setLoading(true);
    const url = `http://localhost:3000/superadmins/getAll`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setSuperadmins(resp.superadmin);
        setLoading(false);
      })
      .catch((e) => {
        const action = (key) => (
          <Grid>
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        );
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 15000,
          action,
        });
      });
  }, [adminDialog]);

  const handleAdminOpen = () => {
    toggleAdminDialog(true);
  };

  const handleUnsetSuperadmin = (admin_id) => {
    let active = true;
    setSuperadmins((prevState) =>
      prevState.map((user) => {
        if (user.admin_id === admin_id) {
          return {
            ...user,
            role_id: 0,
          };
        }
        return user;
      })
    );
    setLoading(true);
    const url = `http://localhost:3000/admins/${admin_id}/unsetSuperadmin`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        setLoading(false);
      })
      .catch((e) => {
        const action = (key) => (
          <Grid>
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        );
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 15000,
          action,
        });
      });
  };

  return (
    <Card sx={{ maxWidth: 385, mt: "40px", mr: "30px", border: 1 }}>
      <CardContent>
        <Grid container display="flex" direction="row" justify="space-evenly">
          <Typography>System Admins</Typography>
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
          System administrators have access to all areas of this application.
          There must always be at least one.
        </Typography>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <List>
            {superadmins
              .filter((el) => el.role_id === 2)
              .map((superadmin) => {
                return (
                  <ListItem
                    key={superadmin.admin_id}
                    secondaryAction={
                      <Button
                        size="small"
                        onClick={() =>
                          handleUnsetSuperadmin(superadmin.admin_id)
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
      />
    </Card>
  );
}
