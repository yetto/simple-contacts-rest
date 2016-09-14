const
  debug             = require('debug')('users:route'),
  express           = require('express'),
  router            = express.Router(),
  userController    = require('../controllers/usersController.js')
;

router.use(function(req, res, next){
  debug( req.path , req.body );
  next();
});

/* #######################

    USERS (ADMIN)
    # End-points for app management

####################### */

/*
 * GET users/
 * Get all users
 */
router.get('/', function (req, res) {
    userController.list(req, res);
});

/*
 * POST users/
 * Create new user
 */
router.post('/', function (req, res) {
    userController.create(req, res);
});

/* --------------------------------------------------- */

/*
 * GET users/:id
 * Get user info
 */
router.get('/:id', function (req, res) {
    userController.show(req, res);
});

/*
 * PUT users/:id
 * Update user info
 */
router.put('/:id', function (req, res) {
    userController.update(req, res);
});

/*
 * DELETE users/:id
 * Terminate user
 */
router.delete('/:id', function (req, res) {
    userController.remove(req, res);
});

/* --------------------------------------------------- */

/*
 * GET users/:id/contacts
 * Get contact info
 */
router.get('/:id/contacts', function (req, res) {
    res.json({ ok : '/:id/contacts' });
    //userController.listContacts(req, res);
});

/*
 * POST users/:id/contacts
 * Create new contact for user
 */
router.post('/:id/contacts', function (req, res) {
    res.json({ ok : '/:id/contacts' , post : res.body });
    //userController.createContact(req, res);
});

/* --------------------------------------------------- */

/*
 * GET users/:uid/contacts/:cid
 * Get contact details
 */
router.get('/:uid/contacts/:cid', function (req, res) {
    res.json({ ok : '/:uid/contacts/:cid' , uid : req.params.uid , cid : req.params.uid });
    //userController.createContact(req, res);
});

/*
 * PUT users/:uid/contacts/:cid
 * Update contact info from user
 */
router.put('/:uid/contacts/:cid', function (req, res) {
    res.json({ ok : '/:uid/contacts/:cid' , post : res.body });
    //userController.createContact(req, res);
});

/*
 * DELETE users/:uid/contacts/:cid
 * Delete contact from user
 */
router.post('/:uid/contacts/:cid', function (req, res) {
    res.json({ ok : '/:uid/contacts/:cid' , del : 'ok' });
    //userController.createContact(req, res);
});

module.exports = router;