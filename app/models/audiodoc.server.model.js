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
	subject: {
		type: String,
		default: '',
		required: 'Please fill Audiodoc name',
		trim: true
	},
    content: {
      type: String,
      default: ''
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