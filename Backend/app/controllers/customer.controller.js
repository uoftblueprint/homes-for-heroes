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
    const user_id = req.query.user_id;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    Customer.getCases(user_id, start_date, end_date)
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
