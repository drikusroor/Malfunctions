var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenDetailCtrl = (function () {
        function GebouwenDetailCtrl($scope, $http, $localStorage, $state, GebouwenService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$state = $state;
            this.GebouwenService = GebouwenService;
            this.refreshGebouw = function () {
                console.log(_this.$state);
                var id = _this.$state.params.id;
                _this.GebouwenService.getGebouwById(id).then(function (response) {
                    that.gebouw = response;
                    that.gebouwen = [response];
                });
            };
            this.showScope = function () {
                console.log(_this);
            };
            this.refreshGebouw();
            var that = this;
        }
        return GebouwenDetailCtrl;
    }());
    GebouwenDetailCtrl.$inject = ['$scope', '$http', '$state', '$localStorage', 'GebouwenService'];
    StoringenApp.GebouwenDetailCtrl = GebouwenDetailCtrl;
    function controller($scope, $http, $localStorage, $state, GebouwenService) {
        return new GebouwenDetailCtrl($scope, $http, $localStorage, $state, GebouwenService);
    }
    angular.module('StoringenApp').controller('GebouwenDetailCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
