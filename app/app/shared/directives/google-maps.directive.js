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
                        icon: 'assets/images/Gebouwen-klein.png'
                    });
                    marker.addListener('click', function (e) {
                        console.log(e);
                        console.log(e.latLng.lat());
                        console.log(e.latLng.lng());
                        $window.map.setZoom(20);
                        $window.map.setCenter(marker.getPosition());
                    });
                }
            };
        },
        link: function ($scope) {
            $scope.$watch('location', function () {
                console.log(location);
            });
        },
        template: "\n      <div id=\"map\"></div>\n    "
    };
});
