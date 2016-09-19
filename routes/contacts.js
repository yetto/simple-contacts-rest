var
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
router.get('/', function(req, res) {
  debug('get - contacts/');
  contactController.setQuery({
    _belongsTo: req.query.userID || null,
    name: req.query.name || null,
    nickname: req.query.nickname || null,
    company : req.query.company  || null,
    job_title: req.query.job_title || null,
    home: req.query.home || null,
    email: req.query.email || null,
    mobile: req.query.mobile || null,
    phone: req.query.phone || null,
    address: req.query.address || null,
    birthday: req.query.birthday || null,
    notes: req.query.notes || null
  },function(query){
    contactController.list(req, res);
  });
});

/*
 * GET contacts/:contactID
 * get information from a contact
 */
router.get('/:contactID', perms.check(perms.sets.ar), function(req, res) {
  debug('get - contacts/:contactID');
  contactController.setQuery({
    _id : req.params.contactID
  });
  contactController.show(req, res);
});

/*
 * POST contacts/
 * create a contact decoupled from a user
 */
router.post('/', perms.check(perms.sets.aw), function(req, res) {
  debug('post - contacts/');
  contactController.setQuery({
    _id : req.params.contactID
  });
  contactController.show(req, res);
});

/*
 * PUT contacts/:contactID
 * update info from a contact
 */
router.put('/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('put - contacts/:contactID');
  contactController.catchQuery(req,res,function(query){
    query._id = req.params.contactID;
  });
  contactController.update(req, res);
});

/*
 * POST contacts/:contactID
 * post a contact
 */
router.post('/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('put - contacts/:contactID');
  contactController.catchQuery(req,res,function(query){
    query._id = null;
  });
  contactController.create(req, res);
});


/*
 * DELETE contacts/:contactID
 * detele a specific contact
 */
router.delete('/:contactID', perms.check(perms.sets.aw), function(req, res) {
  debug('delete - contacts/:contactID');
  contactController.setQuery({
    _id : req.params.contactID
  });
  contactController.remove(req, res);
});

module.exports = router;