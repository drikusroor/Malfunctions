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
                $scope.$apply(_this.selectedGebouw = _this.GEBOUWEN.find(function (g) { return g.gebouwId === id; }));
                ;
                console.log(_this.selectedGebouw);
            };
            this.selectTab = function (tabName) {
                _this.selectedTab = tabName;
                if (tabName === 'map') {
                }
            };
            this.gebouwen = GEBOUWEN;
            this.selectedTab = "map";
            LocationService.getCurrentPosition().then(this.storeLocation);
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
