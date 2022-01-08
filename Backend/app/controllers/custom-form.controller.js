const CustomForm = require('../models/custom-form.model');


const customFormController = {

    async getCustomForm(req, res) {
        try {
            const { form_id } = req.params;
            const resForm = await CustomForm.queryForm({form_id: form_id});
            res.send(resForm);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async createCustomForm(req, res) {
        try {
            console.log(req.body);
            const form = new CustomForm(req.body);
            const form_id = await form.create();
            res.json(form_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async queryCustomForms(req, res) {
        try {
            const resForm = await CustomForm.queryForm(req.query);
            res.send(resForm);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }

}

module.exports = customFormController;
