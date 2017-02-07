var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenService = (function () {
        function GebouwenService($http, $state, GEBOUWEN) {
            var _this = this;
            this.$http = $http;
            this.$state = $state;
            this.GEBOUWEN = GEBOUWEN;
            this.addGebouw = function (gebouw) {
                _this.gebouwen.push(gebouw);
            };
            this.getGebouwen = function () {
                return _this.gebouwen;
            };
            this.gebouwen = GEBOUWEN;
        }
        return GebouwenService;
    }());
    GebouwenService.$inject = ['$http', '$state', 'GEBOUWEN'];
    StoringenApp.GebouwenService = GebouwenService;
    function service($http, $state, GEBOUWEN) {
        return new GebouwenService($http, $state, GEBOUWEN);
    }
    angular.module('StoringenApp').service('GebouwenService', service);
})(StoringenApp || (StoringenApp = {}));
