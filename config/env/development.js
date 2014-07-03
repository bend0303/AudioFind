'use strict';

module.exports = {
    db: 'mongodb://dbuser:dbpass@ds051459.mongolab.com:51459/audiofind',
    app: {
        title: 'AudioFind - Development Environment'
    },
    facebook: {
        clientID: '760760133944628',
        clientSecret: 'b109ffa998a31f9a882f25b672b6eed8',
        callbackURL: 'http://audiofind.local.com/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
        clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'APP_ID',
        clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};