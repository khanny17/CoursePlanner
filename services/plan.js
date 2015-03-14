var Plan = require('../models/plan');

var endpoints = {
	getAll: function(req, res) {
    	Plan.find(function(err, plans) {
      		if(err)
	    		res.status(500).send(err)

      		res.json(plans);
    	});
  	},
  	save: function(req, res) {
  		Plan.create({
	        title : req.body.title,
	        json  : req.body.years,
	        user  : req.body.user,
	        done  : false
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

var init = {
	route: function(router) {
		router.get('/Planner/plans', endpoints.getAll);
		router.post('/Planner/save', endpoints.save);
	}
};

module.exports = {
	init: init
};