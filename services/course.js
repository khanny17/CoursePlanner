var Course = require('../models/course');

var endpoints = {
	getAll: function(req, res){
		Course.find(function(err, courses) {
      		if(err)
        		res.send(err)

      		res.json(courses); 
    	});	
	},

	create: function(req,res) {
		Course.create({
  			name    : req.body.name,
  			dept    : req.body.dept,
  			num     : req.body.num,
  			credits : req.body.cred,
  			details : req.body.details,
  			status  : req.body.status,
  			done    : false
		}, function(err, course) {
  			if(err) {
    			console.log(err);
    			res.status(406).send(err);
    			return;
  			}
  			Course.find(function(err,courses) {
    			if(err)
      				res.send(err);
    			res.json(courses);
  			});
		});
	}
};

var init = {
	route: function(route){
		route.get('/Planner/courses', endpoints.getAll);
		route.post('/Planner/create/course', endpoints.create);
	}
}

module.exports = {
	init: init
};