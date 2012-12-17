define([
  'jquery',
  'backbone',
  'underscore',
  'templates/createHackathon',
  'models/events_model',
  'jquery-validation-additional'
], function (
  $,
  Backbone,
  _,
  template,
  EventsModel
) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'home',

    initialize: function (options) {
      _.bindAll(this, 'resetForm', 'submit');
    },

    events: {
      'submit form': 'submit',
      'click  button.cancel': 'resetForm'
    },

    render: function () {
      this.$el.append(template({
        host: window.location.host                        
      })); 

      this.validator = this.$el.find('form').validate({
        debug: true,
        rules: {
          slug: { 
            alphanumeric: true,
            remote: {
              url: '/api/v1/checkSlug',
              type: 'post'
            }
          }
        },
        messages: {
          slug: {
            remote: 'This url has already been reserved.'
          }
        },
        validClass: 'success',
        errorPlacement: function (err, element) {
          err.addClass('help-inline');
          element.after(err);
        },
        highlight: function (element, from, to) {
          var controlGroup = $(element).parent().parent();
          if(!controlGroup.hasClass('control-group')) {
            controlGroup = controlGroup.parent();
          }
          controlGroup.addClass(from);
          controlGroup.removeClass(to);
        },
        unhighlight: function (element, from, to) {
          var controlGroup = $(element).parent().parent();
          if(!controlGroup.hasClass('control-group')) {
            controlGroup = controlGroup.parent();
          }
          controlGroup.removeClass(from);
          controlGroup.addClass(to);
        }
      });
      return this;
    },

    resetForm: function (e) {
      e.preventDefault();
      this.$el.find('form [name=name]').val('');
      this.$el.find('form [name=slug]').val('');
      this.$el.find('form [name=description]').val('');
      this.$el.find('form [name=votingStatus]').val('closed');
      this.$el.find('form [name=registrationStatus]').val('closed');
      this.$el.find('.error').removeClass('error');
      this.$el.find('.help-inline').remove();
      this.validator.resetForm();
    },

    submit: function (e) {
      e.preventDefault();
      var eventObj = new EventsModel({
        name: this.$el.find('form [name=name]').val(),
        user: app.user.id,
        slug: this.$el.find('form [name=slug]').val(),
        description: this.$el.find('form [name=description]').val(),
        votingStatus: this.$el.find('form [name=votingStatus]').val(),
        registrationStatus: this.$el.find('form [name=registrationStatus]').val()
      });

      eventObj.save(null, {
        success: function () {
          Backbone.history.navigate('home', { trigger: true, replace: true });
        },
        error: function() {
          console.log('err', arguments);
        }
      });
    }
  });
});
