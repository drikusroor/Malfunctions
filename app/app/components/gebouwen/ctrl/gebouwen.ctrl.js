var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenCtrl = (function () {
        function GebouwenCtrl($scope, $http, $state, $window, $document, $timeout, LocationService, GebouwenService, GebiedenService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$window = $window;
            this.$document = $document;
            this.$timeout = $timeout;
            this.LocationService = LocationService;
            this.GebouwenService = GebouwenService;
            this.GebiedenService = GebiedenService;
            this.storeLocation = function (loc) {
                console.log(loc);
                _this.location = loc;
            };
            this.setGebouwenFilter = function (gebied) {
                var that = _this;
                var x = (gebied.maxlat + gebied.minlat) / 2;
                var y = (gebied.maxlon + gebied.minlon) / 2;
                _this.$scope.$apply(function () {
                    that.gebouwenFilter.Gebied2 = gebied.Gebied2;
                    that.viewPortCenter = { x: x, y: y };
                    console.log(that);
                });
            };
            this.selectGebouw = function (id) {
                console.log(id);
                var selectedGebouw = _this.gebouwen.find(function (g) { return g.Object_ID === id; });
                _this.$scope.$apply(_this.selectedGebouw = selectedGebouw);
                var that = _this;
                _this.$timeout(function () {
                    that.panToGebouw();
                }, 100);
                console.log(_this.selectedGebouw);
            };
            this.panToGebouw = function () {
                _this.$window.map.panTo({ lat: _this.selectedGebouw.BAG_lat, lng: _this.selectedGebouw.BAG_lon });
            };
            this.selectTab = function (tabName) {
                _this.selectedTab = tabName;
                if (tabName === 'map') {
                    _this.$timeout(function () {
                        var evt = $window.document.createEvent('UIEvents');
                        evt.initUIEvent('resize', true, false, $window, 0);
                        $window.dispatchEvent(evt);
                    });
                }
            };
            var that = this;
            GebiedenService.getGebieden().then(function (response) {
                that.gebieden = response;
            });
            GebouwenService.getGebouwen().then(function (response) {
                that.gebouwen = response;
            });
            this.selectedTab = "map";
            LocationService.getCurrentPosition().then(this.storeLocation);
            this.gebouwenFilter = {};
            this.viewPortCenter = {};
        }
        return GebouwenCtrl;
    }());
    GebouwenCtrl.$inject = [
        '$scope',
        '$http',
        '$state',
        '$window',
        '$document',
        '$timeout',
        'LocationService',
        'GebouwenService',
        'GebiedenService'
    ];
    StoringenApp.GebouwenCtrl = GebouwenCtrl;
    function controller($scope, $http, $state, $window, $document, $timeout, LocationService, GebouwenService, GebiedenService) {
        return new GebouwenCtrl($scope, $http, $state, $window, $document, $timeout, LocationService, GebouwenService, GebiedenService);
    }
    angular.module('StoringenApp').controller('GebouwenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
