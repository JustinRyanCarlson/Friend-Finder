var express = require('express');
var app = express();
var path = require('path');
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);
var PORT = 3000;

app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
});
