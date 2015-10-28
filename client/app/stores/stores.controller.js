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
      var store = { name: $scope.newStoreName, amount: $scope.newStoreAmount, giving: $scope.newStoreGiving };
      storesService.add(store).then(function(response) {
        console.log(store);
        $scope.newStoreName = '';
        $scope.newStoreAmount = '';
        $scope.newStoreGiving = '';
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
