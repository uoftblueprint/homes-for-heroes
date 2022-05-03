const Partner = require('../models/partner.model');
const Json2csvParser = require('json2csv').Parser;
const logger = require('../logger');


const partnerController = {
    async getData(req, res, next) {
        try {
            logger.debug(req.query);
            const data = await Partner.queryData(req.query);
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
          await Partner.updateInfo(key, req.body[key]);
        }
      }
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },  

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
  },

  async delete(req, res) {
    try {
      logger.debug(req.body);
      await Promise.all(req.body.rows.map(async (el) => { 
        Partner.delete(el)
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
      const info = await Partner.getCSV(req.query);
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

module.exports = partnerController;