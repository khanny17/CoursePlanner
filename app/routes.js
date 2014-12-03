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
      title : req.body.title,
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

      res.json(plans); // return all todos in JSON format
    });
  });

};
