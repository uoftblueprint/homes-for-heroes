const Supporter = require("../models/supporter.model");
const logger = require("../logger");

const supporterController = {
  async getAllSupporters(req, res, next) {
    try {
      const results = await Supporter.listAll();
      res.send({ supporters: results });
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const new_supporter = new Supporter(req.body);
      const supporter_id = await new_supporter.create();
      res.json(supporter_id);
    } catch (err) {
      next(err);
    }
  },
  async getSupporterByName(req, res, next) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const supporter = await Supporter.getSupporter(name);
      res.json(supporter);
    } catch (err) {
      next(err);
    }
  },
  async updateInfo(req, res, next) {
    try {
      logger.debug(req.params);
      const { supporter_id } = req.params;
      const updated_id = await Supporter.updateInfo(supporter_id, req.body);
      res.json(updated_id);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = supporterController;