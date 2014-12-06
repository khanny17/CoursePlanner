var express        = require('express');
var app            = express();
var passport       = require('passport');
var flash          = require('connect-flash');
var path           = require ('path');

var mongoose       = require('mongoose');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');

var database = require('./config/database');
mongoose.connect(database.url);

app.use(express.static(path.join(__dirname + '/app')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./config/passport')(passport);
app.use(session({ secret: 'absolutelyandwithoutashredofdoubt' }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./app/routes')(app,passport);

var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port "+port);
