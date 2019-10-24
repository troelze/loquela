module.exports = function(){
  var express = require('express');
  var router = express.Router();
  var db = require('../db/queries.js');
  var helpers = require('./helpers');

  //Helper function to check if username already exists in database
  function usernameCheck(content, username) {
    var i;
    for(i=0; i < content.length; i++) {
      if(content[i].username === username) {
        return false;
      }
    }
    return true;
  }

  router.get('/', function(req, res){
    var context = {};
    res.render("signup", context);
  });

  router.post('/', function(req, res) {
    //Gets all users from DB
    db.getUsers().then(function(content) {
      //If username does not exsist, add user info to database
      if(usernameCheck(content, req.body.username)) {
        db.addUser(req.body).then(
            function(content2) {
              res.redirect('/');
            },
            function(err) {
              console.log(err);
              reject(err);
        });
      }
      //If username already exsists, return back to signup and display error
      else {
        var context = {};
        context.usernameError = "That Username Already Exists...";
        res.render("signup", context);
      }
    });
  });

  return router;
}();
