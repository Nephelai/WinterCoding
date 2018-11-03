var express = require('./config/express'),
    mongoose = require('./config/mongoose');

var db = mongoose();
var app = express(db);
app.listen(6092);

console.log('Server running at http://13.125.251.117:6092/');

module.exports = app;
