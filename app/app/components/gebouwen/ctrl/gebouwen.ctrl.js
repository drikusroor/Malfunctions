var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenCtrl = (function () {
        function GebouwenCtrl($scope, $http, $state, GEBOUWEN) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.GEBOUWEN = GEBOUWEN;
            this.selectGebouw = function (id) {
                _this.selectedGebouw = _this.GEBOUWEN.find(function (g) { return g.gebouwId === id; });
                console.log(_this.selectedGebouw);
            };
            this.gebouwen = GEBOUWEN;
            this.selectedTab = "list";
        }
        return GebouwenCtrl;
    }());
    GebouwenCtrl.$inject = ['$scope', '$http', '$state', 'GEBOUWEN'];
    StoringenApp.GebouwenCtrl = GebouwenCtrl;
    function controller($scope, $http, $state, GEBOUWEN) {
        return new GebouwenCtrl($scope, $http, $state, GEBOUWEN);
    }
    angular.module('StoringenApp').controller('GebouwenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
