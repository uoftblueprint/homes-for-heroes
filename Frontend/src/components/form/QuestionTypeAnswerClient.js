import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {Checkbox, InputAdornment, Radio, TextField, Typography, Select} from "@mui/material";
import Slider from '@mui/material/Slider';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EventIcon from "@mui/icons-material/Event";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import NotesIcon from "@mui/icons-material/Notes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";

const QuestionTypeAnswerClient = function (question) {
    let inputValue;
    const types = [
        {
            qType: 1,
            name: "Short Answer",
            icon: ShortTextIcon,
            divider: false,
            options: null,
            view: TextField,
            viewProps: {
                disabled: false,
                label: "Short-answer text",
                variant: "standard",
                value: inputValue,
                onChange: (e) => {inputValue = e.target.value},
                onBlur: (e) => {question.value = inputValue}
            }
        },
        {
            qType: 2,
            name: "Paragraph",
            icon: NotesIcon,
            divider: true,
            options: null,
            view: TextareaAutosize,
            viewProps: {
                disabled: false,
                label: "Long-answer text",
                variant: "standard",
                minRows: 3,
                placeholder: 'Long answer...',
                value: inputValue,
                onChange: (e) => {inputValue = e.target.value},
                onBlur: (e) => {question.value = inputValue}
            }
        },
        {
            qType: 3,
            name: "Multiple Choice",
            icon: RadioButtonCheckedIcon,
            divider: false,
            options: <Radio/>,
            view: Radio,
            viewProps: {

            }
        },
        {
            qType: 4,
            name: "Checkboxes",
            icon: CheckBoxIcon,
            divider: false,
            options: <Checkbox/>,
            view: Checkbox,
        },
        {
            qType: 5,
            name: "Dropdown",
            icon: ArrowDropDownCircleIcon,
            divider: true,
            options: null, 
            view: Select,
            viewProps: {
                value: inputValue,
                onChange: (e) => { inputValue = e.target.value },
                onBlur: (e) => { question.value = inputValue }
            }
        },
        {
            qType: 6,
            name: "Linear Scale",
            icon: LinearScaleIcon,
            divider: false,
            options: null,
            view: Slider,
            viewProps: {
                value: inputValue,
                onChange: (e) => inputValue = e.target.value,
                onBlur: (e) => question.value = inputValue
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
                disabled: false
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
                disabled: false
            }
        },
        {
            qType: 9,
            name: "Date",
            icon: EventIcon,
            divider: false,
            options: null,  
            view: DesktopDatePicker,
            viewProps: {
                inputFormat:'yyyy-MM-dd',
                mask:"____-__-__",
                value: question.value ? question.value : null,
                onChange: (v) => {question.value=v.toISOString().slice(0,10);},
                onBlur: () => {question.value = inputValue},
                renderInput: (params) => {params.inputProps.value = question.value ? question.value : 'yyyy-mm-dd'; return <TextField {...params} />}
            }
        },
        {
            qType: 10,
            name: "Time",
            icon: AccessTimeIcon,
            divider: false,
            options: null,
            view: DateTimePicker,
            viewProps: { 
                value: question.value ? question.value : null,
                onChange: (v) => {question.value=v.toISOString().split('T')[0] + ' ' + v.toISOString().split('T')[1].slice(0, 5)},
                onBlur: () => {question.value = inputValue},
                renderInput: (params) => {params.inputProps.value = question.value ? question.value : 'yyyy-mm-dd hh:mm'; return <TextField {...params} />}
            },
        },
    ]

    if (question.type === 0) {
        return types;
    }

    return types[types.map(function (item) {
                return item.qType;
            }).indexOf(question.type)];
}

export default QuestionTypeAnswerClient;