var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var StatusCtrl = (function () {
        function StatusCtrl($scope, $state, StatusService) {
            this.$scope = $scope;
            this.$state = $state;
            this.StatusService = StatusService;
            var that = this;
            var gebouwId = $state.params.id;
            StatusService.getStatus(gebouwId).then(function (response) {
                that.status = response;
            });
        }
        return StatusCtrl;
    }());
    StatusCtrl.$inject = ['$scope', '$state', 'StatusService'];
    StoringenApp.StatusCtrl = StatusCtrl;
    function controller($scope, $state, StatusService) {
        return new StatusCtrl($scope, $state, StatusService);
    }
    angular.module('StoringenApp').controller('StatusCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
