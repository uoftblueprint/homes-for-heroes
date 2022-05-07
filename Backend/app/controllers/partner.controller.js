const Partner = require('../models/partner.model');
const logger = require('../logger');


const partnerController = {
  async getAllPartners(req, res, next) {
    try {
      const results = await Partner.listAll();
      res.send({ partners: results });
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      logger.debug(req.body);
      const new_partner = new Partner(req.body);
      const partner_id = await new_partner.create();
      logger.debug(partner_id);
      res.json(partner_id);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = partnerController;