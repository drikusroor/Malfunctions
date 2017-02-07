var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenDetailCtrl = (function () {
        function GebouwenDetailCtrl($scope, $http, $localStorage, GebouwenDetailService) {
            this.$scope = $scope;
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.GebouwenDetailService = GebouwenDetailService;
            this.service = GebouwenDetailService;
            this.service.getGebouwByParamsId();
        }
        return GebouwenDetailCtrl;
    }());
    GebouwenDetailCtrl.$inject = ['$scope', '$http', '$localStorage', 'GebouwenDetailService'];
    StoringenApp.GebouwenDetailCtrl = GebouwenDetailCtrl;
    function controller($scope, $http, $localStorage, GebouwenDetailService) {
        return new GebouwenDetailCtrl($scope, $http, $localStorage, GebouwenDetailService);
    }
    angular.module('StoringenApp').controller('GebouwenDetailCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
