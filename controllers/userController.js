const
  debug            = require('debug')('user:controller'),
  userModel        = require('../models/userModel.js'),
  contactModel     = require('../models/contactModel.js'),
  paging           = require('../controllers/paging.js'),
  knowException  = require('../controllers/knowExceptions.js')
;

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res, callback) {

        debug('list');

        userModel.find(function (err, users) {
            if (err) {
                let exception = knowException(err,'Error when getting user.');
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
    show: function (req, res, callback) {

        let query = {
            _id  : req.body.userID || req.params.userID || res.locals.userID || null,
            email   : req.body.email || req.params.email || res.locals.email || null
        };

        for(var key in query){
            if (query.hasOwnProperty(key)) {
                if (query[key] === null)
                    delete query[key];
            }
        }

        debug('show',query);

        userModel.findOne(query, function (err, user) {

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
    create: function (req, res, callback) {

        debug('create');

        let user = new userModel({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            perms : ['user:read','user:write'],
            location : req.body.location,
            meta : req.body.meta
            // _contacts : req.body._contacts
        });
        user.save(function (err, user) {
            if (err) {
                let exception = knowException(err,'Error when getting user.');
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
    update: function (req, res, callback) {

        let userID = req.params.userID ? req.params.userID : res.locals.userID;
        debug('update',userID);

        userModel.findOne({_id: userID}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;
            user.admin = req.body.admin ? req.body.admin : user.admin;
            user.location = req.body.location ? req.body.location : user.location;
            user.meta = req.body.meta ? req.body.meta : user.meta;
            if (typeof req.body._contacts === 'object') user._contacts.push(req.body._contacts ? req.body._contacts : user._contacts);

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }
                if (typeof callback === 'function') {
                    callback(user);
                } else {
                    return res.json(user);
                }
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res, callback) {

        let userID = req.params.userID ? req.params.userID : res.locals.userID;
        debug('remove',userID);

        userModel.findByIdAndRemove(userID, function (err, user) {
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
    }
};
