(function(){
    'use strict';

    //Load environment variables
    require('dotenv').load();

    // Modules 
    var config         = require(__dirname + '/config/config');
    var express        = require('express');
    var app            = express();
    var bodyParser     = require('body-parser');
    var methodOverride = require('method-override');
    var mongoose       = require('mongoose');
    var morgan         = require('morgan');
    var passport       = require('passport');

    require('./config/passport')(passport);



    // Configuration

    //DB
    mongoose.connect(config.db.url, function(err) {
        console.log(err || 'Mongoose Connected Successfully'); //TODO on error, close application
    });//, {authMechanism: 'ScramSHA1'}); 

    // Server port
    var port = process.env.PORT || 8080; 

    // get all data/stuff of the body (POST) parameters
    // parse application/json 
    app.use(bodyParser.json()); 

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override')); 

    // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public')); 

    //tell express to use passport
    app.use(passport.initialize());

    app.use(morgan('combined'));



    //Set up the api endpoints
    require(__dirname + '/app/api/api').init(express, app); 

    //Default route
    app.get('*', function(req, res) {
        res.sendfile(__dirname + '/public/index.html'); // load our public/index.html file
    });

    // Start App 
    app.listen(port);               

    console.log('Server running on ' + port);
}());
