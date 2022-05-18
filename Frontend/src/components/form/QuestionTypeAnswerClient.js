import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {Checkbox, InputAdornment, Radio, TextField, Typography, Select} from "@mui/material";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
            view: TextField,
            viewProps: {
                disabled: false,
                label: "Long-answer text",
                variant: "standard",
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
                value: inputValue,
                onChange: (v) => {inputValue = v.toISOString(); console.log(inputValue)},
                onBlur: () => {question.value = inputValue},
                renderInput: (params) => <TextField {...params} />
            }
        },
        {
            qType: 10,
            name: "Time",
            icon: AccessTimeIcon,
            divider: false,
            options: <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
              label="Dated"
              value={inputValue}
              onChange={(v) => {inputValue = v}}
              onBlur={question.value = inputValue}
              renderInput={(params) => <TextField 
                {...params} />}
              />
            </LocalizationProvider>,
            view: null,
            viewProps: { 
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