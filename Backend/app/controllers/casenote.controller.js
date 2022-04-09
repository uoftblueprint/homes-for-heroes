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
  async update(req, res) {
    try {
      const { case_id } = req.params;
      const { new_note, new_title } = req.query;
      await CaseNote.updateNote(case_id, new_note, new_title);
      res.send({ new_note: new_note });
    } catch (err) {
      // TODO error handling
      res.status(500);
      res.send({ error: err });
    }
  },
  async delete(req, res) {
    try {
      const { case_id } = req.params;
      await CaseNote.deleteNote(case_id);
      // res.send({ success: true });
    } catch (err) {
      // TODO error handling
      res.status(500);
      res.send({ error: err });
    }
  },
};

module.exports = caseNoteController;
