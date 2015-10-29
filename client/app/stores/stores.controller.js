'use strict';

angular.module('truthInGivingApp')
  .controller('StoresCtrl', function ($scope, $state, storesService) {

    $scope.stores = [];

    var storeData = false;

    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    var chartData = [];

    $scope.getAll = function() {
      storesService.getAll().then(function(response) {
        $scope.stores = response.data;
        $scope.stores.forEach(function(obj) {
          chartData.push({label: obj.label, value: obj.value, color: obj.color});
        });
        $scope.data = chartData;
      });
    };

    $scope.add = function() {
      storeData = { label: $scope.newStoreLabel, amount: $scope.newStoreAmount, value: $scope.newStoreValue, color: getRandomColor() };
      storesService.add(storeData).then(function(response) {
        $state.reload();
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
        $state.reload();
      });
    };

    $scope.getAll();

    //set chart layout options
    $scope.options = {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : '#fff',

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 0, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : 'easeOutBounce',

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };



  });
