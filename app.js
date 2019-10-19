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

// Use login.js to route as login page
app.use('/login', require('./login.js'));
// Use signup.js to route as signup page
app.use('/signup', require('./signup.js'));
// Use survey.js to route as signup page
app.use('/survey', require('./survey.js'));

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
