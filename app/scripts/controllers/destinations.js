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

    var margin = {top: 10, left: 10, bottom: 10, right: 10},
        width = parseInt(d3.select('#world-map').style('width')),
        width = width - margin.left - margin.right,
        mapRatio = .5,
	    height = width * mapRatio,
        centered;

    d3.select(window).on('resize', resize);

	var svg = d3.select("#world-map").append("svg")
	    .attr("width", width)
	    .attr("height", height);

    var g = svg.append("g");

	var countryGroup = g.append('g').attr("class", "countries");
	var arcGroup = g.append('g').attr("class", "arcs");
	var pointGroup = g.append('g').attr("class", "points");

	var projection = d3.geo.miller()
	    .scale(width/7)
	    .translate([width / 2, height / 1.5]);

	var path = d3.geo.path().projection(projection);

    $scope.origin = {
            country: 'ARG',
            name: "Buenos Aires",
            coordinates: [ -58.381667, -34.603333 ]
        };

    $scope.cities = [
        {
            country: 'DEU',
            name: "Berlin",
            coordinates: [ 13.383333, 52.516667 ]
        },
        {
            country: 'ARG',
            name: "Puerto Iguazu",
            coordinates: [ -54.580278, -25.610833 ]
        },
        {
            country: 'USA',
            name: "Nueva York",
            coordinates: [ -74.0059700, 40.7142700  ]
        },
        {
            country: 'USA',
            name: "Los Angeles",
            coordinates: [ -118.25, 34.05  ]
        },
        {
            country: 'ESP',
            name: "Madrid",
            coordinates: [ -3.716667, 40.383333 ]
        },
        {
            country: 'GBR',
            name: "Londres",
            coordinates: [ -0.1275, 51.507222 ]
        }
    ];

    function sortByRegion(countries){
        function camelize(str) {
          return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
          });
        }

        var regions = {}
        $.each(countries.geometries, function(i,v){
            if (regions[camelize(v.properties.subregion)] === undefined){
                regions[camelize(v.properties.subregion)] = {
                    type: 'GeometryCollection',
                    geometries: []};
            }
            regions[camelize(v.properties.subregion)].geometries.push(v);
        });
        return regions;
    }

	d3.json("../resources/world.json", function(error, world) {
	    if (error) {
            return console.error(error);
        }

        var regions = sortByRegion(world.objects.countries);

	  	//Agregar paises
        $.each(regions,function(key,val){
            var region = countryGroup.append('g').attr("id", key).attr("class", "subregion");;

            region.selectAll(".countries")
                .data(topojson.feature(world, val).features)
              .enter().append("path")
                .attr("class", function(d) { return "country " + d.id; })
                .attr("d", path)
                .on("click", clicked);
        })

        var schedules = [
            [
                {   
                    from: {
                        name: "Buenos Aires",
                        coordinates: [ -58.381667, -34.603333 ]
                    },
                    to: {
                        name: "Madrid",
                        coordinates: [ -3.716667, 40.383333 ]
                    }
                },
                {   
                    from: {
                        name: "Madrid",
                        coordinates: [ -3.716667, 40.383333 ]
                    },
                    to: {
                        name: "Londres",
                        coordinates: [ -0.1275, 51.507222 ]
                    }
                }
            ],
            [
                {   
                    from: {
                        name: "Buenos Aires",
                        coordinates: [ -58.381667, -34.603333 ]
                    },
                    to: {
                        name: "Madrid",
                        coordinates: [ -3.716667, 40.383333 ]
                    }
                },
                {   
                    from: {
                        name: "Madrid",
                        coordinates: [ -3.716667, 40.383333 ]
                    },
                    to: {
                        name: "Berlin",
                        coordinates: [ 13.383333, 52.516667 ]
                    }
                }
            ],
            [
                {
                    from: {
                        name: "Buenos Aires",
                        coordinates: [ -58.381667, -34.603333 ]
                    },
                    to: {
                        name: "Nueva York",
                        coordinates: [ -74.0059700, 40.7142700  ]
                    }
                }
            ]
            /*{
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
            }*/
        ];

        $.each($scope.cities,function(i,city){
            countryGroup.selectAll('.'+city.country).style("fill", "#00A2CC");
        });

        /*$.each(schedules,function(i,schedule){

            function createPath(i,schedule){
                if (schedule[i] === undefined){
                    return null;
                }else{

                    //Agrega las ciudades a la lista para dibujar si es necesario
                    if (cities[schedule[i].from.name] === undefined){
                        cities[schedule[i].from.name] = schedule[i].from.coordinates;
                    }
                    if (cities[schedule[i].to.name] === undefined){
                        cities[schedule[i].to.name] = schedule[i].to.coordinates;
                    }

                    return {
                        type: "LineString",
                        coordinates: [
                                schedule[i].from.coordinates,
                                schedule[i].to.coordinates
                            ],
                        next: createPath(i+1,schedule)
                    };
                }
            }

            var line = createPath(0,schedule);
            appendLine(line);
        });

        $.each(cities,function(name,coordinates){

            var point = [{
                type: "Point",
                coordinates: coordinates,
                name: name
            }];

            pointGroup.selectAll(".city")
            .data(point)
            .enter().append("circle", ".city")
            .attr("r", 4)
            .attr("transform", function(d) {
                return "translate(" + projection([
                  d.coordinates[0],
                  d.coordinates[1]
                ]) + ")";
            });

            pointGroup.selectAll(".cityName")
            .data(point)
            .enter().append("text", ".cityName")
            .attr("class", "cityLabel")
            .attr("transform", function(d) {
                return "translate(" + projection([
                  d.coordinates[0],
                  d.coordinates[1]
                ]) + ")";
            })
            .text(function(d) { return d.name;})
            //FIXME
            .attr("x", function(d) { return d.name === "Londres" ? -6 : 6; })
            .style("text-anchor", function(d) { return d.name === "Londres" ? "end" : "start"; });;
        });*/

	});

    function appendLine(line){

            // --- Helper functions (for tweening the path)
            var lineTransition = function lineTransition(path) {
                path.transition()
                    //NOTE: Change this number (in ms) to make lines draw faster or slower
                    .duration(4000)
                    .attrTween("stroke-dasharray", tweenDash)
                    .each("end", function(d,i) { 
                        if(d.next !== null){
                            appendLine(d.next);
                        }
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

            // Standard enter / update 
            var arc = arcGroup.append('g').attr("class", "arc");

            var pathArcs = arc.selectAll(".arc")
                .data([line]);

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
    }

    function clicked(d) {
      var x, y, k;

      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
      }

      g.selectAll("path")
          .classed("active", centered && function(d) { return d === centered; });

      g.transition()
          .duration(750)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 1.5 / k + "px");
    }


    function resize() {
        // adjust things when the window size changes
        width = parseInt(d3.select('#world-map').style('width'));
        width = width - margin.left - margin.right;
        height = width * mapRatio;

        // update projection
        projection
            .translate([width / 2, height / 1.5])
            .scale(width/7);

        // resize the map container
        svg.style('width', width + 'px');
        svg.style('height', height + 'px');

        // resize the map
        countryGroup.selectAll('.country').attr('d', path);
    }

  }]);
