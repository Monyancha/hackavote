define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><div class="row"><div class="span12"><h2>Create a Hackathon</h2><p>Use the form below to create your Hackathon Event.  (* required fields)</p><form class="form-horizontal well"><div class="control-group"><label for="name" class="control-label">Name *</label><div class="controls"><input name="name" type="text" class="span5 required"/></div></div><div class="control-group"><label for="slug" class="control-label">URL * </label><div class="controls"><div class="input-prepend"><span class="add-on">http://' + escape((interp = host) == null ? '' : interp) + '/#hackathon/</span><input name="slug" type="text" class="required"/></div></div></div><div class="control-group"><label for="description" class="control-label">Description</label><div class="controls"><textarea name="description" class="span5"></textarea></div></div><div class="control-group"><label for="votingStatus" class="control-label">Voting Status </label><div class="controls"><select name="votingStatus"><option value="closed">Closed</option><option value="open">Open</option></select></div></div><div class="control-group"><label for="registrationStatus" class="control-label">Team Registration </label><div class="controls"><select name="registrationStatus"><option value="closed">Closed</option><option value="open">Open</option></select></div></div><div class="form-actions"><button type="submit" class="btn btn-primary">Create Hackathon</button>&nbsp;<button type="button" class="btn cancel">Cancel</button></div></form></div></div></div>');
}
return buf.join("");
};
});