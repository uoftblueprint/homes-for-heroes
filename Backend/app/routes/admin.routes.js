module.exports = app => {
    const admins = require("../controllers/admin.controller");
  
    app.get('/getAdminInfo/:admin_id', admins.getAdminInfo);
    app.put('/updateAdminProfile/:admin_id', admins.updateProfile);
  };
  