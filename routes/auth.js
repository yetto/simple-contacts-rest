const
  express       = require('express')
  router        = express.Router()
;

/*
 * POST /app/authenticate
 * Return JWT (login)
 */
router.post('/authenticate', function(req, res, next) {
  res.status(200).json({ res : 'ok' });

 // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});


});

/*
 * GET /app/expire
 * Expire JWT (logout)
 */
router.get('/expire', function(req, res, next) {
  res.status(200).json({ res : 'ok' });
});

module.exports = router;
