var passport = require('passport');
var Plan = require('../models/plan');

var endpoints = {
    //Get all of the logged in user's plans
    getMine: function(req, res) {
        Plan.find({
            user: req.user._id
        }, function(err, plans) {
            if(err) {
                res.status(500).send(err)
            }
            
            res.json(plans);
        });
    },

    load: function(req, res) {
        Plan.findOne({
            _id: req.query.planId
        }, function(err, plan) {
            if(err) {
                return res.status(500).send(err);
            }

            if(plan.user.toString() !== req.user._id.toString()) {
                return res.status(401).send('Not authorized to load this plan');
            }
            
            res.json(plan);
        });
    },

    // Saves plan to db and returns created plan
    save: function(req, res) {
        //If it has an _id, it probably is already in our db
        if(req.body._id){
            return Plan.findOneAndUpdate({
                _id: req.body._id,
                user: req.user._id //can only save it if it is theirs
            }, {
                title : req.body.title,
                years : req.body.years,
                public: req.body.public
            }, {
                new: true //return the updated object
            }, function(err, plan) {
                if(err) {
                    return res.status(500).send(err);
                }

                res.send(plan);
            });
        }

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
    router.get('/getMine', passport.authenticate('jwt', { session: false }), endpoints.getMine);
    router.get('/load', passport.authenticate('jwt', { session: false }), endpoints.load);
    router.post('/save', passport.authenticate('jwt', { session: false }), endpoints.save);
};

module.exports = {
    init: init
};
