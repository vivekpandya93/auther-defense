'use strict';

app.factory('User', function ($http, Story) {
	function User (props) {
		angular.extend(this, props);
	}

	User.url = '/api/users/';

	User.prototype.getUrl = function () {
		return User.url + this._id;
	};

	User.prototype.isNew = function () {
		return !this._id
	};

	User.prototype.fetch = function () {
		var user;
		return $http.put(User.url, {
			method: 'findById',
			arguments: [this._id]
		})
		.then(function (res) {
			user = new User(res.data);
			return $http.put(Story.url, {
				method: 'find',
				arguments: [{author: user._id}]
			});
		})
		.then(function (res) {
			user.stories = res.data;
			return user;
		});
	};

	User.fetchAll = function () {
		return $http.put(User.url, {
			method: 'find',
			arguments: []
		})
		.then(function (res) {
			return res.data.map(function (obj) {
				return new User(obj);
			});
		});
	};

	User.prototype.save = function () {
		var method, args;
		if (this.isNew()) {
			method = 'create';
			args = [this];
		} else {
			method = 'findByIdAndUpdate';
			args = [this._id, this];
		}
		return $http.put(User.url, {
			method: method,
			arguments: args
		})
		.then(function (res) {
			return new User(res.data);
		});
	};

	User.prototype.destroy = function () {
		return $http.put(User.url, {
			method: 'findByIdAndRemove',
			arguments: [this._id]
		});
	};

	return User;
});