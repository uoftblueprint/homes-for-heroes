import Card from "@mui/material/Card";
import * as React from "react";
import {useParams} from "react-router-dom";

function FormEditor() {

    let { formId } = useParams();

    return (
        <Card
            display="flex"
            direction="column"
            sx={{ mt: '15px', boxShadow: 'None', minHeight: 1000, minWidth: 375, width: "100%", maxWidth: 1200 }}
        >
            Form Editor! {formId}

        </Card>

    )
}

export default FormEditor;