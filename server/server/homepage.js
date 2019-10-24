module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');
    var helpers = require('./helpers');

    router.get('/', function(req, res) {
        if(helpers.notLoggedIn(req)) {
          res.render('login');
        }
        else {
          var context = {};
          db.getUsers().then(function(users) {
              context.allUsers = JSON.stringify(users);
              //Using express-sessions to get user.id
              db.getUserById(req.session.user.id).then(function(user) {
                  context.oneUser = JSON.stringify(user)
                  console.log(req.session.user);
                  res.render('home', context);
              });
          });
        }
      });
    return router;
}();
