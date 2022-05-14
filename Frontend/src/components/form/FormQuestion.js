import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/Button';
import OptionAdder from './OptionAdder';
import QuestionType from './QuestionType';
import QuestionTypeInput from './QuestionTypeInput';
import { useState } from 'react';
import validator from 'validator';

function FormQuestion({
  id,
  question,
  updateQuestion,
  removeQuestion,
  qError,
}) {
  /**
   * EXPECTED PROPS
   * id: question index
   * question
   * updateQuestion
   * disabled
   */

  const qTypeProperty = QuestionType(question.type);
  const [questionError, setQuestionError] = useState(
    (validator.isEmpty(question.question)) || (qError && !validator.isEmpty(qError.question)),
  );

  const handleQTypeChange = (qType) => {
    question.type = qType;
    updateQuestion(question, id);
  };

  const handleChangeQuestion = (e) => {
    setQuestionError(validator.isEmpty(e.target.value));
    question.question = e.target.value;
    updateQuestion(question, id);
  };

  const handleChangeOptions = (options) => {
    question.options = options;
    updateQuestion(question, id);
  };

  const handleChangeRows = (options) => {
    question.rows = options;
    updateQuestion(question, id);
  };

  const handleChangeRequired = (e) => {
    question.required = e.target.checked;
    updateQuestion(question, id);
  };

  const renderQuestionOption = () => {
    if (qTypeProperty === undefined) return;
    if ([3, 4, 5].includes(qTypeProperty.qType)) {
      return (
        <OptionAdder
          choices={question.options}
          updateOptions={handleChangeOptions}
          control={qTypeProperty.options}
          error={(qError && qError.options)? qError.options : Array(question.options.length).fill('')}
        />
      );
    } else if ([7, 8].includes(qTypeProperty.qType)) {
      return (
        <Grid container direction="row" spacing={12}>
          <Grid item>
            <Grid container direction="column" alignItems={'flex-start'}>
              <Grid item>
                <Typography sx={{ mx: 2, fontSize: 18 }}>Rows</Typography>
              </Grid>
              <Grid item>
                <OptionAdder
                  choices={question.rows}
                  updateOptions={handleChangeRows}
                  control={qTypeProperty.row_control}
                  error={(qError && qError.rows)? qError.rows : Array(question.rows.length).fill('')}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems={'flex-start'}>
              <Grid item>
                <Typography sx={{ mx: 2, fontSize: 18 }}>Columns</Typography>
              </Grid>
              <Grid>
                <OptionAdder
                  choices={question.options}
                  updateOptions={handleChangeOptions}
                  control={qTypeProperty.options}
                  error={(qError && qError.options)? qError.options : Array(question.options.length).fill('')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      if (!qTypeProperty.view) return '';
      return <qTypeProperty.view {...qTypeProperty.viewProps} /> || '';
    }
  };

  return (
    <Grid sx={{ mb: 8 }}>
      <Box sx={{ display: 'flex', border: '1px solid black' }}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography sx={{ mx: 2, fontSize: 25 }}>
              Question Type:{' '}
            </Typography>
          </Grid>
          <Grid item>
            <QuestionTypeInput
              qType={question.type}
              setQType={handleQTypeChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', border: '1px solid black', p: 5 }}>
        <FormGroup>
          <FormControl sx={{ mb: 1 }}>
            <TextField
              placeholder="Question"
              value={question.question}
              error={questionError}
              helperText={questionError ? 'Question cannot be empty' : ''}
              name="question"
              onChange={handleChangeQuestion}
            />
          </FormControl>
          {renderQuestionOption()}
        </FormGroup>
      </Box>
      <Box sx={{ display: 'flex', border: '1px solid black', p: 1 }}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <IconButton
              aria-label="remove"
              onClick={() => {
                removeQuestion(id);
              }}
            >
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
  );
}

export default FormQuestion;
