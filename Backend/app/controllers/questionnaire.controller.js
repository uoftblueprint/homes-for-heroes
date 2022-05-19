const Questionnaire = require('../models/questionnaire.model');
const CustomForm = require('../models/custom-form.model');
const Customer = require('../models/customer.model');

const questionnaireController = {

  async getQuestionnaire(req, res, next) {
    try {
      const { questionnaire_id } = req.params;
      const resForm = await Questionnaire.getQuestionnaire(questionnaire_id);
      res.send(resForm);
    } catch (err) {
      next(err);
    }
  },

  async createQuestionnaire(req, res, next) {
    try {
      const details = req.body;
      details.user_id = req.user.user_id;
      const questionnaire = new Questionnaire(req.body);
      const questionnaire_id = await questionnaire.create();
      res.json({ questionnaire_id });
    } catch (err) {
      next(err);
    }
  },

  async queryCompletedQuestionnaires(req, res, next) {
    try {
      const { user_id } = req.params;
      const info = await Customer.getCustomerInfo(user_id);
      const curr_level = info[0].curr_level;
      const [forms, questionnaires] = await Promise.all([
        await CustomForm.queryForm({ is_final: true, curr_level: curr_level }),
        await Questionnaire.queryUserQuestionnaires({ user_id })
      ]);
      res.send({
        'completed': questionnaires,
        'drafts': forms
      });
    } catch (err) {
      next(err);
    }
  },
}

module.exports = questionnaireController;