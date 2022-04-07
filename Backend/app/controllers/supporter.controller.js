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
      logger.debug(req.body);
      const new_supporter = new Supporter(req.body);
      const supporter_id = await new_supporter.create();
      logger.debug(supporter_id);
      logger.info(
        "Supporter named %s added with id: %i",
        new_supporter.name,
        supporter_id
      );
      res.json(supporter_id);
    } catch (err) {
      next(err);
    }
  },
  async getSupporterByName(req, res, next) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const supporter_info = await Supporter.getSupporter(name);
      res.send({ supporterInfo: supporter_info });
    } catch (err) {
      next(err);
    }
  },
  async updateInfo(req, res, next) {
    try {
      logger.debug(req.params);
      const { supporter_id } = req.params;
      logger.debug(req.body);
      const updated_id = await Supporter.updateInfo(supporter_id, req.body);
      res.send(updated_id);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = supporterController;