angular.module('StoringenApp')
.directive('streetview', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebouw': '=',
      'clickEvent': '&',
      'location': '='
    },
    controller: function($scope, $window, $document) {

      $document.ready(function() {
        // $scope.initMap();
      })

      $scope.$watch('gebouw', function(newValue, oldValue, scope) {
        if(newValue !== undefined) {
          if (oldValue === undefined || newValue.length !== oldValue.length) {
            $scope.initMap();
          }
        }
      })

      $scope.initMap = (): void => {

        // Startlocatie
        var coordinates = {
          lat: 51.9980072,
          lng: 4.4957816
        }

        $window.map = new google.maps.Map(document.getElementById('map'), {
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
        var markers = $scope.gebouwen.map(function(location, i) {
          var locationNew = {
            lat: $scope.gebouwen[i].BAG_lat,
            lng: $scope.gebouwen[i].BAG_lon
          }
          var marker = new google.maps.Marker({
            position: locationNew,
            // labelOrigin: new google.maps.Point(1000, 2000),
            // label: {
            //   labelOrigin: new google.maps.Point(1000, 2000),
            //   origin: new google.maps.Point(1000, 2000),
            //   position: new google.maps.Point(1000, 2000),
            //   text: $scope.gebouwen[i].adres,
            //   fontFamily: 'Catamaran-Bold',
            //   fontWeight: '100',
            //   color: '#003b59',
            // },
            map: $window.map,
            title: $scope.gebouwen[i].adres,
            icon: 'assets/images/Gebouwen-klein.png',
          });

          marker.metadata = {
            adres: $scope.gebouwen[i].adres,
            Object_ID: $scope.gebouwen[i].Object_ID
          }

          google.maps.event.addListener(marker, 'click', function() {
            console.log(this.metadata);
            $scope.clickEvent({id: this.metadata.Object_ID})
            google.maps.event.trigger($window.map, "resize");
            // var position = this.getPosition();
            // if($scope.selectedGebouw) {
            //   $window.map.panTo(position);
            // } else {
            //   console.log(position);
            //   $window.map.panTo(position);
            // }
          });

          return marker
        });
      }
    },
    link: function($scope) {

    },
    template: `
      <div id="map"></div>
    `
  };
})
