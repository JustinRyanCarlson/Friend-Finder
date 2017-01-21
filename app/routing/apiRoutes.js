var friends = require('../data/friends.js');
var bodyParser = require('body-parser');


// Exports these routes to be used in server.js
module.exports = function(app) {

    // Middle ware for parsing of data from the front end.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));

    // Get route that sends the friends array data back as a response.
    app.get('/api/friends', function(req, res) {
        res.end(JSON.stringify(friends));
    });

    // Post route that takes in the servey data from the front end and finds the friend
    // with the most similar answers to the servey then sends that friends data back.
    app.post('/api/friends', function(req, res) {

        // req.body is the survey data from the front end sent in with the request.
        var newFriend = req.body;
        var scoreRelations = [];

        // For loop that interates through each friend in the friends.js array.
        for (var i = 0; i < friends.length; i++) {
            var currentIndexScoreRelations = [];
            var difference = 0;

            // For loop that iterates through the current friend's scores, calculates the absolute
            // difference between them, then pushes the difference to an array.
            for (var j = 0; j < friends[i].scores.length; j++) {
                currentIndexScoreRelations.push(Math.abs(newFriend.scores[j] - friends[i].scores[j]));
            }

            // For loop that iterates through the array of differences in score from the last for loop
            // and adds them together to find the total difference.
            for (var k = 0; k < currentIndexScoreRelations.length; k++) {
                difference += currentIndexScoreRelations[k];
            }

            // Pushes the total difference to an array
            scoreRelations.push(difference);
        }

        // Initializes a minArrNumber variable and finds the lowest value in the 
        // scoreRelations array using a spread operator.
        var minArrNumber = Math.min(...scoreRelations);
        // Finds the index the minimum number belongs to and assigns it to the 
        // indexOfMin variable. This is also the index of the friend that matches
        // the best in the friends.js array
        var indexOfMin = scoreRelations.indexOf(minArrNumber);
        // Sends back the matching friends data as json.
        res.json(friends[indexOfMin]);
    });
};
