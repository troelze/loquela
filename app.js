var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var body = require('body-parser');
var db = require('./queries');

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);

// GET Homepage
app.get('/', function(req, res) {
    context = {};
    db.getUsers.then(function(users) {
        context.allUsers = users;
        res.render('home', context);
    });
})

// Handle errors
app.use(function(req, res) {
    res.status(404);
    res.render('404');
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '/; press Ctrl-C to terminate.');
})