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
    controller: function($scope, $window, $document) {

      $document.ready(function() {
        // $scope.initMap();
      })

      $scope.$watch('gebouwen', function(newValue, oldValue, scope) {
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
            '<a class="btn btn-info" href="#!/gebouwen/' + gebouw.BAG_VerblijfsobjectID + '">' +
              gebouw.BAG_adres + ' ' + gebouw.BAG_huisnummer + ', ' + gebouw.BAG_postcode + ', ' + gebouw.BAG_plaats +
              '<br>VHENR: ' + gebouw.VHE_nr +
            '</a>' +
          '</div>' +
        '</div> ';
        return html;
      }

      var panorama;

      $scope.resizeMarkers = function() {
        console.log($scope.markers);

        for (var i in $scope.markers) {
          $scope.markers[i].icon.url = "assets/images/gebouwtje64.png";
        }
      }

      function initPanorama() {

        panorama = $window.map.getStreetView();
        // Add a link to our custom panorama from outside the Google Sydney office.
        panorama.addListener('links_changed', function() {
          console.log("benko links chagned", this);

          $scope.resizeMarkers();

          // if (panorama.getPano() === outsideGoogle.location.pano) {
          //   panorama.getLinks().push({
          //     description: 'Google Sydney',
          //     heading: 25,
          //     pano: 'reception'
          //   });
          // }
        });
      }

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
        $scope.markers = $scope.gebouwen.map(function(location, i) {
          var locationNew = {
            lat: $scope.gebouwen[i].BAG_lat,
            lng: $scope.gebouwen[i].BAG_lon
          }
          var marker = new google.maps.Marker({
            position: locationNew,
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

          // google.maps.event.addListener(marker, 'click', function() {
          //   console.log(this.metadata);
          //   $scope.clickEvent({id: this.metadata.Object_ID})
          //   google.maps.event.trigger($window.map, "resize");
          // });

          google.maps.event.addListener(marker, 'click', function() {
            console.log(marker)
            infowindow.open($window.map, marker);
          })


          return marker
        });

        // === Ellipse ===
        var x = (4.50035558312196 - 4.49856168867059) / 4;
        var y = (52.0005992377192 - 51.9996895744288) / 4;

        var rectangle = new google.maps.Rectangle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: $window.map,
          bounds: {
            north: 52.0005992377192 + y,
            south: 51.9996895744288 - y,
            east: 4.50035558312196 + x,
            west: 4.49856168867059 - x
          }
        });

        google.maps.event.addListener(rectangle, 'click', function() {
          console.log(rectangle)
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
      <div id="map"></div>
    `
  };
})
