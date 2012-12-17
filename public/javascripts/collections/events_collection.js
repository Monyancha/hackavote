define(['backbone', 'models/events_model'], function (Backbone, EventsModel) {
  return Backbone.Collection.extend({
    url: '/api/v1/events',
    model: EventsModel
  });
});
