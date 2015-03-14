var Plan = require('../models/plan');

//Gets json of all plans
  app.get('/Planner/plans', function(req, res) {
    Plan.find(function(err, plans) {
      if(err)
	    res.send(err)

      res.json(plans); // return all todos in JSON format
    });
  });

//Route for saving plans to the database
app.post('/Planner/save', function(req,res) {
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
});