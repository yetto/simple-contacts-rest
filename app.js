/* ##############################

    SIMPLE CONTACTS REST

    ## TO RUN this app don't use node app.js use:
    npm start || npm run-script debugs

############################## */

const debug                    = require('debug')('app'),
      express                  = require('express'),
      favicon                  = require('serve-favicon'),
      morgan                   = require('morgan'),
      cookieParser             = require('cookie-parser'),
      bodyParser               = require('body-parser'),
      routes                   = require('./routes/index'),
      users                    = require('./routes/users'),
      contacts                 = require('./routes/contacts'),
      mongoose                 = require('mongoose'),
      path                     = require('path'),
      cors                     = require('cors'),
      app                      = express();

// ## MONGO DB CONNECTION

mongoose.connect(process.env.DB_URL || "mongodb://localhost/contactsApp");

mongoose.connection.on('error', status);
mongoose.connection.once('open', status);

function status(inf) {
  debug('mongoose/mongo:',inf);
  debug('env:',process.env.PORT,process.env.NODE_ENV,process.env.DB_URL);
  debug("app.get > env:",app.get('env'));
}

// ### View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ### App main middleware setup
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ### App paths
app.use('/', routes);
app.use('/REST/users', users);
app.use('/REST/contacts', contacts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    debug(err.status, req.path, req.method);
    res.json({
      message: err.message,
      error: err.status,
      req: req.path,
      method: req.method,
      body: req.body
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;