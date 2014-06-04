'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var audiodocs = require('../../app/controllers/audiodocs');

	// Audiodocs Routes
	app.route('/audiodocs')
		.get(audiodocs.list)
		.post(users.requiresLogin, audiodocs.create);

	app.route('/audiodocs/:audiodocId')
		.get(audiodocs.read)
		.put(users.requiresLogin, audiodocs.hasAuthorization, audiodocs.update)
		.delete(users.requiresLogin, audiodocs.hasAuthorization, audiodocs.delete);

	// Finish by binding the Audiodoc middleware
	app.param('audiodocId', audiodocs.audiodocByID);
};