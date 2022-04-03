const Partner = require('../models/partner.model');
const logger = require('../logger');


const partnerController = {
    async getAllPartners(req, res) {
        try {
            const results = await Partner.listAll();
            res.send({ partners: results });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async getData(req, res, next) {
        try {
            const data = await Partner.queryData(req.query);
            res.send(data);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res) {
        try {
            logger.debug(req.body);
            const new_partner = new Partner(req.body);
            const partner_id = await new_partner.create();
            logger.debug(partner_id);
            res.json(partner_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
};

module.exports = partnerController;