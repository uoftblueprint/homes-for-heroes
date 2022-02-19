const Supervisor = require('../models/supervisor.model');
const Chapter = require('../models/chapter.model');

const supervisorController = {
    async getAll(req, res) {
        try {
            const supervisors = await Supervisor.listAll();
            res.send({ supervisors: supervisors });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async getByChapter(req, res) {
        try {
            const { chapter } = req.params;
            const chapter_id = await Chapter.getId(chapter);
            const supervisors = await Supervisor.listByChapter(chapter_id);
            res.send({ supervisors: supervisors });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async assignChapter(req, res) {
        try {
            const chapter_name = req.body.name;
            const { admin_id } = req.params;
            const chapter_id = await Chapter.getId(chapter_name);
            const results = await Supervisor.assignChapter(admin_id, chapter_id);
            res.send({ supervisor: results });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
}

module.exports = supervisorController;