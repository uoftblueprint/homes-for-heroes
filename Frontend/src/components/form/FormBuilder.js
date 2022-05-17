import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormQuestion from './FormQuestion';
import Grid from '@mui/material/Grid';
import NotesIcon from '@mui/icons-material/Notes';
import { FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';
import VisibilityCheckBox from './VisibilityCheckBox';
import { Prompt } from 'react-router-dom';
import FormBackButton from './FormBackButton';
import { errorToObj, isEmpty } from '../../utils';
import { selectUser } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

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

  const formErrors = errorToObj(props.err);
  const adminId = useSelector(selectUser).user_id;

  const updateLevel = (name, checked) => {
    let l = { ...level };
    l[name] = checked;
    setLevel(l);
    setBlockNav(true);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
    setBlockNav(true);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 1,
        question: '',
        required: false,
        options: [],
        rows: [],
      },
    ]);
    setBlockNav(true);
  };

  const updateQuestion = (q, i) => {
    let new_q = [...questions];
    new_q[i] = q;
    setQuestions(new_q);
    setBlockNav(true);
  };

  const removeQuestion = (i) => {
    let new_q = [...questions];
    new_q.splice(i, 1);
    setQuestions(new_q);
    setBlockNav(true);
  };

  const createQuestionUI = (question, i) => {
    return (
      <FormQuestion
        key={`question-${i}`}
        id={i}
        question={question}
        updateQuestion={updateQuestion}
        removeQuestion={removeQuestion}
        error={
          formErrors.form_body !== undefined &&
          formErrors.form_body.questions.constructor === Array &&
          i < formErrors.form_body.questions.length
            ? formErrors.form_body.questions[i]
            : {}
        }
      />
    );
  };

  const save = () => {
    props.saveDraft({
      admin_id: adminId,
      title: title,
      form_body: {
        questions: questions,
      },
      curr_level: Object.keys(level).filter((lv) => level[lv] === true),
    });
    setBlockNav(false);
  };

  return (
    <>
      <Prompt
        when={blockNav}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Card
        display="flex"
        direction="column"
        sx={{
          mt: '15px',
          boxShadow: 'None',
          minHeight: 1000,
          minWidth: 375,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Grid container justifyContent="flex-start">
          <Grid item>
            <FormBackButton />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <FormControl sx={{ mb: 5, m: 3 }}>
              <TextField
                hiddenLabel
                variant="standard"
                inputProps={{ style: { fontSize: 40, textAlign: 'center' } }}
                name="title"
                value={title}
                error={isEmpty(title) || isEmpty(formErrors.title)}
                helperText={
                  isEmpty(title)
                    ? 'form title cannot be empty'
                    : formErrors.title
                }
                onChange={updateTitle}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <VisibilityCheckBox level={level} updateLevel={updateLevel} />
          </Grid>
          <Grid>
            <FormHelperText error={questions.length === 0}>
              {questions.length === 0 ? 'Form needs at least one question' : ''}
            </FormHelperText>
          </Grid>
        </Grid>

        <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
          <Grid item>
            <Button variant="outlined" onClick={save}>
              SAVE
            </Button>
          </Grid>
        </Grid>

        {questions.map((question, i) => createQuestionUI(question, i))}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mb: 12 }}
        >
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addQuestion}
            >
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
  );
}
