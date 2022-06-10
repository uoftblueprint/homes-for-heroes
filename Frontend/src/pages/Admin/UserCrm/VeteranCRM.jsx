import * as React from "react";

import BaseCRM from "../../../components/BaseCRM";
import AddRowDialog from "./AddRowDialog.jsx";

import validator from "validator";

import useFetch from "../../../api/useFetch";

import Link from "@mui/material/Link";

import LaunchIcon from "@mui/icons-material/Launch";

import { useHistory } from "react-router-dom";
import { el } from "date-fns/locale";

const normalizeInput = (value, previousValue) => {
  // return nothing if no value
  if (!value) return value; 

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length; 

  if (!previousValue || value.length > previousValue.length) {

    // returns: "x", "xx", "xxx"
    if (cvLength < 4) return currentValue; 

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`; 

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`; 
  }
};

export default function VeteranCRM() {
  const [dialog, setDialog] = React.useState(false);
  const [chapters, addChapters] = React.useState([]); 
  const [partners, addPartners] = React.useState([]);
  const { fetchWithError } = useFetch();

  React.useEffect(() => {
    (async() => {
      const endpoint = `chapters/getAll`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
      const response = await fetchWithError(endpoint, options);
      if (response.chapters.constructor === Array){ 
        addChapters(response.chapters);
      }
      })();
      (async() => {
      const endpoint = `partners`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
      const response = await fetchWithError(endpoint, options);
      if (response.partners.constructor === Array){ 
        addPartners(response.partners);
      }
      })();  
  }, []);
  
  const props = {
    dialog: dialog,
    setDialog: setDialog,
    deDialogEndpoint: `deleteVeteran`,
    demoName: 'Monsters',
    csvEndpoint: "getVeteranCSV?",
    defaultSearchCategory: "name",
    updateUserEndpoint: "updateUserInfo",
    loadRowsEndpoint: `getUserData?`,
    rowIdName: 'user_id',
    nameInRows: 'name',
    columns: [
        {
          editable: "true",
          sanitize: (e) => {return e},
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
          sanitize: (e) => {return e},
          validationMethod: (e) => {return !validator.isEmail(e)},
          field: "email",
          headerName: "EMAIL",
          flex: 1.5,
        },
        {
          editable: "true",
          sanitize: (e) => {return e},
          validationMethod: (e) => {return !validator.isMobilePhone(e)},
          field: "applicant_phone",
          headerName: "PHONE",
          flex: 1,
          renderCell: (params) => normalizeInput(params.formattedValue)
        },
        {
          editable: "true",
          sanitize: (e) => {return e.toString()},
          validationMethod: (e) => {return !(e > 0) || !(e < 5)},
          status: "true", 
          type: 'number',
          field: "curr_level",
          headerName: "STATUS",
          flex: 1,
        },
        {
          editable: "true",
          sanitize: (e) => {return e},
          validationMethod: (e) => {return validator.isEmpty(e)},
          field: "demographic",
          headerName: "DEMOGRAPHICS",
          flex: 2,
        },
        {
          editable: "true",
          sanitize: (e) => {return e},
          validationMethod: (e) => {return !validator.isNumeric(e)},
          field: "income",
          headerName: "INCOME",
          flex: 1,
        },
        {
          editable: "true",
          sanitize: (e) => {
            return partners.find((partners) => partners.org_name === e).org_name},
          validationMethod: (e) => {return false},
          field: "referral",
          headerName: "INC. REFERRALS",
          flex: 1.5,
          type: 'singleSelect',
          valueOptions: partners.map(e => e.org_name),
        },
        {
          editable: "true",
          sanitize: (e) => {
            return partners.find((partners) => partners.org_name === e).org_name},
          validationMethod: (e) => {return false},
          field: "outgoing",
          headerName: "OUT. REFERRALS",
          flex: 1.5,
          type: 'singleSelect',
          valueOptions: partners.map(e => e.org_name),
        },
        {
          editable: "true",
          sanitize: (e) => {
            return chapters.find((chapter) => chapter.chapter_name === e).chapter_id},
          validationMethod: (e) => {return false},
          field: "chapter_name",
          headerName: "CHAPTER",
          flex: 1.5,
          type: 'singleSelect',
          valueOptions: chapters.map(e => e.chapter_name), 
        }
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