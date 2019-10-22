module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');

    router.get('/', function(req, res) {
        var context = {};
        db.getUsers().then(function(users) {
            context.allUsers = JSON.stringify(users);
            db.getUserById(1).then(function(user) {
                context.oneUser = JSON.stringify(user)
                res.render('home', context);
            });
        });
    });

    router.post('/audiofile', function(req, res) {
        console.log(req); //TODO
    });

    return router;
}();