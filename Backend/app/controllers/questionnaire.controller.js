const Questionnaire = require('../models/questionnaire.model');
const CustomForm = require('../models/custom-form.model');
const Customer = require('../models/customer.model');

const questionnaireController = {

  async getQuestionnaire(req, res, next) {
    try {
      const { questionnaire_id } = req.params;
      const resForm = await Questionnaire.getQuestionnaire(questionnaire_id);
      if (req.user.role_id > 0 || resForm[0].user_id === req.user.user_id) { 
        res.send(resForm);
      }
      else{
        next(new Error('Insufficient Permissions'));
      }
    } catch (err) {
      next(err);
    }
  },

  async createQuestionnaire(req, res, next) {
    try {
      const details = req.body;
      details.user_id = req.user.user_id;
      const info = await Customer.getCustomerInfo(req.user.user_id);
      const curr_level = info[0].curr_level;  
      if (req.user.role_id === 0 && details.curr_level.includes(curr_level)) { 
        const questionnaire = new Questionnaire(req.body);
        const questionnaire_id = await questionnaire.create();
        res.json({ questionnaire_id });
      }
      else{
        next(new Error('Insufficient Permissions'));
      }
    } catch (err) {
      next(err);
    }
  },

  async queryCompletedQuestionnaires(req, res, next) {
    try {
      const { user_id } = req.params;
      const info = await Customer.getCustomerInfo(user_id);
      const curr_level = info[0].curr_level;
      const [unsubmitted, submitted] = await Promise.all([
        await CustomForm.queryFormNotSubmittedBy(curr_level, user_id),
        await Questionnaire.queryUserQuestionnaires({ user_id })
      ]);
      res.send({
        'submitted': submitted,
        'unfinished': unsubmitted
      });
    } catch (err) {
      next(err);
    }
  },
}

module.exports = questionnaireController;