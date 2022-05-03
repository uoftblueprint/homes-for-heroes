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
            validationMethod: (e) => {return validator.isEmpty()},
            field: "name",
            headerName: "NAME",
            flex: 1,
          },
          {
            editable: "true",
            validationMethod: (e) => {return validator.isEmpty()},
            field: "village",
            headerName: "VILLAGE",
            flex: 1,
          },
          {
            editable: "true",
            validationMethod: (e) => {return validator.isEmpty()},
            field: "date_joined",
            headerName: "DATE JOINED",
            flex: 1,
          },
          {
            editable: "true",
            validationMethod: (e) => {return validator.isAlpha()},
            field: "role",
            headerName: "ROLE",
            flex: 1,
          },
          {
            editable: "true",
            validationMethod: (e) => {return !validator.isMobilePhone()},
            field: "phone",
            headerName: "PHONE",
            flex: 1,
          }, 
          {
            editable: "true",
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