var util = require('util');
module.exports = function (model) {

  var api = {};

  var list = api.list = function (req, res, next) {
    model.list(req.query , function (err, objects) {
      if (err) {
        return res.send(err, 400);
      }

      res.send(objects, 200);
    });
  };

  var read = api.read = function (req, res, next) {
    model.get({ id: req.params.id }, function (err, object) {
      if (err) {
        return res.send(err, 400); 
      }

      res.send(object, 200);
    });
  };

  var create = api.create = function (req, res, next) {
    model.create(req.body, function (err, object) {
      if (err) {
        return res.send(err, 400);
      }

      res.send(object, 201);
    });
  };

  var update = api.update = function (req, res, next) {
    model.update(req.body, function (err, object) { 
      if (err) {
        return res.send(err, 400);
      }

      res.send(object, 201);
    });
  };

  var del = api.del = function (req, res, next) {
    model.remove(req.params.id, function (err, removed) {
      if (err) {
        return res.send(err, 400);
      }

      res.send(removed+util.format(' %s removed', model.data.name), 204);
    });
  };

  api.mount = function (app) {
    app.get(util.format('/api/v1/%s', model.data.name), list);
    app.get(util.format('/api/v1/%s/:id', model.data.name), read);
    app.post(util.format('/api/v1/%s', model.data.name), create);
    app.put(util.format('/api/v1/%s/:id', model.data.name), update);
    app.del(util.format('/api/v1/%s/:id', model.data.name), del);
  };

  return api;

};

