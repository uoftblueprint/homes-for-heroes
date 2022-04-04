import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {Checkbox, InputAdornment, Radio, TextField, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EventIcon from "@mui/icons-material/Event";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import NotesIcon from "@mui/icons-material/Notes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import UploadIcon from '@mui/icons-material/Upload';

const QuestionType = function (qType) {
    const types = [
        {
            qType: 1,
            name: "Short Answer",
            icon: ShortTextIcon,
            divider: false,
            options: null,
            view: <TextField disabled label="Short-answer text" variant="standard" />
        },
        {
            qType: 2,
            name: "Paragraph",
            icon: NotesIcon,
            divider: true,
            options: null,
            view: <TextField disabled label="Long-answer text" variant="standard" />
        },
        {
            qType: 3,
            name: "Multiple Choice",
            icon: RadioButtonCheckedIcon,
            divider: false,
            options: <Radio/>
        },
        {
            qType: 4,
            name: "Checkboxes",
            icon: CheckBoxIcon,
            divider: false,
            options: <Checkbox/>,
        },
        {
            qType: 5,
            name: "Dropdown",
            icon: ArrowDropDownCircleIcon,
            divider: true,
            options: <Typography sx={{mr: 1}}>#.</Typography>,
        },
        {
            qType: 6,
            name: "File Upload",
            icon: CloudUploadIcon,
            divider: true,
            options: null,
            view: <Button disabled variant="outlined" startIcon={<UploadIcon/>}>Add File</Button>,
        },
        {
            qType: 7,
            name: "Linear Scale",
            icon: LinearScaleIcon,
            divider: false,
            options: null,
        },
        {
            qType: 8,
            name: "Multiple Choice Grid",
            icon: AppsIcon,
            divider: false,
            options: null,
        },
        {
            qType: 9,
            name: "Checkbox Grid",
            icon: CheckBoxIcon,
            divider: true,
            options: null,
        },
        {
            qType: 10,
            name: "Date",
            icon: EventIcon,
            divider: false,
            options: null,
            view: <TextField
                variant="standard"
                label="Day, Month, Year"
                InputProps={{
                    endAdornment:<InputAdornment position="end">
                        <EventIcon/>
                    </InputAdornment>
                }}
            />,
        },
        {
            qType: 11,
            name: "Time",
            icon: AccessTimeIcon,
            divider: false,
            options: null,
            view: <TextField
                variant="standard"
                label="Time"
                InputProps={{
                    endAdornment:<InputAdornment position="end">
                        <AccessTimeIcon/>
                    </InputAdornment>
                }}
            />,
        },
    ]

    if (qType === 0) {
        return types;
    }

    return types[types.map(function (item) {
                return item.qType;
            }).indexOf(qType)];
}

export default QuestionType;