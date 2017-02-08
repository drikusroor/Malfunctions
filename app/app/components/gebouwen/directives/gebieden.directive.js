angular.module('StoringenApp')
    .directive('gebiedenMap', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'gebieden': '=',
            'clickEvent': '&',
            'location': '='
        },
        link: function ($scope) {
            $scope.selectGebied = function (gebied) {
                $scope.clickEvent({ gebied: gebied });
            };
        },
        controller: function ($scope, $window, $document) {
            $document.ready(function () {
            });
            $scope.$watch('gebieden', function (newValue, oldValue, scope) {
                if (newValue !== undefined) {
                    if (oldValue === undefined || newValue.length !== oldValue.length) {
                        $scope.initMap();
                    }
                }
            });
            var panorama;
            function addRectangle(gebied) {
                var maxlat = gebied.maxlat, minlat = gebied.minlat, maxlon = gebied.maxlon, minlon = gebied.minlon, x = (maxlat - minlat) / 4, y = (maxlon - minlon) / 4;
                if (maxlat > 0 && minlat > 0 && maxlon > 0 && minlon > 0) {
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
                    });
                    rectangle.metadata = gebied;
                    google.maps.event.addListener(rectangle, 'click', function () {
                        $scope.selectGebied(rectangle.metadata);
                    });
                }
            }
            $scope.initMap = function () {
                var coordinates = {
                    lat: 51.9980072,
                    lng: 4.4957816
                };
                $window.gebiedenMap = new google.maps.Map(document.getElementById('gebieden-map'), {
                    center: coordinates,
                    zoom: 12,
                    StreetViewPControl: false
                });
                $scope.rectangles = $scope.gebieden.map(function (location, i) {
                    var gebied = $scope.gebieden[i];
                    addRectangle(gebied);
                });
            };
        },
        template: "\n      <div id=\"gebieden-map\"></div>\n    "
    };
});
