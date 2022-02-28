const Volunteer = require('../models/volunteer.model');

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

    async create(req, res) {
        try {
            const new_volunteer = new Volunteer(req.body);
            const volunteer_id = await new_volunteer.create();
            res.json(volunteer_id);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
};

module.exports = volunteerController;