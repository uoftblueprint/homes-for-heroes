import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublishFormConfirmation from "./ConfirmationModal";
import {Alert} from "@mui/lab";
import Grid from "@mui/material/Grid";

function fetchCustomForms(host, admin_id) {
    const url = `${host}/custom-form/queryAllAdminForms/${admin_id}`

    return new Promise((resolve) => {
        fetch(url)
            .then(r => {
                resolve(r.json())
            })
            .catch(error => {
                console.error("error!: " + error);
            })
    })
}

function publishForm(host, form) {
    const url = `${host}/custom-form/publish`

    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
        fetch(url, requestOptions)
            .then(response => console.log(response))
            .catch(err => reject(err));
    })
}

function FormTop() {

    const [completed, setCompleted] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const host = 'http://localhost:3000'
    const admin_id = 1;

    let { url }= useRouteMatch();

    const displayDataColumns = [
        {
            field: "title",
            headerName: "Title",
            flex: 2,
        }
    ];

    const completedOptions = [
        {
            field: 'view',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                return (
                    <Button component={Link} to={`${url}/view/${params.row.form_id}`}
                            variant="outlined" size="small" startIcon={<VisibilityIcon />}>
                        VIEW FORM
                    </Button>
                );
            }
        }
    ];

    const draftOptions = [
        {
            field: 'edit',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                return (
                    <Button component={Link} to={`${url}/edit/${params.row.form_id}`}
                            variant="outlined" size="small" startIcon={<EditIcon />}>
                        EDIT
                    </Button>
                );
            }
        },
        {
            field: 'publish',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const onClick = (e) => {
                    // e.stopPropagation(); // don't select this row after clicking
                    (async () => {
                        await publishForm(host, params.row)
                    })();
                    setRefreshKey(refreshKey => refreshKey + 1)
                };
                return <PublishFormConfirmation form={params.row} publishFunc={onClick} />
            }
        }
    ];

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            const forms = await fetchCustomForms(host, admin_id);
            if (!active) {
                return;
            }
            setCompleted(forms.completed.map((element, index) => ({ ...element, "id": index })));
            setDrafts(forms.drafts.map((element, index) => ({ ...element, "id": index })));
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [refreshKey])

    return (
        <Card
            display="flex"
            direction="column"
            sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
        >
            <Grid container direction="row" alignItems="left" sx={{mb: '30px'}}>
                <Grid item xs={10}>
                    <Alert variant="outlined" severity="info">
                        Once forms are published, they can no longer be edited!
                    </Alert>
                </Grid>
                <Grid item xs={2}>
                    <Button component={Link} to={`${url}/create`}
                            variant="outlined" size="small" startIcon={<AddIcon />}>
                        Add Form
                    </Button>
                </Grid>
            </Grid>

            <Typography sx={{ fontSize: 40, mb: '1px'}} align="left">
                Completed Forms
            </Typography>
            <DataGrid container autoHeight hideFooter={true} headerHeight={0}
                      rows={completed} columns={[...displayDataColumns, ...completedOptions]} loading={loading}
            />

            <Typography sx={{ fontSize: 40, mb: '1px'}} align="left">
                Drafts
            </Typography>
            <DataGrid container autoHeight hideFooter={true} headerHeight={0}
                      rows={drafts} columns={[...displayDataColumns, ...draftOptions]} loading={loading}
            />

        </Card>
    )
}

export default FormTop;
