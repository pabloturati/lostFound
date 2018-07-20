var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
  const User             = require('../models/User');

passport.use(new FacebookStrategy({
    clientID: "402885660118014",
    clientSecret: "3b04ef42a435a9ceafe38ca2422ed42e",
    callbackURL: "http://localhost:3000/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.displayName }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

passport.serializeUser(function(user,cb){
    cb(null, user)
  });
  
  passport.deserializeUser(function(user,cb){
    cb(null, user)
  })  
  
  module.exports = passport;