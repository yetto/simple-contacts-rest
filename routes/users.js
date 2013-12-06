const
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
  userController.create(req, res);
});

/* --------------------------------------------------- */

/*
 * GET users/:userID
 * Get user info
 */
router.get('/:userID', perms.check(perms.sets.ar), perms.check(perms.sets.ar), function(req, res) {
  debug('get - users/:userID');
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
  userController.update(req, res);
});

/*
 * DELETE users/:userID
 * Terminate user
 */
router.delete('/:userID', perms.check(perms.sets.aw), function(req, res) {
  debug('delete - users/:userID');
  userController.remove(req, res);
});

/* --------------------------------------------------- */

/*
 * GET users/:userID/contacts
 * Get contact info
 */
router.get('/:userID/contacts', perms.check(perms.sets.ar), function(req, res) {
  debug('get - users/:userID/contacts');
  userController.list(req, res);
});

/*
 * POST users/:userID/contacts
 * Create new contact for user
 */
router.post('/:userID/contacts', perms.check(perms.sets.aw), function(req, res, next) {
  debug('post - users/:userID/contacts');
  contactController.create(req, res, function(contact) {
    res.locals.contact = contact;
    next();
  });
}, function(req, res) {
  res.locals.userID = req.params.userID;
  req.body = {
    _contacts: {
      name: res.locals.contact.name,
      type: "contact",
      contact_id: res.locals.contact._id
    }
  };
  userController.update(req, res, function(user) {
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
  contactController.show(req, res);
});

/*
 * PUT users/:userID/contacts/:contactID
 * Update contact info from user
 */
router.put('/:userID/contacts/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('put - users/:userID/contacts/:contactID');
  res.locals.userID = req.params.userID;
  res.locals.contactID = req.params.contactID;
  userController.show(req, res, function(doc) {
    if (res.locals.userID.toString() === doc._id.toString()) next();
    return res.status(404);
  });
}, function(req, res) {
  contactController.update(req, res, function(doc) {
    if (res.locals.contactID === doc._id.toString()) return res.status(200).json();
    return res.status(404);
  });
});

/*
 * DELETE users/:userID/contacts/:contactID
 * Delete contact from user
 */
router.delete('/:userID/contacts/:contactID', perms.check(perms.sets.aw), function(req, res, next) {
  debug('delete - users/:userID/contacts/:contactID');
  res.locals.userID = req.params.userID;
  res.locals.contactID = req.params.contactID;
  userController.show(req, res, function(doc) {
    if (res.locals.userID.toString() === doc._id.toString()) next();
    return res.status(404);
  });
}, function(req, res) {
  contactController.remove(req, res, function(doc) {
    if (res.locals.contactID === doc._id.toString()) return res.status(204).json();
    return res.status(404);
  });
});

module.exports = router;