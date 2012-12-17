define(['jquery', 'backbone', 'views/nav_view'], function ($, Backbone, NavView) {
  return Backbone.Router.extend({
    routes: {
      '.*': 'navigation'
    },

    navigation: function () {
      console.log('navigation');
      var navView = new NavView({
        el: $('.navbar')
      });
    }
  });
});
