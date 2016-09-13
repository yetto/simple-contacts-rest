const 	debug           	= require('debug')('contacts:route'),
		express 			= require('express'),
		router 				= express.Router(),
		contactController 	= require('../controllers/contactController.js');

router.use(function(req, res, next){
  debug(req.body);
  next();
});

/*
 * GET
 */
router.get('/', function (req, res) {
    contactController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    contactController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    contactController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    contactController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    contactController.remove(req, res);
});

module.exports = router;
