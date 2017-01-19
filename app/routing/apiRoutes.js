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
        console.log(newFriend);
    });

};
