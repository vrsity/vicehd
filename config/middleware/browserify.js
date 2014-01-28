var path = require('path');
var browserify = require('browserify-middleware');
var srcPath = path.join(__dirname, '..', '..', 'app', 'assets', 'js', 'app.js');

module.exports = browserify(srcPath);

