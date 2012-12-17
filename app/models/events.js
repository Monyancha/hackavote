var ron = require('../lib/ron');
var Events = ron.get('events', {
  temporal: true                   
});

Events.property('id', { identifier: true });
Events.property('slug', { index: true, unique: true });
Events.property('user', { index: true, type: 'int' });
Events.property('name', {});
Events.property('description', {});
Events.property('votingStatus', { index: true });
Events.property('registrationStatus', { index: true });

module.exports = Events;
