var passport = require('passport');
var Plan = require('../models/plan');

var endpoints = {
    getPlans: function(req, res) {
        Plan.find({
            user: req.user._id
        }, function(err, plans) {
            if(err) {
                res.status(500).send(err)
            }
            
            res.json(plans);
        });
    },

    // Saves plan to db and returns created plan
    save: function(req, res) {
        Plan.create({
            title  : req.body.title,
            years  : req.body.years,
            public : req.body.public,
            school : req.user.school,
            user   : req.user._id
        }, function(err, plan) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(plan);
        });
    }
};

var init = function(router) {
    //Mounted on '/api/plan'
    router.get('/getPlans', passport.authenticate('jwt', { session: false }), endpoints.getPlans);
    router.post('/save', passport.authenticate('jwt', { session: false }), endpoints.save);
};

module.exports = {
    init: init
};
