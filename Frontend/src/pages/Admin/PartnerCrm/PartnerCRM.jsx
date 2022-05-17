import * as React from "react";

import BaseCRM from "../../../components/BaseCRM";
import AddPartnerModal from "./AddPartnerModal.jsx";

import validator from "validator";

export default function PartnerCRM() {
  const [dialog, setDialog] = React.useState(false);

  const props = {
    dialog: dialog,
    setDialog: setDialog,
    deDialogEndpoint: `partners/delete`,
    demoName: 'Partner',
    csvEndpoint: "partners/getCSV?",
    defaultSearchCategory: "org_name",
    updateUserEndpoint: "partners/updateInfo",
    loadRowsEndpoint: `partners/getData?`,
    rowIdName: 'partner_id',
    nameInRows: 'org_name',
    columns: [{
            editable: "true",
            validationMethod: (e) => {return validator.isEmpty(e)},
            sanitize: (e) => {return e},
            field: "org_name",
            headerName: "ORGANIZATION NAME",
            flex: 1.5,
          },
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return validator.isEmpty(e)},
            field: "city",
            headerName: "CITY",
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
            sanitize: (e) => {return e},
            validationMethod: (e) => {return validator.isEmpty(e)},
            field: "address",
            headerName: "ADDRESS",
            flex: 1,
          },
          {
            editable: "true",
            sanitize: (e) => {return e},
            validationMethod: (e) => {return  !validator.isMobilePhone(e)},
            field: "phone",
            headerName: "PHONE",
            flex: 1 
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
    <AddPartnerModal dialog={dialog} toggleDialog={setDialog} />
    </>
  );
}  