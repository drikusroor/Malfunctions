var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var StatusCtrl = (function () {
        function StatusCtrl($scope, $state, GebouwenService) {
            this.$scope = $scope;
            this.$state = $state;
            this.GebouwenService = GebouwenService;
            var that = this;
            var gebouwId = $state.params.id;
            GebouwenService.getGebouwById(gebouwId).then(function (response) {
                that.gebouw = response;
                that.meldingen = response.meldingen;
            });
        }
        return StatusCtrl;
    }());
    StatusCtrl.$inject = ['$scope', '$state', 'GebouwenService'];
    StoringenApp.StatusCtrl = StatusCtrl;
    function controller($scope, $state, GebouwenService) {
        return new StatusCtrl($scope, $state, GebouwenService);
    }
    angular.module('StoringenApp').controller('StatusCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
