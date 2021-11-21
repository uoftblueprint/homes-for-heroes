const CaseNote = require('../models/casenote.model');
const Customer = require('../models/customer.model');

const caseNoteController = {
   async create(req, res) {
    try {
      if (req.body) {
        const note = new CaseNote(req.body); // TODO: Add data sanitization
        const case_id = await note.create();
        const alert_case_id = await Customer.getAlertCaseId(req.body.user_id);
        if (alert_case_id === null)
          await Customer.setAlertCaseId(req.body.user_id, case_id)
        res.json(case_id);
      } else {
        res.status(500);
        res.send({ error: 'empty body' });
      }
    } catch (err) {
      // TODO: Add error handling middleware
      res.status(500);
      res.send({ error: err });
    }
  },
};

module.exports = caseNoteController;
