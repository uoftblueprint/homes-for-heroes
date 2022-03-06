module.exports = app => {
    const admin = require("../controllers/admin.controller");

    app.get('/admins/getAll', admin.listAll);
    app.put('/admins/:admin_id/makeSuperadmin', admin.makeSuperadmin);
    app.put('/admins/:admin_id/unsetSuperadmin', admin.unsetSuperadmin);
    app.put('/admins/:admin_id/assignChapter', admin.assignChapter);
    app.get('/admins/:chapter/listByChapter', admin.getByChapter);
};