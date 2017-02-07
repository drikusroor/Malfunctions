var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var ConfigCtrl = (function () {
        function ConfigCtrl($scope, $http, $localStorage) {
            this.$scope = $scope;
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$scope = $scope;
            this.$http = $http;
            this.$localStorage = $localStorage;
        }
        return ConfigCtrl;
    }());
    ConfigCtrl.$inject = ['$scope', '$http', '$localStorage'];
    StoringenApp.ConfigCtrl = ConfigCtrl;
    function controller($scope, $http, $localStorage) {
        return new ConfigCtrl($scope, $http, $localStorage);
    }
    angular.module('StoringenApp').controller('ConfigCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
