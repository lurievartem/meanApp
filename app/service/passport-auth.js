var config              = require('../../config/auth'),
    userAuth            = require('./user-auth'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local').Strategy,
    FacebookStrategy    = require('passport-facebook').Strategy,
    TwitterStrategy     = require('passport-twitter').Strategy,
    GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        done({username: username, password: password});
    }
));

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        userAuth({ username: profile.emails[0].value, type: 'facebook', name: profile.name.givenName, password: accessToken }, done);
    }
));

passport.use(new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        userAuth({ username: profile.username, type: 'twitter', name: profile.displayName, password: token }, done);
    }
));

passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        userAuth({ username: profile.emails[0].value, type: 'google', name: profile.displayName, password: accessToken }, done);
    }
));