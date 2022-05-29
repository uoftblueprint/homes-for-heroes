const CustomForm = require('../models/custom-form.model');
const Customer = require('../models/customer.model');

const customFormController = {

  async getCustomForm(req, res, next) {
    try {
      const { form_id } = req.params;
      const resForm = await CustomForm.queryForm({ form_id: form_id });
      const info = await Customer.getCustomerInfo(req.user.user_id);
      const curr_level = info[0].curr_level;  
      if (req.user.role_id > 0 || resForm[0].curr_level.includes(curr_level)) { 
        res.send(resForm);
      }
      else{
        next(new Error('Insufficient Permissions'));
      }
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
      const details = req.body;
      details.admin_id = req.user.user_id;
      const form = new CustomForm(req.body);
      const form_id = await form.create();
      res.json({ form_id });
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