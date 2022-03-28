const Admin = require('../models/admin.model');
const logger = require('../logger');

const adminController = {
    async createAdmin(req, res) {
        const { name, phone, email, password, address, chapter_id } = req.body; 
        try {
            const admin = await Admin.create(name, phone, email, password, address, chapter_id);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },  
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

    async makeSuperadmin(req, res) {
        try {
            const { admin_id } = req.params;
            const role_id = await Admin.getRole(admin_id);
            logger.debug(role_id);
            // ensures superadmin status can only be set when admin is already a supervisor
            if (role_id == 1) {
                const results = await Admin.makeSuperadmin(admin_id); 
                res.send(results);
            } else if (role_id == 2) {
                res.send({ error: "already a superadmin" });
            } else {
                res.send({ error: "cannot set as superadmin" });
            }
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async unsetSuperadmin(req, res) {
        try {
            const { admin_id } = req.params;
            const role_id = await Admin.getRole(admin_id);
            logger.debug(role_id);
            if (role_id == 1) {
                const results = await Admin.unsetSuperadmin(admin_id);
                res.send(results);
            } else {
                res.send({ error: "not a superadmin; cannot unset superadmin status" });
            }
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },


    async getByChapter(req, res) {
        try {
            const { chapter } = req.params;
            const chapter_id = await Chapter.getId(chapter);
            logger.debug(chapter_id);
            const results = await Supervisor.listByChapter(chapter_id);
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    },

    async assignChapter(req, res) {
        try {
            const chapter_name = req.body.name;
            const { admin_id } = req.params;
            const chapter_id = await Chapter.getId(chapter_name);
            logger.debug(chapter_id);
            const results = await Supervisor.assignChapter(admin_id, chapter_id);
            res.send(results);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send({ error: err });
        }
    }
}

module.exports = adminController;