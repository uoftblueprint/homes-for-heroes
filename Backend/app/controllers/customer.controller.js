const Customer = require('../models/customer.model');
const CaseNote = require('../models/casenote.model');

// Create and Save a new Customer

const customerController = {
  async getAllUsers(req, res) {
    try {
      const results = await Customer.retrieveAll();
      res.send({ customers: results });
    } catch (err) {
      console.error(err);
      // TODO error handling
      res.status(500);
      res.send({ error: err });
    }
  },
  async getAlertCase(req, res) {
    try {
      const case_id = await Customer.getAlertCaseId(req.query.user_id);
      if (case_id !== null) {
        CaseNote.getById(case_id)
          .then(caseNote => res.json(caseNote))
          .catch(err => {
            console.error(err);
            // TODO error handling
            res.status(500);
            res.send({ error: err });
          });
      } else {
        console.error(err);
        res.status(500);
        res.send({ error: 'Case does not exist' });
      }
    } catch (err) {
      console.error(err);
      // TODO error handling
      res.status(500);
      res.send({ error: err });
    }
  },
  async setAlertCase(req, res) {
    try {
      const { user_id, case_id } = req.query;
      await Customer.setAlertCaseId(user_id, case_id);
      res.send({ success: true });
    } catch (err) {
      console.error(err);
      // TODO error handling
      res.status(500);
      res.send({ error: err });
    }
  },
};

module.exports = customerController;
