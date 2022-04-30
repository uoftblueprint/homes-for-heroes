import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function FormSubmitButton() {
    const history = useHistory()

    const handleClick = () => {
        history.push("/")
    }

    return (
        <Button
            variant="outlined"
            startIcon={<ArrowUpwardIcon/>}
            onClick={handleClick}
        >
            Submit
        </Button>
    )
}