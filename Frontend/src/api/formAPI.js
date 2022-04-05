const host = 'http://localhost:3000/api';

export function createFormAPI(form) {
    const url = `${host}/custom-form/createCustomForm`

    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }
        fetch(url, requestOptions)
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
}

export function fetchCustomFormsAPI() {
    const url = `${host}/custom-form/queryAllAdminForms`

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => resolve(r.json()))
            .catch(error => reject("error!: " + error));
    })
}

export function fetchFormByIdAPI(formId) {
    const url = `${host}/custom-form/get/${formId}`
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => resolve(r.json()))
            .catch(error => reject("error!: " + error));
    })
}

export function publishFormAPI(formId) {
    const url = `${host}/custom-form/publish`

    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({form_id: formId})
        };
        fetch(url, requestOptions)
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
}

export function updateFormAPI(formId, formBody) {
    const url = `${host}/custom-form/put/${formId}`

    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formBody)
        };
        fetch(url, requestOptions)
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
}
