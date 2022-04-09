const Supporter = require('../models/supporter.model');
const logger = require('../logger');

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

    async getData(req, res, next) {
        try {
            const data = await Supporter.queryData(req.query);
            res.send(data);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res) {
        try {
            logger.debug(req.body);
            const new_supporter = new Supporter(req.body);
            const supporter_id = await new_supporter.create();
            logger.debug(supporter_id);
            res.json(supporter_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async updateInfo(req, res) {
        try {
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    await Supporter.updateInfo(key, req.body[key]);
                }
            }
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },
};

module.exports = supporterController;