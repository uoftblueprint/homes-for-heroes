const Volunteer = require('../models/volunteer.model');
const logger = require('../logger');

const volunteerController = {
    async getAllVolunteers(req, res) {
        try {
            const results = await Volunteer.listAll();
            res.send({ volunteers: results });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
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

    async create(req, res) {
        try {
            logger.debug(req.body);
            const new_volunteer = new Volunteer(req.body);
            const volunteer_id = await new_volunteer.create();
            logger.debug(volunteer_id);
            res.json(volunteer_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
};

module.exports = volunteerController;