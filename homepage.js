module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require(__dirname + '/db/queries');
    var helpers = require('./helpers');
    const session = require('express-session');

function getProfileData(userId) {
      return new Promise(function(resolve, reject) {
          var context = {};

          db.getUserById(userId).then(function(userInfo) {
          

              db.getUserProfileByUserId(userId).then(function(userProfileInfo) {


                  context.language = helpers.capitalizeFirstLetter(userProfileInfo[0].language);
                  context.difficulty = helpers.capitalizeFirstLetter(userProfileInfo[0].difficulty);
                  context.topic = helpers.capitalizeFirstLetter(userProfileInfo[0].topic);
                  context.imageUrl = helpers.getAvatarUrl(userId);

                  db.getPromptsByLanguage(userProfileInfo[0].language).then(function(userPrompts) {
                    context.username = userInfo[0].username;
                    context.prompts = userPrompts;
                    resolve(context);
                  
                  });

              });
          });
      });
  }



  router.get('/', function(req, res) {
      if(helpers.notLoggedIn(req)) {
          res.render('login');
      } else {
          getProfileData(req.session.user.id).then(function(context) {
              res.render('home', context);
          });
      }
  });



    router.post('/audiofile', function(req, res) {
        console.log(req); //TODO
    });

    return router;
}();
