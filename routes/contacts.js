const
  debug = require('debug')('contacts:route'),
  express = require('express'),
  router = express.Router(),
  contactController = require('../controllers/contactController.js'),
  userController = require('../controllers/userController.js'),
  perms = require('../controllers/jwtRoles')(debug);

/*
 * GET contacts/
 * list all contacts
 */
router.get('/', perms.check(perms.sets.ar), function(req, res) {
  debug('get - contacts/');
  contactController.list(req, res);
});

/*
 * GET contacts/:contactID
 * get information from a contact
 */
router.get('/:contactID', perms.check(perms.sets.ar), function(req, res) {
  debug('get - contacts/:contactID');
  contactController.show(req, res);
});

/*
 * POST contacts/
 * create a contact decoupled from a user
 */
router.post('/', perms.check(perms.sets.aw), function(req, res) {
  debug('post - contacts/');
  contactController.create(req, res);
});

/*
 * PUT contacts/:contactID
 * update info from a contact
 */
router.put('/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('put - contacts/:contactID');
  contactController.update(req, res);
});

/*
 * DELETE contacts/:contactID
 * detele a specific contact
 */
router.delete('/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('delete - contacts/:contactID');
  contactController.remove(req, res);
});

module.exports = router;