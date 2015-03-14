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
		//Mounted on '/api/plan'
		router.get('/getAll', endpoints.getAll);
		router.post('/save', endpoints.save);
	}
};

module.exports = {
	init: init
};