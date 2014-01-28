var express = require('express');
var http = require('http');

var app = express();

[ 'settings'
, 'middleware'
, 'routes'
, 'db'].forEach(function (i) {
  require('./config/'+i).configure(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('App running at "' + app.get('host') + '" (port:'+app.get('port')+')');
});
