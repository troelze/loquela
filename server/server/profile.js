module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');
    var helpers = require('./helpers');

    // TODO: we'll need to get the ID based on who is logged in
    var userId = 1;

    function getProfileData(userId) {
        return new Promise(function(resolve, reject) {
            var context = {};

            db.getUserById(userId).then(function(userInfo) {
                context.username = userInfo[0].username;
                context.email = userInfo[0].email;
                signupDate = new Date(userInfo[0].created_at);
                formattedDate = (signupDate.getMonth() + 1) + '-' + signupDate.getDate() + '-' + signupDate.getFullYear()
                context.signup = formattedDate;

                db.getUserProfileByUserId(userId).then(function(userProfileInfo) {
                    context.language = helpers.capitalizeFirstLetter(userProfileInfo[0].language);
                    context.difficulty = helpers.capitalizeFirstLetter(userProfileInfo[0].difficulty);
                    context.topic = helpers.capitalizeFirstLetter(userProfileInfo[0].topic);
                    context.imageUrl = helpers.getAvatarUrl(userId);

                    resolve(context);
                });
            });
        });
    }

    router.get('/', function(req, res) {
        getProfileData(userId).then(function(context) {
            res.render('profile', context);
        });
    });

    router.get('/edit', function(req, res) {
        getProfileData(userId).then(function(context) {
            res.render('edit-profile', context);
        });
    });

    router.post('/edit', function(req, res) {
        data = req.body;
        data.userId = userId;

        db.updateUserProfile(data).then(function() {
            db.updateUser(data).then(function() {
                res.redirect('../profile');
            });
        });
    });

    return router;
}();
