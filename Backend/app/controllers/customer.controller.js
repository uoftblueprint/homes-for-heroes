const Customer = require("../models/customer.model.js");

// Create and Save a new Customer

const getAllUsers = ((req, res) => {
    Customer.retrieveAll()
    .then(function(results) {
        res.send({'customers': results});
    })
    .catch(function(err){
        console.error(err);
        // TODO error handling
        res.send({'error': err});
    });
});

module.exports = {
    getAllUsers
}
