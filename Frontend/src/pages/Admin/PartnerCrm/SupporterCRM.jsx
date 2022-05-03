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
            validationMethod: (e) => {return validator.isEmpty()},
            field: "name",
            headerName: "NAME",
            flex: 1,
          },
          {
            editable: "true",
            validationMethod: (e) => {return validator.isEmpty()},
            field: "date_gifted",
            headerName: "DATE GIFTED",
            flex: 1, 
          },
          {
            editable: "true",
            validationMethod: (e) => {return validator.isEmpty()},
            field: "gift_provided",
            headerName: "GIFT PROVIDED",
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
    <AddSupporterModal dialog={dialog} toggleDialog={setDialog} />
    </>
  );
}  