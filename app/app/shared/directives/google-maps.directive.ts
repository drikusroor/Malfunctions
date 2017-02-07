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
            icon: 'assets/images/Gebouwen-klein.png',
          })

          marker.metadata = {
            adres: GEBOUWEN[i].adres,
            gebouwId: GEBOUWEN[i].gebouwId
          }

          google.maps.event.addListener(marker, 'click', function() {
            console.log(this.metadata);
            $scope.clickEvent({id: this.metadata.gebouwId})
            google.maps.event.trigger($window.map, "resize");
            var position = this.getPosition();
            if($scope.selectedGebouw) {
              $window.map.panTo(position);
            } else {
              console.log(position);
              $window.map.panTo(position);
            }
          });
        }
      }
    },
    link: function($scope) {

    },
    // <div id="floating-panel">
    //   <input type="button" value="Toggle Street View" ng-click="toggleStreetView();"></input>
    // </div>
    template: `
      <div id="map"></div>
    `
  };
})
