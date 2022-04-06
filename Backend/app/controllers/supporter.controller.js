const Supporter = require("../models/supporter.model");
const logger = require("../logger");

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
  async create(req, res) {
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
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },
  async getSupporter(req, res) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const supporter_info = await Supporter.getSupporter(name);
      res.send({ supporterInfo: supporter_info });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },
  async updateInfo(req, res) {
    try {
      const { user_id } = req.params;
      const updated_id = await Supporter.updateInfo(user_id, req.body);
      res.send(updated_id);
    } catch (err) {
      res.send({"error": err});
    }
  }
};

module.exports = supporterController;