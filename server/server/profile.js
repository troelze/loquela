module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');
    var helpers = require('./helpers');

    router.get('/', function(req, res) {
        var context = {};
        // TODO: we'll need to get the ID based on who is logged in
        var userId = 1;

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

                res.render('profile', context);
            });
        });
    });

    router.get('/edit', function(req, res) {
        res.render('edit-profile');
        console.log('Entered /profile/edit');
    });

    router.post('/edit', function(req, res) {
        res.redirect('profile');
    });

    return router;
}();