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

function getUsers() {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users', function(err, results) {
            if (err) {
                console.log('Error:', err);
            }
            resolve(results.rows);
        })
    });
}

function getUserById(id) {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users WHERE id = $1', [id], function(err, results) {
            if (err) {
                console.log('Error:', err);
            }
            resolve(results.rows);
        })
    });
}

function getUserProfileByUserId(userId) {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId], function(err, results) {
            if (err) {
                console.log('Error:', err);
            }
            resolve(results.rows);
        })
    });
}

function updateUserProfile(data) {
    return new Promise(function(resolve, reject) {
        pool.query('UPDATE user_profiles SET language = $1, difficulty = $2, topic = $3 WHERE user_id = $4',
          [data.language, data.difficulty, data.topic, data.userId], function(err, results) {
            if (err) {
                console.log('Error:', err);
            }
            resolve(results.rows);
        })
    })
}

function updateUser(data) {
    return new Promise(function(resolve, reject) {
        pool.query('UPDATE users SET username = $1 WHERE id = $2', [data.username, data.userId], function(err, results) {
            if (err) {
                console.log('Error:', err);
            }
            resolve(results.rows);
        })
    })
}

function addUser(data) {
  return new Promise(function(resolve, reject) {
    pool.query('INSERT INTO users(email, username, password_hash) VALUES ($1, $2, $3)', [data.email, data.username, data.passone], function(err, results) {
      if (err) {
        console.log('Error:', err);
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

function addUserProfile(data) {
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO user_profiles(user_id, language, difficulty, topic) VALUES ($1, $2, $3, $4)',
          [data.userId, data.language, data.difficulty, data.topic], function(err, results) {
            if (err) {
                console.log('Error:', err);
            }
            resolve(results.rows);
        })
    })
}
// Other queries go here

// Export all query functions for user here
module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    getUserProfileByUserId: getUserProfileByUserId,
    updateUserProfile: updateUserProfile,
    updateUser: updateUser,
    addUser: addUser,
    addUserProfile: addUserProfile
}
