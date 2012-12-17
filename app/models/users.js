var ron = require('../lib/ron');
var Users = ron.get('users', {
  temporal: true                   
});
Users.property('id', { identifier: true });
Users.property('email', { index: true, unique: true, type: 'email'});
Users.property('uid', { index: true });
Users.property('username', { index: true });
Users.property('name', {});
Users.property('avatar', {});
Users.property('location', {});
Users.property('url', {});
Users.property('bio', {});

module.exports = Users;
