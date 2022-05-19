import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {Slider, Checkbox, InputAdornment, Radio, TextField, Typography} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import NotesIcon from "@mui/icons-material/Notes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";

const QuestionType = function (qType) {
    const types = [
        {
            qType: 1,
            name: "Short Answer",
            icon: ShortTextIcon,
            divider: false,
            options: null,
            view: TextField,
            viewProps: {
                disabled: true,
                label: "Short-answer text",
                variant: "standard",
            }
        },
        {
            qType: 2,
            name: "Paragraph",
            icon: NotesIcon,
            divider: true,
            options: null,
            view: TextField,
            viewProps: {
                disabled: true,
                label: "Long-answer text",
                variant: "standard",
            }
        },
        {
            qType: 3,
            name: "Multiple Choice",
            icon: RadioButtonCheckedIcon,
            divider: false,
            options: <Radio/>,
            view: Radio
        },
        {
            qType: 4,
            name: "Checkboxes",
            icon: CheckBoxIcon,
            divider: false,
            options: <Checkbox/>,
            view: Checkbox
        },
        {
            qType: 5,
            name: "Dropdown",
            icon: ArrowDropDownCircleIcon,
            divider: true,
            options: <Typography sx={{mr: 1}}>#</Typography>,
            view: Typography
        },
        {
            qType: 6,
            name: "Linear Scale",
            icon: LinearScaleIcon,
            divider: false,
            options: null,
            view: Slider,
            viewProps:{
                disabled: true
            }
        },
        {
            qType: 7,
            name: "Multiple Choice Grid",
            icon: AppsIcon,
            divider: false,
            row_control: <Typography sx={{mr: 1}}>#</Typography>,
            options: <Radio/>,
            view: Radio,
            viewProps: {
                disabled: true
            }
        },
        {
            qType: 8,
            name: "Checkbox Grid",
            icon: CheckBoxIcon,
            divider: true,
            row_control: <Typography sx={{mr: 1}}>#</Typography>,
            options: <Checkbox/>,
            view: Checkbox,
            viewProps: {
                disabled: true
            }
        },
        {
            qType: 9,
            name: "Date",
            icon: EventIcon,
            divider: false,
            options: null,
            view: TextField,
            viewProps: {
                variant: "standard",
                label: "YYYY-MM-DD",
                InputProps: {
                    endAdornment: <InputAdornment position="end">
                        <EventIcon/>
                    </InputAdornment>
                }
            }
        },
        {
            qType: 10,
            name: "Time",
            icon: AccessTimeIcon,
            divider: false,
            options: null,
            view: TextField,
            viewProps: {
                variant: "standard",
                label: "YYYY-MM-DD HH:mm",
                InputProps: {
                    endAdornment: <InputAdornment position="end">
                        <AccessTimeIcon/>
                    </InputAdornment>
                }
            },
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