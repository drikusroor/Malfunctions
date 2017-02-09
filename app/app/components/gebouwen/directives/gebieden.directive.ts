angular.module('StoringenApp')
.directive('gebiedenMap', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebieden': '=',
      'clickEvent': '&',
      'location': '='
    },
    link: function($scope) {
      $scope.selectGebied = function(gebied) {
        $scope.clickEvent({gebied: gebied});
      }
    },
    controller: function($scope, $window, $document, $timeout) {

      $document.ready(function() {
        // $scope.initMap();
      })

      $scope.$watch('gebieden', function(newValue, oldValue, scope) {
        if(newValue !== undefined) {
          if (oldValue === undefined || newValue.length !== oldValue.length) {
            $scope.initMap();
          }
        }
      })

      var panorama;

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function addRectangle(gebied) {
        var {maxlat, minlat, maxlon, minlon} = gebied,
          x = ( maxlat - minlat ) / 4,
          y = ( maxlon - minlon ) / 4;

        var color = getRandomColor();

        if (maxlat > 0 && minlat > 0 && maxlon > 0 && minlon > 0) {
          var rectangle = new google.maps.Rectangle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.2,
            map: $window.gebiedenMap,
            bounds: {
              north: maxlat + y,
              south: minlat - y,
              east: maxlon + x,
              west: minlon - x
            }
          })
          rectangle.metadata = gebied;
          google.maps.event.addListener(rectangle, 'click', function() {
            console.log(rectangle.metadata)
            $scope.selectGebied(rectangle.metadata);
          })
        }
      }

      $scope.initMap = (): void => {

        // Startlocatie
        var coordinates = {
          lat: 51.9980072,
          lng: 4.4957816
        }

        $window.gebiedenMap = new google.maps.Map(document.getElementById('gebieden-map'), {
          center: coordinates,
          zoom: 12,
          StreetViewPControl: false
        });

        // Add some rectangles to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of rectangles based on a given "gebieden" array.
        // The map() method here has nothing to do with the Google Maps API.
        $scope.rectangles = $scope.gebieden.map(function(location, i) {
          var gebied = $scope.gebieden[i];
          $timeout(function() {
            addRectangle(gebied);
          }, 10)
        })
      }
    },
    template: `
      <div id="gebieden-map"></div>
    `
  };
})
