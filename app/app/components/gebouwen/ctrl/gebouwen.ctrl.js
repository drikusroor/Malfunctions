var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenCtrl = (function () {
        function GebouwenCtrl($scope, $http, $state, $window, $document, GEBOUWEN, LocationService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$window = $window;
            this.$document = $document;
            this.GEBOUWEN = GEBOUWEN;
            this.LocationService = LocationService;
            this.storeLocation = function (loc) {
                console.log(loc);
                _this.location = loc;
            };
            this.selectGebouw = function (id) {
                _this.selectedGebouw = _this.GEBOUWEN.find(function (g) { return g.gebouwId === id; });
                console.log(_this.selectedGebouw);
            };
            this.selectTab = function (tabName) {
                _this.selectedTab = tabName;
                if (tabName === 'map') {
                }
            };
            this.initMap = function () {
                var coordinates = {
                    lat: 52.1646443,
                    lng: 5.363390400000071
                };
                _this.$window.map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates,
                    zoom: 16
                });
            };
            this.gebouwen = GEBOUWEN;
            this.selectedTab = "map";
            LocationService.getCurrentPosition().then(this.storeLocation);
            var that = this;
            this.$document.ready(function () {
                that.initMap();
            });
        }
        return GebouwenCtrl;
    }());
    GebouwenCtrl.$inject = ['$scope', '$http', '$state', '$window', '$document', 'GEBOUWEN', 'LocationService'];
    StoringenApp.GebouwenCtrl = GebouwenCtrl;
    function controller($scope, $http, $state, $window, $document, GEBOUWEN, LocationService) {
        return new GebouwenCtrl($scope, $http, $state, $window, $document, GEBOUWEN, LocationService);
    }
    angular.module('StoringenApp').controller('GebouwenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
