const Partner = require("../models/partner.model");
const logger = require("../logger");

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
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },
  async getPartner(req, res) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const partner_info = await Partner.getPartner(name);
      res.send({ partnerInfo: partner_info });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },
  async updateInfo(req, res) {
    try {
      const { user_id } = req.params;
      const updated_id = await Partner.updateInfo(user_id, req.body);
      res.send(updated_id);
    } catch (err) {
      res.send({"error": err});
    }
  }
};

module.exports = partnerController;