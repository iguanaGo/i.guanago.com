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
	    height = 500;

	var svg = d3.select("#world-map").append("svg")
	    .attr("width", '100%')
	    .attr("height", height);

	var countryGroup = svg.append('g').attr("class", "countries");
	var arcGroup = svg.append('g').attr("class", "arcs");
	var pointGroup = svg.append('g').attr("class", "points");

	var projection = d3.geo.miller()
	    .scale(153)
	    .translate([width / 2, height / 1.5]);

	var path = d3.geo.path().projection(projection);

	d3.json("../resources/world.json", function(error, world) {
	  if (error) return console.error(error);

	  	//Agregar paises
		countryGroup.selectAll(".countries")
		    .data(topojson.feature(world, world.objects.countries).features)
		  .enter().append("path")
		    .attr("class", function(d) { return "country " + d.id; })
		    .attr("d", path)
		    .on("click", clicked);;


        // --- Helper functions (for tweening the path)
        var lineTransition = function lineTransition(path) {
            path.transition()
                //NOTE: Change this number (in ms) to make lines draw faster or slower
                .duration(4000)
                .attrTween("stroke-dasharray", tweenDash)
                .each("end", function(d,i) { 
                    ////Uncomment following line to re-transition
                    //d3.select(this).call(transition); 
                    
                    //We might want to do stuff when the line reaches the target,
                    //  like start the pulsating or add a new point or tell the
                    //  NSA to listen to this guy's phone calls
                    //doStuffWhenLineFinishes(d,i);
                });
        };
        var tweenDash = function tweenDash() {
            //This function is used to animate the dash-array property, which is a
            //  nice hack that gives us animation along some arbitrary path (in this
            //  case, makes it look like a line is being drawn from point A to B)
            var len = this.getTotalLength(),
                interpolate = d3.interpolateString("0," + len, len + "," + len);

            return function(t) { return interpolate(t); };
        };

        var links = [
            {
                type: "LineString",
                    coordinates: [
                        [ -58.381667, -34.603333 ],
                        [ -3.716667, 40.383333 ]
                    ]
            },
            {
                type: "LineString",
                    coordinates: [
                        [ -58.381667, -34.603333 ],
                        [ 13.383333, 52.516667 ]
                    ]
            },
            {
                type: "LineString",
                    coordinates: [
                        [ -58.381667, -34.603333 ],
                        [ -74.0059700, 40.7142700  ]
                    ]
            }
        ];

        // Standard enter / update 
        var pathArcs = arcGroup.selectAll(".arc")
            .data(links);

        //enter
        pathArcs.enter()
            .append("path").attr({
                'class': 'arc'
            });
        //update
        pathArcs.attr({
                //d is the points attribute for this path, we'll draw
                //  an arc between the points using the arc function
                d: path
            })
            // Comment this line to remove the transition
            .call(lineTransition); 

        //exit
        pathArcs.exit().remove();

	});

	function clicked(d) {}


  }]);
