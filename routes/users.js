var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var {ensureAuthenticated} = require('../helpers/auth');


router.get('/register', function(req, res) {
	res.render('register');
});



router.get('/login', function(req, res) {
	res.render('login');
});



router.post('/register', function(req, res) {
    
    

});


passport.use(new LocalStrategy(function(username, password, done) {
	User.getUserByUsername(username, function(err, user) {
		if (err) throw err;
		if (!user) {
			return done(null, false, {
				message: 'Ogiltiga uppgifter'
			});
		}
        
        
		User.comparePassword(password, user.password, function(err, isMatch) {
			if (err) throw err;
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: 'Ogiltigt lösenord'
				});
			}
		});
	});
}));


passport.serializeUser(function(user, done) {
	done(null, user.id);
});


passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});


router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}), function(req, res) {
	res.redirect('/');
});


router.get('/logout', function(req, res) {
	req.logout();
	
	res.redirect('../auth/logout');
});

module.exports = router;