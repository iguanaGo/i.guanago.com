'use strict';

/**
 * @ngdoc function
 * @name iguanagoApp.controller:DestinationsCtrl
 * @description
 * # DestinationsCtrl
 * Controller of the iguanagoApp
 */
angular.module('iguanagoApp')
  .controller('DestinationsCtrl', ['$scope', function ($scope) {

	var width = 960,
	    height = 1160;

	var svg = d3.select("#world-map").append("svg")
	    .attr("width", '100%')
	    .attr("height", height);

	var projection = d3.geo.miller()
	    .scale(153)
	    .translate([width / 2, height / 2])
	    .precision(.1);

	var path = d3.geo.path().projection(projection);

	d3.json("../resources/world.json", function(error, world) {
	  if (error) return console.error(error);

	  //Agregar paises
		svg.selectAll(".countries")
		    .data(topojson.feature(world, world.objects.countries).features)
		  .enter().append("path")
		    .attr("class", function(d) { return "country " + d.id; })
		    .attr("d", path);

	});


  }]);
