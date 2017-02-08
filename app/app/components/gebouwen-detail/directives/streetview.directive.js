angular.module('StoringenApp')
    .directive('streetview', function () {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'gebouw': '=',
            'clickEvent': '&',
            'location': '='
        },
        controller: function ($scope, $window, $document) {
            $document.ready(function () {
            });
            $scope.$watch('gebouw', function (newValue, oldValue, scope) {
                if (newValue !== undefined) {
                    if (oldValue === undefined || newValue.length !== oldValue.length) {
                        $scope.initMap();
                    }
                }
            });
            $scope.initMap = function () {
                var coordinates = {
                    lat: 51.9980072,
                    lng: 4.4957816
                };
                $window.map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates,
                    zoom: 16,
                    StreetViewPControl: false
                });
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var markers = $scope.gebouwen.map(function (location, i) {
                    var locationNew = {
                        lat: $scope.gebouwen[i].BAG_lat,
                        lng: $scope.gebouwen[i].BAG_lon
                    };
                    var marker = new google.maps.Marker({
                        position: locationNew,
                        map: $window.map,
                        title: $scope.gebouwen[i].adres,
                        icon: 'assets/images/Gebouwen-klein.png',
                    });
                    marker.metadata = {
                        adres: $scope.gebouwen[i].adres,
                        Object_ID: $scope.gebouwen[i].Object_ID
                    };
                    google.maps.event.addListener(marker, 'click', function () {
                        console.log(this.metadata);
                        $scope.clickEvent({ id: this.metadata.Object_ID });
                        google.maps.event.trigger($window.map, "resize");
                    });
                    return marker;
                });
            };
        },
        link: function ($scope) {
        },
        template: "\n      <div id=\"map\"></div>\n    "
    };
});
