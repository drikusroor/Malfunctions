var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var MeldingenCtrl = (function () {
        function MeldingenCtrl($scope, $http, $state, $window, $document, GebouwenService) {
            this.$scope = $scope;
            this.$http = $http;
            this.$state = $state;
            this.$window = $window;
            this.$document = $document;
            this.GebouwenService = GebouwenService;
            var id = $state.params.id;
            GebouwenService.getGebouwById(id).then(function (data) {
                this.gebouw = data;
                this.meldingen = data.meldingen;
            });
        }
        return MeldingenCtrl;
    }());
    MeldingenCtrl.$inject = ['$scope', '$http', '$state', '$window', '$document', 'GebouwenService'];
    StoringenApp.MeldingenCtrl = MeldingenCtrl;
    function controller($scope, $http, $state, $window, $document, GebouwenService) {
        return new MeldingenCtrl($scope, $http, $state, $window, $document, GebouwenService);
    }
    angular.module('StoringenApp').controller('MeldingenCtrl', controller);
})(StoringenApp || (StoringenApp = {}));
