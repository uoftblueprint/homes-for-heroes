const Questionnaire = require('../models/questionnaire.model');


const questionnaireController = {

    async getQuestionnaire(req, res) {
        try {
            const { questionnaire_id } = req.params;
            const resQuest = await Questionnaire.queryQuestionnaire({ questionnaire_id: questionnaire_id });
            res.send(resQuest);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async createQuestionnaire(req, res) {
        try {
            const quest = new Questionnaire(req.body);
            const questionnaire_id = await quest.create();
            res.json(questionnaire_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async queryQuestionnaires(req, res) {
        try {
            const resQuest = await Questionnaire.queryForm(req.query);
            res.send(resQuest);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }

}

module.exports = questionnaireController;
