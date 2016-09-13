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
        var contact = new contactModel({			name : req.body.name,			photo : req.body.photo,			nickname : req.body.nickname,			company : req.body.company,			jobtitle : req.body.jobtitle,			home : req.body.home,			email : req.body.email,			mobile : req.body.mobile,			address : req.body.address,			birthday : req.body.birthday,			notes : req.body.notes,			owner : req.body.owner
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

            contact.name = req.body.name ? req.body.name : contact.name;			contact.photo = req.body.photo ? req.body.photo : contact.photo;			contact.nickname = req.body.nickname ? req.body.nickname : contact.nickname;			contact.company = req.body.company ? req.body.company : contact.company;			contact.jobtitle = req.body.jobtitle ? req.body.jobtitle : contact.jobtitle;			contact.home = req.body.home ? req.body.home : contact.home;			contact.email = req.body.email ? req.body.email : contact.email;			contact.mobile = req.body.mobile ? req.body.mobile : contact.mobile;			contact.address = req.body.address ? req.body.address : contact.address;			contact.birthday = req.body.birthday ? req.body.birthday : contact.birthday;			contact.notes = req.body.notes ? req.body.notes : contact.notes;			contact.owner = req.body.owner ? req.body.owner : contact.owner;			
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
