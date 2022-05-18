import * as React from "react";

import BaseCRM from "../../../components/BaseCRM";
import AddVolunteerModal from "./AddVolunteerModal.jsx";

import validator from "validator";

export default function VolunteerCRM() {
  const [dialog, setDialog] = React.useState(false);

  const props = {
    dialog: dialog,
    setDialog: setDialog,
    deDialogEndpoint: `volunteers/delete`,
    demoName: 'Volunteer',
    csvEndpoint: "volunteers/getCSV?",
    defaultSearchCategory: "name",
    updateUserEndpoint: "volunteers/updateInfo",
    loadRowsEndpoint: `volunteers/getData?`,
    rowIdName: 'volunteer_id',
    nameInRows: 'name',
    columns: [{
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return validator.isEmpty(e)},
            field: "name",
            headerName: "NAME",
            flex: 1,
          },
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return validator.isEmpty(e)},
            field: "village",
            headerName: "VILLAGE",
            flex: 1,
          },
          {
            editable: "true",
            sanitize: (e) => {return e.toISOString().split('T')[0]},
            validationMethod: (e) => {return !validator.isDate(e)},
            field: "date_joined",
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value), 
            headerName: "DATE JOINED",
            flex: 1,
          },
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return validator.isAlpha(e)},
            field: "role",
            headerName: "ROLE",
            flex: 1,
          },
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return !validator.isMobilePhone(e)},
            field: "phone",
            headerName: "PHONE",
            flex: 1,
          }, 
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return !validator.isEmail(e)},
            field: "email",
            headerName: "EMAIL",
            flex: 1.5
          } 
        ]
}
  return (
    <>
    <BaseCRM {...props} />
    <AddVolunteerModal dialog={dialog} toggleDialog={setDialog} />
    </>
  );
}  