'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Audiodoc = mongoose.model('Audiodoc'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Audiodoc already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Audiodoc
 */
exports.create = function(req, res) {
	var audiodoc = new Audiodoc(req.body);
	audiodoc.user = req.user;

	audiodoc.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(audiodoc);
		}
	});
};

/**
 * Show the current Audiodoc
 */
exports.read = function(req, res) {
	res.jsonp(req.audiodoc);
};

/**
 * Update a Audiodoc
 */
exports.update = function(req, res) {
	var audiodoc = req.audiodoc ;

	audiodoc = _.extend(audiodoc , req.body);

	audiodoc.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(audiodoc);
		}
	});
};

/**
 * Delete an Audiodoc
 */
exports.delete = function(req, res) {
	var audiodoc = req.audiodoc ;

	audiodoc.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(audiodoc);
		}
	});
};

/**
 * List of Audiodocs
 */
exports.list = function(req, res) { Audiodoc.find().sort('-created').populate('user', 'displayName').exec(function(err, audiodocs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(audiodocs);
		}
	});
};

/**
 * Audiodoc middleware
 */
exports.audiodocByID = function(req, res, next, id) { Audiodoc.findById(id).populate('user', 'displayName').exec(function(err, audiodoc) {
		if (err) return next(err);
		if (! audiodoc) return next(new Error('Failed to load Audiodoc ' + id));
		req.audiodoc = audiodoc ;
		next();
	});
};

/**
 * Audiodoc authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.audiodoc.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};