'use strict'; 

var router = require('express').Router(),
	bodyParser = require('body-parser'),
	session = require('express-session');
// the line below is to avoid a bug...
// if passport-github is *executed* after passport
// it will apparently overwrite some of passport's
// utilities, resulting in an inability for *any*
// login to work, including other oauth plugins
// (e.g. twitter or google) and local login
// so the line below ensures that the passport-github
// code executes before passport's code
require('passport-github');
var passport = require('passport');

var User = require('../api/users/user.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.use(session({
	secret: 'tongiscool',
	resave: false,
	saveUninitialized: false
}));

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, done);
});

router.use(passport.initialize());

router.use(passport.session());

module.exports = router;