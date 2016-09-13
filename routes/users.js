const 	debug           	= require('debug')('users:route'),
		express 			= require('express')
		router 				= express.Router()
		userController 		= require('../controllers/userController.js');

router.use(function(req, res, next){
  debug(req.body);
  next();
});

/*
 * GET
 */
router.get('/', function (req, res) {
    userController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    userController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    userController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    userController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    userController.remove(req, res);
});

module.exports = router;
