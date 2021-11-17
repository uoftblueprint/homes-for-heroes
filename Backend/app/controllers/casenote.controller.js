const CaseNote = require('../models/casenote.model');

const caseNoteController = {
  create(req, res) {
    if (req.body) {
      const note = new CaseNote(req.body); // TODO: Add data sanitization
      note
        .create()
        .then(case_id => {
          res.json(case_id);
        })
        .catch(err => {
          // TODO: Add error handling middleware
          res.status(500);
          res.send({error: err });
        });
    } else {
        res.status(500);
        res.send({error: 'empty body' });
    }
  },
};

module.exports = caseNoteController;
