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
            function getContentString(gebouw) {
                var html = '<div id="content">' +
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
            $scope.initMap = function () {
                var coordinates = {
                    lat: 51.9980072,
                    lng: 4.4957816
                };
                $window.gebiedenMap = new google.maps.Map(document.getElementById('gebieden-map'), {
                    center: coordinates,
                    zoom: 16,
                    StreetViewPControl: false
                });
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $scope.rectangles = $scope.gebieden.map(function (location, i) {
                    var gebied = $scope.gebieden[i];
                    var maxlat = gebied.maxlat, minlat = gebied.minlat, maxlon = gebied.maxlon, minlon = gebied.minlon;
                    var x = (maxlat - minlat) / 4;
                    var y = (maxlon - minlon) / 4;
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
                    google.maps.event.addListener(rectangle, 'click', function () {
                        console.log('benko');
                    });
                });
            };
        },
        link: function ($scope) {
        },
        template: "\n      <div id=\"gebieden-map\"></div>\n    "
    };
});
