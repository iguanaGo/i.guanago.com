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
  .config(['$stateProvider', '$urlRouterProvider', 'TabletopProvider', function ($stateProvider, $urlRouterProvider, TabletopProvider) {

    TabletopProvider.setTabletopOptions({
      key: 'https://docs.google.com/spreadsheets/d/1MNkEoLahoi_6bjwi0QkU9-SkYirnI_13jaH63k2Ogok/pubhtml?gid=0&single=true',
      simpleSheet: true
    });

    // For any unmatched url, send to /
    $urlRouterProvider.otherwise("/")

    $stateProvider
    .state('main', 
      {
        url: "/",
        templateUrl: "views/main.html",
        resolve: {
          destinos: 'Tabletop'
        },
        controller: "MainCtrl"
      }
    );
  }]);
