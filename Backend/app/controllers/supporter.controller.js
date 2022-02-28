const Supporter = require('../models/supporter.model');

const supporterController = {
    async getAllSupporters(req, res) {
        try {
            const results = await Supporter.listAll();
            res.send({ supporters: results });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },
    async create(req, res) {
        try {
            const new_supporter = new Supporter(req.body);
            const supporter_id = await new_supporter.create();
            res.json(supporter_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
};

module.exports = supporterController;