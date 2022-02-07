const CaseNote = require('../models/casenote.model');
const Customer = require('../models/customer.model');

const caseNoteController = {
  async create(req, res, next) {
    try {
      const note = new CaseNote(req.body); // TODO: Add data sanitization
      const [case_id, alert_case_id] = await Promise.all([
        note.create(),
        Customer.getAlertCaseId(req.body.user_id),
      ]);
      if (alert_case_id === null)
        await Customer.setAlertCaseId(req.body.user_id, case_id);
      res.json(case_id);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = caseNoteController;
