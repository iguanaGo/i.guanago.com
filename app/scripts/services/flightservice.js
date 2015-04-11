'use strict';

/**
 * @ngdoc service
 * @name iguanagoApp.flightService
 * @description
 * # flightService
 * Service in the iguanagoApp.
 */
angular.module('iguanagoApp')
  .service('flightService', ['$http', '$q', function ($http,$q) {
    //Mock de datos de vuelo
    function getMockFlightsData () {
		var mock = [
			{
				from: 'Buenos Aires',
				to: 'Miami',
				airline: 'BOA',
				price: 'ARS 9.593,00',
				taxIncluded: true,
				validFrom: '2016-02-12',
				validUpTo: '2016-02-27'
			},	
			{
				from: 'San Pablo',
				to: 'Miami',
				airline: 'Tam/Lan',
				price: 'ARS 8.340,00',
				taxIncluded: true,
				validFrom: '2015-07-22',
				validUpTo: '2015-08-06'
			},	
			{
				from: 'Buenos Aires',
				to: 'Bangkok',
				airline: 'Emirates',
				price: 'ARS 17.206,00',
				taxIncluded: false,
				validFrom: '2015-12-01',
				validUpTo: '2015-12-21'
			}
		];

    	//crea la promesa a devolver
		return $q(function(resolve, reject) {
			resolve(mock);
		});
    }

    //Futura implementacion
    function getFlightsData () {
    	//TODO
    	return null;
    };

    //Devuelve la interfaz del servicio
    return  {
     	getFlights: function () {
     		return getMockFlightsData();
     	}
     };
  }]);
