module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');

    router.get('/', function(req, res) {
        var context = {};
        db.getUsers.then(function(users) {
            context.allUsers = users;
            res.render('home', context);
        });
    });

    return router;
}();