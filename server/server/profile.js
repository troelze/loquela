module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');

    var capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    router.get('/', function(req, res) {
        var context = {};
        db.getUserById(1).then(function(userInfo) {
            context.username = userInfo[0].username;
            context.email = userInfo[0].email;
            signupDate = new Date(userInfo[0].created_at);
            formattedDate = (signupDate.getMonth() + 1) + "-" + signupDate.getDate() + "-" + signupDate.getFullYear()
            context.signup = formattedDate;

            db.getUserProfileById(1).then(function(userProfileInfo) {
                context.language = capitalizeFirstLetter(userProfileInfo[0].language);
                context.difficulty = capitalizeFirstLetter(userProfileInfo[0].difficulty);
                context.topic = capitalizeFirstLetter(userProfileInfo[0].topic);

                res.render('profile', context);
            });
        });
    });

    return router;
}();