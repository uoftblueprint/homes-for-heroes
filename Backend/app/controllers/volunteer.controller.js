const Volunteer = require("../models/volunteer.model");
const logger = require("../logger");

const volunteerController = {
  async getAllVolunteers(req, res, next) {
    try {
      const results = await Volunteer.listAll();
      res.send({ volunteers: results });
    } catch (err) {
      next(err);
    }
  },
<<<<<<< HEAD

  async create(req, res, next) {
    try {
      const new_volunteer = new Volunteer(req.body);
      const volunteer_id = await new_volunteer.create();
      res.json(volunteer_id);
    } catch (err) {
      next(err);
    }
  },

  async getVolunteerByName(req, res, next) {
    try {
      const { name } = req.params;
      logger.debug(req.params);
      const volunteer = await Volunteer.getVolunteer(name);
      res.json(volunteer);
    } catch (err) {
      next(err);
    }
  },

  async updateInfo(req, res, next) {
    try {
      logger.debug(req.params);
      const { volunteer_id } = req.params;
      logger.debug(req.body);
      const updated_id = await Volunteer.updateInfo(volunteer_id, req.body);
      res.json(updated_id);
=======

  async create(req, res, next) {
    try {
      logger.debug(req.body);
      const new_volunteer = new Volunteer(req.body);
      const volunteer_id = await new_volunteer.create();
      logger.debug(volunteer_id);
      res.json(volunteer_id);
>>>>>>> origin/main
    } catch (err) {
      next(err);
    }
  }
};

module.exports = volunteerController;