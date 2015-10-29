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

    //set chart data to stores array info
    $scope.data = [
      {
        value: 300,
        color:'#F7464A',
        highlight: '#FF5A5E',
        label: 'REI'
      },
      {
        value: 50,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'Starbucks'
      },
      {
        value: 100,
        color: '#FDB45C',
        highlight: '#FFC870',
        label: 'WholeFoods'
      }
    ];


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
