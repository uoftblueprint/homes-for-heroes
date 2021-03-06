import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import {fetchFormByIdAPI} from "../../../api/formAPI";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {FormControl, FormGroup, FormControlLabel, MenuItem, Typography} from "@mui/material";
import FormGridOptionView from "../../../components/form/CustomFormGridOptions";
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import QuestionTypeAnswerClient from "../../../components/form/QuestionTypeAnswerClient";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import useFetch from "../../../api/useFetch";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/userSlice";

function FormComplete() {

    const { formId } = useParams();
    const [baseForm, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [requiredError, setRequiredError] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState([]);
    const { makeFormWithError } = useFetch()
    const currUserId = useSelector(selectUserId);

    const history = useHistory()

    const handleBack = () => {
        history.push("/")
    }

    const handleSubmit = () => {
        (async () => {
            const isClear = Object.keys(questions).every((key) => {
                const question = questions[key]
                if (!question.required){
                    return true
                }
                {
                    if ([3, 4].includes(question.type)) {
                        return (Object.keys(question.value).some((key) => (
                            question.value[key]
                        ))) 
                    } else if ([5].includes(question.type)) {
                        return (question.value !== null)
                    }
                    else if ([7, 8].includes(question.type)) {
                        return (question.value.some((row) => {
                            return (Object.keys(row).some((cell) => (
                                cell !== 'id' && cell !== 'name' && row[cell] 
                            )))
                        }))
                    } else if ([9, 10].includes(question.type)) {
                        return (question.value !== null)
                    }  
                    else {
                        return (question.value !== null && question.value !== '')
                    }
            }});
            if (isClear){
                setLoading(true);
                const endpoint = 'questionnaire/create';
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...baseForm,
                        created_date: baseForm.created_date.slice(0,10),
                        user_id: currUserId,
                        form_body: {
                            questions: questions
                        }
                    }),
                }
                try{
                await makeFormWithError(endpoint, options);
                history.push('/'); 
                }
                catch(e){
                    console.log(e);
                };
                setLoading(false);
            }
            {
                setRequiredError(true);
            }
        })();
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const form = await fetchFormByIdAPI(formId);
            setForm(form[0]);
            setTitle(form[0].title);
            setQuestions(form[0].form_body.questions.map((item) => {return {...item, value: null}}));
            setLevel(form[0].curr_level.split(' '));
            setLoading(false);
        })();
    }, [formId])

    const renderLevelViewer = () => {
        return (
            <Box sx={{ display: 'flex', mb:5, p:2 }} justifyContent="center">
                <Typography sx={{mr: 1}}>Visible to: </Typography>
                {
                    level.map((l, i) => (
                        <Typography key={`level-text-${i}`} sx={{mr: 1}}>{l}</Typography>
                    ))
                }
            </Box>
        )
    }

    const renderOptionViewer = (options, property) => {
        Object.keys(options).map((choice, i) =>{ 
        return (
                <FormControlLabel
                    control={<property.view name={choice} checked={options[choice]} onChange={(e) => options[choice] = e.target.checked} />}
                    label={choice}
                />
        )
        }
        )
    }

    const renderView = (question) => {
        if ([3, 4].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerClient(question);
            let newOptions = {}
            question.options.forEach((item) => { newOptions[item] = false });
            question.value = newOptions;
            return (
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                        {Object.keys(question.value).map((choice, i) => {
                            let checkValue;
                            return (
                                <FormControlLabel
                                    control={<qTypeProperty.view name={choice} checked={checkValue} onChange={(e) => {checkValue = e.target.checked; question.value[choice] = checkValue}} />}
                                    label={choice}
                                />
                            )
                        }
                        )}
                    </FormGroup>
                </FormControl>
            )
        } else if ([5].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerClient(question);
            return (
                <qTypeProperty.view {...qTypeProperty.viewProps}>
                    {question.options.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </qTypeProperty.view>
            )
        }
         else if ([7, 8].includes(question.type)) {
            const qTypeProperty = QuestionTypeAnswerClient(question);
            let newRows = [];
            question.rows.forEach((row, i) => {
                let newRow = {
                    id: i,
                    name: row
                }
                question.options.forEach((column) => newRow[column] = false);
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
            const qTypeProperty = QuestionTypeAnswerClient(question);
            return <LocalizationProvider dateAdapter={AdapterDateFns}>
             <qTypeProperty.view {...qTypeProperty.viewProps} /> 
            </LocalizationProvider>
        }  
        else {
            const qTypeProperty = QuestionTypeAnswerClient(question);
            if (!qTypeProperty.view) return '';
            return <qTypeProperty.view {...qTypeProperty.viewProps} /> || '';
        }
    }

    const createQuestionUI = (question, i) => {
        return (
            <Grid sx={{mb: 8}} key={`grid-q-${i}`}>
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
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{mb: 12}} >
            <Typography sx={{ color: 'red', mb: 2 }}>{requiredError ? 'Please fill all required questions!' : ''}</Typography>
            <Button
            variant="outlined"
            startIcon={<ArrowUpwardIcon/>}
            onClick={handleSubmit}
            >
                Submit
            </Button> 
            </Grid>

        </Card>
    )
}

export default FormComplete; 