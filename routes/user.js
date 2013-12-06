const
  debug             = require('debug')('user:route'),
  express           = require('express'),
  router            = express.Router(),
  userController    = require('../controllers/userController.js')
;

let userID;

router.use(function(req, res, next){
  userID = '57d866317160689f6be9cd5a';
  debug( req.path , req.body , userID );
  next();
});

/* #######################

  SINGLE USER (AUTH)
  - End-points for authenticated users

####################### */

/*
 * GET user/
 * User info
 */
router.get('/', function (req, res) {
    userController.show(req, res, userID);
});

/*
 * PUT user/
 * Update user info
 */
router.put('/', function (req, res) {
    let id = userID;
    userController.update(req, res);
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/
 * List of all user contacts
 */
router.get('/contacts', function (req, res) {
    let id = userID;
    res.json({ udi : id , ok : 'user/contacts/' });
    //userController.listContacts(req, res);
});

/*
 * POST user/contacts/
 * Creates new contact
 */
router.post('/contacts', function (req, res) {
    let id = userID;
    res.json({ udi : id , ok : 'user/contacts/' , req : req.body });
    //userController.createContact(req, res);
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/:contactID
 * Get contact details
 */
router.get('/contacts/:contactID', function (req, res) {
    let id = userID;
    res.json({ udi : id , ok : 'user/contacts/:contactID' });
    //userController.createContact(req, res);
});

/*
 * PUT user/contacts/:contactID
 * Update contact
 */
router.put('/contacts/:contactID', function (req, res) {
    let id = userID;
    res.json({ udi : id , ok : 'user/contacts/:contactID' , req : req.body });
    //userController.createContact(req, res);
});

/*
 * DETELE user/contacts/:contactID
 * Delete contact
 */
router.delete('/contacts/:contactID', function (req, res) {
    res.json({ udi : id , ok : 'user/contacts/:contactID' , del : 'ok' });
    //userController.createContact(req, res);
});

module.exports = router;
