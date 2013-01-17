var config = require('../config');
var nano = require('nano')(config.couchdb.url);
module.exports = nano.use(config.couchdb.database);
