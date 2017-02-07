var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenCtrl = (function () {
        function GebouwenCtrl($scope, $http, GEBOUWEN) {
            this.$scope = $scope;
            this.$http = $http;
            this.GEBOUWEN = GEBOUWEN;
            this.gebouwen = GEBOUWEN;
            this.selectedTab = "map";
        }
        return GebouwenCtrl;
    }());
    GebouwenCtrl.$inject = ['$scope', '$http', 'GEBOUWEN'];
    StoringenApp.GebouwenCtrl = GebouwenCtrl;
    function controller($scope, $http, GEBOUWEN) {
        return new GebouwenCtrl($scope, $http, GEBOUWEN);
    }
    angular.module('StoringenApp').controller('GebouwenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
