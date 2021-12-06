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
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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

function loadServerRows(searchString, page, pageSize) {
  return new Promise((resolve) => {
    let url = "api/customers/queryUserData?";

    url += `page=${page}`;
    url += `&page_size=${pageSize}`;
    url += `&q=${searchString}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        resolve(resp);
      });
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
      const newRows = await loadServerRows(searchString, page, pageSize);
      if (!active) {
        return;
      }
      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [searchString, page, pageSize]);

  return (
    <Card
      display="flex"
      direction="column"
      sx={{ minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
    >
      <Grid component="form" onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            className={classes.SearchInputField}
            variant="outlined"
            placeholder="Search Users"
            name="search"
            type="text"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
            }}
          />
        </FormControl>
      </Grid>
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
            field: "phone",
            headerName: "PHONE",
            flex: 1.5,
          },
          {
            status: "false",
            field: "status",
            headerName: "STATUS",
            flex: 1,
          },
        ]}
      />
    </Card>
  );
}