const
  debug             = require('debug')('user:route'),
  express           = require('express'),
  router            = express.Router(),
  userController    = require('../controllers/userController.js')
;

let userId;

router.use(function(req, res, next){
  userId = '57d866317160689f6be9cd5a';
  debug( req.path , req.body , userId );
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
    userController.show(req, res, userId);
});

/*
 * PUT user/
 * Update user info
 */
router.put('/', function (req, res) {
    let id = userId;
    userController.update(req, res);
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/
 * List of all user contacts
 */
router.get('/contacts', function (req, res) {
    let id = userId;
    res.json({ udi : id , ok : 'user/contacts/' });
    //userController.listContacts(req, res);
});

/*
 * POST user/contacts/
 * Creates new contact
 */
router.post('/contacts', function (req, res) {
    let id = userId;
    res.json({ udi : id , ok : 'user/contacts/' , req : req.body });
    //userController.createContact(req, res);
});

/* --------------------------------------------------- */

/*
 * GET user/contacts/:id
 * Get contact details
 */
router.get('/contacts/:id', function (req, res) {
    let id = userId;
    res.json({ udi : id , ok : 'user/contacts/:id' });
    //userController.createContact(req, res);
});

/*
 * PUT user/contacts/:id
 * Update contact
 */
router.put('/contacts/:id', function (req, res) {
    let id = userId;
    res.json({ udi : id , ok : 'user/contacts/:id' , req : req.body });
    //userController.createContact(req, res);
});

/*
 * DETELE user/contacts/:id
 * Delete contact
 */
router.delete('/contacts/:id', function (req, res) {
    let id = userId;
    res.json({ udi : id , ok : 'user/contacts/:id' , del : 'ok' });
    //userController.createContact(req, res);
});

module.exports = router;
