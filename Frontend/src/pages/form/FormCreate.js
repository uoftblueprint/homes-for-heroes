import { useHistory } from "react-router-dom";
import { createFormAPI } from "../../api/formAPI";
import FormBuilder from "../../components/form/FormBuilder";

function FormCreate() {
    const history = useHistory();

    const level = {
        l1: false,
        l2: false,
        l3: false,
        l4: false
    }

    const createDraft = (formBody) => {
        (async () => {
            await createFormAPI(formBody)
            history.push("/forms")
        })();
    }

    return (
        <FormBuilder title="Form Title" level={level} questions={[]} saveDraft={createDraft}/>
    )
}

export default FormCreate;