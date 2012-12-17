var ron = require('ron');
var config = require('../config');
module.exports = ron(config.redis);
