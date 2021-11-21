const CaseNote = require('../models/casenote.model');
const Customer = require('../models/customer.model');

const caseNoteController = {
  create(req, res) {
    if (req.body) {
      const note = new CaseNote(req.body); // TODO: Add data sanitization
      note
        .create()
        .then(case_id => {
          // Check if user doesn't have an alert case_id set
          if (Customer.getAlertCaseId(req.body.user_id) === null) {
            Customer.setAlertCaseId(req.body.user_id, case_id)
              .then(() => {
                res.json(case_id);
              })
              .catch(err => {
                res.status(500);
                res.send({ error: err });
              });
          } else res.json(case_id);
        })
        .catch(err => {
          // TODO: Add error handling middleware
          res.status(500);
          res.send({ error: err });
        });
    } else {
      res.status(500);
      res.send({ error: 'empty body' });
    }
  },
};

module.exports = caseNoteController;
