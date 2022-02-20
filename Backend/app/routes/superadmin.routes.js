module.exports = app => {
    const superadmins = require("../controllers/superadmin.controller");
  
    app.get('/superadmins/getAll', superadmins.getAll);
  };