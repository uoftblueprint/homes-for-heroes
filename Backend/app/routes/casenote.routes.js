module.exports = app => {
    const caseNoteController = require('../controllers/casenote.controller');
    
    app.post('/casenote', caseNoteController.create);
    app.put('/casenote/:case_id/update', caseNoteController.update);
    app.delete('/casenote/:case_id', caseNoteController.delete);
}