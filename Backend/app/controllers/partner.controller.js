const Partner = require('../models/partner.model');


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
    async create(req, res) {
        try {
            const new_partner = new Partner(req.body);
            const partner_id = await new_partner.create();
            res.json(partner_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
};

module.exports = partnerController;