define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" href="/stylesheets/bootstrap.min.css"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/stylesheets/bootstrap-responsive.css"><link rel="stylesheet" href="/stylesheets/font-awesome.css"><link rel="stylesheet" href="/stylesheets/style.css"></head><body><script src="/javascripts/lib/require/require-min.js" data-main="/javascripts/main.js"></script>');
 var userJSON = JSON.stringify(user);
buf.push('<script>var app = app || {};\napp.user = ' + ((interp = userJSON) == null ? '' : interp) + ';</script></body></html>');
}
return buf.join("");
};
});