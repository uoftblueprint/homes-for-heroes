const CustomForm = require('../models/custom-form.model');
const Customer = require("../models/customer.model");


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

    async queryAllAdminForms(req, res) {
        try {
            const { admin_id } = req.params;
            const [completedForms, drafts] = await Promise.all([
                await CustomForm.queryForm({admin_id: admin_id, is_final: true}),
                await CustomForm.queryForm({admin_id: admin_id, is_final: false})
            ]);
            res.send({
                'completed': completedForms,
                'drafts': drafts
            });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async publishForm(req, res){
        try {
            const { form_id } = req.params;
            const form = new CustomForm(req.body);
            const resForm = await form.publish({form_id: form_id});
            res.send(resForm);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }

}

module.exports = customFormController;
