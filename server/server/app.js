// Source: CS290 coursework
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var body = require('body-parser');

app.use(body.urlencoded({extended: true}));
app.use(body.json());
app.use(express.static('../../client/public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', '../../client/views');
app.set('port', 8080);

// Use homepage.js to route as home page
app.use('/', require('./homepage.js'));

// Handle errors
app.use(function(req, res) {
    res.status(404);
    res.render('404');
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '/; press Ctrl-C to terminate.');
})
