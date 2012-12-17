/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var auth = require('./app/routes/auth');
var dynamicHelpers = require('./app/lib/dynamic_helpers');
var RedisStore = require('connect-redis')(express);
var redis = require('./app/lib/redis');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ store: new RedisStore({ client: redis }), secret: 'aj3jc8anJK9a!93nankduKIduI@nnavi191993Kk30-52' }));
  app.use(auth.initialize());
  app.use(auth.session());
  app.use(auth.restrict());
  app.use(dynamicHelpers());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

auth.mount(app);

var home = require('./app/routes/index');
home.mount(app);

var eventsApi = require('./app/routes/api/events');
eventsApi.mount(app);

var usersApi = require('./app/routes/api/users');
usersApi.mount(app);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



