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
    controller: function($scope, $window, $document) {

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

      function getContentString(gebouw) {
        var html =
        '<div id="content">' +
          '<div id="siteNotice">' +
            '<a class="btn btn-info" href="#/gebieden/' + gebouw.BAG_VerblijfsobjectID + '">' +
              gebouw.BAG_adres + ' ' + gebouw.BAG_huisnummer + ', ' + gebouw.BAG_postcode + ', ' + gebouw.BAG_plaats +
              '<br>VHENR: ' + gebouw.VHE_nr +
            '</a>' +
          '</div>' +
        '</div> ';
        return html;
      }

      var panorama;



      $scope.initMap = (): void => {

        // Startlocatie
        var coordinates = {
          lat: 51.9980072,
          lng: 4.4957816
        }

        $window.gebiedenMap = new google.maps.Map(document.getElementById('gebieden-map'), {
          center: coordinates,
          zoom: 16,
          StreetViewPControl: false
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.

        $scope.rectangles = $scope.gebieden.map(function(location, i) {
          var gebied = $scope.gebieden[i];

          var {maxlat, minlat, maxlon, minlon} = gebied;

          var x = ( maxlat - minlat ) / 4;
          var y = ( maxlon - minlon ) / 4;

          var rectangle = new google.maps.Rectangle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: $window.gebiedenMap,
            bounds: {
              north: maxlat + y,
              south: minlat - y,
              east: maxlon + x,
              west: minlon - x
            }
          })
          google.maps.event.addListener(rectangle, 'click', function() {
            console.log('benko')
          })
        })


        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(map, markers,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
    },
    link: function($scope) {

    },
    // <div id="floating-panel">
    //   <input type="button" value="Toggle Street View" ng-click="toggleStreetView();"></input>
    // </div>
    template: `
      <div id="gebieden-map"></div>
    `
  };
})
