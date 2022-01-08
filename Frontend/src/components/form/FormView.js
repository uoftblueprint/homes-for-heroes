import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";

function FormView() {

    const { formId } = useParams();

    return (
        <Card
            display="flex"
            direction="column"
            sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
        >
            Form Viewer!! {formId}
        </Card>
    )
}

export default FormView;