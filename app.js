var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override');



var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

// Map global promises

mongoose.Promise = global.Promise;

// Mongoose connect google


mongoose.connect('mongodb://alex:alex@ds163494.mlab.com:63494/twitterapp', {
    useMongoClient:true
})

.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


var routes = require('./routes/index');
var api = require('./routes/api');

var account = require('./routes/account');
var users = require('./routes/users');

var auth = require('./routes/auth');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
	defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// MethodOverride Middleware

app.use(methodOverride('_method'))

app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;
		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Load User Model
require('./models/user');

// Passport config
require('./config/passport')(passport);

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
    
	res.locals.fail_msg = req.flash('fail_msg');
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
    
});

app.get('/', routes);
app.get('/api', api);

app.post('/account', account);
app.use('/users', users);
app.get('/register', users);
app.get('/login', users);

app.use('/auth', auth);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('')
	console.log('Server started on localhost:' + app.get('port'));
	console.log('')
});