module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    function getAvatarUrl(userId) {
        var imageId = (userId % 5) + 1;
        return '/images/' + imageId + '.png'
    }

    router.get('/', function(req, res) {
        var context = {};
        var userId = 1;

        db.getUserById(userId).then(function(userInfo) {
            context.username = userInfo[0].username;
            context.email = userInfo[0].email;
            signupDate = new Date(userInfo[0].created_at);
            formattedDate = (signupDate.getMonth() + 1) + '-' + signupDate.getDate() + '-' + signupDate.getFullYear()
            context.signup = formattedDate;

            db.getUserProfileByUserId(userId).then(function(userProfileInfo) {
                context.language = capitalizeFirstLetter(userProfileInfo[0].language);
                context.difficulty = capitalizeFirstLetter(userProfileInfo[0].difficulty);
                context.topic = capitalizeFirstLetter(userProfileInfo[0].topic);
                context.imageUrl = getAvatarUrl(userId);

                res.render('profile', context);
            });
        });
    });

    return router;
}();