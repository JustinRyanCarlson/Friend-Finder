var path = require('path');

// Exports these routes to be used in server.js
module.exports = function(app) {

    // Get route that sends survey.html back as the response.
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });



    // Use route that sends back home.html as the response.
    // This route will be used if a user tries to go to any route other than
    // ones already defined.
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });
};
