const
    debug = require('debug')('user:controller'),
    userModel = require('../models/userModel.js'),
    paging = require('../controllers/paging.js'),
    knowException = require('../controllers/knowExceptions.js');

let theQuery = {};

let filterQuery = function(theQuery) {
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
                let exception = knowException(err, 'Error when getting user.');
                debug(exception);
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
        });
    },

    /**
     * userController.show()
     */
    show: function(req, res, callback) {


        debug('show');

        userModel.findOne(filterQuery(theQuery), function(err, user) {

            if (err) {
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
        });
    },

    /**
     * userController.create()
     */
    create: function(req, res, callback) {


        let user = new userModel(filterQuery(theQuery));

        debug('create', user);

        user.save(function(err, user) {
            if (err) {
                let exception = knowException(err, 'Error when creating user.');
                debug(exception);
                return res.status(exception.code).json({
                    message: exception.message,
                    error: err
                });
            }
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

        let query = filterQuery(theQuery),
            id = query._id;

        delete query._id;

        userModel.findByIdAndUpdate(id, { $set: query }, { new: true }, function(err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating user.',
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

        });

    },

    /**
     * userController.remove()
     */
    remove: function(req, res, callback) {

        debug('remove');

        let userID = filterQuery(theQuery)._id;

        userModel.findByIdAndRemove(userID, function(err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
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