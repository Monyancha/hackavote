define([
  'jquery',
  'backbone',
  'underscore',
  'templates/home'
], function (
  $,
  Backbone,
  _,
  homeTemplate
) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'home',
    initialize: function (options) {

    },

    render: function () {
      this.$el.append(homeTemplate({
        events: this.collection.toJSON(),
        hackathons: []
       })
      ); 
      return this;
    }
  });
});
