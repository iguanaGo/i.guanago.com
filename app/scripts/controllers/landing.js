'use strict';

/**
 * @ngdoc function
 * @name iguanagoApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the iguanagoApp
 */
angular.module('iguanagoApp').controller('LandingCtrl', ['$scope', '$state', function ($scope, $state) {
    
	$scope.goToDestinations = function(){
		$state.go('destinations');
	}

}]);
