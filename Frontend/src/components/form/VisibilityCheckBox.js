import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

export default function VisibilityCheckBox(props) {
    let level = props.level

    const handleChange = (event) => {
        props.updateLevel(event.target.name, event.target.checked)
    };

    const { l1, l2, l3, l4 } = level;
    const error = [l1, l2, l3, l4].filter((v) => v).length === 0;

    return (
        <Grid container direction="row" justifyContent="center" sx={{mb:5}}>
            <Box sx={{ display: 'flex', border: '1px solid black' }}>
                <FormControl required error={error} sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel>Visible to</FormLabel>
                    <FormGroup>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={level.l1} onChange={handleChange} name="l1" />
                                }
                                label="Level 1"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={level.l2} onChange={handleChange} name="l2" />
                                }
                                label="Level 2"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={level.l3} onChange={handleChange} name="l3" />
                                }
                                label="Level 3"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={level.l4} onChange={handleChange} name="l4" />
                                }
                                label="Level 4"
                            />
                        </Grid>
                    </FormGroup>
                </FormControl>
            </Box>
        </Grid>
    );
}