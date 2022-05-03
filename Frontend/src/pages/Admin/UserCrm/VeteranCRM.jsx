import * as React from "react";

import BaseCRM from "../../../components/BaseCRM";
import AddRowDialog from "./AddRowDialog.jsx";

import validator from "validator";

import Link from "@mui/material/Link";
import LaunchIcon from "@mui/icons-material/Launch";

import { useHistory } from "react-router-dom";

export default function VeteranCRM() {
  const [dialog, setDialog] = React.useState(false);

  const props = {
    dialog: dialog,
    setDialog: setDialog,
    deDialogEndpoint: `deleteVeteran`,
    demoName: 'Veteran',
    csvEndpoint: "getVeteranCSV?",
    defaultSearchCategory: "name",
    updateUserEndpoint: "updateUserInfo",
    loadRowsEndpoint: `getUserData?`,
    rowIdName: 'user_id',
    nameInRows: 'name',
    columns: [
        {
          editable: "true",
          validationMethod: (e) => {return validator.isEmpty(e)},
          field: "name",
          headerName: "NAME",
          flex: 1.5,
          renderCell: (params) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link onClick={() => viewProfile(params.id)}>
                  <span>{params.formattedValue}</span>
                  <LaunchIcon sx={{ fontSize: 16 }} />
                </Link>
              </div>
            );
          },
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isEmail(e)},
          field: "email",
          headerName: "EMAIL",
          flex: 1.5,
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isMobilePhone(e)},
          field: "applicant_phone",
          headerName: "PHONE",
          flex: 1,
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isAlphanumeric(e)},
          status: "true",
          field: "curr_level",
          headerName: "STATUS",
          flex: 1,
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isAlphanumeric(e)},
          field: "demographics",
          headerName: "DEMOGRAPHICS",
          flex: 2,
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isNumeric(e)},
          field: "income",
          headerName: "INCOME",
          flex: 1,
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isAlphanumeric(e)},
          field: "incoming_referrals",
          headerName: "INC. REFERRALS",
          flex: 1.5,
        },
        {
          editable: "true",
          validationMethod: (e) => {return !validator.isAlphanumeric(e)},
          field: "outgoing_referrals",
          headerName: "OUT. REFERRALS",
          flex: 1.5,
        },
      ]
}
    const history = useHistory();

    const viewProfile = (id) => {
        history.push(`/casenotes/${id}`);
    }; 

  return (
    <>
    <BaseCRM {...props} />
    <AddRowDialog dialog={dialog} toggleDialog={setDialog} />
    </>
  );
}  