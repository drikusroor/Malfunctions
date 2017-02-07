angular.module('StoringenApp')
    .directive('googleMaps', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'gebouwen': '=',
            'clickEvent': '&',
            'location': '='
        },
        controller: function ($scope, $window, $document, GEBOUWEN) {
            $document.ready(function () {
                $scope.initMap();
            });
            $scope.toggleStreetView = function () {
                var toggle = $scope.panorama.getVisible();
                if (toggle == false) {
                    $scope.panorama.setVisible(true);
                }
                else {
                    $scope.panorama.setVisible(false);
                }
            };
            $scope.initMap = function () {
                var coordinates = {
                    lat: 52.1646443,
                    lng: 5.363390400000071
                };
                $window.map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates,
                    zoom: 16,
                    StreetViewPControl: false
                });
                for (var i in GEBOUWEN) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: GEBOUWEN[i].latitude,
                            lng: GEBOUWEN[i].longitude
                        },
                        map: $window.map,
                        title: GEBOUWEN[i].adres,
                        icon: 'favicon.png'
                    });
                }
                $scope.panorama = $window.map.getStreetView();
                $scope.panorama.setPosition(coordinates);
                $scope.panorama.setPov(({
                    heading: 265,
                    pitch: 0,
                }));
            };
        },
        link: function ($scope) {
            $scope.$watch('location', function () {
                console.log(location);
            });
        },
        template: "\n      <div id=\"floating-panel\">\n        <input type=\"button\" value=\"Toggle Street View\" ng-click=\"toggleStreetView();\"></input>\n      </div>\n      <div id=\"map\"></div>\n    "
    };
});
