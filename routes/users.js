var
  debug = require('debug')('users:route'),
  express = require('express'),
  password = require('../controllers/passwords.js'),
  router = express.Router(),
  userController = require('../controllers/userController.js'),
  contactController = require('../controllers/contactController.js'),
  perms = require('../controllers/jwtRoles')(debug);

/* #######################

    USERS (ADMIN)
    # End-points for app management

####################### */

/*
 * GET users/
 * Get all users
 */
router.get('/', perms.check(perms.sets.ar), function(req, res) {
  debug('get - users/');
  userController.setQuery({});
  userController.list(req, res);
});

/*
 * POST users/
 * Create new user
 */
router.post('/', function(req, res, next) {
  debug('post - users/');
  password.encrypt(req.body.password, function(err, hash) {
    if (err) throw err;
    req.body.password = hash;
    next();
  });
}, function(req, res) {
  userController.catchQuery(req,res,function(query){
    query._contacts = null;
    userController.create(req, res);
  });
});

/* --------------------------------------------------- */

/*
 * GET users/:userID
 * Get user info
 */
router.get('/:userID', perms.check(perms.sets.ar), function(req, res) {
  debug('get - users/:userID');
  userController.setQuery({
    _id : req.params.userID || null
  });
  userController.show(req, res);
});

/*
 * PUT users/:userID
 * Update user info
 */
router.put('/:userID', perms.check(perms.sets.aw), function(req, res, next) {
  debug('put - users/:userID');
  if (typeof req.body.password === 'string') {
    password.encrypt(req.body.password, function(err, hash) {
      if (err) throw err;
      req.body.password = hash;
      next();
    });
  } else {
    next();
  }
}, function(req, res) {
  userController.catchQuery(req,res,function(query){
    query._id = res.params.userID;
    query._contacts = null;
    userController.update(req, res);
  });
});

/*
 * DELETE users/:userID
 * Terminate user
 */
router.delete('/:userID', perms.check(perms.sets.aw), function(req, res) {
  debug('delete - users/:userID');
  userController.setQuery({
    _id : res.params.userID || null
  });
  userController.remove(req, res);
});

/* --------------------------------------------------- */

/*
 * GET users/:userID/contacts
 * Get all contacts for a user
 */
router.get('/:userID/contacts', perms.check(perms.sets.ar), function(req, res) {
  debug('get - users/:userID/contacts');
  contactController.setQuery({
    _belongsTo: req.params.userID || null
  });
  contactController.show(req, res);
});

/*
 * POST users/:userID/contacts
 * Create new contact for user
 */
router.post('/:userID/contacts', perms.check(perms.sets.aw), function(req, res, next) {
  debug('post - users/:userID/contacts');
  contactController.catchQuery(req, res, function(query){
    query._belongsTo = req.params.userID || null;
    contactController.create(req, res, function(contact) {
      res.locals.contact = contact;
      next();
    });
  });
}, function(req, res) {
  userController.setQuery({
    _id : req.params.userID || null,
    _contacts: [{
      name: res.locals.contact.name,
      type: "contact",
      contact_id: res.locals.contact._id
    }]
  });
  userController.update(req, res, function(user){
    debug('contact',req.params.userID);
    return res.status(201).json(res.locals.contact);
  });
});

/* --------------------------------------------------- */

/*
 * GET users/:userID/contacts/:contactID
 * Get contact details
 */
router.get('/:userID/contacts/:contactID', perms.check(perms.sets.ar), function(req, res) {
  debug('get - users/:userID/contacts/:contactID');
  contactController.setQuery({
    _id: req.params.contactID || null,
    _belongsTo: req.params.userID || null
  },function(query){
    if (query._id === null || query._belongsTo === null) {
      return res.status(404).json({
        message: 'No such user'
      });
    }
    contactController.show(req, res);
  });
});

/*
 * PUT users/:userID/contacts/:contactID
 * Update contact info from user
 */
router.put('/:userID/contacts/:contactID', perms.check(perms.sets.aw), function(req, res) {
  contactController.catchQuery(req,res,function(query){
    query._id = req.params.contactID;
    query._belongsTo = req.params.userID;
    contactController.update(req, res);
  });
});

/*
 * DELETE users/:userID/contacts/:contactID
 * Delete contact from user
 */
router.delete('/:userID/contacts/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('delete - users/:userID/contacts/:contactID');
  contactController.catchQuery(req,res,function(query){
    query._id = req.params.contactID;
    query._belongsTo = req.params.userID;
    contactController.update(req, res);
  });
});

module.exports = router;