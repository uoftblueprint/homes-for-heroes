import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, Input} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function OptionAdder(props) {

    /**
     * EXPECTED PROPS
     *  - choices
     *  - updateOptions: function to update parent options state
     *  - control: MUI component to be rendered in each FormControlLabel
     */

    let choices = props.choices;

    const handleChangeChoice = (e, i) => {
        choices[i] = e.target.value
        props.updateOptions(choices);
    }

    const addChoice = () => {
        props.updateOptions([...choices, 'Option']);
    }

    const removeChoice = (i) => {
        choices.splice(i, 1);
        props.updateOptions(choices);
    }

    const createChoiceUI = (val, i) => {
        return (
            <Grid container key={`grid-${i}`} direction="row" alignItems="left" sx={{mb: 1}}>
                <Grid item key={`grid-choice-${i}`}>
                    <FormControlLabel
                        key={`choice-${i}`}
                        disabled
                        control={props.control}
                        label={
                            <FormControl>
                                <Input
                                    value={val}
                                    autoFocus={true}
                                    placeholder="Enter Option"
                                    required
                                    onChange={(e) => handleChangeChoice(e, i)}
                                />
                            </FormControl>
                        }
                    />
                </Grid>
                <Grid item key={`grid-remove-${i}`}>
                    <Button variant="text" value="remove" key={`remove-${i}`}
                            onClick={() => removeChoice(i)}
                    >
                        Remove
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <FormControl sx={{ m: 1}}>
            {choices.map((val, i) => (createChoiceUI(val, i)))}
            <Grid container key={`grid-add`} direction="row" alignItems="left">
                <Grid item key={`grid-choice-add`}>
                    <FormControlLabel
                        value=""
                        disabled
                        control={props.control}
                        onClick={addChoice}
                        label={
                            <FormControl>
                                <Input
                                    placeholder="Add Option"
                                    required
                                    disabled
                                />
                            </FormControl>
                        }
                    />
                </Grid>
            </Grid>
        </FormControl>
    )
}