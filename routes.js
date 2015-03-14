//Defines backend routes for the application
module.exports = function(app,passport) {
  //The landing page
  app.get('/', function(req,res) {
    res.render('index.html');
  });
 
  //The main application window
  app.get('/Planner', function(req,res) {
    res.render('main.html');
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
