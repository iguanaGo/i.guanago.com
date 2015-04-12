'use strict';

/**
 * @ngdoc function
 * @name iguanagoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iguanagoApp
 */
angular.module('iguanagoApp')
  .controller('MainCtrl', ['$scope', 'flightService', function ($scope, flightService) {
    
    //inicializacion de vista x default
    $scope.viewMode = 'fl-vm-view-grid';
    $scope.viewSelected = 'grid';

    $scope.getSelected = function(mode){
      switch(mode){
        case $scope.viewSelected:
          return 'fl-vm-selected'
        default:
          return ''
      }
    }

    //Carga datos de vuelos
    
  	flightService.getFlights().then(function(data){
  		$scope.flights = data[0];
  	});

  }]);
