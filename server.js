var express = require('express');
var app = express();
var path = require('path');
// Requires the routes for this application.
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);
var PORT = 3000;

// Starts listening on localhost:3000
app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
});
