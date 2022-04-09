import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { Link, useRouteMatch } from "react-router-dom";
import {fetchCustomFormsAPI, publishFormAPI} from "../../../api/formAPI";
import PublishFormConfirmation from "../../../components/form/PublishConfirmationModal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

function FormTop() {

    const [completed, setCompleted] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

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
                        const res = await publishFormAPI(params.row.form_id)
                        if (res.status !== 200) {
                        //    TODO error handling
                            alert("Error publishing!")
                        } else {
                            setRefreshKey(refreshKey => refreshKey + 1)
                        }
                    })();
                };
                return <PublishFormConfirmation form={params.row} publishFunc={onClick} />
            }
        }
    ];

    useEffect(() => {
        (async () => {
            setLoading(true);
            const forms = await fetchCustomFormsAPI();
            setCompleted(forms.completed.map((element, index) => ({ ...element, "id": index })));
            setDrafts(forms.drafts.map((element, index) => ({ ...element, "id": index })));
            setLoading(false);
        })();
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

            <Grid container direction="column">
                <Grid item sx={{mb: 3}}>
                    <Typography sx={{ fontSize: 40, mb: 1}} align="left">
                        Completed Forms
                    </Typography>
                    <DataGrid container autoHeight hideFooter={true} headerHeight={0}
                              rows={completed} columns={[...displayDataColumns, ...completedOptions]} loading={loading}
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ fontSize: 40, mb: 1}} align="left">
                        Drafts
                    </Typography>
                    <DataGrid container autoHeight hideFooter={true} headerHeight={0}
                              rows={drafts} columns={[...displayDataColumns, ...draftOptions]} loading={loading}
                    />
                </Grid>
            </Grid>

        </Card>
    )
}

export default FormTop;
