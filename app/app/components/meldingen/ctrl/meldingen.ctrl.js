var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var MeldingenCtrl = (function () {
        function MeldingenCtrl($scope, $http, $state, $window, $document, GEBOUWEN) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$window = $window;
            this.$document = $document;
            this.GEBOUWEN = GEBOUWEN;
            this.selectGebouw = function (id) {
                _this.selectedGebouw = _this.GEBOUWEN.find(function (g) { return g.gebouwId === id; });
                _this.form.adres = _this.selectedGebouw.adres;
                _this.form.vhenr = _this.selectedGebouw.vhenr;
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
            this.form = {};
            var that = this;
            this.$document.ready(function () {
                that.initMap();
            });
        }
        return MeldingenCtrl;
    }());
    MeldingenCtrl.$inject = ['$scope', '$http', '$state', '$window', '$document', 'GEBOUWEN'];
    StoringenApp.MeldingenCtrl = MeldingenCtrl;
    function controller($scope, $http, $state, $window, $document, GEBOUWEN) {
        return new MeldingenCtrl($scope, $http, $state, $window, $document, GEBOUWEN);
    }
    angular.module('StoringenApp').controller('MeldingenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
