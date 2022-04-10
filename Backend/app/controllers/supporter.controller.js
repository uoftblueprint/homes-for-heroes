const Supporter = require('../models/supporter.model');
const logger = require('../logger');

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
      res.json(supporter_id);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = supporterController;