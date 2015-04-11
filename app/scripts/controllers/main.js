'use strict';

/**
 * @ngdoc function
 * @name iguanagoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iguanagoApp
 */
angular.module('iguanagoApp')
  .controller('MainCtrl', ['$scope', 'flightService', 'destinos', function ($scope, flightService, destinos) {
    

    //Carga datos de vuelos
    /*
  	flightService.getFlights().then(function(data){
  		$scope.flights = data;
  	});
	*/
	console.log( destinos );
  	$scope.flights = destinos[0];

  }]);
