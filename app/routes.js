//Defines backend routes for the application
var Course = require('./models/course');
var Year   = require('./models/year');
var Plan   = require('./models/plan');
module.exports = function(app,passport) {
  //The landing page
  app.get('/', function(req,res) {
    res.render('index.html');
  });

  //The main application window
  app.get('/Planner', function(req,res) {
    res.render('main.html');
  });

  //Route for saving plans to the database
  app.post('/Planner/save', function(req,res) {
    Plan.create({
      title : req.body.title,
      //I removed putting the years in, needs to be changed for the new model
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

  app.post('/Planner/create/course',function(req,res) {
    Course.create({
      name    : req.body.name,
      dept    : req.body.dept,
      num     : req.body.num,
      cred    : req.body.cred,
      details : req.body.details,
      status  : req.body.status,
      done    : false
    }, function(err, course) {
      if(err)
        res.send(err);

      Course.find(function(err,courses) {
        if(err)
          res.send(err);
        res.json(courses);
      });
    });
  });

  //Gets json of all plans
  app.get('/Planner/plans', function(req, res) {
    Plan.find(function(err, plans) {
      if(err)
	    res.send(err)

      res.json(plans); // return all todos in JSON format
    });
  });

  //Gets json of all courses
  app.get('/Planner/courses', function(req, res) {
    Course.find(function(err, courses) {
      if(err)
	    res.send(err)

      res.json(courses); 
    });
  });

  //Returns the user if logged in or 0 if not
  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  //Attempts to authenticate user from request data
  app.post('/login', passport.authenticate('local-login'), function(req, res) {
    res.send(req.user);
  });

  //Attempts to register a new user from request data
  app.post('/signup', passport.authenticate('local-signup'), function(req, res){
    res.send(req.user);
  });

  //Logs the user out and returns them to the landing page
  app.get('/logout', function(req, res){
    req.logOut();
    res.render('index.html');
  });

  //Used to test if user is authenticated - NOT WORKING and UNUSED
  var auth = function(req, res, next){
    if (!req.isAuthenticated())
      res.send(401);
    else
      next();
  };
};
