'use strict';

angular.module('truthInGivingApp')
  .controller('StoresCtrl', function ($scope, storesService) {

    $scope.stores = [];

    $scope.getAll = function() {
      storesService.getAll().then(function(response) {
        $scope.stores = response.data;
      });
    };

    $scope.add = function() {
      var store = { name: $scope.newStoreName, completed: false };
      storesService.add(store).then(function(response) {
        $scope.newStoreName = '';
        $scope.getAll();
      });
    };

    $scope.update = function(store) {
      storesService.update(store).then(function(response) {
        $scope.getAll();
      });
    };

    $scope.remove = function(store) {
      storesService.remove(store).then(function(response) {
        $scope.getAll();
      });
    };

    $scope.getAll();

  });
