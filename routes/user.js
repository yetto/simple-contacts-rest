const
  debug = require('debug')('user:route'),
  express = require('express'),
  router = express.Router(),
  userController = require('../controllers/userController.js'),
  contactController = require('../controllers/contactController.js'),
  perms = require('../controllers/jwtRoles')(debug);

/* #######################

  SINGLE USER (AUTH)
  - End-points for authenticated users

####################### */

/*
 * GET user/
 * User info
 */
router.get('/', perms.check(perms.sets.ur), function(req, res) {
  debug('get - users/');
  userController.show(req, res);
});

/*
 * PUT user/
 * Update user info
 */
router.put('/', perms.check(perms.sets.uw), function(req, res) {
  debug('put - users/');
  userController.update(req, res);
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/
 * List of all user contacts
 */
router.get('/contacts', perms.check(perms.sets.ur), function(req, res) {
  debug('get - users/contacts/');
  contactController.list(req, res);
});

/*
 * POST user/contacts/
 * Creates new contact
 */
router.post('/contacts', perms.check(perms.sets.uw), function(req, res) {
  debug('post - users/contacts/');
  contactController.create(req, res);
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/:contactID
 * Get contact details
 */
router.get('/contacts/:contactID', perms.check(perms.sets.ur), function(req, res) {
  debug('get - users/contacts/:contactID');
  contactController.show(req, res);
});

/*
 * PUT user/contacts/:contactID
 * Update contact
 */
router.put('/contacts/:contactID', perms.check(perms.sets.uw), function(req, res) {
  debug('put - users/contacts/:contactID');
  userController.update(req, res);
});

/*
 * DETELE user/contacts/:contactID
 * Delete contact
 */
router.delete('/contacts/:contactID', perms.check(perms.sets.uw), function(req, res, next) {
  debug('delete - users/contacts/:contactID');
  userController.show(req, res, function(doc) {
    if (res.locals.userID.toString() === doc._id.toString()) next();
    return res.status(404);
  });
}, function(req, res) {
  contactController.remove(req, res);
});

router.delete('/', perms.check(perms.sets.uw), function(req, res) {
  debug('delete - users/:userID');
  userController.remove(req, res);
});

module.exports = router;