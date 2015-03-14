var Course = require('./models/course');


  //Gets json of all courses
  app.get('/Planner/courses', function(req, res) {
    Course.find(function(err, courses) {
      if(err)
        res.send(err)

      res.json(courses); 
    });
  });


app.post('/Planner/create/course',function(req,res) {

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
    res.status(406);
    res.send(err);
    return;
  }
  Course.find(function(err,courses) {
    if(err)
      res.send(err);
    res.json(courses);
  });
});
});