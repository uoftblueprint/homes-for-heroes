import { useHistory } from "react-router-dom";
import { createFormAPI } from "../../../api/formAPI";
import FormBuilder from "../../../components/form/FormBuilder";
import {useState} from "react";

function FormCreate() {
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const level = {
        l1: false,
        l2: false,
        l3: false,
        l4: false
    }

    const createDraft = (formBody) => {
        (async () => {
            const res = await createFormAPI(formBody)
            if (res.status !== 200) {
                if (res.status === 400) {
                    alert('Input error, please reference the form for incorrect entries')
                    setErrors((await res.json()).errors);
                } else {
                    const er = await res.json();
                    console.log(er);
                    alert(er.error);
                }
            } else {
                history.push("/forms")
            }
        })();
    }

    console.log(errors);

    return (
        <FormBuilder
            title="Form Title"
            level={level}
            questions={[]}
            saveDraft={createDraft}
            err={errors}
        />
    )
}

export default FormCreate;