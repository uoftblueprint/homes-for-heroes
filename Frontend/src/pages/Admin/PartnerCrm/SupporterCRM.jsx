import * as React from "react";

import BaseCRM from "../../../components/BaseCRM";
import AddSupporterModal from "./AddSupporterModal.jsx";

import validator from "validator";

export default function SupporterCRM() {
  const [dialog, setDialog] = React.useState(false);

  const props = {
    dialog: dialog,
    setDialog: setDialog,
    deDialogEndpoint: `supporters/delete`,
    demoName: 'Supporter',
    csvEndpoint: "supporters/getCSV?",
    defaultSearchCategory: "name",
    updateUserEndpoint: "supporters/updateInfo",
    loadRowsEndpoint: `supporters/getData?`,
    rowIdName: 'supporter_id',
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
            sanitize: (e) => {return e.toISOString().split('T')[0]},
            validationMethod: (e) => {return !validator.isDate(e)},
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value), 
            field: "date_gifted",
            headerName: "DATE GIFTED",
            flex: 1, 
          },
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return validator.isEmpty(e)},
            field: "gift_provided",
            headerName: "GIFT PROVIDED",
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
    <AddSupporterModal dialog={dialog} toggleDialog={setDialog} />
    </>
  );
}  