var Sequelize = require('sequelize');
var config = require('../config');

module.exports = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  port: config.mysql.port
});
