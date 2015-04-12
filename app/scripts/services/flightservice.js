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
    	//crea la promesa a devolver
    	var tabletopResponse = $q.defer();
    	//inicializa Tabletop y define el callback
	    window.Tabletop.init({
	      key: 'https://docs.google.com/spreadsheets/d/1MNkEoLahoi_6bjwi0QkU9-SkYirnI_13jaH63k2Ogok/pubhtml?gid=0&single=true',
	      simpleSheet: true,
	      callback: function(data, Tabletop) { tabletopResponse.resolve([data, Tabletop]);
	      }
	    });

	    //devuleve la promesa que se resuelve en el callback de Tabletop
	    return tabletopResponse.promise;
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
