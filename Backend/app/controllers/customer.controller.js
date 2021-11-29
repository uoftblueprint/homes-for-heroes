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
      const { user_id } = req.params;
      const caseNote = await Customer.getAlertCase(user_id);
      res.json(caseNote);
    } catch (err) {
      console.error(err);
      // TODO error handling
      res.status(500);
      res.send({ error: err });
    }
  },
  async setAlertCase(req, res) {
    try {
      const { user_id } = req.params;
      const { case_id } = req.query;
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
