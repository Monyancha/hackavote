var util = require('util');
var _ = require('lodash');
var db = require('../lib/couchdb');
var es = require('../lib/elastic');
var inflection = require('inflection');
module.exports = function (name, version) {

  version = version || 'v1';

  var api = {};

  var list = api.list = function (req, res, next) {
    var query = req.query.q || 'type:'+inflection.singularize(name);
    es.search({ query: query }, function(err, results) {
      if (err) return res.send(err, 400);
      res.send(_.map(results.hits, function (row) {
        return row._source;
      }), 200);
    });
  };

  var read = api.read = function (req, res, next) {
    db.get(req.params.id, function (err, object) {
      if (err) {
        return res.send(err, 400); 
      }

      if (object.type !== inflection.singularize(name)) {
        return res.send(404);
      }

      res.send(object, 200);

    });
  };

  var create = api.create = function (req, res, next) {
    var doc = req.body;
    doc.type = inflection.singularize(name);
    db.insert(doc, function (err, resp) {
      if (err) {
        return res.send(err, 400);
      }

     doc._id = resp.id;
     doc._rev = resp.rev;

     // This code won't return the page util the document is fully indexed
      var timerId = setInterval(function () {
        es.get('hackavote', doc._id, function (err, indexedDoc) {
          if(doc._id === indexedDoc._id && doc._rev === indexedDoc._rev) {
            clearInterval(timerId);
            res.send(doc, 201);
          }
        });
      }, 1000);

    });
  };

  var update = api.update = function (req, res, next) {
    var doc = req.body;
    db.get(req.params.id, function (err, object) {

      if (err) {
        return res.send(err, 400);
      }

      if (object.user && object.user !== req.user._id) {
        return res.send('You shall not pass!', 403);
      }

      db.insert(doc, function (err, resp) {
        if (err) {
          return res.send(err, 400);
        }
        doc._rev = resp.rev;

        // This code won't return the page util the document is fully indexed
        var timerId = setInterval(function () {
          es.get('hackavote', doc._id, function (err, indexedDoc) {
            if(doc._id === indexedDoc._id && doc._rev === indexedDoc._rev) {
              clearInterval(timerId);
              res.send(doc, 201);
            }
          });
        }, 1000);
      });

    });
  };

  var del = api.del = function (req, res, next) {
    db.get(req.params.id, function (err, object) {
      if (err) return res.send(err, 400);
      if (object.user && object.user !== req.user._id) {
        return res.send('You shall not pass!', 403);
      }
      db.destory(object._id, object._rev, function (err, resp) {
        if (err) return res.send(err, 400);
        res.send(204);
      });
    });
  };

  api.mount = function (app) {
    app.get(util.format('/api/%s/%s', version, name), list);
    app.get(util.format('/api/%s/%s/:id', version, name), read);
    app.post(util.format('/api/%s/%s', version, name), create);
    app.put(util.format('/api/%s/%s/:id', version, name), update);
    app.del(util.format('/api/%s/%s/:id', version, name), del);
  };

  return api;

};

