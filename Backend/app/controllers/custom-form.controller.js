const CustomForm = require('../models/custom-form.model');

const customFormController = {

  async getCustomForm(req, res, next) {
    try {
      const { form_id } = req.params;
      const resForm = await CustomForm.queryForm({ form_id: form_id });
      res.send(resForm);
    } catch (err) {
      next(err);
    }
  },

  async updateCustomForm(req, res, next) {
    try {
      const { form_id } = req.params;
      const form = new CustomForm({ form_id: form_id, ...req.body });
      await form.update();
      res.send({
        'message': 'success!'
      });
    } catch (err) {
      next(err);
    }
  },

  async createCustomForm(req, res, next) {
    try {
      const form = new CustomForm(req.body);
      const form_id = await form.create();
      res.json(form_id);
    } catch (err) {
      next(err);
    }
  },

  async queryAllAdminForms(req, res, next) {
    try {
      const [completedForms, drafts] = await Promise.all([
        await CustomForm.queryForm({ is_final: true }),
        await CustomForm.queryForm({ is_final: false })
      ]);
      res.send({
        'completed': completedForms,
        'drafts': drafts
      });
    } catch (err) {
      next(err);
    }
  },

  async publishForm(req, res, next){
    try {
      await CustomForm.publish(req.body.form_id);
      res.send({
        'message': 'success!'
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = customFormController;
