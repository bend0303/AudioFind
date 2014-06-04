'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Audiodoc Schema
 */
var AudiodocSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Audiodoc name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Audiodoc', AudiodocSchema);