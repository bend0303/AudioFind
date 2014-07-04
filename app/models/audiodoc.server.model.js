'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    textSearch = require('mongoose-text-search');

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
    filepath: {
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
    },
    sharedUser: {
        type: [String],
        default: ''
    }
});
AudiodocSchema.index({ content: 'text' });
AudiodocSchema.plugin(textSearch);


var AudiodocModel = mongoose.model('Audiodoc', AudiodocSchema);
