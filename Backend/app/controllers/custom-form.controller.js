const CustomForm = require('../models/custom-form.model');

const customFormController = {

    async getCustomForm(req, res) {
        try {
            const { form_id } = req.params;
            console.log(`get custom form id ${form_id}`)
            const resForm = await CustomForm.queryForm({form_id: form_id});
            res.send(resForm);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async updateCustomForm(req, res) {
        try {
            const { form_id } = req.params;
            console.log("update controller")
            console.log(req.body)
            console.log({form_id: form_id, ...req.body})
            const form = new CustomForm({form_id: form_id, ...req.body});
            await form.update();
            res.status(200);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async createCustomForm(req, res) {
        try {
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
            await form.publish({form_id: form_id});
            res.status(200);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
  };

module.exports = customFormController;