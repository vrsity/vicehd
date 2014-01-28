var mongoose = require('mongoose');

var mongoUri = exports.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/vice_hd_development';

exports.configure = function () {
  mongoose.connect(mongoUri);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'db connection error:'));
  db.on('open', console.error.bind(console, 'db connection open:'));
  return db;
};
