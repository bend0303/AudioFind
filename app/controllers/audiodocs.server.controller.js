'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Audiodoc = mongoose.model('Audiodoc'),
    _ = require('lodash'),
    express = require('express'),
    http = require('http'),
    needle = require('needle'),
    fs = require('fs');
    S = require('string');


/**
 * Get the error message from error object
 */
var getErrorMessage = function (err) {
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
exports.create = function (req, res) {
    var audiodoc = new Audiodoc(req.body);
    audiodoc.user = req.user;

    audiodoc.save(function (err) {
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
exports.read = function (req, res) {
    res.jsonp(req.audiodoc);
};

/**
 * Update a Audiodoc
 */
exports.update = function (req, res) {
    var audiodoc = req.audiodoc;

    audiodoc = _.extend(audiodoc, req.body);

    audiodoc.save(function (err) {
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
exports.delete = function (req, res) {
    var audiodoc = req.audiodoc;

    audiodoc.remove(function (err) {
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
exports.list = function (req, res) {
    Audiodoc.find().sort('-created').populate('user', 'displayName').exec(function (err, audiodocs) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(audiodocs);
        }
    });
};

exports.audiodocFTSearch = function (req, res) {
    if (!req.param('query'))
        return res.send(400, {
            message: 'Empty query'
        });
    Audiodoc.textSearch(req.param('query'), function (err, audiodocs) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            //use lodash to filter for the user relevent only
            var results =_.pluck(audiodocs.results, 'obj');
            _.each(results, function (value, key, list) {
                value.content =  S(value.content).truncate(580);
            });

            res.jsonp(results);
        }

    });

};

/**
 * Audiodoc middleware
 */
exports.audiodocByID = function (req, res, next, id) {
    Audiodoc.findById(id).populate('user', 'displayName').exec(function (err, audiodoc) {
        if (err) return next(err);
        if (!audiodoc) return next(new Error('Failed to load Audiodoc ' + id));
        req.audiodoc = audiodoc;
        next();
    });
};

/**
 * Audiodoc authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.audiodoc.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
    }
    next();
};

exports.uploadPhoto = app.use(function(req, res) {
    console.log('inside uploadPhoto'); // <-- never reached using IE9

    //fs.createReadStream('eat.flac').pipe(request.post('http://www.google.com/speech-api/v2/recognize?output=json&lang=en-us&key=AIzaSyD5rlPiYhD3p-0rRoUQ9QCleq-aN_ZlyGY'));
//    fs.createReadStream('eat.flac').pipe(request.post('http://www.google.com/speech-api/v2/recognize?output=json&lang=en-us&key=AIzaSyD5rlPiYhD3p-0rRoUQ9QCleq-aN_ZlyGY',
//        function optionalCallback (err, httpResponse, body) {
//        if (err) {
//            return console.error('upload failed:', err);
//        }
//        console.log('Upload successful!  Server responded with:', httpResponse);
//        console.log('Upload successful!  Server responded with:', body);
//    }));
    needle.defaults({'content-type' :'audio/x-flac; rate=44100'});
    var file = fs.createReadStream('eat.flac');

    var options = {
        headers: {
            'Content-Type': 'audio/x-flac; rate=44100'
        }
    }


    needle.post('http://www.google.com/speech-api/v2/recognize?output=json&lang=en-us&key=AIzaSyD5rlPiYhD3p-0rRoUQ9QCleq-aN_ZlyGY',
        file,options,
        function(err, resp, body) {
            if (err)
            {
                console.log('error');
            }
        console.log(resp,body);
    });
