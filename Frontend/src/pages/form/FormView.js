import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchFormByIdAPI} from "../../api/formAPI";
import * as React from "react";
import Box from "@mui/material/Box";
import {FormControlLabel, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import QuestionType from "../../components/form/QuestionType";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";

function FormView() {

    const { formId } = useParams();

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState({});

    useEffect(() => {
        (async () => {
            setLoading(true);
            const form = await fetchFormByIdAPI(formId);
            setTitle(form[0].title);
            setQuestions(form[0].form_body.questions);
            setLevel(JSON.parse(form[0].curr_level));
            setLoading(false);
        })();
    }, [formId])

    const renderLevelViewer = () => {
        return (
            <Box sx={{ display: 'flex', mb:5, p:2 }} justifyContent="center">
                <Typography sx={{mr: 1}}>Visible to: </Typography>
                {
                    Object.keys(level)
                        .filter(l => level[l] === true)
                        .map((l, i) => (
                            <Typography key={`level-text-${i}`} sx={{mr: 1}}>{l}</Typography>
                        ))
                }
            </Box>
        )
    }

    const renderOptionViewer = (choice, control, i) => {
        return (
            <Grid container key={`grid-${i}`} direction="row" alignItems="left">
                <Grid item key={`grid-choice-${i}`}>
                    <FormControlLabel
                        key={`choice-${i}`}
                        disabled
                        control={control}
                        label={<Typography>{choice}</Typography>}
                    />
                </Grid>
            </Grid>
        )
    }

    const renderQuestionOption = (question) => {
        const qTypeProperty = QuestionType(question.type);
        if (qTypeProperty !== undefined && qTypeProperty.options !== null) {
            return (
                <Grid container direction="column">
                    {question.options.map((choice, i) => (
                        renderOptionViewer(choice, qTypeProperty.options, i)
                        )
                    )}
                </Grid>
            )
        } else {
            return qTypeProperty.view || '';
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
                                {renderQuestionOption(question)}
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
                    <Button variant="outlined" startIcon={<ArrowBackIcon/>}>BACK</Button>
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

            {questions.map((question, i) => (createQuestionUI(question, i)))}

            {/*Temporary footer space*/}
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{mb: 12}} />

        </Card>
    )
}

export default FormView;