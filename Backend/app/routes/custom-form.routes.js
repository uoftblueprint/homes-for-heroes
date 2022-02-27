module.exports = app => {
    const form = require("../controllers/custom-form.controller");

    app.get('/custom-Form/get/:form_id', form.getCustomForm);
    app.put('/custom-Form/put/:form_id', form.updateCustomForm);
    app.get('/custom-Form/queryAllAdminForms/:admin_id', form.queryAllAdminForms);
    app.post('/custom-Form/createCustomForm', form.createCustomForm);
    app.post('/custom-Form/publish', form.publishForm);

};
