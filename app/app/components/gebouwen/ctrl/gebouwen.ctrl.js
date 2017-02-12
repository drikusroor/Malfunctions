var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenCtrl = (function () {
        function GebouwenCtrl($scope, $http, $state, $window, $document, $timeout, $filter, LocationService, GebouwenService, GebiedenService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$window = $window;
            this.$document = $document;
            this.$timeout = $timeout;
            this.$filter = $filter;
            this.LocationService = LocationService;
            this.GebouwenService = GebouwenService;
            this.GebiedenService = GebiedenService;
            this.preFilterGebouwen = function (gebouwen) {
                var ctrl = _this;
                var preFilteredGebouwen = gebouwen;
                var gebouwenFilter = _this.gebouwenFilter;
                if (gebouwenFilter.Rayon !== undefined && gebouwenFilter.Rayon !== null) {
                    if (gebouwen[0].Rayon !== undefined) {
                        preFilteredGebouwen = preFilteredGebouwen.filter(function (g) {
                            return g.Rayon === gebouwenFilter.Rayon;
                        });
                    }
                }
                if (gebouwenFilter.generic !== undefined && gebouwenFilter.generic !== null) {
                    preFilteredGebouwen = _this.$filter('filter')(preFilteredGebouwen, gebouwenFilter.generic);
                }
                ctrl.preFilteredGebouwen = preFilteredGebouwen;
            };
            this.storeLocation = function (loc) {
                console.log(loc);
                _this.location = loc;
            };
            this.setRayonFilter = function (rayon) {
                if (_this.gebouwenFilter.Rayon !== rayon) {
                    _this.gebouwenFilter.Rayon = rayon;
                }
                else {
                    _this.gebouwenFilter.Rayon = undefined;
                }
            };
            this.setGebouwenFilter = function (gebied) {
                var that = _this;
                var x = (gebied.maxlat + gebied.minlat) / 2;
                var y = (gebied.maxlon + gebied.minlon) / 2;
                _this.$scope.$apply(function () {
                    that.gebouwenFilter.Rayon = gebied.Rayon;
                    that.viewPortCenter = { x: x, y: y };
                    console.log(that);
                });
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
            this.gebouwenLoading = true;
            this.rayonsLoading = true;
            GebiedenService.getGebieden().then(function (response) {
                that.rayonsLoading = false;
                that.rayons = response;
            });
            GebouwenService.getGebouwen().then(function (response) {
                that.gebouwenLoading = false;
                that.gebouwen = response;
                that.preFilterGebouwen(that.gebouwen);
                $scope.$watch('gebouwenctrl.gebouwenFilter.generic', function (newValue, oldValue, scope) {
                    var ctrl = scope.gebouwenctrl;
                    if (oldValue || newValue) {
                        ctrl.preFilterGebouwen(ctrl.gebouwen);
                    }
                });
                $scope.$watch('gebouwenctrl.gebouwenFilter.Rayon', function (newValue, oldValue, scope) {
                    var ctrl = scope.gebouwenctrl;
                    if (oldValue || newValue) {
                        ctrl.preFilterGebouwen(ctrl.gebouwen);
                    }
                });
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
        '$filter',
        'LocationService',
        'GebouwenService',
        'GebiedenService'
    ];
    StoringenApp.GebouwenCtrl = GebouwenCtrl;
    function controller($scope, $http, $state, $window, $document, $timeout, $filter, LocationService, GebouwenService, GebiedenService) {
        return new GebouwenCtrl($scope, $http, $state, $window, $document, $timeout, $filter, LocationService, GebouwenService, GebiedenService);
    }
    angular.module('StoringenApp').controller('GebouwenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
