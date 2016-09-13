/* ##############################

    SIMPLE CONTACTS REST

############################## */

const debug                    = require('debug')('http'),
      express                  = require('express'),
      favicon                  = require('serve-favicon'),
      morgan                   = require('morgan'),
      cookieParser             = require('cookie-parser'),
      bodyParser               = require('body-parser'),
      routes                   = require('./routes/index'),
      users                    = require('./routes/users'),
      contact                  = require('./routes/contact'),
      mongoose                 = require('mongoose'),
      app                      = express();

// ## MONGO DB CONNECTION
mongoose.connect("mongodb://localhost/contactsApp");

// ### View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ### App main middleware setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ### App paths
app.use('/', routes);
app.use('/REST/users', users);
app.use('/REST/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let  err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
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