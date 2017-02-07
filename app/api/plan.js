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
    save: function(req, res) {
        console.log('save called');
        console.log(req.user);
        return;

        Plan.create({
            title : req.body.title,
            json  : req.body.years,
            user  : req.user._id
        }, function(err, plan) {
            if (err)
                res.send(err);

            Plan.find(function(err, plans) {
                if (err)
                    res.send(err)
                res.json(plans);
            });
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
