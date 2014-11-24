var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost');

app.use(express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Plan = mongoose.model('Plan', {
  json : String
});

app.get('/', function(req,res) {
  res.sendfile('./index.html');
});

app.get('/Planner', function(req,res) {
  res.sendfile('./app/main.html');
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
