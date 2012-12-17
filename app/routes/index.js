/*
 * GET home page.
 */
var index = module.exports.index = function(req, res){
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('index', { 
    title: 'Hackathon Voting System',
    dataJSON: JSON.stringify({
      events: [],
      hackathons: []
    })
  });
};

var login = module.exports.login = function (req, res, next) {
  res.render('login', { 
    title: 'Hackathon Voting System'
  });
};

var logout = module.exports.logout = function (req, res, next) {
  req.logout();
  res.redirect('/login');
};

module.exports.mount = function (app) {
  app.get('/', index);
  app.get('/login', login);
  app.get('/logout', logout);
};
