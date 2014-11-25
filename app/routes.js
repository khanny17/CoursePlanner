var Plan = require('./models/plan');
module.exports = function(app) {
  app.get('/', function(req,res) {
    res.sendfile('./index.html');
  });

  app.get('/Planner', function(req,res) {
    res.sendfile('./app/main.html');
  });

  app.post('/Planner', function(req,res) {
    Plan.create({
      json : req.body.years,
      done:false
    }, function(err, todo) {
      if (err)
	res.send(err);

      Plan.find(function(err, todos) {
	if (err)
	  res.send(err)
	res.json(todos);
      });
    });
	
  });

  app.get('/Planner/plans', function(req, res) {
    Plan.find(function(err, plans) {
      if(err)
	res.send(err)

      var last;
      plans.forEach(function(plan) {
        last = plan.json
        console.log(plan.json);
      });
      res.json(last); // return all todos in JSON format
    });
  });

};
