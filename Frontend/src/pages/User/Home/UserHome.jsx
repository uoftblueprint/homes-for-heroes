import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/userSlice";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import useFetch from '../../../api/useFetch';

export default function UserHome({ currLevel }) {

    const [completed, setCompleted] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { fetchWithError } = useFetch();

    const currentUserId = useSelector(selectUserId);
    console.log(currentUserId);
    // const currentUserId = 1;

    let url = '/forms' ;

    let qUrl = '/questionnaire'

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
                    <Button component={Link} to={`${qUrl}/view/${params.row.form_id}`}
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
                    <Button component={Link} to={`${url}/complete/${params.row.form_id}`}
                            variant="outlined" size="small" startIcon={<EditIcon />}>
                            COMPLETE FORM
                    </Button>
                );
            }
        }, 
    ];

    useEffect(() => {
        (async () => {
            setLoading(true);
            const endpoint = `questionnaire/queryCompletedQuestionnaires/${currentUserId}`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }
            const forms = await fetchWithError(endpoint, options);
            setCompleted(forms.completed.map((element, index) => ({ ...element, "id": index })));
            setDrafts(forms.drafts.map((element, index) => ({ ...element, "id": index })));
            setLoading(false);
        })();
    }, [])

    return (
        <Card
            display="flex"
            direction="column"
            sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
        >
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
