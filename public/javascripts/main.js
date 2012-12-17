require.config({
  paths: {
    underscore: 'lib/lodash/lodash-min',
    jquery: 'lib/jquery/jquery-min',
    backbone: 'lib/backbone/backbone-min',
    bootstrap: 'lib/boostrap/bootstrap',
    'jquery-validation': 'lib/jquery-validation/jquery.validate.min',
    'jquery-validation-additional': 'lib/jquery-validation/additional-methods.min',
    jade: 'templates/jade'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'jquery'
    },
    'jquery-validation': {
      deps: ['jquery'],
      exports: 'jquery'
    },
    'jquery-validation-additional': {
      deps: ['jquery-validation'],
      exports: 'jquery'
    }
  }
});

require(['jquery', 'routers/voting', 'views/nav_view'], function ($, VotingApp, NavView) {
  $(function () {
    var votingApp = new VotingApp();
    Backbone.history.start();
  });
});
