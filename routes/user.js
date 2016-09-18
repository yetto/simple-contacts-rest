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
  userController.setQuery({
    _id : res.locals.userID || null
  });
  userController.show(req, res);
});

/*
 * PUT user/
 * Update user info
 */
router.put('/', perms.check(perms.sets.uw), function(req, res, next) {
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
  debug('put - users/');
  userController.catchQuery(req,res,function(query){
    query._id = res.locals.userID;
    query._contacts = null;
    userController.update(req, res);
  });
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/
 * ?name=str&nickname=str&company=str&job_title=str&home=str&email=str&mobile=str&phone=str&address=str&birthday=str&notes=str
 * List of all user contacts
 */
router.get('/contacts', perms.check(perms.sets.ur), function(req, res) {
  debug('get - users/contacts/');
  contactController.setQuery({
    _belongsTo: res.locals.userID || null,
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
  });
  contactController.list(req, res);
});

/*
 * POST user/contacts/
 * Creates new contact
 */
router.post('/contacts', perms.check(perms.sets.uw), function(req, res) {
  debug('post - users/contacts/');
  contactController.catchQuery(req,res,function(query){
    query._belongsTo = res.locals.userID || null;
    contactController.create(req, res);
  });
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/:contactID
 * Get contact details
 */
router.get('/contacts/:contactID', perms.check(perms.sets.ur), function(req, res) {
  debug('get - users/contacts/:contactID');
  contactController.setQuery({
    _id: req.params.contactID || null,
    _belongsTo: res.locals.userID || null
  },function(query){
    debug('404',query);
    if (query._id === null || query._belongsTo === null) {
      return res.status(404).json({
        message: 'No such user'
      });
    }
    contactController.show(req, res);
  });
});

/*
 * PUT user/contacts/:contactID
 * Update contact
 */
router.put('/contacts/:contactID', perms.check(perms.sets.uw), function(req, res) {
  debug('put - users/contacts/:contactID');
  userController.catchQuery(req,res,function(query){
    query._id = req.params.contact || null,
    query._belongsTo = res.locals.userID || null
    contactController.update(req, res);
  });
});

/*
 * DETELE user/contacts/:contactID
 * Delete contact
 */
router.delete('/contacts/:contactID', perms.check(perms.sets.uw), function(req, res, next) {
  debug('delete - users/contacts/:contactID');
  userController.setQuery({
    _id : res.locals.userID || null
  });
  userController.show(req, res, function(doc) {
    if (res.locals.userID === doc._id.toString()) next();
    return res.status(404);
  });
}, function(req, res) {
  contactController.setQuery({
    _id : req.params.contactID || null
  });
  contactController.remove(req, res);
});

/*
 * DETELE user/
 * Delete contact
 */
router.delete('/', perms.check(perms.sets.uw), function(req, res) {
  debug('delete - user/');
  userController.setQuery({
    _id : res.locals.userID || null
  });
  userController.remove(req, res);
});

module.exports = router;