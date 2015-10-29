'use strict';

var _ = require('lodash');
var Store = require('./store.model');
var User = require('../user/user.model');

function findStoreById(user, id) {
  return _.find(user.stores, function(store) {
    return store._id.equals(id);
  });
}

// Get list of stores
exports.index = function(req, res) {
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(user.stores);
  });
};

// Get a single store
exports.show = function(req, res) {
  User.findById(req.user._id, function(err, user){
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    var store = findStoreById(user, req.params.id);
    if (store) {
      return res.json(store);
    }
    else {
      return res.status(404).send('Not Found');
    }
  });
};

// Creates a new store in the DB.
exports.create = function(req, res) {
  User.findById(req.user._id, function(err,user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    user.stores.push(new Store(req.body));
    user.save(function(){
      return res.json(201, user.stores);
    });
  });
};

// Updates an existing store in the DB.
exports.update = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    var store = findStoreById(user, req.params.id);
    _.merge(store, req.body.store);
    user.save(function(err, saved) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(store);
    });
  });
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    var store = findStoreById(user, req.params.id);
    if (store) {
      user.stores.pull(store._id);
    } else {
      return res.send(404);
    }
    user.save(function() {
      return res.json(200, user.stores);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
