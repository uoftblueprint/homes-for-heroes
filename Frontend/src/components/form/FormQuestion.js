import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import {
    FormControlLabel,
    FormGroup,
    OutlinedInput,
    Switch, Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/Button";
import OptionAdder from "./OptionAdder";
import QuestionType from "./QuestionType";
import QuestionTypeInput from "./QuestionTypeInput";

export default function FormQuestion(props) {
    /**
     * EXPECTED PROPS
     * id: question index
     * question
     * updateQuestion
     * disabled
     */

    let question = props.question;
    const qTypeProperty = QuestionType(props.question.type);

    const handleQTypeChange = (qType) => {
        question.type = qType;
        props.updateQuestion(question, props.id);
    }

    const handleChangeQuestion = (e) => {
        question.question = e.target.value;
        props.updateQuestion(question, props.id);
    }

    const handleChangeOptions = (options) => {
        question.options = options;
        props.updateQuestion(question, props.id);
    }

    const handleChangeRequired = (e) => {
        question.required = e.target.checked;
        props.updateQuestion(question, props.id);
    }

    const renderQuestionOption = () => {
        if (qTypeProperty === undefined) return;
        if (qTypeProperty.options !== null) {
                return <OptionAdder
                    choices={question.options}
                    updateOptions={handleChangeOptions}
                    control={qTypeProperty.options}
                />
        } else {
            return qTypeProperty.view || '';
        }
    }

    return (
        <Grid sx={{mb: 8}}>
            <Box sx={{ display: 'flex', border: '1px solid black' }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography sx={{mx: 2, fontSize: 25}}>Question Type: </Typography>
                    </Grid>
                    <Grid item>
                        <QuestionTypeInput qType={question.type} setQType={handleQTypeChange}/>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', border: '1px solid black', p:5 }}>
                <FormGroup>
                    <FormControl sx={{mb: 1}}>
                        <OutlinedInput
                            placeholder="Question"
                            value={question.question}
                            name="question"
                            onChange={handleChangeQuestion}
                        />
                    </FormControl>
                    {renderQuestionOption()}
                </FormGroup>
            </Box>
            <Box sx={{ display: 'flex', border: '1px solid black', p:1 }}>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <IconButton aria-label="remove" onClick={() => props.removeQuestion(props.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <FormControlLabel
                            checked={question.required}
                            onChange={handleChangeRequired}
                            value="required"
                            control={<Switch color="primary" />}
                            label="REQUIRED"
                            labelPlacement="start"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}