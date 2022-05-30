import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";

export default function FormBackButton() {

    const history = useHistory()

    const handleClick = () => {
        history.goBack()
    }

    return (
        <Button
            variant="outlined"
            startIcon={<ArrowBackIcon/>}
            onClick={handleClick}
        >
            BACK
        </Button>
    )
}