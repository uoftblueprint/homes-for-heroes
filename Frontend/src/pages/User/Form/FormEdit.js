import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchFormByIdAPI, updateFormAPI} from "../../../api/formAPI";
import FormBuilder from "../../../components/form/FormBuilder";

function FormEdit() {

    let { formId } = useParams();

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState({});

    useEffect(() => {
        (async () => {
            setLoading(true);
            const form = await fetchFormByIdAPI(formId);
            setTitle(form[0].title);
            setQuestions(form[0].form_body.questions);
            let l = {l1: false, l2: false, l3: false, l4: false};
            form[0].curr_level.split(' ').forEach((lv) => l[lv] = true);
            setLevel(l)
            setLoading(false);
        })();
    }, [formId])

    if (loading) {
        return (
            <div>Loading!</div>
        )
    }

    const updateForm = (formBody) => {
        (async () => {
            const res = await updateFormAPI(formId, formBody);
            if (res.status !== 200) {
                // TODO error handling
                alert("Error!");
            } else {
                alert("Successfully updated!");
            }
        })();
    }

    return (
        <FormBuilder
            title={title}
            level={level}
            questions={questions}
            saveDraft={updateForm}
            err={false}
        />
    )
}

export default FormEdit;