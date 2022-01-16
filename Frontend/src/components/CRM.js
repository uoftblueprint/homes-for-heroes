import * as React from "react";
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
import Autocomplete from "@mui/material/Autocomplete"
import Chip from "@mui/material/Chip"
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CancelIcon from '@mui/icons-material/Cancel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LaunchIcon from "@mui/icons-material/Launch";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import data from "./MOCK_DATA.json"

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    border: 0,
    fontFamily: "Inter",
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
    let url = "http://localhost:3000/getUserData?";

    url += `page=${page}`;
    url += `&page_size=${pageSize}`;
    searchParams.forEach((element) => url += `&${element.name}=${element.value}`) 
    console.log(url);

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        resolve(resp.map((element, index) => ({...element, "id":index})));
      });
  // resolve(data.slice((page-1) * pageSize, page * pageSize * 5))
  });
}

function exportCSV(searchString) {
  let url = "api/getUserInfoCSV?";

  url += `q=${searchString}`;

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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

  const [pageSize, setPageSize] = React.useState(5);
  const [searchString, setSearchString] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchCategory, setSearchCategory] = React.useState("name");
  const [searchParams, setSearchParams] = React.useState([]);

  let pageCount = Math.ceil(rows.length / pageSize);

  function handlePageSizeChange(value) {
    setPage(1);
    setPageSize(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchString(e.target[0].value);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(searchParams, page, pageSize);
      if (!active) {
        return;
      }
      setRows(newRows);
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
      sx={{ minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
    >
      <Grid 
      display="flex"
      direction="row" 
      >

          {/* <TextField
            className={classes.SearchInputField}
            variant="outlined"
            placeholder="Search Users"
            name="search"
            type="text"
            InputProps={{
              startAdornment: <Select></Select>,
              endAdornment: <IconButton><SearchIcon /></IconButton>
            }}
          /> */}
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
          {/* <Autocomplete
            multiple
            sx={{minWidth: "70%"}}
            id="tags-filled" 
            options={[]}
            defaultValue={[]}
            freeSolo 
            value={searchParams.keys} 
            onChange={(e) => setSearchParams({ ...searchParams, [searchCategory]: e.target.value })}
            renderTags={(value, getTagProps) =>{  
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option + searchParams[option]}  
                /> 
              ));
              }
            } 
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{shrink: false}}
                variant="filled" 
                placeholder={searchCategory}
               
                
              />
            )}
          />
          <IconButton><SearchIcon /></IconButton> */}
      </Grid>
      <List
      >
        {searchParams.map((param) => (
          <ListItem>
            <IconButton
              onClick={(e) => setSearchParams(arr => arr.filter(element => element.name != param.name))}
            >
              <CancelIcon />
            </IconButton>
            <Typography>
              {param.name + ":" + param.value}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Grid
        container 
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ minWidth: 562 }}
      >
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
        <Button onClick={() => exportCSV(searchString)}>
          Export as CSV
          <FileDownloadIcon />
        </Button>
      </Grid>
      <DataGrid
        container
        sx={{minHeight: 500}}
        display="flex"
        direction="row"
        className={classes.root}
        pageSize={pageSize}
        rows={rows}
        loading={loading}
        columns={[
          {
            editable: "false",
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
                  <Link href={`/casenotes/${params.id}`}>
                    <span>{params.formattedValue}</span>
                    <LaunchIcon sx={{ fontSize: 16 }} />
                  </Link>
                </div>
              );
            },
          },
          {
            editable: "false",
            field: "email",
            headerName: "EMAIL",
            flex: 1.5,
          },
          {
            editable: "false",
            field: "applicant_phone",
            headerName: "PHONE",
            flex: 1.5,
          },
          {
            status: "false",
            field: "curr_level",
            headerName: "STATUS",
            flex: 1,
          },
          {
            field: "Demographic",
            headerName: "DEMOGRAPHICS",
            flex: 2,
          },
          {
            field: "income",
            headerName: "INCOME",
            flex: 1,
          } 
        ]}
      />
    </Card>
  );
}
