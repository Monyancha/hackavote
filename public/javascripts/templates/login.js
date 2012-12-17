define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/stylesheets/bootstrap-responsive.css"><link rel="stylesheet" href="/stylesheets/font-awesome.css"><link rel="stylesheet" href="/stylesheets/style.css"></head><body><div class="container login"><div class="row"><div class="span12"><h1><i style="margin: 14px 30px 0 0;" class="icon-check"></i>Hackavote </h1><p>Before you can vote you need to login via your GitHub account.</p></div></div><div class="row"><div class="span12"><p><a href="/auth/github" class="btn btn-large"><i class="icon-github"></i>&nbsp;&nbsp;Login via GitHub</a></p></div></div></div><script src="/javascripts/lib/require/require-min.js" data-main="/javascripts/main.js"></script>');
 var userJSON = JSON.stringify(user);
buf.push('<script>var app = app || {};\napp.user = ' + ((interp = userJSON) == null ? '' : interp) + ';</script></body></html>');
}
return buf.join("");
};
});