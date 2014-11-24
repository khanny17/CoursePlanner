var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/CoursePlanner');

app.use(express.static(_dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Plan = mongoose.model('Plan', {
//  json : String
});

app.get('/plans', function(req,res) {
  Plan.find(function(err,plans) {
    if(err) {
      res.send(err);
    }
    res.json(plans);
  });
});




app.listen(8080);
console.log("App listening on port 8080");
