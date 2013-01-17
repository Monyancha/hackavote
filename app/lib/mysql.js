var Client  = require("mysql/lib/client");
var config = require('../config');
var Pool = require('generic-pool').Pool;

var pool = {
  mysql: Pool({
    name: "mysql",
    create: function (callback) {
      var client = require("mysql").createClient(config.mysql);
      return callback(client);
    },
    destroy: function (client) {
      return client.end();
    },
    max: 30,
    min: 10,
    idleTimeoutMillis: 60 * 1000,
    log: false
  })
};

module.exports.query = function (sql, values, callback) {
  pool.mysql.acquire(function (err, client) {
    if (err) {
      return callback(err);
    }

    if (typeof values === "function") {
      callback = values;
      values = [];
    }

    client.query(sql, values, function () {
      // This is some kung foo trickery that I swiped from the Coffee Script splats
      var __slice = [].slice;
      var queryArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      pool.mysql.release(client);
      callback.apply(null, queryArgs);
    });
  });
};

module.exports.escape = Client.prototype.escape; 
module.exports.end = function (callback) {
  callback();
};
