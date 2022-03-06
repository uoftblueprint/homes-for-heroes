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

    async makeSuperadmin(req, res) {
        try {
            const { admin_id } = req.params;
            const role_id = await Admin.getRole(admin_id);
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
            if (role_id == 2) {
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