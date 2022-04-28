import * as React from "react";
import { Prompt } from "react-router";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import validator from "validator";

import AddVolunteerModal from "./AddVolunteerModal.jsx";

import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    border: 0,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "small",
      marginTop: "5px",
      marginBottom: "10px",
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-cell": {
      borderRight: "none",
      borderBottom: "none !important",
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
  },
  SearchInputField: {
    backgroundColor: "#F7F8F9",
    "& .MuiFilledInput-input": {
      padding: "10px",
    },
  },
});

function exportCSV(searchParams) {
  let url = "http://localhost:3000/getUsersInfoCSV?";

  searchParams.forEach(
    (element) => (url += `&${element.name}=${element.value}`)
  );

  fetch(url, {
    headers: {
      "Content-Type": "text/csv",
      Accept: "text/csv",
    },
  })
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const href = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "userQuery.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

export default function VolunteerCRM({ tab }) {
  const classes = useStyles();
  const [dialog, setDialog] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [searchCategory, setSearchCategory] = React.useState("name");
  const [searchParams, setSearchParams] = React.useState([]);
  const [cellValue, setCellValue] = React.useState("");
  const [cellChanges, setCellChanges] = React.useState({});
  const [highlightCells, updateHighlightCells] = React.useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handlePageSizeChange(value) {
    setPage(1);
    setPageSize(value);
    setCellChanges({});
    updateHighlightCells([]);
  }

  function loadServerRows(searchParams, page, pageSize, tab) {
    if (tab === 1){
      return new Promise((resolve) => {
        let url = "http://localhost:3000/api/volunteers/getData?";

        url += `page=${page}`;
        url += `&page_size=${pageSize}`;
        searchParams.forEach(
          (element) => (url += `&${element.name}=${element.value}`)
        );
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            if (resp.constructor === Array) {
              resolve(resp);
            } else {
              throw new Error();
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
  }

  const changePage = (value) => {
    if (Object.keys(cellChanges).length !== 0) {
      if (
        window.confirm(
          "You have unapplied changes, would you like to continue?"
        )
      )
        setPage(value);
      setCellChanges({});
      updateHighlightCells([]);
    } else {
      setPage(value);
      setCellChanges({});
      updateHighlightCells([]);
    }
  };

  const validateUpdate = (params, event) => {
    const action = (key) => (
      <Grid>
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

    if (params.field === "name" && validator.isEmpty(cellValue)) {
      event.defaultMuiPrevented = true;
      enqueueSnackbar("Please enter a valid name!", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      });
    } else if (params.field === "village" && validator.isEmpty(cellValue)) {
      event.defaultMuiPrevented = true;
      enqueueSnackbar("Please enter a valid village!", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      });
    } else if (
      params.field === "date_joined" &&
      validator.isEmpty(cellValue)
    ) {
      event.defaultMuiPrevented = true;
      enqueueSnackbar("Date cannot be empty!", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      }); 
    } else if (
      params.field === "role" &&
      validator.isEmpty(cellValue)
    ) {
      event.defaultMuiPrevented = true;
      enqueueSnackbar("Please enter a valid role!", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      }); 
    } else if (
      params.field === "phone" &&
      !validator.isMobilePhone(cellValue)
    ) {
      event.defaultMuiPrevented = true;
      enqueueSnackbar("Please enter a valid phone number!", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      }); 
    } else if (
      params.field === "email" &&
      !validator.isEmail(cellValue)
    ) {
      event.defaultMuiPrevented = true;
      enqueueSnackbar("Please enter a valid Email!", {
        variant: "error",
        autoHideDuration: 15000,
        action,
      }); 
    } else {
      updateCellChanges(params.id, params.field, cellValue);
      updateHighlightCells((prevArray) => [
        ...prevArray,
        { id: params.id, field: params.field },
      ]);
    }
  };
  const updateCellChanges = (id, field, value) => {
    setCellChanges((prevObj) => ({
      ...prevObj,
      [id]: {
        ...prevObj[id],
        [field]: value,
      },
    }));
  };

  const submitChanges = () => {
    setLoading(true);
    const url = `http://localhost:3000/volunteers/updateInfo`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cellChanges),
    })
      .then((resp) => {
        if (!resp.ok){
          throw new Error(); 
        }
        {
          updateHighlightCells([]);
          setCellChanges({});
          setLoading(false);
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
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(searchParams, page, pageSize, tab);
      if (!active) {
        return;
      }
      setRows(newRows[1]);
      setPageCount(Math.ceil(newRows[0].count / pageSize));
      setCellChanges({});
      updateHighlightCells([]);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [searchParams, page, pageSize, dialog, tab]);

  return (
    <Card
      display="flex"
      direction="column"
      sx={{
        mt: "15px",
        mb: "50px",
        boxShadow: "None",
        minHeight: 1000,
        minWidth: 375,
        width: "100%",
        maxWidth: 1200,
      }}
    >
      <Prompt
        when={Object.keys(cellChanges).length !== 0}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Grid container display="flex" direction="row">
        <Typography sx={{ fontSize: 48, mb: "1px" }}>Volunteer CRM</Typography>
      </Grid>
      <Grid display="flex">
        <Select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"village"}>Village</MenuItem> 
          <MenuItem value={"date_joined"}>Date Joined</MenuItem>
          <MenuItem value={"role"}>Role</MenuItem>
          <MenuItem value={"phone"}>Phone</MenuItem>
          <MenuItem value={"email"}>Email</MenuItem>
        </Select>
        <TextField
          className={classes.SearchInputField}
          fullWidth
          variant="outlined"
          placeholder="Search Supporters"
          name="search"
          type="text"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setSearchParams((arr) => [
                ...arr,
                {
                  name: searchCategory,
                  value: e.target.value,
                },
              ]);
              e.target.value = "";
              setPage(1);
            }
          }}
        />
      </Grid>
      <Grid container display="flex" direction="row">
        {searchParams.map((param) => (
          <Chip
            sx={{ m: "10px" }}
            label={param.name + "=" + param.value}
            onDelete={(e) => {
              setSearchParams((arr) =>
                arr.filter((element) => element !== param)
              );
              setPage(1);
            }}
          />
        ))}
      </Grid>

      <Box
        sx={{
          height: 300,
          width: 1,
          "& .hot": {
            backgroundColor: "#00FF00",
            color: "#1a3e72",
          },
        }}
      >
        <Box display="flex" sx={{ justifyContent: "center", mt: 1, border: 1 }}>
          <Button
            sx={{ fontWeight: 700 }}
            onClick={submitChanges}
            disabled={Object.keys(cellChanges).length === 0}
          >
            Apply Changes
          </Button>
        </Box>
        <DataGrid
          container
          autoHeight
          display="flex"
          direction="row"
          className={classes.root}
          pageSize={pageSize}
          getRowId={(row) => row.volunteer_id}
          rows={rows}
          rowsPerPageOptions={[5, 10, 25]}
          loading={loading}
          onEditCellPropsChange={(params) => setCellValue(params.props.value)}
          onCellEditStop={validateUpdate}
          getCellClassName={(params) => {
            let hot = false;
            highlightCells.forEach((item, key) => {
              if (params.field === item.field && params.id === item.id) {
                hot = true;
              }
            });
            if (hot) {
              return "hot";
            }
          }}
          components={{
            Toolbar: () => {
              return (
                <GridToolbarContainer>
                  <Grid
                    container
                    display="flex"
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ minWidth: 562 }}
                  >
                    <Button
                      sx={{ marginRight: "auto" }}
                      endIcon={<AddIcon />}
                      onClick={() => setDialog(true)}
                    >
                      Add Volunteer 
                    </Button>
                    <FormControl
                      variant="standard"
                      sx={{ textAlign: "left", m: 1, width: 200 }}
                    >
                      <Select
                        sx={{ color: "#0000008A" }}
                        value={pageSize}
                        label="Rows Per Page"
                        onChange={(e) => handlePageSizeChange(e.target.value)}
                        renderValue={(perPage) => `${perPage} per page`}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                      </Select>
                    </FormControl>
                    <Pagination
                      color="primary"
                      variant="outlined"
                      hideNextButton
                      hidePrevButton
                      siblingCount={0}
                      boundaryCount={1}
                      page={page}
                      count={pageCount}
                      onChange={(event, value) => changePage(value)}
                    />
                    <IconButton
                      onClick={page === 1 ? null : (e) => changePage(page - 1)}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>

                    <IconButton
                      onClick={
                        page === pageCount ? null : (e) => changePage(page + 1)
                      }
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                    <Button
                      endIcon={<FileDownloadIcon />}
                      onClick={() => exportCSV(searchParams)}
                    >
                      Export as CSV
                    </Button>
                  </Grid>
                </GridToolbarContainer>
              );
            },
          }}
          columns={[{
            editable: "true",
            field: "name",
            headerName: "NAME",
            flex: 1,
          },
          {
            editable: "true",
            field: "village",
            headerName: "VILLAGE",
            flex: 1,
          },
          {
            editable: "true",
            field: "date_joined",
            headerName: "DATE JOINED",
            flex: 1,
          },
          {
            editable: "true",
            field: "role",
            headerName: "ROLE",
            flex: 1,
          },
          {
            editable: "true",
            field: "phone",
            headerName: "PHONE",
            flex: 1,
          },
          {
            editable: "true",
            field: "email",
            headerName: "EMAIL",
            flex: 1.5,
          }
          ]}
        />
      </Box>
      <AddVolunteerModal dialog={dialog} toggleDialog={setDialog} />
    </Card>
  );
}
