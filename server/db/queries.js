// Source: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
var credentials = require('./database.json').dev;
var Pool = require('pg').Pool;
var pool = new Pool({
    user: credentials.user,
    host: credentials.host,
    database: credentials.database,
    password: credentials.password,
    port: credentials.port
});

var getUsers = function() {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users', function(err, results) {
            if (err) {
                throw error;
            }
            resolve(results.rows);
        })
    });
}

var getUserById = function(id) {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users WHERE id = $1', [id], function(err, results) {
            if (err) {
                throw error;
            }
            resolve(results.rows);
        })
    });
}

var getUserProfileByUserId = function(userId) {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId], function(err, results) {
            if (err) {
                throw error;
            }
            resolve(results.rows);
        })
    });
}

// Other queries go here

// Export all query functions for user here
module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    getUserProfileByUserId: getUserProfileByUserId
}