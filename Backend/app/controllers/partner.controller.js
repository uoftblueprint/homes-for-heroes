const Partner = require("../models/partner.model");
const logger = require("../logger");

const partnerController = {
  async getAllPartners(req, res, next) {
    try {
      const results = await Partner.listAll();
      res.send({ partners: results });
    } catch (err) {
      next(err);
<<<<<<< HEAD
    }
  },
  async create(req, res, next) {
    try {
      const new_partner = new Partner(req.body);
      const partner_id = await new_partner.create();
      res.json(partner_id);
    } catch (err) {
      next(err);
    }
  },
  async getPartnerByName(req, res, next) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const partner = await Partner.getPartner(name);
      res.json(partner);
    } catch (err) {
      next(err);
    }
  },
  async updateInfo(req, res, next) {
    try {
      logger.debug(req.params);
      const { partner_id } = req.params;
      const updated_id = await Partner.updateInfo(partner_id, req.body);
      res.json(updated_id);
    } catch (err) {
      next(err);
    }
=======
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
>>>>>>> origin/main
  }
};

module.exports = partnerController;