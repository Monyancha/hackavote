define([
  'jquery',
  'backbone',
  'underscore',
  'templates/editHackathon',
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
    className: 'editHackathon',

    initialize: function (options) {
      _.bindAll(this, 'submit');
    },

    events: {
      'submit form': 'submit'
    },

    render: function () {
      var self = this;
      this.$el.append(template({
        host: window.location.host                        
      })); 

      this.$el.find('form [name=name]').val(this.model.get('name'));
      this.$el.find('form [name=slug]').val(this.model.get('slug'));
      this.$el.find('form [name=description]').val(this.model.get('description'));
      this.$el.find('form [name=votingStatus]').val(this.model.get('votingStatus'));
      this.$el.find('form [name=registrationStatus]').val(this.model.get('registrationStatus'));

      this.validator = this.$el.find('form').validate({
        debug: true,
        rules: {
          slug: { 
            alphanumeric: true,
            remote: {
              url: '/api/v1/checkSlug',
              type: 'post',
              data: {
                slug: function () {
                  return self.$el.find('form [name=slug]').val();
                },
                event_id: this.model.id
              }
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

    submit: function (e) {
      var self = this;
      e.preventDefault();

      console.log(this.$el.find('button[type=submit]'));
      this.$el.find('button[type=submit]').html('Saving...').attr('disabled','disabled').addClass('disabled');
      this.$el.find('.btn.cancel').hide();

      var data = {
        name: this.$el.find('form [name=name]').val(),
        slug: this.$el.find('form [name=slug]').val(),
        description: this.$el.find('form [name=description]').val(),
        votingStatus: this.$el.find('form [name=votingStatus]').val(),
        registrationStatus: this.$el.find('form [name=registrationStatus]').val()
      };

      this.model.save(data, {
        success: function () {
          Backbone.history.navigate('home', { trigger: true, replace: true });
        },
        error: function() {
          self.$el.find('button[type=submit]').html('Save Hackathon').removeAttr('disabled').removeClass('disabled');
          self.$el.find('.btn.cancel').show();
          self.$el.find('form').before('<div class="alert alert-danger"><strong>Holy Cats!</strong> Your request failed. Either you don\'t have premission to edit this page or something terrible happened on our end. Either way this isn\'t going to happen.</div>');
          console.log('err', arguments);
        }
      });
    }
  });
});
