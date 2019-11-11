module.exports = function() {
    var express = require('express');
    var router = express.Router();
    var db = require(__dirname + '/db/queries');
    var helpers = require('./helpers');
    const session = require('express-session');
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
    // let {PythonShell} = require('python-shell');
    // var multer = require('multer');
    // var upload = multer();
    // var fs = require('fs');
    // var tmp = require('tmp');

//Source: https://cloud.google.com/natural-language/docs/analyzing-syntax
async function googleSyntax(speechSubmissionText) {
  return new Promise(async function(resolve, reject) {
    // Creates a client
    const client = new language.LanguageServiceClient();

    const text = speechSubmissionText;

    // Prepares a document, representing the provided text
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Detects syntax in the document
    const [syntax] = await client.analyzeSyntax({document});

    var syntaxAnalysis = [];

    syntax.tokens.forEach(part => {
      //Log the part of speech from analysis
      console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
      //console.log(`Morphology:`, part.partOfSpeech); //Additional information on part of speech
      syntaxAnalysis.push(`${part.partOfSpeech.tag}`);
    });
    //return the parts of speech in sentence
    resolve(syntaxAnalysis);
  });
}

    function getPromptData(userId) {
        return new Promise(function(resolve, reject) {
            var context = {};

            helpers.getUserLanguage(userId).then(function(language) {
                context.language = helpers.capitalizeFirstLetter(language);

                db.getPromptsByLanguage(language).then(function(userPrompts) {
                    context.prompts = userPrompts;
                    resolve(context);
                });
            });
        });
    }

    function getIndividualPrompt(promptId) {
        return new Promise(function(resolve, reject) {
            var context = {};

            db.getPromptById(promptId).then(function(promptInfo) {
                context.name = promptInfo.name;
                context.text = promptInfo.text;
                context.language = promptInfo.language;
                context.id = promptId;

                resolve(context);
            });
        });
    }

    // function connectToSpeechRecognition(context, promptId, speechFile) {
    //     return new Promise(function(resolve, reject) {
    //         // Source: https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272
    //         var options = {args: [helpers.languageToCode(context.language.toLowerCase()), speechFile]};
    //         PythonShell.run('../python/speech_input.py', options, function(err, data) {
    //             if (err) {
    //                 console.log('Error:', err);
    //             } else {
    //                 if (data) {
    //                     console.log('data from python file is', data);
    //                     context.speechAsTextClass = 'visible';
    //                     context.speechAsText = data[0];

    //                     // Add the user's response to the database before re-rendering
    //                     dbData = {
    //                         userId: context.userId,
    //                         promptId: promptId,
    //                         text: data[0]
    //                     };

    //                     db.updatePromptActivities(dbData);
    //                 }
    //             }

    //             resolve(context);
    //         });
    //     });
    // }

    router.get('/', function(req, res) {
        if(helpers.notLoggedIn(req)) {
          res.render('login');
        } else {
          getPromptData(req.session.user.id).then(function(context) {
            res.render('prompts', context);
          });
        }
    });

    router.get('/:id', function(req, res) {
        if(helpers.notLoggedIn(req)) {
            res.render('login');
        } else {
            helpers.getUserLanguage(req.session.user.id).then(function(language) {
                getIndividualPrompt(req.params.id).then(function(context) {
                    context.promptId = req.params.id;
                    context.userId = req.session.user.id;
                    context.languageCode = helpers.languageToCode(context.language.toLowerCase());

                    // Re-route to /prompts page if this specific prompt is not for the user's language
                    if (context.language != language) {
                        res.redirect('../prompts');
                    } else {
                        context.speechAsTextClass = 'hidden';
                        res.render('individual-prompt', context);
                    }
                });
            });
        }
    });

    // Sources: https://discourse.processing.org/t/uploading-recorded-audio-to-web-server-node-js-express/4569/4,
    // https://www.npmjs.com/package/tmp
    // Note: Leaving the file saving and python connection pieces in here as comments
    // in case we want to go this route later
    // router.post('/:id', upload.single('blob'), function(req, res) {
    router.post('/:id', function(req, res) {
        // var tmpObj = tmp.fileSync({ postfix: '.wav' });

        // fs.writeFileSync(tmpObj.name, Buffer.from(new Uint8Array(req.file.buffer)));

        var context = {};
        helpers.getUserLanguage(req.session.user.id).then(function(language) {
            // connectToSpeechRecognition(context, req.params.id, tmpObj.name).then(function(context) {
            //     res.render('individual-prompt', context);
            // });

            //Analyze user submission
            googleSyntax(req.body.speechSubmission).then(function(syntaxAnalysis) {
              //Check if Noun and Adjective are present in speechText
              //Hardcoded in prompts/:id route for Prompt 1
              //TODO: Make more abstract to use for each individual prompt
              var nounFeedback = helpers.promptFeedback(syntaxAnalysis, 'NOUN');
              var adjFeedback = helpers.promptFeedback(syntaxAnalysis, 'ADJ');

              var grades = [];
              grades.push(nounFeedback["grade"]);
              grades.push(adjFeedback["grade"]);

              //Calculate average grade
              var finalGrade = helpers.averageGrade(grades);

              // Add the user's response to the database before redirecting
              dbData = {
                  userId: req.session.user.id,
                  promptId: req.params.id,
                  text: req.body.speechSubmission,
                  feedback_text: nounFeedback["text"] + adjFeedback["text"],
                  grade: finalGrade
              };

              db.updatePromptActivities(dbData);
              res.redirect('../prompts');
            });
        });
    });

    return router;
}();
