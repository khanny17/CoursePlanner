//app/api/user.js

(function () {
    'use strict';

    var jwt       = require('jwt-simple');
    var UserModel = require('../models/user');

    var config = require('../../config/config.js');


    var init = function(router) {
        router.post('/register', endpoints.register);
        router.post('/authenticate', endpoints.authenticate);
    };

    var endpoints = {

        register: function(req, res) {
            if (!req.body.email || !req.body.password) {
                return res.json({success: false, msg: 'Please pass email and password.'});
            }

            UserModel.create({
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Email:req.body.email,
                Password: UserModel.hashPassword(req.body.password)
            }).then(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });

        },

        authenticate: function(req, res) {
            UserModel.findOne({
                name: req.body.name
            }, function(err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    var msg = 'Authentication failed. User not found.';
                    res.send({success: false, msg: msg, field: 'name'});
                    console.log(msg);
                } else {
                    // check if password matches
                    user.comparePassword(req.body.password, 
                        function (err, isMatch) {
                            if (isMatch && !err) {
                                // if user is found and password is right create a token
                                var token = jwt.encode(user, config.db.secret);
                                // return the information including token as JSON
                                res.json({success: true, token: 'JWT ' + token});
                                console.log(req.body.name + ' authenticated');
                            } else {
                                var msg = 'Authentication failed. Wrong password.';
                                console.log(msg);
                                res.send({success: false, msg: msg, field: 'password'});
                            }
                        });
                }
            });
        }

    };

    module.exports = {
        init: init
    };

}());
