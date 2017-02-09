angular.module('StoringenApp')
.directive('googleMaps', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebouwen': '=',
      'location': '=',
      'gebouwenFilter': '=',
      'viewPortCenter': '='
    },
    controller: function($scope, $window, $document) {

      console.log($scope);
      $scope.$watch('gebouwen', function(newValue, oldValue, scope) {
        if(newValue !== undefined) {
          if (oldValue === undefined || newValue.length !== oldValue.length) {
            $scope.initMap();
          }
        }
      })

      $scope.$watch('gebouwenFilter.Gebied2', function(newValue, oldValue, scope) {
        if(newValue !== undefined) {
          if (oldValue === undefined || newValue !== oldValue ) {
            $scope.initMap();
          }
        }
      })

      function getContentString(gebouw) {
        var html =
        '<div id="content">' +
          '<div id="siteNotice">' +
            '<a class="btn btn-info" href="#!/gebouwen/' + gebouw.BAG_VerblijfsobjectID + '">' +
              gebouw.BAG_adres + ' ' + gebouw.BAG_huisnummer + ', ' + gebouw.BAG_postcode + ', ' + gebouw.BAG_plaats +
              '<br>VHENR: ' + gebouw.VHE_nr +
            '</a>' +
          '</div>' +
        '</div> ';
        return html;
      }

      // Sets the map on all markers in the array.
      function clearMarkers() {
        for (var i = 0; i < $scope.markers.length; i++) {
          $scope.markers[i].setMap(null);
        }
        $scope.markers = []
      }

      function addIndividualMarkers(filteredGebouwen){
        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        $scope.markers = filteredGebouwen.map(function(location, i) {
          if ($scope.gebouwenFilter.Gebied2) {
            if ($scope.gebouwen[i].Gebied2 !== $scope.gebouwenFilter.Gebied2) {
              return;
            }
          }
          var marker = new google.maps.Marker({
            position: {
              lat: filteredGebouwen[i].BAG_lat,
              lng: filteredGebouwen[i].BAG_lon
            },
            map: $window.map,
            title: $scope.gebouwen[i].adres,
            //icon: 'assets/images/gebouwtje.png',
            icon: {
              url: 'assets/images/gebouwtje24.png',
              size: new google.maps.Size(24, 24),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(12, 12),
              scaledSize: new google.maps.Size(24, 24)
            }
          });

          var infowindow = new google.maps.InfoWindow({
            content: getContentString($scope.gebouwen[i])
          })

          marker.metadata = {
            adres: $scope.gebouwen[i].adres,
            Object_ID: $scope.gebouwen[i].Object_ID
          }

          google.maps.event.addListener(marker, 'click', function() {
            console.log(marker)
            infowindow.open($window.map, marker);
          })

          $scope.lastMarker = marker;

          return marker
        });
      }

      $scope.addMarkers = function() {
        var map = $window.map;
        if($scope.markers !== undefined) {
          clearMarkers();
        }
        var zoomLevel = map.getZoom();
        console.log(map.getZoom() )

        var vb = {
          lat0: $window.map.getBounds().getNorthEast().lat(),
          lng0: $window.map.getBounds().getNorthEast().lng(),
          lat1: $window.map.getBounds().getSouthWest().lat(),
          lng1: $window.map.getBounds().getSouthWest().lng()
        }


        if (zoomLevel >= 14) {
          var filteredGebouwen = angular.copy($scope.gebouwen);
          var filteredGebouwen = $scope.gebouwen.filter(g =>
            g.BAG_lat < vb.lat0 &&
            g.BAG_lat > vb.lat1 &&
            g.BAG_lon < vb.lng0 &&
            g.BAG_lon > vb.lng1
          );
          console.log(filteredGebouwen.length)
        }


        if (zoomLevel >= 14 && filteredGebouwen.length < 1000) {
          addIndividualMarkers(filteredGebouwen);
        }

        // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer($window.map, $scope.markers,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }

      $scope.initMap = (): void => {

        // Startlocatie
        var coordinates = {
          lat: 51.9980072,
          lng: 4.4957816
        }

        $window.map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 14,
          StreetViewPControl: false
        });

        $scope.addMarkers();

        google.maps.event.addListener($window.map, 'dragend', function(){
            //this part runs when the mapobject is created and rendered
            console.log('bounds changed benko');
            $scope.addMarkers();
        });

        google.maps.event.addListener($window.map, 'zoom_changed', function(){
            //this part runs when the mapobject is created and rendered
            console.log('zoom changed benko');
            $scope.addMarkers();
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Get viewport boundaries


        var vpc = $scope.viewPortCenter;
        // if(vpc.x !== undefined && vpc.y !== undefined) {
        //   var latLng = new google.maps.LatLng($scope.viewPortCenter.x, $scope.viewPortCenter.y);
        //   $window.map.panTo(latLng);
        // }
      }
    },
    link: function($scope) {

    },
    template: `
      <div id="map"></div>
    `
  };
})
