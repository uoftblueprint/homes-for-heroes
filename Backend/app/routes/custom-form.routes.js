module.exports = app => {
    const form = require("../controllers/custom-form.controller");

    app.get('/custom-form/get/:form_id', form.getCustomForm);
    app.post('/custom-form/createCustomForm', form.createCustomForm);
    app.get('/custom-form/queryCustomForms', form.queryCustomForms);

};
