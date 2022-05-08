const Supporter = require('../models/supporter.model');
const Json2csvParser = require('json2csv').Parser;``
const logger = require('../logger');

const supporterController = {

    async getData(req, res, next) {
    try {
      logger.debug(req.query);
      const data = await Supporter.queryData(req.query);
      res.send(data);
    } catch (err) {
      next(err);
    }
    },

    async updateInfo(req, res) {
      try {
        logger.debug(req.body);
        for (var key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            await Supporter.updateInfo(key, req.body[key]);
          }
        }
        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.status(500);
            res.send({ error: err });
        }
    },
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
  },

  async delete(req, res) {
    try {
      logger.debug(req.body);
      await Promise.all(req.body.rows.map(async (el) => { 
        Supporter.delete(el)
      }));
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  }, 

  async getCSV(req, res) {
    try {
      logger.debug(req.query);
      const info = await Supporter.getCSV(req.query);
      const infoJson = JSON.parse(JSON.stringify(info));
      const jsonParser = new Json2csvParser({ header: true });
      const resultsCSV = jsonParser.parse(infoJson);
      res.setHeader(
        'Content-disposition',
        'attachment; filename=usersInfo.csv',
      );
      res.set('Content-Type', 'text/csv');
      res.send(resultsCSV);
      logger.info('File successfully downloaded.');

    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err }); 
    }
  },
};

module.exports = supporterController;