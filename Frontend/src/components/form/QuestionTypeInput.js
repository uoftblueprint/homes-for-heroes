import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import QuestionType from "./QuestionType";
import Select from "@mui/material/Select";

export default function QuestionTypeInput(props) {

    const questionTypes = QuestionType(0);

    const handleChange = (event) => {
        props.setQType(event.target.value);
    };

    const renderSelectOption = (type, i) => {
        return [
            <MenuItem value={type.qType} key={`menu-${i}`}>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <type.icon/>
                    </Grid>
                    <Grid item>
                        {type.name}
                    </Grid>
                </Grid>
            </MenuItem>,
            renderDivider(type, i)
        ]
    }

    const renderDivider = (type, i) => {
        if (type.divider === true) {
            return <Divider key={`divider-${i}`} sx={{my: 1.5}}/>
        }
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <Select
                id="form-type-select"
                value={props.qType}
                onChange={handleChange}
            >
                {questionTypes.map((type, i) => (
                    renderSelectOption(type, i)
                ))}
            </Select>
        </FormControl>
    )
}