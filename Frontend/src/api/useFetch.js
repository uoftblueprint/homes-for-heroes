import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


//Change to process.env.host
const host = `/api/`;

export default function useFetch() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const fetchWithError = (endpoint, options) => {
      return new Promise((resolve) => {
      const url = `${host}${endpoint}`;
      fetch(url, options)
        .then((resp) => {
          if (!resp.ok){
            throw new Error();
          }
          else{
            resolve(resp.json());
          }
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
      });
    }

    const fetchBlobWithError = (endpoint, options) => {
      return new Promise((resolve) => {
      const url = `${host}${endpoint}`;
      fetch(url, options)
        .then((resp) => {
          if (!resp.ok){
            throw new Error();
          }
          else{
            resolve(resp.blob());
          }
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
      });
    }

  const makeFormWithError = (endpoint, options) => {
      return new Promise((resolve, reject) => {
      const url = `${host}${endpoint}`;
      fetch(url, options)
        .then((resp) => {
          if (!resp.ok){
            return resp.json().then(resp => {
                throw new Error(resp.errors ? `${resp.errors[0].msg}` : 'Something went wrong!');
            })

          }
          else{
            resolve(resp.json());
          }
        }) 
        .catch((e) => {
          const action = (key) => (
            <Grid>
            </Grid>
          );
          enqueueSnackbar(e.toString(), {
            variant: "error",
            autoHideDuration: 15000,
            action,
          });
          return reject(e.toString());
        }); 
      });
    }

    return { fetchWithError, fetchBlobWithError, makeFormWithError }
  } 