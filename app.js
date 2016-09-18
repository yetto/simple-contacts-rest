/* ##############################

    SIMPLE CONTACTS REST

    ## TO RUN this app don't use node app.js use:
    npm start || npm run-script debug

############################## */

const
  debug = require('debug')('app'),
  express = require('express'),
  favicon = require('serve-favicon'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  index = require('./routes/index'),
  auth = require('./routes/auth'),
  contacts = require('./routes/contacts'),
  users = require('./routes/users'),
  user = require('./routes/user'),
  mongoose = require('mongoose'),
  path = require('path'),
  cors = require('cors'),
  app = express(),
  jwt = require('jsonwebtoken');

/*
  Implement JWT
  https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
*/

process.title = 'contactsApp';

// ## MONGO DB CONNECTION
mongoose.connect(process.env.DB_URL || "mongodb://localhost/contactsApp");

mongoose.connection.on('error', status);
mongoose.connection.once('open', status);

function status(inf) {
  debug('mongoose/mongo:', inf);
  debug('ENV VARS - ', process.env.PORT, process.env.NODE_ENV, process.env.DB_URL, process.env.PER_PAGE);
  debug("app.get > env:", app.get('env'));
}

// AUTH
app.set('superSecret', process.env.SECRET ||  'CREATE_A_DOT_ENV_FILE');

// ### View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ### App main middleware setup
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Find related
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
// https://www.mkyong.com/mongodb/mongodb-group-count-and-sort-example/
// https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/

/*-------------------------------------------------------------------
### End-points for app management ###################################
---------------------------------------------------------------------
get     users/                      Get all users
post                                Create new user
---------------------------------------------------------------------
get     users/:id                   Get user info
put                                 Update user info
delete                              Terminate user
---------------------------------------------------------------------
get     users/:id/contacts          Get contact info
post                                Create new contact for user
---------------------------------------------------------------------
get     users/:uid/contacts/:cid    Get info from user contact
put                                 Update contact info from user
delete                              Delete contact from user
---------------------------------------------------------------------
### End-points for authenticated users ##############################
---------------------------------------------------------------------
get     user/                       User info
put                                 Update user info
---------------------------------------------------------------------
get     user/contacts/              List of all user contacts
post                                Creates new contact
---------------------------------------------------------------------
get     user/contacts/:id/          Get contact details
put                                 Update contact
delete                              Delete contact
---------------------------------------------------------------------
get     user/frequent/              Get frequent contacts
get     user/group/                 Get contacts by group
post    user/import/                Accepts csv
get     user/export/                Offers csv download
---------------------------------------------------------------------
### API Params ######################################################
---------------------------------------------------------------------
?page=
?per-page=
?order-by=name|added
--------------------------------------------------------------------*/

// ### App paths
app.use('/', index);
app.use('/app', auth);

// ## End-points for app management
app.use('/REST/contacts', contacts);
app.use('/REST/users', users);
// ## End-points for authenticated users
app.use('/REST/user', user);

// Returns list of all routes
router.get('/routes', function(req, res) {

  if (process.env.NODE_ENV === "development") listPaths();
  else notFound();

  function notFound() {
    return res.status(404).json({
      message: 'Not Found',
      error: err
    });
  } // notFound

  function listPaths() {
    let routes = [],
      routers = [router, user, users, contacts, auth];
    routers.forEach(function(router) {
      router.stack.forEach(function(r) {
        if (r.route && r.route.path) {
          if (r.route.path != '/') {
            routes.push(r.route.path);
          }
        }
      })
    });
    res.json({
      routes: routes
    });
  } // END elevate


});

/*
    TEST Contact
    http://nnm.box/REST/contacts/57d869a17160689f6be9cdbe

{
  "_id": "57d869a17160689f6be9cdbe",
  "name": "Denise Bradley",
  "nickname": "dbradley0",
  "company": "Trudeo",
  "job_title": "Recruiter",
  "address": "2 Onsgard Street",
  "birthday": "2/1/1985",
  "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
  "email": [
    "dbradley0@etsy.com"
  ]
}


    TEST User
    http://nnm.box/REST/users/57d866317160689f6be9cd5a

{
_id: "57d866317160689f6be9cd5a",
name: "Wylie Wade",
username: "Rosanne",
password: "EUZ78MMR7GR",
admin: false,
location: "22.48643, 114.92551",
contacts: [ ]
}

*/


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
    debug(err, req.path, req.method);
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

/* TEST
  https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
*/

// API END POINTS
let urlArr = [
  // get/post
  'http://nnm.box/REST/users/',
  // get/put/delete
  'http://nnm.box/REST/users/:id',
  // get/post
  'http://nnm.box/REST/users/:id/contacts',
  // get/put/delete
  'http://nnm.box/REST/users/:uid/contacts/:cid',
  // get/put
  'http://nnm.box/REST/user/',
  // get/post
  'http://nnm.box/REST/user/contacts/',
  // get/put/delete
  'http://nnm.box/REST/user/contacts/:id/',
  // get
  'http://nnm.box/REST/user/frequent/',
  // get
  'http://nnm.box/REST/user/group/',
  // post
  'http://nnm.box/REST/user/import/',
  // get
  'http://nnm.box/REST/user/export/'
];