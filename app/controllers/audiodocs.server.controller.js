'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Audiodoc = mongoose.model('Audiodoc'),
    _ = require('lodash'),
    express = require('express'),
    needle = require('needle'),
    fs = require('fs'),
    S = require('string'),
     mv = require('mv');

var app = express();
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
    if (!req.param('query')) {

        return res.send(400, {


            message: 'Empty query'
        });
    }
    Audiodoc.textSearch(req.param('query'), function (err, audiodocs) {
        if (err) {
            console.log("I'm here" + err);
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            //use lodash to filter for the user relevent only
            var results = _.pluck(audiodocs.results, 'obj');
            var retval = {
                owned: [],
                shared: []
            };
            _.each(results, function (value, key, list) {
                value.content = S(value.content).truncate(580);
            });
            for (var i = 0; i<results.length; i++) {
                if (String(results[i].user) === String(req.user._id)) {
                    retval.owned.push(results[i]);
                } else if (results[i].sharedUser.indexOf(String(req.user._id)) > -1) {
                    retval.shared.push(results[i]);
                }
            }
            res.jsonp(retval);
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

exports.sharedoc = function (req, res, next) {
    var sharedWithUser = req.body.sharedWithUser;
    var sharedDoc = req.body.sharedDoc;
    Audiodoc.findById(sharedDoc._id).exec(function (err, audiodoc) {
        if (err) {
            res.send(400, {
                message: getErrorMessage(err)
            });
        }

        if (!audiodoc) {
            res.send(400, {
                message: getErrorMessage('no doc found')
            });
        }

        audiodoc.sharedUser.push(sharedWithUser.id);
        audiodoc.sharedUser = _.uniq(audiodoc.sharedUser);
        audiodoc.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp("success");
            }
        });

    });


}

exports.uploadRecordedFile = function (req,res,next)
{
    var buf = new Buffer(req.body.data.blob, 'base64'); // decode
    fs.writeFile('public/uploads/'+req.body.subject+'.wav', buf, function(err) {
        if(err) {
            console.log("err", err);
        }
        mv('public/uploads/'+req.body.subject+'.wav', 'public/uploads/'+req.user._id+'/'+req.body.subject+'.wav',{mkdirp: true}, function(err) {
        });

        var audiodoc = new Audiodoc();
        audiodoc.user = req.user;
        audiodoc.subject = req.body.subject;
        audiodoc.content = req.body.content;
        audiodoc.filepath = 'uploads/'+req.user._id+'/'+req.body.subject+'.wav';

        console.log(audiodoc);
        audiodoc.save(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            }
        });
    })


}

exports.uploadFile = function (req, res, next) {
    res._headers['x-frame-options'] = 'SAMEORIGIN';
    console.log(req.files);
    console.log('inside uploadFile'); // <-- never reached using IE9
    var originalName = req.files.file.originalname;

    var options = {
        headers: {
            'Content-Type': 'audio/x-flac; rate=44100'
        }
    }
    var file = fs.createReadStream(req.files.file.path);
    needle.post('http://www.google.com/speech-api/v2/recognize?output=json&maxresults=1&lang=en-us&key=AIzaSyD5rlPiYhD3p-0rRoUQ9QCleq-aN_ZlyGY',
        file, options,
        function (err, resp) {
            if (err) {
                console.log('error');
                res.jsonp("error");
            }

            var parsedResult = JSON.parse(resp.body.substring(14));

            var jsonDoc = req.body;
            jsonDoc.content = parsedResult.result[0]['alternative'][0]['transcript'];


            var newFilePath = 'public/uploads/'+req.user._id+'/'+originalName;
            var newFilePath1 = 'uploads/'+req.user._id+'/'+originalName;
            jsonDoc.filepath = newFilePath1;
            mv(req.files.file.path, newFilePath,{mkdirp: true}, function(err) {});
            var audiodoc = new Audiodoc(jsonDoc);
            audiodoc.user = req.user;
            audiodoc.save(function (err) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                }
            });


            res.jsonp(jsonDoc);

        });

}
