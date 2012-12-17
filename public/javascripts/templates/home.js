define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><div class="row"><div class="span12 events">');
if ( events.length)
buf.push('<h2>Your Hackathons </h2><table class="table table-striped"><tbody>');
// iterate events
;(function(){
  if ('number' == typeof events.length) {
    for (var $index = 0, $$l = events.length; $index < $$l; $index++) {
      var event = events[$index];

buf.push('<tr><td><h4><a');
buf.push(attrs({ 'href':('#hackathon/' + (event.slug) + '') }, {"href":true}));
buf.push('>' + escape((interp = event.name) == null ? '' : interp) + '</a></h4></td><td>');
if ( event.votingStatus === 'open')
{
buf.push('<span class="label label-info">Voting Open</span>');
}
else
{
buf.push('<span class="label label-important">Voting Closed </span>');
}
buf.push('&nbsp;');
if ( event.registrationStatus === 'open')
{
buf.push('<span class="label label-info">Registration Open </span>');
}
else
{
buf.push('<span class="label label-important">Registration Closed </span>');
}
buf.push('</td><td class="controls"><a');
buf.push(attrs({ 'href':('#editHackathon/' + (event.id) + ''), "class": ('btn') + ' ' + ('btn-small') }, {"href":true}));
buf.push('><i style="margin: 3px 0 0 0" class="icon-pencil"></i>Edit</a></td></tr>');
    }
  } else {
    for (var $index in events) {
      var event = events[$index];

buf.push('<tr><td><h4><a');
buf.push(attrs({ 'href':('#hackathon/' + (event.slug) + '') }, {"href":true}));
buf.push('>' + escape((interp = event.name) == null ? '' : interp) + '</a></h4></td><td>');
if ( event.votingStatus === 'open')
{
buf.push('<span class="label label-info">Voting Open</span>');
}
else
{
buf.push('<span class="label label-important">Voting Closed </span>');
}
buf.push('&nbsp;');
if ( event.registrationStatus === 'open')
{
buf.push('<span class="label label-info">Registration Open </span>');
}
else
{
buf.push('<span class="label label-important">Registration Closed </span>');
}
buf.push('</td><td class="controls"><a');
buf.push(attrs({ 'href':('#editHackathon/' + (event.id) + ''), "class": ('btn') + ' ' + ('btn-small') }, {"href":true}));
buf.push('><i style="margin: 3px 0 0 0" class="icon-pencil"></i>Edit</a></td></tr>');
   }
  }
}).call(this);

buf.push('</tbody></table></div></div><div class="row"><div class="span12"><h2>Hackathons  </h2>');
if ( hackathons.length)
{
buf.push('<p>Below are the Hackathons you are participating in.</p>');
}
else
{
buf.push('<p>You are not currently participating in any Hackathons.</p>');
}
buf.push('</div></div></div>');
}
return buf.join("");
};
});