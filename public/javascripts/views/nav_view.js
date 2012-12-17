define(['jquery', 'backbone', 'underscore'], function ($, Backbone, _) {
  return Backbone.View.extend({

    events: {
      'click [href="#home"]': 'home',
      'click [href="#createHackathon"]': 'createHackathon'
    },

    home: function (e) {
      e.preventDefault();
      console.log('Go Home!');
      Backbone.history.navigate('/home', { trigger: true, replace: true });
    },

    createHackathon: function (e) {
      e.preventDefault();
      console.log('Go to Create!');
      Backbone.history.navigate('/createHackathon', { trigger: true, replace: true });
    }
  });
});
