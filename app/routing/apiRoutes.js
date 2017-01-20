var friends = require('../data/friends.js');
var bodyParser = require('body-parser');



module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));


    app.get('/api/friends', function(req, res) {
        res.end(JSON.stringify(friends));
    });


    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        var scoreRelations = [];

        for (var i = 0; i < friends.length; i++) {
            var currentIndexScoreRelations = [];
            var difference = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                currentIndexScoreRelations.push(Math.abs(newFriend.scores[j] - friends[i].scores[j]));
            }

            for (var k = 0; k < currentIndexScoreRelations.length; k++) {
                difference += currentIndexScoreRelations[k];
            }

            scoreRelations.push(difference);
        }

        var minArrNumber = Math.min(...scoreRelations);
        var indexOfMin = scoreRelations.indexOf(minArrNumber);
        res.json(friends[indexOfMin]);
    });
};
