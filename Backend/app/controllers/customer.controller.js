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

const getCases = ((req, res) => {
    const userId = req.query.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    Customer.getCases(userId, startDate, endDate)
    .then(function(results) {
        res.send({'cases': results});
    })
    .catch(function(err){
        console.error(err);
        res.send({'error': err});
    });
});

module.exports = {
    getAllUsers,
    getCases
}
