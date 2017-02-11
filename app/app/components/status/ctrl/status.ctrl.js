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
                that.bezoeken = response.bezoeken;
                that.storingen = that.bezoeken.filter(function (b) { return b.SoortBonOmschrijving !== "Periodiek onderhoud"; });
                that.periodiek = that.bezoeken.filter(function (b) { return b.SoortBonOmschrijving === "Periodiek onderhoud"; });
                console.log(that);
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
