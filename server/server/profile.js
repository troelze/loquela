module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require('../db/queries');
    var helpers = require('./helpers');
    let {PythonShell} = require('python-shell');

    function getProfileData(userId) {
        return new Promise(function(resolve, reject) {
            var context = {};
        
            db.getUserById(userId).then(function(userInfo) {
                context.userId = userId;
                context.username = userInfo[0].username;
                context.email = userInfo[0].email;
                signupDate = new Date(userInfo[0].created_at);
                formattedDate = (signupDate.getMonth() + 1) + '-' + signupDate.getDate() + '-' + signupDate.getFullYear()
                context.signup = formattedDate;
    
                db.getUserProfileByUserId(userId).then(function(userProfileInfo) {
                    context.language = helpers.capitalizeFirstLetter(userProfileInfo[0].language);
                    context.difficulty = helpers.capitalizeFirstLetter(userProfileInfo[0].difficulty);
                    context.topic = helpers.capitalizeFirstLetter(userProfileInfo[0].topic);
                    context.imageUrl = helpers.getAvatarUrl(userId);

                    resolve(context);
                });
            });
        });
    }

    function updateProfile(user, data) {
        if (user.length != 0) {
            return db.updateUserProfile(data);
        }
        return db.addUserProfile(data);
    }

    function connectToSpeechRecognition(context) {
        return new Promise(function(resolve, reject) {
            // Source: https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272
            var options = {args: [helpers.languageToCode(context.language.toLowerCase())]};
            PythonShell.run('../python/speech_input.py', options, function(err, data) {
                if (err) {
                    console.log('Error:', err);
                } else {
                    if (data) {
                        context.speechAsTextClass = 'visible';
                        context.speechAsText = data[0];

                        // Add the user's response to the database before re-rendering
                        // TODO: dynamically pass the prompt ID once this logic is moved to /prompt/id
                        dbData = {
                            userId: context.userId,
                            promptId: 1,
                            text: data[0]
                        };

                        db.updatePromptActivities(dbData);
                    }
                }

                resolve(context);
            });
        });
    }

    router.get('/', function(req, res) {
        if(helpers.notLoggedIn(req)) {
            res.render('login');
        } else {
            getProfileData(req.session.user.id).then(function(context) {
                context.speechAsTextClass = 'hidden';
                context.microphone = req.query.microphone ? 'icon-circle' : 'icon-microphone';
                
                // If they're currently recording, connect to python script 
                // to read in their speech and display what they said
                if (req.query.microphone) {
                    connectToSpeechRecognition(context).then(function(context) {
                        res.render('profile', context);
                    });
                } else {
                    res.render('profile', context);
                }
            });
        }
    });

    router.get('/edit', function(req, res) {
        getProfileData(req.session.user.id).then(function(context) {
            res.render('edit-profile', context);
        });
    });

    router.post('/edit', function(req, res) {
        data = req.body;
        data.userId = req.session.user.id;

        // Update the profile if it already exists, otherwise create a new one
        db.getUserProfileByUserId(data.userId).then(function(user) {
            updateProfile(user, data).then(function() {
                db.updateUser(data).then(function() {
                    res.redirect('../profile');
                });
            });
        });
    });

    return router;
}();
