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

export default function UserHome() {

    const [unfinished, setUnfinished] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { fetchWithError } = useFetch();

    const currentUserId = useSelector(selectUserId);
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
                    <Button component={Link} to={`${qUrl}/view/${params.row.questionnaire_id}`}
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
            flex: 0.4,
            renderCell: (params) => {
                return (
                    <Button sx={{ minWidth:0 }} component={Link} to={`${url}/complete/${params.row.form_id}`}
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
            setUnfinished(forms.unfinished.map((element, index) => ({ ...element, "id": index })));
            setSubmitted(forms.submitted.map((element, index) => ({ ...element, "id": index })));
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
                {isLoading ? <></> :
                    <Grid item sx={{ mb: 3 }}>
                        <Typography sx={{ fontSize: 40, mb: 1 }} align="left">
                            Available Forms
                        </Typography>
                        {
                            unfinished.length === 0 ?
                                <Grid alignItem='center' justifyContent='center'>
                                    <Typography> No Items... </Typography>
                                </Grid>
                                :
                                <DataGrid container autoHeight hideFooter={true} headerHeight={0}
                                    rows={unfinished} columns={[...displayDataColumns, ...draftOptions]} loading={isLoading}
                                    components={{
                                        NoRowsOverlay: () => (
                                            <Grid alignItem='center' justifyContent='center'>
                                                No Items
                                            </Grid>
                                        ),
                                        NoResultsOverlay: () => (
                                            <Grid alignItem='center' justifyContent='center'>
                                                No Items
                                            </Grid>
                                        )
                                    }}
                                />
                        }
                    </Grid>
                }
                {isLoading ? <></> :
                    <Grid item>
                        <Typography sx={{ fontSize: 40, mb: 1 }} align="left">
                            Submitted
                        </Typography>
                        {
                            submitted.length === 0 ?
                                <Grid alignItem='center' justifyContent='center'>
                                    <Typography> No Items... </Typography>
                                </Grid>
                            :
                            <DataGrid container autoHeight hideFooter={true} headerHeight={0}
                                rows={submitted} columns={[...displayDataColumns, ...completedOptions]} loading={isLoading}
                                components={{
                                    NoRowsOverlay: () => (
                                        <Grid alignItem='center' justifyContent='center'>
                                            No Items
                                        </Grid>
                                    ),
                                    NoResultsOverlay: () => (
                                        <Grid alignItem='center' justifyContent='center'>
                                            No Items
                                        </Grid>
                                    )
                                }}
                            />
                    }
                </Grid>
            }
            </Grid>

        </Card>
    )
}
