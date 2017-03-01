/**
 * REST endpoints for Plan data
 * @namespace api/plan
 */

var passport = require('passport');
var Plan = require('../models/plan');

var endpoints = {
    /** 
     * Get all of the logged in user's plans 
     * @function 
     * @memberof api/plan
     * @instance
     */
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

    /** 
     * Get all of the public plans at the user's school
     * @function 
     * @memberof api/plan
     * @instance
     */
    getPublic: function(req, res) {
        Plan.find({
            school: req.user.school,
            public: true
        }, function(err, plans) {
            if(err) {
                res.status(500).send(err)
            }
            
            res.json(plans);
        });
    },

    /** 
     * Send the plan data for the given plan ID (if the user is authorized)
     * @function 
     * @memberof api/plan
     * @param req.query.planId The _id of the plan
     * @instance
     */
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

    /** 
     * Saves plan to db and returns created plan
     * @function save
     * @memberof api/plan
     * @param req.body._id The _id of the plan
     * @param req.body.title New title of the plan
     * @param req.body.years New json object holding the plan data
     * @param req.body.public New public flag value
     * @param req.body.colorscheme New colorscheme data
     * @instance
     */
    save: function(req, res) {
        //If it has an _id, it probably is already in our db
        if(req.body._id){
            return Plan.findOneAndUpdate({
                _id: req.body._id,
                user: req.user._id //can only save it if it is theirs
            }, {
                title : req.body.title,
                years : req.body.years,
                public: req.body.public,
                colorscheme: req.body.colorscheme
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
            colorscheme: req.body.colorscheme,
            user   : req.user._id
        }, function(err, plan) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(plan);
        });
    },

    /** 
     * Makes given plan private
     * @function
     * @memberof api/plan
     * @instance
     */
    makePrivate: function(req, res) {
        helpers.setPublic(req, res, false);
    },

    /**
     * Makes given plan public
     * @function 
     * @memberof api/plan
     * @instance
     */
    makePublic: function(req, res) {
        helpers.setPublic(req, res, true);
    }
};

var helpers = {
    setPublic: function(req, res, newPublicValue) {
        if(req.body._id) {
            return Plan.findOneAndUpdate({
                _id: req.body._id,
                user: req.user._id
            }, {
                public: newPublicValue
            }, {
                new: true //return the updated object
            }, function(err, plan) {
                if(err) {
                    res.status(500).send(err);
                }

                res.send(plan);
            });
        }

        res.status(500).send('No Plan id provided');
    }
};

var init = function(router) {
    //Mounted on '/api/plan'
    router.get('/getMine', passport.authenticate('jwt', { session: false }), endpoints.getMine);
    router.get('/getPublic', passport.authenticate('jwt', { session: false }), endpoints.getPublic);
    router.get('/load', passport.authenticate('jwt', { session: false }), endpoints.load);
    router.post('/save', passport.authenticate('jwt', { session: false }), endpoints.save);
    router.post('/makePrivate', passport.authenticate('jwt', { session: false }), endpoints.makePrivate);
    router.post('/makePublic', passport.authenticate('jwt', { session: false }), endpoints.makePublic);
};

module.exports = {
    init: init
};
