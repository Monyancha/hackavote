define([
  'jquery',
  'backbone',
  'views/home_view',
  'views/createHackathon_view',
  'collections/events_collection'
], function (
  $,
  Backbone,
  HomeView,
  CreateHackathonView,
  EventCollection
) {
  return Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'createHackathon': 'createHackathon',
      'hackathon/:eventId': 'hackathon'
    },

    home: function () {
      var events = new EventCollection();
      events.fetch({
        success: function (collection, resposne, options) {
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

    hackathon: function(eventId) {
      console.log('hackathon', eventId);
    },

    vote: function () {
      console.log('vote');
    }

  });
});
