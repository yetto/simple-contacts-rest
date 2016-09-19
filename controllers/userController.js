
const
    debug = require('debug')('user:controller'),
    userModel = require('../models/userModel.js'),
    knowException = require('../controllers/knowExceptions.js');

var theQuery = {};

var filterQuery = function(theQuery) {
    // POP null values from OBJ
    for (var key in theQuery) {
        if (theQuery.hasOwnProperty(key)) {
            if (theQuery[key] === null) delete theQuery[key];
        }
    }
    debug('Query', theQuery);
    return (theQuery);
};

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function(req, res, callback) {

        debug('list');

        userModel.find(filterQuery(theQuery), function(err, users) {
                if (err) {
                    var exception = knowException(err, 'Error when getting user.');
                    debug(err,exception);
                    return res.status(exception.code).json({
                        message: exception.message,
                        error: err
                    });
                }
                if (typeof callback === 'function') {
                    callback(users);
                } else {
                    return res.json(users);
                }
            }).
            limit(50).
            sort('-createdAt').
            select({password:0,perms:0});
    },

    /**
     * userController.show()
     */
    show: function(req, res, callback) {


        debug('show');

        userModel.findOne(filterQuery(theQuery), function(err, user) {

            if (err) {
                debug('show',err);
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            if (typeof callback === 'function') {
                callback(user);
            } else {
                return res.json(user);
            }
        }).
        select({password:0,perms:0});
    },

    /**
     * userController.create()
     */
    create: function(req, res, callback) {


        var user = new userModel(filterQuery(theQuery));

        debug('create', user);

        user.save(function(err, user) {
            if (err) {
                var exception = knowException(err, 'Error when creating user.');
                debug(err,exception);
                return res.status(exception.code).json({
                    message: exception.message,
                    error: err
                });
            }

            user.perms = undefined;
            delete user['perms'];
            user.password = undefined;
            delete user['password'];

            if (typeof callback === 'function') {
                callback(user);
            } else {
                return res.status(201).json(user);
            }
        });
    },

    /**
     * userController.update()
     */
    update: function(req, res, callback) {

        debug('update');

        var query = filterQuery(theQuery),
            id = query._id;

        delete query._id;

        userModel.findByIdAndUpdate(id, {
            $set: query
        }, {
            new: true
        }, function(err, user) {
            if (err) {

                var exception = knowException(err, 'Error when updating user.');
                debug(err,exception);
                return res.status(exception.code).json({
                    message: exception.message,
                    error: err
                });

            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.perms = undefined;
            delete user['perms'];
            user.password = undefined;
            delete user['password'];

            if (typeof callback === 'function') {
                callback(user);
            } else {
                return res.json(user);
            }

        });

    },

    /**
     * userController.remove()
     */
    remove: function(req, res, callback) {

        debug('remove');

        var userID = filterQuery(theQuery)._id;

        userModel.findByIdAndRemove(userID, function(err, user) {
            if (err) {
                debug('remove',err);
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            user.perms = undefined;
            delete user['perms'];
            user.password = undefined;
            delete user['password'];

            if (typeof callback === 'function') {
                callback(user);
            } else {
                return res.status(204).json();
            }
        });
    },

    /*
     * userController.setQuery()
     * Allows to manually set query parameters
     */
    setQuery: function(obj, callback) {
        theQuery = {};
        objQuery = (typeof obj != 'object') ? {} : obj;
        theQuery = objQuery;
        if (typeof callback === 'function') {
            callback(theQuery);
        }
    }, // END setQuery

    /*
     * userController.catchQuery()
     * Catches all pertinent information
     */
    catchQuery: function(req, res, callback) {
            theQuery = {};
            theQuery.name = req.body.name ? req.body.name : null;
            theQuery.username = req.body.username ? req.body.username : null;
            theQuery.email = req.body.email ? req.body.email : null;
            theQuery.password = req.body.password ? req.body.password : null;
            theQuery.location = req.body.location ? req.body.location : null;
            theQuery.meta = req.body.meta ? req.body.meta : null;
            if (typeof req.body._contacts === 'object')
                theQuery._contacts.push(req.body._contacts ? req.body._contacts : null);
            if (typeof callback === 'function') {
                callback(theQuery);
            }
        } // END catchQuery


};