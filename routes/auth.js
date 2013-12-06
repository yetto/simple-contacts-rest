const
    debug = require('debug')('auth:route'),
    express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    password = require('../controllers/passwords'),
    jwt = require('jsonwebtoken'),
    perms = require('../controllers/jwtRoles')(debug);

/*
    # Consider
    https://github.com/auth0/node-jsonwebtoken
    https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
    http://stackoverflow.com/questions/37792562/jwt-jwtk-jjwt-with-public-private-keys
*/

/*
    # If you plan to use JWT make sure you understand JWT
    http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
*/

/*
 * POST /app/authenticate
 * Return JWT (login)
 */
router.post('/authenticate', function(req, res) {
    debug('post - app/authenticate');
    userController.show(req, res, function(user) {
        let tokenContent = {
            userID: user._id,
            perms: user.perms,
            location: user.location
        }
        debug('post - app/authenticate > tokenContent:', tokenContent);
        password.compare(req.body.password, user.password, function(err, isMatch) {
            if (isMatch) success(res, tokenContent);
            else failed(res)
        });
    }); // END userController.show

    function failed(res) {
        res.status(401).json({
            message: 'Authentication failed. Check your credentials and try again.'
        });
    } // END failed

    function success(res, tokenContent) {
        let p = tokenContent.perms;
        if (p.indexOf('admin:read') != -1 || p.indexOf('admin:write') != -1) {
            var token = jwt.sign(tokenContent, process.env.ADMIN_SECRET, {
                expiresIn: 43200 // expires in 12 hours
            });
        } else {
            var token = jwt.sign(tokenContent, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
        }
        res.status(200).json({
            message: 'Token is valid for 24hrs',
            token: token
        });
    } // END success

});

/*
 * GET /app/expire
 * Expire JWT (logout)
 */
router.get('/verify', function(req, res) {

    debug('get - app/verify');

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (decoded) success(decoded.perms);
        if (decoded) return true;
        jwt.verify(token, process.env.ADMIN_SECRET, function(err, decoded) {
            if (err) failed();
            else success(decoded.perms);
        });
    });

    function success() {
        res.status(200).json({
            message: 'Token is valid'
        });
    } // END success

    function failed() {
        res.status(401).json({
            message: 'Verification failed.'
        });
    } // END failed

});

/*
 * GET /app/expire
 * Expire JWT (logout)
 */
router.get('/perms/user', perms.check(perms.sets.all), function(req, res) {
    debug('get - app/perms/user');
    res.status(200).json({
        res: 'Looks good'
    });
});

/*
 * GET /app/expire
 * Expire JWT (logout)
 */
router.get('/expire', function(req, res, next) {
    /*
        Redis blacklist?
    */
    res.status(426).json({
        res: "Upgrade Required"
    });
});

module.exports = router;