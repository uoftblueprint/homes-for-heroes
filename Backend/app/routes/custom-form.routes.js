module.exports = app => {
    const form = require("../controllers/custom-form.controller");

    app.get('/custom-form/get/:form_id', form.getCustomForm);
    // app.put('/custom-form/put/:form_id', form.updateCustomForm);
    // app.get('/custom-form/queryAllAdminForms/:admin_id', form.queryAllAdminForms);
    app.post('/custom-form/createCustomForm', form.createCustomForm);
    // app.post('/custom-form/publish', form.publishForm);

};
