'use strict';

var router = require('express').Router();

var User = require('./user.model');

router.use(function (req, res, next) {
	var methodName = req.body.method,
		args = req.body.arguments;
	User[methodName].apply(User, args)
	.then(function (data) {
		res.json(data);
	})
	.then(null, next);
});

module.exports = router;