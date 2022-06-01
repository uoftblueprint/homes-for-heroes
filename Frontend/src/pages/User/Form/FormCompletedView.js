import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {FormControl, FormGroup, FormControlLabel, MenuItem, Typography} from "@mui/material";
import FormGridOptionView from "../../../components/form/CustomFormGridOptions";
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import QuestionTypeAnswerCompleted from "../../../components/form/QuestionTypeAnswerCompleted";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import useFetch from "../../../api/useFetch";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/userSlice";

export default function FormCompletedView() {

    const { questionnaireId } = useParams();
    const [baseForm, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState([]);
    const { fetchWithError } = useFetch()
    const currUserId = useSelector(selectUserId);

    const history = useHistory()

    const handleBack = () => {
        history.goBack();
    }

    const handleFinished = () => {
        (async () => {
            setLoading(true);
            history.goBack(); 
            setLoading(false);
        })();
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const endpoint = `questionnaire/get/${questionnaireId}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const form = await fetchWithError(endpoint, options);
            setForm(form[0]);
            setTitle(form[0].title);
            setQuestions(form[0].form_body.questions);
            setLevel(form[0].curr_level.split(' '));
            setLoading(false);
        })();
    }, [questionnaireId])

    const renderLevelViewer = () => {
        return (
            <>
            <Box sx={{ display: 'flex', p:2 }} justifyContent="center">
                <Typography sx={{mr: 1}}>Created by {baseForm.name} on {baseForm.created_date ? baseForm.created_date.slice(0, 10) : ''} </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb:5, p:2 }} justifyContent="center">
                <Typography sx={{mr: 1}}>Visible to: </Typography>
                {
                    level.map((l, i) => (
                        <Typography key={`level-text-${i}`} sx={{mr: 1}}>{l}</Typography>
                    ))
                }
            </Box>
            </>
        )
    }

    const renderView = (question) => {
        if ([3, 4].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerCompleted(question);
            return (
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                        {Object.keys(question.value).map((choice, i) => {
                            return (
                                <FormControlLabel
                                    control={<qTypeProperty.view name={choice} checked={question.value[choice]} />}
                                    label={choice}
                                />
                            )
                        }
                        )}
                    </FormGroup>
                </FormControl>
            )
        } else if ([5].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerCompleted(question);
            return (
                <qTypeProperty.view {...qTypeProperty.viewProps}>
                    {question.options.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </qTypeProperty.view>
            )
        }
         else if ([7, 8].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerCompleted(question);
            let newRows = [];
            question.value.forEach((row, i) => {
                let newRow = {
                    id: i,
                    name: question.rows[i]
                }
                question.options.forEach((column) => newRow[column] = row[column]);
                newRows.push(newRow);
            })
            question.value = newRows; 
            return ( 
                <FormGridOptionView
                    qTypeProperty={qTypeProperty}
                    choices={question.options}
                    rows={question.value}
                />
            )
        } else if ([9, 10].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerCompleted(question);
            return <LocalizationProvider dateAdapter={AdapterDateFns}>
             <qTypeProperty.view {...qTypeProperty.viewProps} /> 
            </LocalizationProvider>
        }  
        else {
            const qTypeProperty = QuestionTypeAnswerCompleted(question);
            if (!qTypeProperty.view) return '';
            return <qTypeProperty.view {...qTypeProperty.viewProps} /> || '';
        }
    }

    const createQuestionUI = (question, i) => {
        return (
            <Grid sx={{mb: 8, pointerEvents: 'none'}} key={`grid-q-${i}`}>
                <Box sx={{ display: 'flex', border: '1px solid black', p:5 }}>
                    <Grid container direction="column">
                        {question.required &&
                            <Grid item justifyContent={"flex-end"}>
                                <Typography sx={{color: 'red'}} align='right'>* Required</Typography>
                            </Grid>
                        }
                        <Grid item>
                            <Typography sx={{textAlign: 'left'}}>{question.question}</Typography>
                        </Grid>
                        <Divider sx={{my: 1.5}}/>
                        <Grid item>
                            <Box display="flex" justifyContent="flex-start">
                                {renderView(question)}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        );
    }

    if (loading) {
        return (
            <div>Loading!</div>
        )
    }

    return (
        <Card
            display="flex"
            direction="column"
            sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
        >
            <Grid container justifyContent="flex-start">
                <Grid item>
                    <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon/>}
                    onClick={handleBack}
                    >
                    BACK
                </Button>
                </Grid>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <FormControl sx={{mb: 5, m: 3}}>
                        <Typography sx = {{fontSize: 40, textAlign: 'center'}}>
                            {title}
                        </Typography>
                    </FormControl>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>

            {renderLevelViewer()}

            {questions.map((question, i) => {
                return createQuestionUI(question, i)
                })}

            {/*Temporary footer space*/}
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{mb: 5}} />
            <Button
            sx={{mb: 5}}
            variant="outlined"
            onClick={handleFinished}
            >
                Finish
            </Button>

        </Card>
    )
}