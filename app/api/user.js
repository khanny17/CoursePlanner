//app/api/user.js

(function () {
    'use strict';

    var jwt       = require('jwt-simple');
    var UserModel = require('../models/user');

    var config = require('../../config/config');


    var init = function(router) {
        router.post('/register', endpoints.register);
        router.post('/authenticate', endpoints.authenticate);
    };

    var endpoints = {

        register: function(req, res) {
            if (!req.body.username || !req.body.password) {
                var msg = 'Please pass username and password.';
                console.log(msg);
                return res.json({success: false, msg: msg});
            }

            UserModel.create({
                username:req.body.username,
                password: req.body.password,
                school: req.body.school
            }, function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });

        },

        authenticate: function(req, res) {
            UserModel.findOne({
                username: req.body.username
            }, function(err, user) {
                if (err || !user) {
                    var msg = err || 'Authentication failed. User not found.';
                    res.send({ 
                        success: false, 
                        msg: msg, 
                        fields: ['username']
                    });
                    console.log(msg);
                    return;
                }

                // check if password matches
                user.comparePassword(req.body.password, 
                    function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.encode(user, config.db.secret);
                            // return the information including token as JSON
                            // Also include user data, but NOT the sensitive stuff!
                            var cleanedUser = user.toJSON();
                            delete cleanedUser.password;

                            res.json({
                                success: true, 
                                token: 'JWT ' + token,
                                user: cleanedUser
                            });
                            console.log(req.body.username + ' authenticated');
                        } else {
                            var msg = 'Authentication failed. Wrong password.';
                            res.send({
                                success: false, 
                                msg: msg, 
                                fields: ['password']
                            });
                            console.log(msg);
                        }
                    });
            });
        }

    };

    module.exports = {
        init: init
    };

}());
