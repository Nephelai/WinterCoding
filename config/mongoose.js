var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db, { useNewUrlParser: true });

    require('../server/todos.server.model');
    //require('../app/models/article.server.model');

    return db;
};