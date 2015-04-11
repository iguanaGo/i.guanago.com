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
    'ngTouch'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /
    $urlRouterProvider.otherwise("/")

    $stateProvider
    .state('main', 
      {
        url: "/",
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      }
    );
  }]);
