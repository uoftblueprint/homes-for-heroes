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
  async createCustomForm(req, res, next) {
    try {
      console.log(req.body);
      const form = new CustomForm(req.body);
      const form_id = await form.create();
      res.json(form_id);
    } catch (err) {
      next(err);
    }
  },
  async queryCustomForms(req, res, next) {
    try {
      const resForm = await CustomForm.queryForm(req.query);
      res.send(resForm);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = customFormController;
