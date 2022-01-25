import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormQuestion from "./FormQuestion";
import Grid from "@mui/material/Grid";
import NotesIcon from "@mui/icons-material/Notes";
import { TextField } from "@mui/material";
import {useState} from "react";
import VisibilityCheckBox from "./VisibilityCheckBox";
import {Prompt} from "react-router-dom";

export default function FormBuilder(props) {
    /**
     * Expected Props
     * title
     * level
     * question
     * saveDraft
     */

    const [title, setTitle] = useState(props.title);
    const [level, setLevel] = useState(props.level);
    const [questions, setQuestions] = useState(props.questions);
    const [blockNav, setBlockNav] = useState(false);

    const updateLevel = (name, checked) => {
        let l = {...level}
        l[name] = checked;
        setLevel(l);
        setBlockNav(true);
    };

    const updateTitle = (e) => {
        setTitle(e.target.value);
        setBlockNav(true);
    }

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                type: 1,
                question: '',
                required: false,
                options: [],
            }
        ])
        setBlockNav(true);
    }

    const updateQuestion = (q, i) => {
        let new_q = [...questions]
        new_q[i] = q
        setQuestions(new_q)
        setBlockNav(true);
    }

    const removeQuestion = (i) => {
        let new_q = [...questions];
        new_q.splice(i, 1);
        setQuestions(new_q)
        setBlockNav(true);
    }

    const createQuestionUI = (question, i) => {
        return (
            <FormQuestion
                key={`question-${i}`}
                id={i}
                question={question}
                updateQuestion={updateQuestion}
                removeQuestion={removeQuestion}
            />
        );
    }

    const save = () => {
        props.saveDraft({
            // TODO: admin_id
            admin_id: 1,
            title: title,
            form_body: {
                questions: questions
            },
            curr_level: level,
        })
        setBlockNav(false);
    }

    return (
        <>
            <Prompt when={blockNav} message="You have unsaved changes, are you sure you want to leave?"/>
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
                            <TextField
                                hiddenLabel
                                variant="standard"
                                inputProps={{style: {fontSize: 40, textAlign: 'center'}}}
                                name="title"
                                value={title}
                                onChange={updateTitle}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <VisibilityCheckBox level={level} updateLevel={updateLevel} />
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end" sx={{mb: 2}}>
                    <Grid item>
                        <Button variant="outlined" onClick={save}>
                            SAVE
                        </Button>
                    </Grid>
                </Grid>

                {questions.map((question, i) => (createQuestionUI(question, i)))}

                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{mb: 12}}>
                    <Grid item>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={addQuestion}>
                            ADD QUESTION
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<NotesIcon />}>
                            TEXT DIVIDER
                        </Button>
                    </Grid>
                </Grid>

            </Card>
        </>
    )
}
