var path = require('path');
var mongoose = require('mongoose');
var exphbs = require('express3-handlebars');

exports.configure = function (app) {
  app.set('port', process.env.PORT || 3006);
  app.set('title', 'vicehd');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: require('../lib/handlebars_helpers')}));
  app.set('view engine', 'handlebars');

  if ('development' === app.get('env')) {
    require('node-pow')(app);
    app.set('host', app.get('title')+'.dev');
    mongoose.set('debug', true);
  } else if ('production' === app.get('env')) {
    app.set('host', app.get('title')+'.com');
  }
};

