angular.module('StoringenApp')
    .directive('googleMaps', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'gebouwen': '=',
            'location': '=',
            'gebouwenFilter': '=',
            'viewPortCenter': '=',
            'streetView': '=',
            'height': '='
        },
        controller: function ($scope, $window, $document, $state, LocationService) {
            $scope.mapId = Math.random().toString(36).substr(2, 10);
            $scope.detailView = $state.current.name === 'portal.gebouwen.detail';
            console.log($scope);
            $scope.$watch('gebouwen', function (newValue, oldValue, scope) {
                if (newValue !== undefined) {
                    if (oldValue === undefined || newValue.length !== oldValue.length) {
                        $scope.initMap();
                    }
                }
            });
            if ($scope.gebouwenFilter) {
                $scope.$watch('gebouwenFilter.Gebied2', function (newValue, oldValue, scope) {
                    if (newValue !== undefined) {
                        if (oldValue === undefined || newValue !== oldValue) {
                            $scope.addMarkers();
                        }
                    }
                });
                $scope.$watch('gebouwenFilter.Rayon', function (newValue, oldValue, scope) {
                    if (newValue !== undefined) {
                        if (oldValue === undefined || newValue !== oldValue) {
                            $scope.addMarkers();
                        }
                    }
                });
            }
            function getContentString(gebouw) {
                var html = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '<a class="btn btn-info" href="#!/gebouwen/' + gebouw.BAG_VerblijfsobjectID + '">' +
                    gebouw.BAG_adres + ' ' + gebouw.BAG_huisnummer + ', ' + gebouw.BAG_postcode + ', ' + gebouw.BAG_plaats +
                    '<br>VHENR: ' + gebouw.VHE_nr +
                    '</a>' +
                    '</div>' +
                    '</div> ';
                return html;
            }
            function clearMarkers() {
                console.log($scope.markers.length);
                for (var i = 0; i < $scope.markers.length; i++) {
                    $scope.markers[i].setMap(null);
                }
                $scope.markers = [];
            }
            function addClusteredMarkers(vb, filteredGebouwen) {
                var container = document.getElementById($scope.mapId);
                var width = container.offsetWidth;
                var height = container.offsetHeight;
                var gridSize = 8;
                var amountX;
                var amountY;
                var ratio = width / height;
                if (ratio > 1) {
                    amountX = gridSize;
                    amountY = Math.round(gridSize / ratio);
                }
                else {
                    amountX = Math.round(gridSize * ratio);
                    amountY = gridSize;
                }
                var xMin = vb.lng1;
                var xMax = vb.lng0;
                var lonRange = xMax - xMin;
                var lonStep = lonRange / amountX;
                var yMin = vb.lat1;
                var yMax = vb.lat0;
                var latRange = yMax - yMin;
                var latStep = latRange / amountY;
                var gridArray = [];
                for (var y = 0; y < amountY; y++) {
                    for (var x = 0; x < amountX; x++) {
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
                        });
                    }
                }
                for (var i = 0; i < filteredGebouwen.length; i++) {
                    for (var g = 0; g < gridArray.length; g++) {
                        var gebouw = filteredGebouwen[i];
                        var grid = gridArray[g];
                        if (gebouw.BAG_lon > grid.lonMin &&
                            gebouw.BAG_lon < grid.lonMax &&
                            gebouw.BAG_lat > grid.latMin &&
                            gebouw.BAG_lat < grid.latMax) {
                            grid.count += 1;
                        }
                    }
                }
                gridArray = gridArray.filter(function (g) { return g.count > 0; });
                if ($scope.markers !== undefined) {
                    clearMarkers();
                }
                $scope.markers = gridArray.map(function (location, i) {
                    var grid = gridArray[i];
                    var scale = (grid.count / 400) + 1;
                    if (scale > 2.5)
                        scale = 2.5;
                    var size = 24 * scale;
                    var point = size / 2;
                    var label = grid.count.toString();
                    var marker = new google.maps.Marker({
                        position: {
                            lat: grid.latCenter,
                            lng: grid.lonCenter
                        },
                        map: $window.map,
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
                        icon: {
                            url: 'assets/images/gebouwtje64trans.png',
                            size: new google.maps.Size(size, size),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(point, point),
                            scaledSize: new google.maps.Size(size, size)
                        }
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        var latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                        $window.map.panTo(latLng);
                        var zoomLevel = $window.map.getZoom();
                        $window.map.setZoom(zoomLevel + 1);
                    });
                    return marker;
                });
            }
            function filterGebouwen(vb, gebouwen) {
                var filteredGebouwen = gebouwen.filter(function (g) {
                    return g.BAG_lat < vb.lat0 &&
                        g.BAG_lat > vb.lat1 &&
                        g.BAG_lon < vb.lng0 &&
                        g.BAG_lon > vb.lng1;
                });
                if ($scope.gebouwenFilter) {
                    if ($scope.gebouwenFilter.Gebied2 !== "" && $scope.gebouwenFilter.Gebied2 !== undefined && $scope.gebouwenFilter.Gebied2 !== null) {
                        filteredGebouwen = gebouwen.filter(function (g) {
                            return g.Gebied2 === $scope.gebouwenFilter.Gebied2;
                        });
                    }
                    if ($scope.gebouwenFilter.Rayon !== "" && $scope.gebouwenFilter.Rayon !== undefined && $scope.gebouwenFilter.Rayon !== null) {
                        filteredGebouwen = gebouwen.filter(function (g) {
                            return g.Rayon === $scope.gebouwenFilter.Rayon;
                        });
                    }
                }
                return filteredGebouwen;
            }
            function addIndividualMarkers(filteredGebouwen) {
                if ($scope.markers !== undefined) {
                    clearMarkers();
                }
                $scope.markers = filteredGebouwen.map(function (location, i) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: filteredGebouwen[i].BAG_lat,
                            lng: filteredGebouwen[i].BAG_lon
                        },
                        map: $window.map,
                        title: $scope.gebouwen[i].adres,
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
                    });
                    marker.metadata = {
                        adres: $scope.gebouwen[i].adres,
                        Object_ID: $scope.gebouwen[i].Object_ID
                    };
                    google.maps.event.addListener(marker, 'click', function () {
                        console.log(marker);
                        infowindow.open($window.map, marker);
                    });
                    $scope.lastMarker = marker;
                    return marker;
                });
            }
            $scope.addMarkers = function () {
                console.log($window.map);
                var map = $window.map;
                var zoomLevel = map.getZoom();
                console.log(map.getZoom());
                var vb = {
                    lat0: $window.map.getBounds().getNorthEast().lat(),
                    lng0: $window.map.getBounds().getNorthEast().lng(),
                    lat1: $window.map.getBounds().getSouthWest().lat(),
                    lng1: $window.map.getBounds().getSouthWest().lng()
                };
                var filteredGebouwen = filterGebouwen(vb, $scope.gebouwen);
                if (zoomLevel < 15 || filteredGebouwen.length > 1000) {
                    addClusteredMarkers(vb, filteredGebouwen);
                }
                else {
                    addIndividualMarkers(filteredGebouwen);
                }
            };
            $scope.initMap = function () {
                var coordinates = {
                    lat: 51.9980072,
                    lng: 4.4957816
                };
                var zoomLevel = 14;
                if ($scope.detailView) {
                    coordinates = {
                        lat: $scope.gebouwen[0].BAG_lat,
                        lng: $scope.gebouwen[0].BAG_lon
                    };
                    zoomLevel = 18;
                }
                $window.map = new google.maps.Map(document.getElementById($scope.mapId), {
                    center: coordinates,
                    zoom: zoomLevel,
                    StreetViewPControl: false
                });
                console.log(document.getElementById('pano'));
                if (!$scope.detailView) {
                    google.maps.event.addListener($window.map, 'dragend', function () {
                        console.log('bounds changed benko');
                        $scope.addMarkers();
                    });
                    google.maps.event.addListener($window.map, 'zoom_changed', function () {
                        console.log('zoom changed benko');
                        $scope.addMarkers();
                    });
                }
                google.maps.event.addListenerOnce($window.map, 'idle', function () {
                    console.log('first and only idle benko');
                    $scope.addMarkers();
                });
            };
        },
        link: function ($scope) {
        },
        template: "\n      <div ng-show=\"streetView\" id=\"pano\" style=\"height: 400px\"></div>\n      <div id=\"{{mapId}}\" style=\"height: 400px\"></div>\n    "
    };
});