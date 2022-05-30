import { useHistory } from "react-router-dom";
import { createFormAPI } from "../../api/formAPI";
import useFetch from "../../api/useFetch";
import FormBuilder from "../../components/form/FormBuilder";

function FormCreate() {
    const history = useHistory();
    const { makeFormWithError } = useFetch();

    const level = {
        l1: false,
        l2: false,
        l3: false,
        l4: false
    }

    const createDraft = (formBody) => {
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formBody)
            }
            let resp = await makeFormWithError('custom-form/createCustomForm', requestOptions)
            history.push("/forms")
        })();
    }

    return (
        <FormBuilder title="Form Title" level={level} questions={[]} saveDraft={createDraft}/>
    )
}

export default FormCreate;