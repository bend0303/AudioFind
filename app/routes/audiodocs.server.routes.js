'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var audiodocs = require('../../app/controllers/audiodocs.server.controller');

	// Audiodocs Routes
	app.route('/audiodocs')
		.get(audiodocs.list)
		.post(users.requiresLogin, audiodocs.create);

	app.route('/audiodocs/:audiodocId')
		.get(audiodocs.read)
		.put(users.requiresLogin, audiodocs.hasAuthorization, audiodocs.update)
		.delete(users.requiresLogin, audiodocs.hasAuthorization, audiodocs.delete);

    app.route('/audiodocs/search/:query')
        .get(users.requiresLogin, audiodocs.audiodocFTSearch);

	// Finish by binding the Audiodoc middleware
	app.param('audiodocId', audiodocs.audiodocByID);
};