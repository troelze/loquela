module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');
    var helpers = require('./helpers');
    const session = require('express-session');


      function getPromptData(userId) {
        return new Promise(function(resolve, reject) {
            var context = {};

            db.getUserById(userId).then(function(userInfo) {
            
                db.getUserProfileByUserId(userId).then(function(userProfileInfo) {
                    if (userProfileInfo[0]) {
                        context.language = helpers.capitalizeFirstLetter(userProfileInfo[0].language);
                        context.difficulty = helpers.capitalizeFirstLetter(userProfileInfo[0].difficulty);
                        context.topic = helpers.capitalizeFirstLetter(userProfileInfo[0].topic);
                    }
                    resolve(context);
                });
            });
        });
    }

    router.get('/', function(req, res) {
        if(helpers.notLoggedIn(req)) {
          res.render('login');
        }
        else {
          getPromptData(req.session.user.id).then(function(context) {
            res.render('prompts', context);
          });
        }
      });

    router.post('/audiofile', function(req, res) {
        console.log(req); //TODO
    });

    return router;
}();
