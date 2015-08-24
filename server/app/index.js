'use strict'; 

var app = require('express')();
var path = require('path');

app.use(require('./logging.middleware'));

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.use('/auth', require('../auth/auth.router'));

['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'].forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		var index = path.join(__dirname, '..', '..', 'public', 'index.html');
		res.sendFile(index);
	});
});

app.use(require('./error.middleware'));

module.exports = app;