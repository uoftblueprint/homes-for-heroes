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