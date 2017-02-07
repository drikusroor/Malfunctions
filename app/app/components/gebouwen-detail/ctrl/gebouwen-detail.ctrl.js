var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenDetailCtrl = (function () {
        function GebouwenDetailCtrl($scope, $http, $localStorage, GEBOUWEN) {
            this.$scope = $scope;
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.GEBOUWEN = GEBOUWEN;
        }
        return GebouwenDetailCtrl;
    }());
    GebouwenDetailCtrl.$inject = ['$scope', '$http', '$localStorage', 'GEBOUWEN'];
    StoringenApp.GebouwenDetailCtrl = GebouwenDetailCtrl;
    function controller($scope, $http, $localStorage, GEBOUWEN) {
        return new GebouwenDetailCtrl($scope, $http, $localStorage, GEBOUWEN);
    }
    angular.module('StoringenApp').controller('GebouwenDetailCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
