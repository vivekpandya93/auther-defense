'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');

router.use(function (req, res, next) {
	next(HttpError(404));
});

router.use(function (err, req, res, next) {
	err.status = err.status || 500;
	console.error(err.stack);
	res.status(err.status).send([
		'<html><body>',
		'<p>VERB: ', req.method, '</p>',
		'<p>URL: ', req.originalUrl, '</p>',
		'<p>QUERY ', JSON.stringify(req.query), '</p>',
		'<p>BODY: ', JSON.stringify(req.body), '</p>',
		'<pre>', err.stack, '</pre>',
		'</body></html>'
	].join(''));
});

module.exports = router;