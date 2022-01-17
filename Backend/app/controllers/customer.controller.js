const Customer = require('../models/customer.model');
const CaseNote = require('../models/casenote.model');

// Create and Save a new Customer

const customerController = {
  async getCustomerInfo(req, res) {
    try {
      const { user_id } = req.params;
      const info = await Customer.getCustomerInfo(user_id);
      res.send({ customerInfo: info });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },

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
  async getCases(req, res) {
    try {
      const { user_id, start_date, end_date } = req.query;
      const cases = await Customer.getCases(user_id, start_date, end_date);
      res.send({ cases: cases });
    } catch (err) {
      console.error(err);
      // TODO error handling
      console.error(err);
      res.send({ error: err });
    }
  },

  async getUserData(req, res) {
    try {
      const user_data = await Customer.queryUserData(req.query);
      res.send(user_data)
    } catch (err) {
      console.error(err);
      res.send({'error': err});
    }
  }
};


module.exports = customerController;

