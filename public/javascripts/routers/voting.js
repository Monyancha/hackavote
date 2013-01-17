define([
  'jquery',
  'backbone',
  'views/home_view',
  'views/createHackathon_view',
  'collections/events_collection',
  'models/events_model',
  'views/editHackathon_view'
], function (
  $,
  Backbone,
  HomeView,
  CreateHackathonView,
  EventCollection,
  EventsModel,
  EditHackathonView
) {
  return Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'createHackathon': 'createHackathon',
      'editHackathon/:eventId': 'editHackathon',
      'hackathon/:eventId': 'hackathon'
    },

    home: function () {
      var events = new EventCollection();
      events.fetch({
        success: function (collection, response, options) {
          var view = new HomeView({ collection: events });
          $('.main').html(view.render().el);
          console.log('home');
        }
      });
    },

    createHackathon: function () {
      var view = new CreateHackathonView();
      $('.main').html(view.render().el);
      console.log('createHackathon');
    },

    editHackathon: function (id) {
      var model = new EventsModel({ id: id });
      model.fetch({
        success: function (model, respons, options) {
          console.log(model);
          var view = new EditHackathonView({ model: model });
          $('.main').html(view.render().el);
        }
      });
      console.log('editHackathon');
    },

    hackathon: function(eventId) {
      console.log('hackathon', eventId);
    },

    vote: function () {
      console.log('vote');
    }

  });
});
