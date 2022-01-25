import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchFormByIdAPI, updateFormAPI} from "../../api/formAPI";
import FormBuilder from "../../components/form/FormBuilder";

function FormEdit() {

    let { formId } = useParams();

    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState({});

    useEffect(() => {
        (async () => {
            setLoading(true);
            const form = await fetchFormByIdAPI(formId);
            setTitle(form[0].title);
            setQuestions(form[0].form_body.questions);
            setLevel(JSON.parse(form[0].curr_level));
            setLoading(false);
        })();
    }, [formId, refreshKey])

    if (loading) {
        return (
            <div>Loading!</div>
        )
    }

    const updateForm = (formBody) => {
        (async () => {
            await updateFormAPI(formId, formBody);
            setRefreshKey(refreshKey => refreshKey + 1)
        })();
        alert("Successfully updated!");
    }

    return (
        <FormBuilder
            title={title}
            level={level}
            questions={questions}
            saveDraft={updateForm}
        />
    )
}

export default FormEdit;