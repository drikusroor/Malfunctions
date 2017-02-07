angular.module('StoringenApp')
.directive('googleMaps', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebouwen': '=',
      'clickEvent': '&',
      'location': '='
    },
    controller: function($scope, $window, $document, GEBOUWEN) {

      $document.ready(function() {
        $scope.initMap();
      })

      $scope.toggleStreetView = ():void => {
          var toggle = $scope.panorama.getVisible();
          if (toggle == false) {
            $scope.panorama.setVisible(true);
          } else {
            $scope.panorama.setVisible(false);
          }
        }

      $scope.initMap = (): void => {

        var coordinates = {
          lat: 52.1646443,
          lng: 5.363390400000071
        }

        $window.map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 16,
          StreetViewPControl: false
        });

        for (var i in GEBOUWEN) {
          var marker = new google.maps.Marker({
            position:  {
              lat: GEBOUWEN[i].latitude,
              lng: GEBOUWEN[i].longitude
            },
            map: $window.map,
            title: GEBOUWEN[i].adres,
            icon: 'favicon.png'
          })
        }

        // We get the map's default panorama and set up some defaults.
        // Note that we don't yet set it visible.

        $scope.panorama = $window.map.getStreetView();
        $scope.panorama.setPosition(coordinates);
        $scope.panorama.setPov(/** @type {google.maps.StreetViewPov} */({
          heading: 265,
          pitch: 0,
        }));

      }
    },
    link: function($scope) {
      $scope.$watch('location', function() {
        console.log(location);
      })
    },
    template: `
      <div id="floating-panel">
        <input type="button" value="Toggle Street View" ng-click="toggleStreetView();"></input>
      </div>
      <div id="map"></div>
    `
  };
})
