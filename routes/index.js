const
  express       = require('express')
  router        = express.Router()
;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Simple Test' });
});

module.exports = router;
