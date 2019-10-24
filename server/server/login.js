module.exports = function(){
  var express = require('express');
  var router = express.Router();
  var db = require('../db/queries.js');
  var helpers = require('./helpers');
  const crypto = require('crypto');

  router.get('/', function(req, res){
    var context = {};
    res.render('login', context);
  });

  router.post('/', function(req, res) {
    var context = {};
    const hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    req.body.password = hash.digest('hex');
    db.getUsers().then(function(content) {
      req.session.user = helpers.loginCheck(content, req.body.username, req.body.password);
      if(req.session.user) {
        res.redirect('../');
      } else {
        context.invalidLogin = "Username or Password is Invalid...";
        res.render('login', context);
      }
    });

  });

  return router;
}();
