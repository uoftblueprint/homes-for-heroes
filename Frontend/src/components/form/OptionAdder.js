import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { FormControlLabel, Input, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import validator from 'validator';

function OptionAdder({ choices, updateOptions, control, error }) {
  /**
   * EXPECTED PROPS
   *  - choices
   *  - updateOptions: function to update parent options state
   *  - control: MUI component to be rendered in each FormControlLabel
   */

  const [errors, setErrors] = useState(error);

  const handleChangeChoice = (e, i) => {
    let c = [...choices];
    c[i] = e.target.value;
    let err = [...errors];
    err[i] = validateChoice(e.target.value);
    setErrors(err);
    updateOptions(c);
  };

  const addChoice = () => {
    updateOptions([...choices, `Option${choices.length + 1}`]);
    setErrors([...errors, '']);
  };

  const removeChoice = (i) => {
    let c = [...choices];
    c.splice(i, 1);
    updateOptions(c);
    let e = [...errors];
    e.splice(i, 1);
    setErrors(e);
  };

  const validateChoice = (choice) => {
    if (validator.isEmpty(choice)) {
      return 'Empty choice is not allowed';
    }
    for (const c of choices) {
      if (validator.equals(choice, c)) {
        return 'Duplicate choice is not allowed';
      }
    }
    return '';
  };

  const createChoiceUI = (val, i) => {
    return (
      <Grid
        container
        key={`grid-${i}`}
        direction="row"
        alignItems="left"
        sx={{ mb: 1 }}
      >
        <Grid item key={`grid-choice-${i}`}>
          <FormControlLabel
            key={`choice-${i}`}
            disabled
            control={control}
            label={
              <FormControl>
                <TextField
                  value={val}
                  autoFocus={true}
                  placeholder="Enter Option"
                  error={!validator.isEmpty(errors[i])}
                  helperText={errors[i]}
                  required
                  onChange={(e) => handleChangeChoice(e, i)}
                />
              </FormControl>
            }
          />
        </Grid>
        <Grid item key={`grid-remove-${i}`}>
          <Button
            variant="text"
            value="remove"
            key={`remove-${i}`}
            onClick={() => removeChoice(i)}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <FormControl sx={{ m: 1 }}>
      {choices.map((val, i) => createChoiceUI(val, i))}
      <Grid container key={`grid-add`} direction="row" alignItems="left">
        <Grid item key={`grid-choice-add`}>
          <FormControlLabel
            value=""
            disabled
            control={control}
            onClick={addChoice}
            label={
              <FormControl>
                <Input placeholder="Add Option" required disabled />
              </FormControl>
            }
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default OptionAdder;
