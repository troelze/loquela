var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'loquela',
    password: 'password',
    port: 5432
});

var getUsers = new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users', function(err, results) {
        if (err) {
            throw error;
        }
        resolve(JSON.stringify(results.rows));
    })
});

// Other queries go here

module.exports = {
    getUsers: getUsers
}