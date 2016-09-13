var contactModel = require('../models/contactModel.js');

/**
 * contactController.js
 *
 * @description :: Server-side logic for managing contacts.
 */
module.exports = {

    /**
     * contactController.list()
     */
    list: function (req, res) {
        contactModel.find(function (err, contacts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact.',
                    error: err
                });
            }
            return res.json(contacts);
        });
    },

    /**
     * contactController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        contactModel.findOne({_id: id}, function (err, contact) {
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
            return res.json(contact);
        });
    },

    /**
     * contactController.create()
     */
    create: function (req, res) {
        var contact = new contactModel({
        });

        contact.save(function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating contact',
                    error: err
                });
            }
            return res.status(201).json(contact);
        });
    },

    /**
     * contactController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        contactModel.findOne({_id: id}, function (err, contact) {
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
            contact.save(function (err, contact) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contact.',
                        error: err
                    });
                }

                return res.json(contact);
            });
        });
    },

    /**
     * contactController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        contactModel.findByIdAndRemove(id, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the contact.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};