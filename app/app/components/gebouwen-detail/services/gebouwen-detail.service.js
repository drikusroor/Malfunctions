var StoringenApp;
(function (StoringenApp) {
    "use strict";
    var GebouwenDetailService = (function () {
        function GebouwenDetailService($http, GEBOUWEN, $state) {
            var _this = this;
            this.$http = $http;
            this.GEBOUWEN = GEBOUWEN;
            this.$state = $state;
            this.getGebouwById = function (id) {
                _this.gebouw = _this.GEBOUWEN.find(function (g) { return g.gebouwId === id; });
            };
            this.getGebouwByParamsId = function () {
                var id = parseInt(_this.$state.params.id);
                _this.getGebouwById(id);
            };
        }
        return GebouwenDetailService;
    }());
    GebouwenDetailService.$inject = ['$http', 'GEBOUWEN', '$state'];
    StoringenApp.GebouwenDetailService = GebouwenDetailService;
    function service($http, GEBOUWEN, $state) {
        return new GebouwenDetailService($http, GEBOUWEN, $state);
    }
    angular.module('StoringenApp').service('GebouwenDetailService', service);
})(StoringenApp || (StoringenApp = {}));
