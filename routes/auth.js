var
    debug = require('debug')('auth:route'),
    express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController'),
    userModel = require('../models/userModel'),
    password = require('../controllers/passwords'),
    jwt = require('jsonwebtoken'),
    perms = require('../controllers/jwtRoles')(debug),
    validator = require('validator');

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

    debug('post - app/authenticate',req.body.email,req.body.password);

    if (!validator.isEmail(req.body.email)){
        return res.status(418).json({
            message: 'Bad email address'
        });
    }

    userModel.findOne({email: req.body.email}, function(err, user) {
        if (!user || err) {
            debug('Auth 404',user,err);
            return res.status(404).json({
                message: 'No such user'
            });
        }
        var tokenContent = {
            userID: user._id,
            perms: user.perms,
            location: user.location
        }
        debug('post - app/authenticate > tokenContent:', tokenContent);
        password.compare(req.body.password, user.password, function(err, isMatch) {
            if (isMatch) success(res, tokenContent);
            else failed(res)
        });
    });

    function failed(res) {
        res.status(401).json({
            message: 'Authentication failed. Check your credentials and try again.'
        });
    } // END failed

    function success(res, tokenContent) {
        var p = tokenContent.perms,
            dur;
        if (p.indexOf('admin:read') != -1 || p.indexOf('admin:write') != -1) {
            var token = jwt.sign(tokenContent, process.env.ADMIN_SECRET, {
                expiresIn: 43200 // expires in 12 hours
            });
            dur = '12h';
        } else {
            var token = jwt.sign(tokenContent, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            dur = '24h';
        }
        res.status(200).json({
            message: 'Token is valid for ' + dur,
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

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
 * GET /app/admin
 * Expire JWT (logout)
 */
router.get('/admin', perms.check(perms.sets.urw), function(req, res) {

    var userID = req.params.userID ? req.params.userID : res.locals.userID;
    debug('adminClaim', userID);

    if (process.env.NODE_ENV === "development") elevate();
    else notFound();

    function notFound() {
        return res.status(404).json({
            message: 'Not Found',
            error: err
        });
    } // notFound

    function elevate(){
        userModel.findOne({
            _id: userID
        }, function(err, user) {
            if (err) notFound();
            if (!user) notFound();
            user.perms = perms.sets.all;
            user.save(function(err, user) {
                if (err) notFound();
                if (typeof callback === 'function') callback(user);
                else return res.json(user);
            }); // end user.save
        });
    } // END elevate

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