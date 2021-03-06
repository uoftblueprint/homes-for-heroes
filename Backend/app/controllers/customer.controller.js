const Customer = require('../models/customer.model');
const Json2csvParser = require('json2csv').Parser;
const logger = require('../logger');

// Create and Save a new Customer

const customerController = {
  async getCustomerInfo(req, res, next) {
    try {
      const { user_id } = req.params;
      const info = await Customer.getCustomerInfo(user_id);
      res.send({ customerInfo: info });
    } catch (err) {
      next(err);
    }
  },

  async getSelfCustomerInfo(req, res, next) {
    try {
      const { user_id } = req.user;
      logger.info('User id: %d', user_id);
      const info = await Customer.getCustomerInfo(user_id);
      res.send({ customerInfo: info });
    } catch (err) {
      next(err);
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const results = await Customer.retrieveAll();
      res.send({ customers: results });
    } catch (err) {
      next(err);
    }
  },
  async getAlertCase(req, res, next) {
    try {
      const { user_id } = req.params;
      const caseNote = await Customer.getAlertCase(user_id);
      caseNote ? res.json(caseNote) : next(new Error('No Alerts'));
    } catch (err) {
      next(err);
    }
  },
  async getAlertCaseID(req, res, next) {
    try {
      const { user_id } = req.params;
      const alert_case_id = await Customer.getAlertCaseId(user_id);
      res.send({ id : alert_case_id });
    } catch (err) {
      next(err);
    }
  },
  async setAlertCase(req, res, next) {
    try {
      const { user_id } = req.params;
      const { case_id } = req.query;
      await Customer.setAlertCaseId(user_id, case_id);
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
  async getCases(req, res, next) {
    try {
      const { user_id, start_date, end_date } = req.query;
      const cases = await Customer.getCases(user_id, start_date, end_date);
      res.send({ cases: cases });
    } catch (err) {
      next(err);
    }
  },
  async getUserData(req, res, next) {
    try { 
      if (req.user.role_id === 1){ 
        const user_data = await Customer.queryUserData(
          {
            chapter_id: req.user.chapter_id,
            ...req.query
          });
        res.send(user_data);
      }
      else if (req.user.role_id === 2){
        const user_data = await Customer.queryUserData(req.query);
        res.send(user_data);
      }
      else{
        next(new Error('Insufficient Permissions'));
      } 
    } catch (err) {
      next(err);
    }
  },
  async getToDo(req, res, next) {
    try {
      const { user_id } = req.params;
      const todo = await Customer.getToDo(user_id);
      res.send({ payload: todo });
      logger.info('Retrieved to-do successfully.');
    } catch (err) {
      next(err);
    }
  },
  async updateToDo(req, res, next) {
    try {
      const { user_id } = req.params;
      const { todo } = req.query;
      await Customer.updateToDo(user_id, todo);
      res.send('Updated');
      logger.info('Updated to-do successfully.');
    } catch (err) {
      next(err);
    }
  },
  async putUserInfo(req, res, next) {
    try {
      const user_info = req.body;
      await req.user.updateUserInfo(user_info);
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  }, 

  async patchChangePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      if(await req.user.isValidPassword(oldPassword)) {
        await req.user.changePassword(newPassword);
        res.send({ success: true });
      } else {
        next(new Error('Old password incorrect'));
      }
    } catch (err) {
      next(err);
    }
  },

  async updateUserInfo(req, res, next) {
    try {
      for (const key in req.body) {
        await Customer.updateUserInfo(key, req.body[key]);
      }
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },  

  async deleteVeteran(req, res, next) {
    try {
      await Promise.all(req.body.rows.map(async (el) => { 
        Customer.deleteVeteran(el);
      }));
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },  

  async getCSV(req, res, next) {
    try {
      let { query } = req;
      if (req.user.role_id === 1) { 
        query = {
          chapter_id: req.user.chapter_id,
          ...req.query
        };
      } 
      const info = await Customer.getCSV(query);
      const infoJson = JSON.parse(JSON.stringify(info));
      const jsonParser = new Json2csvParser({ header: true });
      const resultsCSV = jsonParser.parse(infoJson);
      res.setHeader(
        'Content-disposition',
        'attachment; filename=usersInfo.csv',
      );
      res.set('Content-Type', 'text/csv');
      res.send(resultsCSV);
      logger.info('File successfully downloaded.');

    } catch (err) {
      next(err);
    }
  },
};

module.exports = customerController;
