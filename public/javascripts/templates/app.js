define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/stylesheets/bootstrap-responsive.css"><link rel="stylesheet" href="/stylesheets/font-awesome.css"><link rel="stylesheet" href="/stylesheets/style.css"></head><body><div class="navbar navbar-fixed-top"><div class="navbar-inner"><div class="container"><a class="brand"><i style="margin: 5px 10px 0 0;" class="icon-check"></i>Hackavote</a><ul class="nav"><li><a href="#home">Home</a></li><li><a href="#createHackathon">Create a Hackathon</a></li></ul><div class="pull-right"><ul class="nav"><li><p class="navbar-text"> <img');
buf.push(attrs({ terse: true, 'src':('' + (user.avatar) + ''), 'style':("width: 25; height: 25px; margin: 0 5px 0 0; border: 1px solid #666;") }, {"src":true,"style":true}));
buf.push('>' + escape((interp = user.name) == null ? '' : interp) + '</p></li><li class="divider-vertical"></li><li><a href="/logout">Logout</a></li></ul></div></div></div></div><script src="/javascripts/lib/require/require-min.js" data-main="/javascripts/main.js"></script>');
 var userJSON = JSON.stringify(user);
buf.push('<script>var app = app || {};\napp.user = ' + ((interp = userJSON) == null ? '' : interp) + ';</script></body></html>');
}
return buf.join("");
};
});