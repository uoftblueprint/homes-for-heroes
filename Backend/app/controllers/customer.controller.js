const Customer = require('../models/customer.model');
const CaseNote = require('../models/casenote.model');
const Json2csvParser = require("json2csv").Parser;

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
  async getCases(req, res) {
    try {
      const { user_id, start_date, end_date } = req.query;
      const cases = await Customer.getCases(user_id, start_date, end_date);
      res.send({ cases: cases });
    } catch (err) {
      // TODO error handling
      console.error(err);
      res.send({ error: err });
    }
  },
  async getUserInfoCSV(req, res) {
    try {
      const { name, email, phone, address, kin_name } = req.query;
      const info = await Customer.getUserInfoCSV(name, email, phone, address, kin_name);
      if (info.length != 0) {
        const infoJson = JSON.parse(JSON.stringify(info));
        const jsonParser = new Json2csvParser({ header: true});
        const resultsCSV = jsonParser.parse(infoJson);
        res.setHeader('Content-disposition', 'attachment; filename=usersInfo.csv');
        res.set('Content-Type', 'text/csv');
        res.send(resultsCSV);
        console.log("File successfully downloaded.");
      } else {
          res.send({"Info": []});
          console.log("No data to export.");
      };
    } catch (err) {
      console.error(err);
      res.send({'error': err});
    }
  }
};


module.exports = customerController;
