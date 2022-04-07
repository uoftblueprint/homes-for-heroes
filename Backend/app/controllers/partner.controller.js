const Partner = require("../models/partner.model");
const logger = require("../logger");

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
      logger.info(
        "Partner organization named %s added with id: %i",
        new_partner.name,
        partner_id
      );
      res.json(partner_id);
    } catch (err) {
      next(err);
    }
  },
  async getPartnerByName(req, res, next) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const partner_info = await Partner.getPartner(name);
      res.send({ partnerInfo: partner_info });
    } catch (err) {
      next(err);
    }
  },
  async updateInfo(req, res, next) {
    try {
      logger.debug(req.params);
      const { partner_id } = req.params;
      logger.debug(req.body);
      const updated_id = await Partner.updateInfo(partner_id, req.body);
      res.send(updated_id);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = partnerController;