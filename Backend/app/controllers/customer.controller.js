const Customer = require('../models/customer.model');
const CaseNote = require('../models/casenote.model');

// Create and Save a new Customer


const customerController = {
    getAllUsers(req, res) {
        Customer.retrieveAll()
          .then(function (results) {
            res.send({ customers: results });
          })
          .catch(function (err) {
            console.error(err);
            // TODO error handling
            res.status(500);
            res.send({ error: err });
          });
    },
    getAlertCase (req, res) {
        const case_id = Customer.getAlertCaseId(req.query.user_id);
        if (case_id >= 0) {
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
      }
}

module.exports = customerController;
