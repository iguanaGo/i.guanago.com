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
    

    //Carga datos de vuelos
  	flightService.getFlights().then(function(data){
  		$scope.flights = data;
  	});

  }]);
