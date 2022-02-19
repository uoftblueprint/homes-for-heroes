module.exports = app => {
    const admin = require("../controllers/admin.controller");

    app.get('/admins/getAll', admin.listAll);
    app.put('/admins/:admin_id/makeSupervisor', admin.makeSupervisor);
    app.put('/admins/:admin_id/makeSuperadmin', admin.makeSuperadmin);
    app.put('/admins/:admin_id/unsetSupervisor', admin.unsetSupervisor);
    app.put('/admins/:admin_id/unsetSuperadmin', admin.unsetSuperadmin);
};