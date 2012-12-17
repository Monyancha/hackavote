var Events = require('../../models/events');
var api = require('../api');
var eventsApi = api(Events);

eventsApi.checkSlug = function (req, res, next) {
  Events.list({ slug: req.body.slug }, function (err, events) {
    console.log(events);
    res.json(events.length === 0, 200);
  });
};

var oldMount = eventsApi.mount;

eventsApi.mount = function (app) {
  app.post('/api/v1/checkSlug', eventsApi.checkSlug);
  return oldMount(app);
};

module.exports = eventsApi;
