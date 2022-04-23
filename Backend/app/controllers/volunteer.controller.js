const Volunteer = require('../models/volunteer.model');
const logger = require('../logger');

const volunteerController = {
  async getAllVolunteers(req, res, next) {
    try {
      const results = await Volunteer.listAll();
      res.send({ volunteers: results });
    } catch (err) {
      next(err);
    }
  },

    async getData(req, res, next) {
        try {
            const data = await Volunteer.queryData(req.query);
            res.send(data);
        } catch (err) {
            next(err);
        }
    },
    async updateInfo(req, res) {
        try {
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
  }
};

module.exports = volunteerController;