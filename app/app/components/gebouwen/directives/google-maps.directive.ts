angular.module('StoringenApp')
.directive('googleMaps', function() {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'gebouwen': '=',
      'location': '=',
      'viewPortCenter': '=',
      'streetView': '=',
      'height': '='
    },
    controller: function($scope, $window, $document, $state, LocationService) {

      $scope.mapId = Math.random().toString(36).substr(2, 10);
      $scope.detailView = $state.current.name === 'portal.gebouwen.detail';

      $scope.$watch('gebouwen.length', function(newValue, oldValue, scope) {
        if(newValue !== undefined) {
          console.log("gebouwen.length: ", newValue)
          if (oldValue === undefined) {
            $scope.initMap();
          }
        }
        if($scope.mapInitialized && newValue !== undefined) {
          $scope.addMarkers();
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
        console.log($scope.markers.length);
        for (var i = 0; i < $scope.markers.length; i++) {
          $scope.markers[i].setMap(null);
        }
        $scope.markers = []
      }

      function addClusteredMarkers(vb, filteredGebouwen) {
        var container = document.getElementById($scope.mapId);
        var map = $scope.map;
        var width = container.offsetWidth;
        var height = container.offsetHeight;
        var gridSize = 8
        var amountX;
        var amountY;

        // calculate ratio to decide the amount of grid blocks
        var ratio = width/height;
        if (ratio > 1) {
          amountX = gridSize;
          amountY = Math.round(gridSize/ratio);
        } else {
          amountX = Math.round(gridSize * ratio);
          amountY = gridSize;
        }

        //console.log(vb, amountX, amountY)
        var xMin = vb.lng1;
        var xMax = vb.lng0;
        var lonRange = xMax - xMin;
        var lonStep = lonRange / amountX;
        var yMin = vb.lat1;
        var yMax = vb.lat0;
        var latRange = yMax - yMin;
        var latStep = latRange / amountY;
        //console.log(xMin, xMax, yMin, yMax, lonRange, latRange);

        // Zet de boundaries en het centrum van elk vak in het grid
        var gridArray = [];
        for (var y = 0; y < amountY; y++) {
          for(var x = 0; x < amountX; x++) {
            var lonMin = xMin + (x * lonStep);
            var lonMax = lonMin + lonStep;
            var latMin = yMin + (y * latStep);
            var latMax = latMin + latStep;
            var lonCenter = (lonMin + lonMax) / 2;
            var latCenter = (latMin + latMax) / 2;

            gridArray.push({
              lonMin: lonMin,
              lonMax: lonMax,
              latMin: latMin,
              latMax: latMax,
              lonCenter: lonCenter,
              latCenter: latCenter,
              count: 0,
            })
          }
        }

        // nu checken wie in wat valt
        for (var i = 0; i < filteredGebouwen.length; i++ ) {
          for (var g = 0; g < gridArray.length; g++ ) {
            var gebouw = filteredGebouwen[i];
            var grid = gridArray[g];
            if (
              gebouw.BAG_lon > grid.lonMin &&
              gebouw.BAG_lon < grid.lonMax &&
              gebouw.BAG_lat > grid.latMin &&
              gebouw.BAG_lat < grid.latMax
            ) {
              grid.count += 1;
            }
          }
        }

        gridArray = gridArray.filter(g => g.count > 0);

        // verwijder oude markers;
        if($scope.markers !== undefined) {
          clearMarkers();
        }

        $scope.markers = gridArray.map(function(location, i) {
          var grid = gridArray[i]
          var scale = (grid.count / 400) + 1;
          if (scale > 2.5) scale = 2.5;
          var size = 24 * scale;
          var point = size / 2

          var label = grid.count.toString();

          var marker = new google.maps.Marker({
            position: {
              lat: grid.latCenter,
              lng: grid.lonCenter
            },
            map: map,
            title: label,
            labelContent: label,
            labelClass: "labels",
            label: {
              text: label,
              fontFamily: "Catamaran-Bold",
              fontSize: "14pt",
              fontWeight: "bolder",
              color: "#151515"
            },
            //icon: 'assets/images/gebouwtje.png',
            icon: {
              url: 'assets/images/gebouwtje64trans.png',
              size: new google.maps.Size(size, size),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(point, point),
              scaledSize: new google.maps.Size(size, size)
            }
          });

          google.maps.event.addListener(marker, 'click', function() {
            var latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
            map.panTo(latLng);
            var zoomLevel = map.getZoom();
            map.setZoom(zoomLevel + 1);
          })

          return marker;
        });
      }

      function filterGebouwen(vb, gebouwen) {

        // Filter viewport
        var filteredGebouwen = gebouwen.filter(g =>
          g.BAG_lat < vb.lat0 &&
          g.BAG_lat > vb.lat1 &&
          g.BAG_lon < vb.lng0 &&
          g.BAG_lon > vb.lng1
        );

        return filteredGebouwen
      }

      function addIndividualMarkers(filteredGebouwen, map){

        // Verwijder oude markers
        if($scope.markers !== undefined) {
          clearMarkers();
        }
        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        $scope.markers = filteredGebouwen.map(function(location, i) {

          var marker = new google.maps.Marker({
            position: {
              lat: filteredGebouwen[i].BAG_lat,
              lng: filteredGebouwen[i].BAG_lon
            },
            map: map,
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
            content: getContentString(filteredGebouwen[i])
          })

          marker.metadata = {
            adres: filteredGebouwen[i].adres,
            Object_ID: filteredGebouwen[i].Object_ID
          }

          google.maps.event.addListener(marker, 'click', function() {

            // close the last opened info window
            if($scope.lastOpenedInfoWindow) {
              $scope.lastOpenedInfoWindow.close()
            }

            console.log(marker)
            infowindow.open(map, marker);

            $scope.lastOpenedInfoWindow = infowindow;
          })

          $scope.lastMarker = marker;

          return marker
        });
      }

      $scope.addMarkers = function() {
        var map = $scope.map;

        var zoomLevel = map.getZoom();
        console.log(map.getZoom())

        var vb = {
          lat0: map.getBounds().getNorthEast().lat(),
          lng0: map.getBounds().getNorthEast().lng(),
          lat1: map.getBounds().getSouthWest().lat(),
          lng1: map.getBounds().getSouthWest().lng()
        }

        console.log("lengte voor spatial filter: ", $scope.gebouwen.length)
        var filteredGebouwen = filterGebouwen(vb, $scope.gebouwen);

        // Als er
        if (zoomLevel < 15 || filteredGebouwen.length > 1000) {
          addClusteredMarkers(vb, filteredGebouwen);
        } else {
          addIndividualMarkers(filteredGebouwen, map);
        }
      }

      $scope.initMap = (): void => {

        // Startlocatie
        var coordinates = {
          lat: 51.9980072,
          lng: 4.4957816
        }

        var zoomLevel = 14;

        // In detail-view pannen en zoomen we naar het gebouw
        if ($scope.detailView) {
          coordinates = {
            lat: $scope.gebouwen[0].BAG_lat,
            lng: $scope.gebouwen[0].BAG_lon
          }
          zoomLevel = 18;
        }

        if($scope.location) {
          coordinates = {
            lat: $scope.location.coords.latitude,
            lng: $scope.location.coords.longitude
          }
          zoomLevel = 13;
        }

        var coordinatesLatLng = new google.maps.LatLng(coordinates.lat, coordinates.lng);

        $scope.map = new google.maps.Map(document.getElementById($scope.mapId), {
          center: coordinates,
          zoom: zoomLevel,
          StreetViewPControl: false
        });

        if (!$scope.detailView) {

          google.maps.event.addListener($scope.map, 'dragend', function(){
            //this part runs when the mapobject drag ended
            console.log('bounds changed benko');
            $scope.addMarkers();
          });

          google.maps.event.addListener($scope.map, 'zoom_changed', function(){
            //this part runs when the mapobject is being zoomed
            console.log('zoom changed benko');
            $scope.addMarkers();
          });
        }


        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
            //this part runs when the mapobject is created and rendered
            console.log('first and only idle benko');
            $scope.mapInitialized = true;
            $scope.addMarkers();

            if($scope.streetView) {

              // We get the map's default panorama and set up some defaults.
              // Note that we don't yet set it visible.
              $scope.panorama = $scope.map.getStreetView();
              $scope.panorama.setPosition(coordinatesLatLng);
              $scope.panorama.setPov(/** @type {google.maps.StreetViewPov} */({
                heading: 265,
                pitch: 0
              }));

              var service = new google.maps.StreetViewService;
              // call the "getPanoramaByLocation" function of the Streetview Services to return the closest streetview position for the entered coordinates
              service.getPanoramaByLocation($scope.panorama.getPosition(), 50, function(panoData) {
                // if the function returned a result
                if (panoData != null) {
                  // the GPS coordinates of the streetview camera position
                  var panoCenter = panoData.location.latLng;
                  // this is where the magic happens!
                  // the "computeHeading" function calculates the heading with the two GPS coordinates entered as parameters
                  var heading = google.maps.geometry.spherical.computeHeading(panoCenter, coordinatesLatLng);
                  // now we know the heading (camera direction, elevation, zoom, etc) set this as parameters to the panorama object
                  var pov = $scope.panorama.getPov();
                  pov.heading = heading;
                  $scope.panorama.setPov(pov);
                  // set a marker on the location we are looking at, to verify the calculations were correct
                  // var marker = new google.maps.Marker({
                  //   map: $scope.panorama,
                  //   position: coordinates
                  // });
                } else {
                  // no streetview found :(
                  console.log('not found');
                }
              });


              $scope.panorama.setVisible(true);
            }
        });
      }
    },
    link: function($scope) {

    },
    template: `
      <div style="height: 400px">
        <div id="{{mapId}}" style="height: 100%"></div>
      </div>
    `
  };
})
