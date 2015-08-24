'use strict';

var router = require('express').Router();

var Story = require('./story.model');

router.use(function (req, res, next) {
	var methodName = req.body.method,
		args = req.body.arguments;
	Story[methodName].apply(Story, args)
	.then(function (data) {
		res.json(data);
	})
	.then(null, next);
});

module.exports = router;