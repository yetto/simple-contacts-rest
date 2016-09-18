const debug = require('debug')('contact:controller'),
    contactModel = require('../models/contactModel.js'),
    paging = require('../controllers/paging.js'),
    knowException = require('../controllers/knowExceptions.js');

let theQuery = {};

let filterQuery = function(theQuery){
    // POP null values from OBJ
    for (var key in theQuery) {
        if (theQuery.hasOwnProperty(key)) {
            if (theQuery[key] === null) delete theQuery[key];
        }
    }
    debug('Query', theQuery);
    return(theQuery);
};

/**
 * contactController.js
 *
 * @description :: Server-side logic for managing contacts.
 */
module.exports = {

    /**
     * contactController.list()
     */
    list: function(req, res, callback) {

        debug('list');

        contactModel.find(filterQuery(theQuery), function(err, contacts) {
            if (err) {
                let exception = knowException(err, 'Error when getting contacts.');
                debug(exception);
                return res.status(exception.code).json({
                    message: exception.message,
                    error: err
                });
            }
            if (typeof callback === 'function') {
                callback(contacts);
            } else {
                return res.json(contacts);
            }
        });
    },

    /**
     * contactController.show()
     */
    show: function(req, res, callback) {

        debug('show');

        contactModel.findOne(filterQuery(theQuery), function(err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact.',
                    error: err
                });
            }
            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }
            if (typeof callback === 'function') {
                callback(contact);
            } else {
                return res.json(contact);
            }
        });
    },

    /**
     * contactController.create()
     */
    create: function(req, res, callback) {

        let contact = new contactModel(filterQuery(theQuery));

        debug('create');

        contact.save(function(err, contact) {
            if (err) {
                let exception = knowException(err, 'Error when creating contact.');
                debug(exception);
                return res.status(exception.code).json({
                    message: exception.message,
                    error: err
                });
            }
            if (typeof callback === 'function') {
                callback(contact);
            } else {
                return res.status(201).json(contact);
            }
        });
    },

    /**
     * contactController.update()
     */
    update: function(req, res, callback) {

        debug('update');

        let query = filterQuery(theQuery),
            id = query._id;

        delete query._id;

        contactModel.findByIdAndUpdate(id, { $set: query }, { new: true }, function(err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating contact.',
                    error: err
                });
            }
            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }
            if (typeof callback === 'function') {
                callback(contact);
            } else {
                return res.json(contact);
            }

        });

    },

    /**
     * contactController.remove()
     */
    remove: function(req, res, callback) {

        debug('remove');

        let contactID = filterQuery(theQuery)._id;

        contactModel.findByIdAndRemove(contactID, function(err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the contact.',
                    error: err
                });
            }
            if (typeof callback === 'function') {
                callback(contact);
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
    catchQuery: function(req,res,callback) {
        theQuery.name = req.body.name ? req.body.name : null;
        theQuery.photo = req.body.photo ? req.body.photo : null;
        theQuery.nickname = req.body.nickname ? req.body.nickname : null;
        theQuery.company = req.body.company ? req.body.company : null;
        theQuery.job_title = req.body.job_title ? req.body.job_title : null;
        theQuery.home = req.body.home ? req.body.home : null;
        theQuery.email = req.body.email ? req.body.email : null;
        theQuery.mobile = req.body.mobile ? req.body.mobile : null;
        theQuery.phone = req.body.phone ? req.body.phone : null;
        theQuery.address = req.body.address ? req.body.address : null;
        theQuery.birthday = req.body.birthday ? req.body.birthday : null;
        theQuery.notes = req.body.notes ? req.body.notes : null;
        if (typeof callback === 'function') {
            callback(theQuery);
        }
    } // END catchQuery
};