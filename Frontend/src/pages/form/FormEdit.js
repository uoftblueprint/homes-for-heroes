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
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const form = await fetchFormByIdAPI(formId);
            setTitle(form[0].title);
            setQuestions(JSON.parse(form[0].form_body).questions);
            setLevel(form[0].curr_level);
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
            const res = await updateFormAPI(formId, formBody);
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
                alert("Successfully updated!");
            }
        })();
        alert("Successfully updated!");
    }

    return (
        <FormBuilder
            title={title}
            level={level}
            questions={questions}
            saveDraft={updateForm}
            err={errors}
        />
    )
}

export default FormEdit;