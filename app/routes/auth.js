var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var db = require('../lib/couchdb');
var es = require('../lib/elastic');
var config = require('../config');
var _ = require('lodash');

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  db.get(id, function (err, body) {
    if(err) return done(); 
    done(null, body);
  });
});

passport.use(new GitHubStrategy(config.github, function(accessToken, refreshToken, profile, done) {

  var uid = profile.provider+'-'+profile.id;

  es.search({ query: 'uid:'+uid+' AND type:user' }, function (err, results, res) {
    if (err) return done(err);
    if (results.total > 0) {
      var user = results.hits[0]._source;
      user.name = profile.displayName;
      user.url = profile.profileUrl;
      user.email = profile._json.email;
      user.username = profile._json.login;
      user.avatar_url = profile._json.avatar_url;
      user.location = profile._json.location;
      user.bio = profile._json.bio;

      db.insert(user, user._id, function (err, body) {
        if (err) return done(err);
        user._rev = body.rev;
        return done(null, user);
      });

      return;
    }

    var newUser = {
      uid: profile.provider+'-'+profile.id,
      type: 'user',
      name: profile.displayName,
      url: profile.profileUrl,
      email: profile._json.email,
      username: profile._json.login,
      avatar: profile._json.avatar_url,
      location: profile._json.location,
      bio: profile._json.bio
    };

    db.insert(newUser, function (err, body) {
      if (err) return done(err);         
      newUser._id = body.id;
      newUser._rev = body.rev;
      done(null, newUser);
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
