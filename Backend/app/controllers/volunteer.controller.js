const Volunteer = require('../models/volunteer.model');
const Json2csvParser = require('json2csv').Parser;
const logger = require('../logger');

const volunteerController = {
  async getAllVolunteers(req, res, next) {
    try {
      logger.debug(req.query);
      const results = await Volunteer.listAll();
      res.send({ volunteers: results });
    } catch (err) {
      next(err);
    }
  },

    async getData(req, res, next) {
        try {
          logger.debug(req.query);
            const data = await Volunteer.queryData(req.query);
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
                    await Volunteer.updateInfo(key, req.body[key]);
                }
            }
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },
  async create(req, res, next) {
    try {
      logger.debug(req.body);
      const new_volunteer = new Volunteer(req.body);
      const volunteer_id = await new_volunteer.create();
      logger.debug(volunteer_id);
      res.json(volunteer_id);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res) {
    try {
      logger.debug(req.body);
      await Promise.all(req.body.rows.map(async (el) => { 
        Volunteer.delete(el)
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
      const info = await Volunteer.getCSV(req.query);
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

module.exports = volunteerController;