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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useSnackbar } from "notistack";
import useFetch from "../api/useFetch.js";

import BaseDeleteDialog from "./BaseDeleteDialog.jsx";

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
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
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

export default function BaseCRM({
    dialog,
    setDialog, 
    deDialogEndpoint,
    demoName,
    csvEndpoint,
    defaultSearchCategory,
    updateUserEndpoint,
    loadRowsEndpoint,
    rowIdName,
    nameInRows,
    columns,
}) {
  const classes = useStyles(); 
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [deDialog, setDeDialog] = React.useState(false);
  const [selections, setDelete] = React.useState([]);
  const [selectionNames, setNames] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [searchCategory, setSearchCategory] = React.useState(defaultSearchCategory);
  const [searchParams, setSearchParams] = React.useState([]);
  const [cellChanges, setCellChanges] = React.useState({});
  const [highlightCells, updateHighlightCells] = React.useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { fetchWithError, fetchBlobWithError } = useFetch();

  function handlePageSizeChange(value) {
    setPage(1);
    setPageSize(value);
    setCellChanges({});
    updateHighlightCells([]);
  } 

  const changePage = (value) => {
    if (Object.keys(cellChanges).length !== 0) {
      if (
        window.confirm(
          "unapplied changes, would you like to continue?"
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
    const column = columns.find((el) => {return el.field === params.field}) 
    if (column.validationMethod(params.value)){
        event.defaultMuiPrevented = true;
        enqueueSnackbar("Please enter a valid " + column.headerName +'!', {
        variant: "error",
        autoHideDuration: 15000,
        action,
      });
    } else {
      if (params.field === 'date_gifted' || params.field === 'date_joined'){
        updateCellChanges(params.id, params.field, params.value.toISOString().split('T')[0]);
      } 
      updateCellChanges(params.id, params.field, column.sanitize(params.value));
      updateHighlightCells((prevArray) => [
        ...prevArray,
        { id: params.id, field: params.field },
      ]);
    }
  };
 
  const handleDeDialog = () => {
    const names = selections.map((id) => rows.find(el => {return el[rowIdName] === id})[nameInRows])
    setNames(names); 
    setDeDialog(true);
  }

  const updateCellChanges = (id, field, value) => {
    setCellChanges((prevObj) => ({
      ...prevObj,
      [id]: {
        ...prevObj[id],
        [field]: value,
      },
    }));
  };

  function exportCSV(searchParams) {
    (async() => {  
      setLoading(true);
      let endpoint = csvEndpoint;
      searchParams.forEach(
        (element) => 
        endpoint += `&${element.name}=${element.value}`
      );
      const options = {
        headers: {
          "Content-Type": "text/csv",
          Accept: "text/csv",
        },
      }
      const response = await fetchBlobWithError(endpoint, options);
      const href = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "userQuery.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false);
      })(); 
  }

  const submitChanges = () => {
    (async() => {  
      setLoading(true);
      const endpoint = updateUserEndpoint; 
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cellChanges),
      }
      await fetchWithError(endpoint, options);
      updateHighlightCells([]);
      setCellChanges({});
      setLoading(false);
      })(); 
  };

  React.useEffect(() => {
    (async() => {  
      setLoading(true);
      let endpoint = loadRowsEndpoint;
      endpoint += `page=${page}`;
      endpoint += `&page_size=${pageSize}`;
      searchParams.forEach(
        (element) => 
        endpoint += `&${element.name}=${element.value}`
      );
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      } 
      const response = await fetchWithError(endpoint, options);
      if (response.constructor === Array) { 
        setRows(response[1]);
        setPageCount(Math.ceil(response[0].count / pageSize));
        setCellChanges({});
        updateHighlightCells([]);
        setLoading(false);
      }
      setLoading(false);
      })();
  }, [searchParams, page, pageSize, dialog, deDialog]);

  return (
    <Card
      display="flex"
      direction="column"
      sx={{
        mt: "15px",
        mb: "50px",
        boxShadow: "None",
        minHeight: 1500,
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
        <Typography sx={{ fontSize: 48, mb: "1px" }}>{demoName} Info</Typography>
      </Grid>
      <Grid display="flex">
        <Select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          {
            columns.map((el) =>   
              <MenuItem value={el.field}>{el.headerName}</MenuItem> 
              )
          }
        </Select>
        <TextField
          className={classes.SearchInputField}
          fullWidth
          variant="outlined"
          placeholder={'Search ' + demoName + 's'}
          name="search"
          type="text"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setSearchParams((arr) => [...arr, {
                name: searchCategory,
                value: e.target.value
              }]);
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
          checkboxSelection
          onSelectionModelChange={(selections) => setDelete(selections)}
          className={classes.root}
          pageSize={pageSize}
          getRowId={(row) => row[rowIdName]}
          rows={rows}
          rowsPerPageOptions={[5, 10, 25]}
          loading={loading}
          onCellEditCommit={validateUpdate}
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
                      Add {demoName}
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
                    <Button
                      sx={{ color: " #FF0000" }}
                      disabled={selections.length === 0}
                      endIcon={<DeleteForeverIcon />}
                      onClick={handleDeDialog}
                    >
                      Delete {demoName}s
                    </Button>
                  </Grid>
                </GridToolbarContainer>
              );
            },
          }}
          columns={columns}
        />
      </Box> 
      <BaseDeleteDialog dialog={deDialog} deDialogEndpoint={deDialogEndpoint} toggleDialog={setDeDialog} veterans={selections} setVeterans={setDelete} names={selectionNames} setNames={setNames} demoName={demoName.toLowerCase()} />
    </Card> 
  );
}