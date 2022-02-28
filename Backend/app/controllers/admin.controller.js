const Admin = require('../models/admin.model');

const adminController = {
    async listAll(req, res) {
        try {
            const admins = await Admin.listAll();
            res.send({ admins: admins });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },
    
    async getSearchAdmins(req, res) {
      try {
        const { name } = req.query;
        const admins = await Admin.getSearchAdmins(name);
        res.send({ admins: admins });
      } catch (err) {
        console.error(err);
        res.status(500);
        res.send({ error: err })
      }
    },

    async makeSupervisor(req, res) {
        try {
            const { admin_id } = req.params;
            console.log(admin_id);
            const results = await Admin.makeSupervisor(admin_id);
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async makeSuperadmin(req, res) {
        try {
            const { admin_id } = req.params;
            console.log(admin_id);
            const results = await Admin.makeSuperadmin(admin_id);
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async unsetSuperadmin(req, res) {
        try {
            const { admin_id } = req.params;
            console.log(admin_id);
            const results = await Admin.unsetSuperadmin(admin_id);
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async unsetSupervisor(req, res) {
        try {
            const { admin_id } = req.params;
            console.log(admin_id);
            const results = await Admin.unsetSupervisor(admin_id);
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },
}

module.exports = adminController;