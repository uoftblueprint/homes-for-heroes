module.exports = app => {
    const quest = require("../controllers/questionnaire.controller");

    app.get('/questionnaire/get/:questionnaire_id', quest.getQuestionnaire);
    app.put('/questionnaire/put/:questionnaire_id', quest.updateQuestionnaire);
    app.post('/questionnaire/submit', quest.submitQuestionnaire);

};