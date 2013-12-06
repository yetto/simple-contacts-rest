const
    debug = require('debug')('contact:controller'),
    contactModel = require('../models/contactModel.js'),
    paging = require('../controllers/paging.js')
;


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

        let query = {
            _belongsTo: req.body.userID || req.params.userID || res.locals.userID || null,
            name: req.body.name || req.params.name || res.locals.name || null,
            company: req.body.company || req.params.company || res.locals.company || null,
            address: req.body.address || req.params.address || res.locals.address || null,
            birthday: req.body.birthday || req.params.birthday || res.locals.birthday || null
        };

        for(var key in query){
            if (query.hasOwnProperty(key)) {
                if (query[key] === null)
                    delete query[key];
            }
        }

        debug('list');

        contactModel.find(query,function(err, contacts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contacts.',
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

        let query = {
            _id: req.body.contactID || req.params.contactID || res.locals.contactID || null,
            _belongsTo: req.body.userID || req.params.userID || res.locals.userID || null,
            name: req.body.name || req.params.name || res.locals.name || null,
            company: req.body.company || req.params.company || res.locals.company || null,
            address: req.body.address || req.params.address || res.locals.address || null,
            birthday: req.body.birthday || req.params.birthday || res.locals.birthday || null
        };

        for(var key in query){
            if (query.hasOwnProperty(key)) {
                if (query[key] === null)
                    delete query[key];
            }
        }

        debug('show',query);

        contactModel.findOne(query, function(err, contact) {
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


        userID = req.body.userID || req.params.userID || res.locals.userID || null;

        debug('create','userID:',userID);

        let contact = new contactModel({
            name: req.body.name,
            photo: req.body.photo,
            nickname: req.body.nickname,
            company: req.body.company,
            jobtitle: req.body.jobtitle,
            home: req.body.home,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            birthday: req.body.birthday,
            notes: req.body.notes,
            _belongsTo: userID,
            _users: req.body._users
        });

        contact.save(function(err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating contact',
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

        let contactID = req.params.contactID ? req.params.contactID : res.locals.contactID;
        debug('update',contactID);

        contactModel.findOne({
            _id: contactID
        }, function(err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact',
                    error: err
                });
            }
            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }

            contact.name = req.body.name ? req.body.name : contact.name;
            contact.photo = req.body.photo ? req.body.photo : contact.photo;
            contact.nickname = req.body.nickname ? req.body.nickname : contact.nickname;
            contact.company = req.body.company ? req.body.company : contact.company;
            contact.jobtitle = req.body.jobtitle ? req.body.jobtitle : contact.jobtitle;
            contact.home = req.body.home ? req.body.home : contact.home;
            contact.email = req.body.email ? req.body.email : contact.email;
            contact.mobile = req.body.mobile ? req.body.mobile : contact.mobile;
            contact.address = req.body.address ? req.body.address : contact.address;
            contact.birthday = req.body.birthday ? req.body.birthday : contact.birthday;
            contact.notes = req.body.notes ? req.body.notes : contact.notes;
            contact._belongsTo = req.body._belongsTo ? req.body._belongsTo : contact._belongsTo;
            contact._users = req.body._users ? req.body._users : contact._users;

            contact.save(function(err, contact) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contact.',
                        error: err
                    });
                }
                if (typeof callback === 'function') {
                    callback(contact);
                } else {
                    return res.json(contact);
                }
            });
        });
    },

    /**
     * contactController.remove()
     */
    remove: function(req, res, callback) {

        let contactID = req.params.contactID ? req.params.contactID : res.locals.contactID;
        debug('remove',contactID);

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
    }
};