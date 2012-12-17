var passport = require('passport');
var Users = require('../models/users');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('../config');
var _ = require('lodash');

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.get({ id: id }, function (err, record) {
    if (err) return done(err);
    done(null, record);
  });
});

passport.use(new GitHubStrategy(config.github, function(accessToken, refreshToken, profile, done) {

  var uid = profile.provider+'-'+profile.id;
  Users.list({ uid: uid }, function (err, users) {
    if (err) {
      console.log(err.stack);
      done(err);
    }

    if (users[0]) {
      Users.update({
        id: users[0].id,
        uid: profile.provider+'-'+profile.id,
        name: profile.displayName,
        url: profile.profileUrl,
        email: profile._json.email,
        username: profile._json.login,
        avatar: profile._json.avatar_url,
        location: profile._json.location,
        bio: profile._json.bio
      }, function (err, user) {
        done(null, user);
      });
      return;
    }

    Users.create({
      uid: profile.provider+'-'+profile.id,
      name: profile.displayName,
      url: profile.profileUrl,
      email: profile._json.email,
      username: profile._json.login,
      avatar: profile._json.avatar_url,
      location: profile._json.location,
      bio: profile._json.bio
    }, function (err, user) {
      if (err) {
        console.log(err.stack);
        return done(err);
      }
      done(null, user); 
    });
  });
}));

module.exports = passport;

passport.mount = function (app) {
  
  app.get('/auth/github', passport.authenticate('github'), function (req, res, next) {
    // do nothing
  });

  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res, next) {
      res.redirect('/');       
    }
   );
};

passport.restrict = function (options) {

  return function (req, res, next) {

    if (req.user) {
      return next();
    }

    if (req.url.match(/javascripts|images|stylesheets|font|login|auth/)) {
      req.user = false;
      return next();
    }

    res.redirect('/login');
  };

};
