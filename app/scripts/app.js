'use strict';

/**
 * @ngdoc overview
 * @name iguanagoApp
 * @description
 * # iguanagoApp
 *
 * Main module of the application.
 */
angular
  .module('iguanagoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'Tabletop'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /
    $urlRouterProvider.otherwise("/")

    $stateProvider
    .state('main', 
      {
        url: "/",
        templateUrl: "views/landing.html",
        controller: "LandingCtrl"
      }
    ).state('flights',
      {
        url: "/flights",
        templateUrl: "views/flights.html",
        controller: "FlightsCtrl"
      }
    ).state('destinations',
      {
        url: "/destinations",
        templateUrl: "views/destinations.html",
        controller: "DestinationsCtrl"
      }
    );
  }]);
