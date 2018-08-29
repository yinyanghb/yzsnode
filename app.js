var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var url = require('url');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var log4js = require('./lib/log4js').getLogger('APP');
var router = require('./routes/index');
var appConfig = require('./config/app-config');
var app = express();
var useragent = require('express-useragent');
app.use(useragent.express());
// 配置开发环境，端口等
process.env.ENV = appConfig.evn;
process.env.PORT = appConfig.port;
// // view engine setup
app.set('views', path.join(__dirname, 'views'));
// // app.engine('.html', require('ejs').__express);
app.set('view engine', 'njk');

// Setup nunjucks templating engine
var env = nunjucks.configure(app.get('views'), {
  autoescape: true,
  noCache: true,
  watch: true,
  express: app
});

var helper = require('./helper/helper')(env);

// set favicon.ico
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{maxAge:1000*60*60}));

// 中间件，为所有请求记录日志
app.use(function (req, res, next) {
  log4js.info(req.url);
  next();
});

// 首页
app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (appConfig.evn === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      status: 0,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: 0,
    message: err.message,
    error: {}
  });
});

module.exports = app;