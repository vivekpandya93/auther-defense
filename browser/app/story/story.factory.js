'use strict';

app.factory('Story', function ($http) {
	function Story (props) {
		angular.extend(this, props);
	}

	Story.url = '/api/stories/';

	Story.prototype.getUrl = function () {
		return Story.url + this._id;
	};

	Story.prototype.isNew = function () {
		return !this._id
	};

	Story.prototype.fetch = function () {
		return $http.put(Story.url, {
			method: 'findById',
			arguments: [this._id, undefined, {populate: 'author'}]
		}).then(function (res) {
			return new Story(res.data);
		});
	};

	Story.fetchAll = function () {
		return $http.put(Story.url, {
			method: 'find',
			arguments: [{}, undefined, {populate: 'author'}]
		})
		.then(function (res) {
			return res.data.map(function (obj) {
				return new Story(obj);
			});
		});
	};

	Story.prototype.save = function () {
		var method, args;
		if (this.isNew()) {
			method = 'create';
			args = [this];
		} else {
			method = 'findByIdAndUpdate';
			args = [this._id, this];
		}
		return $http.put(Story.url, {
			method: method,
			arguments: args
		}).then(function (res) {
			return new Story(res.data);
		});
	};

	Story.prototype.destroy = function () {
		return $http.put(Story.url, {
			method: 'findByIdAndRemove',
			arguments: [this._id]
		});
	};

	return Story;
});