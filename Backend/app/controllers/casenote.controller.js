const CaseNote = require('../models/casenote.model')

const caseNoteController = {
    create(req, res) {
        const note = CaseNote(req.body); // TODO: Add data sanitization
        note.create()
        .then(case_id => {
            res.json(case_id);
        })
        .catch(err => {
            // TODO: Add error handling middleware
            res.status(500);
            res.render('error', { error: err });
        })
    }
}

module.exports = caseNoteController;