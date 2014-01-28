var path = require('path');

module.exports = require('node-sass').middleware({
  src: path.join(__dirname, '..', '..', 'app', 'assets', 'css')
, dest: path.join(__dirname, '..', '..', 'public')
, debug: true
, outputStyle: 'expanded'
, force: true
});
