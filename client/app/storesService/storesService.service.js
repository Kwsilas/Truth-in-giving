'use strict';

angular.module('truthInGivingApp')
  .service('storesService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;

    self.getAll = function() {
      return $http.get('/api/stores/');
    };

    self.add = function(store) {
      console.log('adding:', JSON.stringify(store));
      return $http.post('/api/stores', store);
    };

    self.get = function(store) {
      return $http.get('/api/stores/' + store._id);
    };

    self.update = function(store) {
      return $http.put('/api/stores/' + store._id, store);
    };

    self.remove = function(store) {
      return $http.delete('/api/stores/' + store._id);
    };
  });

