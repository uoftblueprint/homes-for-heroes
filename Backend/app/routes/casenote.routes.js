module.exports = app => {
    const caseNoteController = require('../controllers/casenote.controller');
    
    app.post('/casenote', caseNoteController.create);
}