var api = require('../api');
var es = require('../../lib/elastic');
var eventsApi = api('events');

eventsApi.checkSlug = function (req, res, next) {

  es.search({ query: 'slug:'+req.body.slug }, function (err, results) {
    console.log(req.body, results);
    if (results.total > 0 && results.hits[0]._id === req.body.event_id) {
      return res.json(true, 200);
    }

    res.json(results.total === 0, 200);
  });
};

var oldMount = eventsApi.mount;

eventsApi.mount = function (app) {
  app.post('/api/v1/checkSlug', eventsApi.checkSlug);
  return oldMount(app);
};

module.exports = eventsApi;
