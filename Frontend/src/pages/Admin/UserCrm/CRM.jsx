import * as React from "react";
import { Prompt } from 'react-router'
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Card from "@mui/material/Card";
import PaginationItem from "@mui/material/PaginationItem";
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
import Chip from "@mui/material/Chip"
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useHistory } from "react-router-dom";
import validator from 'validator';

import AddRowButton from './AddRowButton.jsx';
import { ThemeProvider, createTheme } from "@mui/material/styles";

// import data from "./MOCK_DATA.json"

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    border: 0, 
    alignContent: "flex-start",
    justifyContent: "flex-start",
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "small",
      marginTop: "5px",
      marginLeft: "-5px",
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

function loadServerRows(searchParams, page, pageSize) {
  return new Promise((resolve) => {
    let url = "http://localhost:3000/api/getUserData?";

    url += `page=${page}`;
    url += `&page_size=${pageSize}`;
    searchParams.forEach((element) => url += `&${element.name}=${element.value}`) 
    console.log(url);
    try{ 
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.constructor === Array){
          resolve(resp);
        }
        {
          resolve([])
        }
      });
    }
    catch{
      console.log("error!");
    }
    // resolve(data.slice((page-1) * pageSize, page * pageSize * 5))
  });
}

function exportCSV(searchParams) {
  let url = "http://localhost:3000/getUsersInfoCSV?";

  searchParams.forEach((element) => url += `&${element.name}=${element.value}`) 
  console.log(url);

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

export default function CRM() {
  const classes = useStyles();

  const [light, setLight] = React.useState(false);

  const themeWhite = createTheme({
    palette: {
      background: {
        default: "#e4f0e2"
      }
    }
  });

  const themeRed = createTheme({
    palette: {
      background: {
        default: "#FF0000"
      }
    }
  });

  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchCategory, setSearchCategory] = React.useState("name");
  const [searchParams, setSearchParams] = React.useState([]);
  const [cellValue, setCellValue] = React.useState('')
  const [cellChanges, setCellChanges] = React.useState([])

  React.useEffect(() => {
    if(cellChanges.length === 0){

      setLight(false);
    }
  }, [cellChanges])
  let pageCount = Math.ceil(rows.length / pageSize);

  function handlePageSizeChange(value) {
    setPage(1);
    setPageSize(value);
  }

  const updateCell = (e) => {
      console.log(e);
      // console.log(cellValue);
      if (e.value !== cellValue) {
        if (e.field === 'email'){
          if (validator.isEmail(e.value)){
            setCellChanges(prevArray => [...prevArray, e])
          }
          else{
            setCellChanges(prevArray => [...prevArray, e])
            alert('Please enter a Valid Email!');
          } 
        }
        else{
          setCellChanges(prevArray => [...prevArray, e])
        } 
      }
  }

  const submitChanges = () => {
    console.log(cellChanges)
    setCellChanges([]);
  } 

  const history = useHistory();

  const viewProfile = (id) => {
    history.push(`/casenotes/${id}`);
  }

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(searchParams, page, pageSize);
      if (!active) {
        return;
      }
      setRows(newRows);
      setCellChanges([]);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [searchParams, page, pageSize]);

  return (
    <Card
      display="flex"
      direction="column"
      sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
    >
      <Prompt
      when={cellChanges.length !== 0}
      message='You have unsaved changes, are you sure you want to leave?'
    />
      <Grid
      display="flex"
      direction="row"
      >
        <Typography sx={{ fontSize: 48, mb: '1px'}}>
          Veteran Info 
        </Typography>
      </Grid>
      <Grid 
      display="flex"
      direction="row" 
      >
          <Select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          >
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"email"}>Email</MenuItem>
            <MenuItem value={"phone"}>Phone</MenuItem>
            <MenuItem value={"status"}>Status</MenuItem>
            <MenuItem value={"demographic"}>Demographic</MenuItem>
            <MenuItem value={"income"}>Income</MenuItem>
            <MenuItem value={"incoming_referral"}>Incoming Referral</MenuItem>
            <MenuItem value={"outgoing_referral"}>Outgoing Referral</MenuItem>
          </Select>
        <TextField
            className={classes.SearchInputField}
            fullWidth 
            variant="outlined"
            placeholder="Search Users"
            name="search"
            type="text"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setSearchParams(arr => ([...arr, {
                  "name": searchCategory,
                  "value": e.target.value
                }]));
                e.target.value = ""
              }
            }}
        /> 
      </Grid>
      <Grid
      display="flex"
      direction="row"
      >
        {searchParams.map((param) => ( 
            <Chip
              sx={{m: '10px'}}
              label={param.name + '=' + param.value} 
              onDelete={(e) => setSearchParams(arr => arr.filter(element => element !== param))}
            /> 
        ))}
      </Grid>
      <Grid
        container 
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ minWidth: 562 }}
      >
        <AddRowButton sx={{ marginRight: "auto" }} /> 
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
          siblingCount={1}
          boundaryCount={1}
          page={page}
          count={pageCount}
          renderItem={(props2) => <PaginationItem {...props2} />}
          onChange={(event, value) => setPage(value)}
        />
        <IconButton onClick={page === 1 ? null : (e) => setPage(page - 1)}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={page === pageCount ? null : (e) => setPage(page + 1)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <Button endIcon={<FileDownloadIcon />} onClick={() => exportCSV(searchParams)}>
          Export as CSV
        </Button>
      </Grid>
      <Box
      sx={{
        height: 300,
        width: 1, 
        '& .hot': {
          backgroundColor: '#00FF00',
          color: '#1a3e72',
        }, 
      }} 
      >
      <Box
      sx={{
        height: 300,
        width: 1, 
        '& .error': {
          backgroundColor: '#FF0000',
          color: '#1a3e72',
        }, 
      }} 
      >
      <DataGrid
        container
        autoHeight
        display="flex"
        direction="row"
        className={classes.root}
        pageSize={pageSize}
        getRowId={row => row.user_id}
        rows={rows}
        loading={loading}
        onCellEditStart={(event) => setCellValue(event.formattedValue)}
        onCellEditCommit={updateCell} 
        getCellClassName={(params) => { 
          let bool = false;
          let error = false;
          cellChanges.forEach((item, key) => {    
            if (params.field == 'email' && params.id == item.id && !validator.isEmail(params.value)){
              console.log(item.value)
              error = true;
            }
            else if (params.field == item.field && params.id == item.id){  
              bool = true; 
            }
          })
          if (error === true){
            return 'error'
          }
          if (bool === true){
            return 'hot'
          }  
        }}
        columns={[
          {
            editable: "true",
            field: "name",
            headerName: "NAME",
            flex: 1.5,
            renderCell: (params) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link onClick={() => viewProfile(params.id)}>
                    <span>{params.formattedValue}</span>
                    <LaunchIcon sx={{ fontSize: 16 }} />
                  </Link>
                </div>
              );
            },
          },
          {
            editable: "true",
            field: "email",
            headerName: "EMAIL",
            flex: 1.5,
          },
          {
            editable: "true",
            field: "applicant_phone",
            headerName: "PHONE",
            flex: 1,
          },
          {
            editable: "true",
            status: "true",
            field: "curr_level",
            headerName: "STATUS",
            flex: 1,
          },
          {
            editable: "true",
            field: "Demographic",
            headerName: "DEMOGRAPHICS",
            flex: 2,
          },
          {
            editable:"true",
            field: "income",
            headerName: "INCOME",
            flex: 1,
          },
          {
            editable:"true",
            field: "incoming_referrals",
            headerName: "INC. REFERRALS",
            flex: 1.5,
          }, 
          {
            editable:"true",
            field: "outgoing_referrals",
            headerName: "OUT. REFERRALS",
            flex: 1.5,
          },
        ]}
      />
      </Box>
      </Box>
      <Grid
      display='flex'
      >
        <Button
        sx={{ marginLeft: 'auto' }}
        onClick={submitChanges}
        disabled={cellChanges.length === 0}
        >
          Apply Changes
          </Button>
      </Grid>
    </Card>
  );
}
